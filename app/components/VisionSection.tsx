"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function VisionSection() {
  return (
    <section id="vision" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-zinc-500"
            >
              Vision
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white"
            >
              From a translation tool to an{" "}
              <span className="text-gradient">
                AI-powered document workflow platform.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base md:text-lg text-zinc-400"
            >
              Translation was the proof of concept. Document intelligence is
              the platform — a workflow layer that understands the structure
              of your work, not just its words.
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  from: "Simple translation",
                  to: "Structured document intelligence",
                },
                { from: "Manual work", to: "Automated workflows" },
                { from: "Single user", to: "Team-grade collaboration" },
                {
                  from: "One-off conversions",
                  to: "Continuous content processing",
                },
              ].map((row, i) => (
                <motion.div
                  key={row.to}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="surface rounded-2xl p-5"
                >
                  <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                    From
                  </p>
                  <p className="mt-1 text-zinc-300">{row.from}</p>
                  <div className="my-3 flex items-center gap-2 text-cyan-300">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-[11px] font-mono uppercase tracking-widest">
                      To
                    </span>
                  </div>
                  <p className="text-white font-medium">{row.to}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-sm text-zinc-500"
            >
              The future:{" "}
              <span className="text-zinc-300">
                AI-powered content processing beyond translation
              </span>{" "}
              — summarization, extraction, classification, and audit-ready
              outputs, all from the same workflow.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
