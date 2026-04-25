"use client";

import { motion } from "framer-motion";
import {
  SplitSquareHorizontal,
  Layers,
  ShieldCheck,
  FileOutput,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Step = {
  step: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    step: "01",
    Icon: SplitSquareHorizontal,
    title: "Automatic document splitting",
    body: "Documents are parsed into structured blocks — paragraphs, tables, captions, slides — ready for parallel processing.",
  },
  {
    step: "02",
    Icon: Layers,
    title: "Batch translation across files",
    body: "Translate dozens of documents at once. One queue, one workflow, one consistent output.",
  },
  {
    step: "03",
    Icon: ShieldCheck,
    title: "Format preservation by design",
    body: "Layouts, tables, fonts, and styles stay intact. Reviewers focus on quality, not cleanup.",
  },
  {
    step: "04",
    Icon: FileOutput,
    title: "Export to PDF, DOCX, XLSX",
    body: "Translated documents are reassembled to the original format. No manual rebuild required.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border hairline bg-white/5 px-3 py-1 text-xs text-zinc-300"
          >
            <Workflow className="h-3.5 w-3.5 text-cyan-300" />
            <span>The LinguaBatch workflow</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white"
          >
            A workflow engine for documents,
            <br className="hidden md:block" />
            <span className="text-gradient"> not another translator.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-zinc-400 max-w-2xl"
          >
            LinguaBatch sits between your documents and your team. Built for
            scale, speed, and accuracy — without the manual handling.
          </motion.p>
        </div>

        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative surface p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500 tracking-widest">
                  STEP {s.step}
                </span>
                <s.Icon className="h-4 w-4 text-cyan-300" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {s.body}
              </p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 h-px w-6 bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
