"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl surface p-10 md:p-16 text-center"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[60%] bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-transparent blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white max-w-3xl mx-auto">
              Stop managing documents.
              <br />
              <span className="text-gradient">
                Start shipping translations.
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
              Join the teams replacing manual translation with structured,
              format-preserving workflows. Free to start. Built to scale.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://app.linguabatch.com/signup"
                onClick={() =>
                  trackEvent("start_free_click", { source: "cta_section" })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors glow-ring"
              >
                Start Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="mailto:demo@linguabatch.com?subject=LinguaBatch%20Demo%20Request"
                onClick={() =>
                  trackEvent("demo_request_click", { source: "cta_section" })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border hairline bg-white/[0.03] text-white px-5 py-3 text-sm font-medium hover:bg-white/[0.06] transition-colors"
              >
                <PlayCircle className="h-4 w-4" />
                Request Demo
              </Link>
              <Link
                href="#pricing"
                onClick={() =>
                  trackEvent("pricing_click", { source: "cta_section" })
                }
                className="inline-flex items-center justify-center text-sm text-zinc-300 hover:text-white px-3 py-3"
              >
                View Pricing →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
