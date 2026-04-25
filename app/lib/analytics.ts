"use client";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "consent",
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Centralized analytics layer for GA4 (gtag.js).
 *
 * Two modes coexist:
 *   1. Explicit calls — `trackEvent("start_free_click", { source: "hero" })`
 *      for high-intent CTAs where readability matters.
 *   2. Global delegation — any element with `data-track-event="..."` and
 *      optional `data-track-*` attributes is automatically captured by
 *      AnalyticsProvider. No extra wiring needed in most components.
 *
 * Event taxonomy below is non-exhaustive: trackEvent accepts any string,
 * and the typed union is just for editor autocomplete on known events.
 */
export type KnownEvent =
  // Conversion / CTA
  | "start_free_click"
  | "demo_request_click"
  | "pricing_click"
  // Content
  | "blog_post_click"
  | "blog_cta_click"
  // Navigation
  | "nav_click"
  | "route_change"
  | "outbound_click"
  | "internal_link_click"
  // Scroll / view
  | "scroll_depth"
  | "section_view"
  | "section_dwell"
  // Engagement
  | "engaged_time"
  | "first_interaction"
  | "idle"
  | "active"
  | "tab_focus"
  | "tab_blur"
  | "page_exit"
  // Forms
  | "form_start"
  | "form_submit"
  | "form_abandon"
  | "form_field_blur"
  // Generic UI
  | "ui_click"
  // Other
  | "text_copy"
  | "print"
  | "web_vital"
  | "js_error"
  | "promise_rejection";

export type AnalyticsEventName = KnownEvent | (string & {});

export type AnalyticsParams = Record<string, unknown>;

export function trackEvent(
  event: AnalyticsEventName,
  params: AnalyticsParams = {}
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") {
    // Buffer through dataLayer if gtag is not yet hydrated; gtag flushes it.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
    return;
  }
  window.gtag("event", event, params);
}

/**
 * Set sticky user properties (visible across all subsequent events for the
 * session).
 */
export function setUserProperties(props: AnalyticsParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("set", "user_properties", props);
}
