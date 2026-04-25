"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "../../lib/analytics";

export default function BlogCTA({ slug }: { slug: string }) {
  return (
    <div className="mt-14 surface rounded-2xl p-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
        Try LinguaBatch
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-white">
        Stop handling documents. Start shipping translations.
      </h3>
      <p className="mt-3 text-sm text-zinc-400">
        Free to start. Format-preserving exports. Built for teams who refuse to
        copy-paste.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/#cta"
          onClick={() =>
            trackEvent("start_free_click", {
              source: "blog_post",
              slug,
            })
          }
          className="inline-flex items-center gap-1 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition-colors"
        >
          Start Free <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          href="/#pricing"
          onClick={() =>
            trackEvent("pricing_click", {
              source: "blog_post",
              slug,
            })
          }
          className="inline-flex items-center gap-1 rounded-full border hairline bg-white/[0.03] text-white px-4 py-2 text-sm font-medium hover:bg-white/[0.06] transition-colors"
        >
          View Pricing
        </Link>
      </div>
    </div>
  );
}
