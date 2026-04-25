"use client";

import { motion } from "framer-motion";
import {
  Clipboard,
  FileWarning,
  GaugeCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

type Problem = {
  Icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
};

const problems: Problem[] = [
  {
    Icon: Clipboard,
    title: "Copy-paste is outdated",
    body: "Modern teams shouldn't be moving text between tabs. Every paste is a place where context, formatting, and consistency can quietly break.",
    accent: "from-indigo-500/30 to-violet-500/10",
  },
  {
    Icon: FileWarning,
    title: "Large files break workflows",
    body: "Multi-hundred-page PDFs, sprawling spreadsheets, dense slide decks — traditional tools were never built for the scale your team operates at.",
    accent: "from-cyan-500/30 to-sky-500/10",
  },
  {
    Icon: GaugeCircle,
    title: "Manual translation doesn't scale",
    body: "Doubling your output by doubling your effort isn't scale — it's burnout. Workflows must absorb volume without absorbing your team's time.",
    accent: "from-violet-500/30 to-fuchsia-500/10",
  },
  {
    Icon: AlertTriangle,
    title: "Formatting loss costs time and money",
    body: "Every misaligned table, broken bullet, or shifted layout becomes a senior person's problem. Format integrity is not a finishing step — it's the workflow.",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            Where teams lose hours
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white"
          >
            The friction is not in the translation.
            <br />
            <span className="text-zinc-400">It's everything around it.</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl surface p-7"
            >
              <div
                className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg border hairline bg-black/40">
                  <p.Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
                <span>cost · time, focus, accuracy</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
