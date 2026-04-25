"use client";

import { motion } from "framer-motion";
import { Zap, Layers, ShieldCheck } from "lucide-react";

const pillars = [
  {
    Icon: Zap,
    title: "Designed for speed, scale, and structure",
    body: "Engineered around the realities of high-volume document work — no toy demos, no hand-holding required.",
  },
  {
    Icon: Layers,
    title: "Built for professionals who work with documents daily",
    body: "Translators, localization leads, ops teams, freelancers — anyone whose calendar is shaped by file handling.",
  },
  {
    Icon: ShieldCheck,
    title: "A trusted workflow layer for modern teams",
    body: "Predictable outputs, structured exports, and consistent quality across every document and language pair.",
  },
];

export default function WhyLinguaBatchSection() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Why LinguaBatch
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            The workflow layer modern teams actually need.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="surface rounded-2xl p-7"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border hairline bg-gradient-to-br from-white/5 to-white/[0.01]">
                <p.Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
