"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

type Props = {
  id?: string;
  name: string;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Wraps a section so we know when it enters the viewport and how long it
 * stays visible. Fires:
 *   - `section_view` once, the first time it crosses the threshold.
 *   - `section_dwell` once, when the section leaves view (or on unmount),
 *     with the cumulative visible time in ms.
 */
export default function TrackedSection({
  id,
  name,
  threshold = 0.35,
  className,
  children,
  as = "section",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const seen = useRef(false);
  const visibleSince = useRef<number | null>(null);
  const dwellMs = useRef(0);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!seen.current) {
              seen.current = true;
              trackEvent("section_view", {
                section: name,
                id,
                path: window.location.pathname,
                ratio: Number(entry.intersectionRatio.toFixed(2)),
              });
            }
            visibleSince.current = Date.now();
          } else if (visibleSince.current !== null) {
            dwellMs.current += Date.now() - visibleSince.current;
            visibleSince.current = null;
          }
        }
      },
      { threshold }
    );

    observer.observe(el);

    const onPageHide = () => flushDwell();

    window.addEventListener("pagehide", onPageHide);

    return () => {
      observer.disconnect();
      window.removeEventListener("pagehide", onPageHide);
      flushDwell();
    };

    function flushDwell() {
      if (visibleSince.current !== null) {
        dwellMs.current += Date.now() - visibleSince.current;
        visibleSince.current = null;
      }
      if (dwellMs.current > 0) {
        trackEvent("section_dwell", {
          section: name,
          id,
          ms: dwellMs.current,
        });
        dwellMs.current = 0;
      }
    }
  }, [id, name, threshold]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      data-track-section={name}
      className={className}
    >
      {children}
    </Tag>
  );
}
