"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

export default function ScrollDepthTracker() {
  const pathname = usePathname();
  const reached = useRef<Set<number>>(new Set());

  useEffect(() => {
    reached.current = new Set();

    const onScroll = () => {
      const doc = document.documentElement;
      const winH = window.innerHeight;
      const total = doc.scrollHeight - winH;
      if (total <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / total) * 100));

      for (const t of THRESHOLDS) {
        if (pct >= t && !reached.current.has(t)) {
          reached.current.add(t);
          trackEvent("scroll_depth", { percent: t, path: pathname });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
