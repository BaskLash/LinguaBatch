"use client";

import { motion } from "framer-motion";
import { Clock, Users, Layers3, ShieldAlert } from "lucide-react";

const items = [
  {
    Icon: Clock,
    title: "Save hours per document cycle",
    body: "Eliminate the repetitive handling around every document. The work that used to take an afternoon takes minutes.",
  },
  {
    Icon: Users,
    title: "Scale translation across entire teams",
    body: "Shared queues, glossaries, and review states. Every team member operates against the same workflow, not their own.",
  },
  {
    Icon: Layers3,
    title: "Maintain perfect formatting integrity",
    body: "Tables, fonts, charts, and layouts stay where they belong. Reviewers focus on quality, not cleanup.",
  },
  {
    Icon: ShieldAlert,
    title: "Reduce human error in localization",
    body: "Consistent terminology and structured outputs at scale — fewer mistakes, fewer rollbacks, fewer surprises.",
  },
];

export default function FeatureValueSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Outcomes, not features
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            What changes when manual work disappears.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="surface rounded-2xl p-7 flex gap-5"
            >
              <div className="shrink-0 grid h-11 w-11 place-items-center rounded-xl border hairline bg-gradient-to-br from-white/5 to-white/[0.01]">
                <it.Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed">
                  {it.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
