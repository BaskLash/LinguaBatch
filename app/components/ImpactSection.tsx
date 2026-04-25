"use client";

import { motion } from "framer-motion";

const lines = [
  "Too many documents. Too little time.",
  "Manual translation kills productivity.",
  "Formatting breaks everything.",
  "Batch work shouldn't feel manual.",
];

export default function ImpactSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.2em] text-zinc-500"
        >
          The state of document work today
        </motion.p>

        <div className="mt-10 space-y-4 md:space-y-6">
          {lines.map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-white/85"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl surface px-6 py-5">
            <span className="text-sm uppercase tracking-widest text-cyan-300">
              The shift
            </span>
            <span className="hidden sm:block h-5 w-px bg-white/10" />
            <p className="text-lg md:text-xl text-white">
              There is a faster way to handle documents.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
