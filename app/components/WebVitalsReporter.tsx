"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "../lib/analytics";

/**
 * Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) to GA4 as
 * `web_vital` events. Uses Next.js's built-in hook so we tap straight
 * into the framework's metric stream — no extra polyfills, no extra cost.
 */
export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    trackEvent("web_vital", {
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value:
        metric.name === "CLS"
          ? Math.round(metric.value * 1000)
          : Math.round(metric.value),
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      navigation_type: metric.navigationType,
      path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  });

  return null;
}
