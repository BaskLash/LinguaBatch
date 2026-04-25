"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import AnimatedDocFlow from "./AnimatedDocFlow";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <AnimatedDocFlow />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border hairline bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span>AI document workflow · now in beta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          <span className="text-gradient">LinguaBatch</span>
          <span className="block text-white/90 mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
            Efficient translation and workflow optimization
            <br className="hidden md:block" />
            <span className="text-zinc-400"> for large documents.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400"
        >
          Translate entire PDFs, Excel sheets, and PowerPoint presentations —
          no copy-paste, directly in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#cta"
            onClick={() => trackEvent("start_free_click", { source: "hero" })}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors glow-ring"
          >
            Start Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#cta"
            onClick={() => trackEvent("demo_request_click", { source: "hero" })}
            className="inline-flex items-center justify-center gap-2 rounded-full border hairline bg-white/[0.03] text-white px-5 py-3 text-sm font-medium hover:bg-white/[0.06] transition-colors"
          >
            <PlayCircle className="h-4 w-4" />
            Request Demo
          </Link>
          <Link
            href="#pricing"
            onClick={() => trackEvent("pricing_click", { source: "hero" })}
            className="inline-flex items-center justify-center text-sm text-zinc-300 hover:text-white px-3 py-3"
          >
            View Pricing →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mx-auto max-w-4xl"
        >
          <div className="surface relative overflow-hidden rounded-2xl p-1.5">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b hairline">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-zinc-500">
                linguabatch.app · pipeline
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-3 text-[11px] font-mono">
              {[
                ["INGEST", "12 documents", "text-cyan-300"],
                ["SPLIT", "184 blocks", "text-violet-300"],
                ["TRANSLATE", "EN → DE,FR,ES", "text-emerald-300"],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="rounded-lg border hairline bg-black/40 p-3"
                >
                  <div className={`text-[10px] tracking-widest ${color}`}>
                    {label}
                  </div>
                  <div className="mt-2 text-zinc-300">{value}</div>
                  <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-400 shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
