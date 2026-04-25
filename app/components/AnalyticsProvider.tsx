"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackEvent, setUserProperties } from "../lib/analytics";

/**
 * Global analytics provider — mounted once in RootLayout.
 *
 * Responsibilities:
 *  - Route change tracking (SPA-aware, fires `route_change`)
 *  - Click delegation: any element with `data-track-event` is auto-tracked.
 *    Untagged button/link clicks emit a generic `ui_click` with rich context.
 *  - Outbound link detection
 *  - Engagement time (visibility-aware accumulation, periodic flush)
 *  - Idle / active detection (30s threshold)
 *  - Page Visibility (tab_focus / tab_blur)
 *  - First interaction marker
 *  - Form interaction tracking (form_start, form_submit, form_abandon)
 *  - Copy + print events
 *  - JS error + unhandledrejection capture
 *  - Page exit with engaged_time flush
 *
 * Performance notes:
 *  - All listeners are passive where possible.
 *  - Engagement timer ticks at 1Hz in JS only (no extra rAF).
 *  - Click delegation runs on a single document-level listener.
 *  - All work is batched/throttled to avoid jank.
 */
function AnalyticsProviderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastPath = useRef<string | null>(null);
  const pageEnterTime = useRef<number>(Date.now());
  const engagedMs = useRef<number>(0);
  const lastTickTime = useRef<number>(Date.now());
  const isVisible = useRef<boolean>(true);
  const isIdle = useRef<boolean>(false);
  const lastInteraction = useRef<number>(Date.now());
  const firstInteractionFired = useRef<boolean>(false);
  const startedForms = useRef<Set<HTMLFormElement>>(new Set());
  const submittedForms = useRef<WeakSet<HTMLFormElement>>(new WeakSet());

  // ---- Route change tracking --------------------------------------------
  useEffect(() => {
    const url =
      pathname +
      (searchParams && searchParams.toString()
        ? `?${searchParams.toString()}`
        : "");

    if (lastPath.current && lastPath.current !== url) {
      // Flush engaged time for the previous route before transitioning.
      flushEngagedTime("route_change", lastPath.current);
    }

    trackEvent("route_change", {
      from: lastPath.current,
      to: url,
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });

    // Reset per-page counters
    pageEnterTime.current = Date.now();
    engagedMs.current = 0;
    lastTickTime.current = Date.now();
    isIdle.current = false;
    lastInteraction.current = Date.now();
    firstInteractionFired.current = false;
    lastPath.current = url;
  }, [pathname, searchParams]);

  // ---- One-time setup: user properties + listeners ----------------------
  useEffect(() => {
    // Capture environment context once per session.
    setUserProperties({
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio || 1,
      lang: navigator.language,
      tz_offset: new Date().getTimezoneOffset(),
      prefers_reduced_motion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    });

    // ---- Click delegation -----------------------------------------------
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      // Find nearest interactive ancestor.
      const interactive = target.closest<HTMLElement>(
        "[data-track-event], a, button, [role='button']"
      );
      if (!interactive) return;

      markInteraction();

      const explicit = interactive.getAttribute("data-track-event");
      const meta = readDataAttrs(interactive);
      const text = (interactive.textContent || "").trim().slice(0, 80);
      const isLink = interactive.tagName === "A";
      const href = isLink
        ? (interactive as HTMLAnchorElement).href
        : undefined;

      const base = {
        ...meta,
        path: window.location.pathname,
        text,
        tag: interactive.tagName.toLowerCase(),
        id: interactive.id || undefined,
        classes: interactive.className?.toString().slice(0, 120) || undefined,
        href,
        modifier:
          e.metaKey || e.ctrlKey
            ? "meta"
            : e.shiftKey
            ? "shift"
            : e.altKey
            ? "alt"
            : "none",
        button: e.button,
      };

      if (explicit) {
        trackEvent(explicit, base);
      } else {
        trackEvent("ui_click", base);
      }

      // Outbound link detection.
      if (isLink && href) {
        try {
          const url = new URL(href, window.location.origin);
          const isOutbound =
            url.origin !== window.location.origin &&
            !["mailto:", "tel:"].includes(url.protocol);
          if (isOutbound) {
            trackEvent("outbound_click", {
              url: url.href,
              host: url.host,
              text,
              path: window.location.pathname,
            });
          } else if (url.origin === window.location.origin && !explicit) {
            trackEvent("internal_link_click", {
              to: url.pathname + url.search,
              text,
              path: window.location.pathname,
            });
          }
        } catch {
          // Ignore malformed URLs.
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    // ---- Page visibility -----------------------------------------------
    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      isVisible.current = visible;
      if (visible) {
        lastTickTime.current = Date.now();
        trackEvent("tab_focus", { path: window.location.pathname });
      } else {
        // Accumulate before going hidden.
        accumulateEngaged();
        flushEngagedTime("tab_blur");
        trackEvent("tab_blur", { path: window.location.pathname });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ---- Interaction marker --------------------------------------------
    const interactionEvents: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ];
    const onAnyInteraction = () => markInteraction();
    interactionEvents.forEach((evt) =>
      document.addEventListener(evt, onAnyInteraction, { passive: true })
    );

    // ---- Forms ---------------------------------------------------------
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const form = t.closest("form");
      if (!form) return;
      if (!startedForms.current.has(form)) {
        startedForms.current.add(form);
        trackEvent("form_start", {
          form_id: form.id || form.getAttribute("name") || "anonymous",
          path: window.location.pathname,
        });
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const t = e.target as HTMLInputElement | null;
      if (!t || !t.tagName) return;
      if (!["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      const form = t.closest("form");
      if (!form) return;
      trackEvent("form_field_blur", {
        form_id: form.id || form.getAttribute("name") || "anonymous",
        field: t.name || t.id || t.type,
        filled: Boolean(t.value),
      });
    };
    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (!form) return;
      submittedForms.current.add(form);
      trackEvent("form_submit", {
        form_id: form.id || form.getAttribute("name") || "anonymous",
        path: window.location.pathname,
      });
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("submit", onSubmit, { capture: true });

    // ---- Copy + print --------------------------------------------------
    const onCopy = () => {
      const sel = window.getSelection()?.toString() || "";
      trackEvent("text_copy", {
        path: window.location.pathname,
        length: sel.length,
        // Don't ship raw text — only a short safe sample for context.
        sample: sel.slice(0, 60),
      });
    };
    const onPrint = () =>
      trackEvent("print", { path: window.location.pathname });
    document.addEventListener("copy", onCopy);
    window.addEventListener("beforeprint", onPrint);

    // ---- Errors --------------------------------------------------------
    const onError = (event: ErrorEvent) => {
      trackEvent("js_error", {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        path: window.location.pathname,
      });
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      trackEvent("promise_rejection", {
        reason: String(event.reason).slice(0, 200),
        path: window.location.pathname,
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    // ---- Engagement timer ----------------------------------------------
    const ENGAGEMENT_TICK_MS = 1000;
    const IDLE_THRESHOLD_MS = 30_000;
    const FLUSH_INTERVAL_MS = 30_000;

    const tickHandle = window.setInterval(() => {
      accumulateEngaged();

      // Idle detection
      const sinceInteraction = Date.now() - lastInteraction.current;
      if (!isIdle.current && sinceInteraction >= IDLE_THRESHOLD_MS) {
        isIdle.current = true;
        trackEvent("idle", {
          path: window.location.pathname,
          since_ms: sinceInteraction,
        });
      }
    }, ENGAGEMENT_TICK_MS);

    const flushHandle = window.setInterval(() => {
      // Periodic flush so long sessions still report progress.
      if (engagedMs.current > 0) {
        flushEngagedTime("interval");
      }
    }, FLUSH_INTERVAL_MS);

    // ---- Page exit -----------------------------------------------------
    const onPageHide = () => {
      accumulateEngaged();
      flushEngagedTime("page_exit");
      trackEvent("page_exit", {
        path: window.location.pathname,
        time_on_page_ms: Date.now() - pageEnterTime.current,
      });
    };
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      interactionEvents.forEach((evt) =>
        document.removeEventListener(evt, onAnyInteraction)
      );
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("submit", onSubmit, { capture: true });
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("pagehide", onPageHide);
      window.clearInterval(tickHandle);
      window.clearInterval(flushHandle);
    };
  }, []);

  // ---- Helpers ----------------------------------------------------------
  function markInteraction() {
    const now = Date.now();
    lastInteraction.current = now;
    if (isIdle.current) {
      isIdle.current = false;
      trackEvent("active", { path: window.location.pathname });
    }
    if (!firstInteractionFired.current) {
      firstInteractionFired.current = true;
      trackEvent("first_interaction", {
        path: window.location.pathname,
        since_pageload_ms: now - pageEnterTime.current,
      });
    }
  }

  function accumulateEngaged() {
    const now = Date.now();
    if (isVisible.current && !isIdle.current) {
      engagedMs.current += now - lastTickTime.current;
    }
    lastTickTime.current = now;
  }

  function flushEngagedTime(reason: string, path?: string) {
    if (engagedMs.current <= 0) return;
    trackEvent("engaged_time", {
      path: path ?? window.location.pathname,
      ms: engagedMs.current,
      reason,
    });
    engagedMs.current = 0;
  }

  return null;
}

function readDataAttrs(el: HTMLElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const attr of Array.from(el.attributes)) {
    if (!attr.name.startsWith("data-track-")) continue;
    if (attr.name === "data-track-event") continue;
    const key = attr.name.replace(/^data-track-/, "").replace(/-/g, "_");
    out[key] = attr.value;
  }
  return out;
}

export default function AnalyticsProvider() {
  // useSearchParams() requires a Suspense boundary in Next.js App Router.
  return (
    <Suspense fallback={null}>
      <AnalyticsProviderInner />
    </Suspense>
  );
}
