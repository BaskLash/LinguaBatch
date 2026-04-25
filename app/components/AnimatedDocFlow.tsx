"use client";

import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, Presentation, Sparkles } from "lucide-react";

const docs = [
  { Icon: FileText, label: "report.pdf", x: "8%", y: "18%", delay: 0 },
  { Icon: FileSpreadsheet, label: "Q4.xlsx", x: "76%", y: "12%", delay: 0.4 },
  { Icon: Presentation, label: "deck.pptx", x: "12%", y: "72%", delay: 0.8 },
  { Icon: FileText, label: "spec.pdf", x: "82%", y: "70%", delay: 1.2 },
];

export default function AnimatedDocFlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />

      {docs.map(({ Icon, label, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: [0, 1, 1, 0.6], y: [14, 0, 0, 6] }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          className="absolute hidden md:flex items-center gap-2 rounded-md surface px-2.5 py-1.5 text-[11px] text-zinc-300"
          style={{ left: x, top: y }}
        >
          <Icon className="h-3.5 w-3.5 text-cyan-300" />
          <span className="font-mono">{label}</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 rounded-full border hairline bg-black/50 px-3 py-1.5 text-xs text-zinc-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300" />
        <span>LinguaBatch · structured workflow</span>
      </motion.div>

      <svg
        className="absolute inset-0 w-full h-full hidden md:block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lg" x1="0" x2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M 12% 22% Q 40% 50% 50% 50%",
          "M 80% 16% Q 60% 40% 50% 50%",
          "M 16% 74% Q 40% 60% 50% 50%",
          "M 84% 72% Q 60% 60% 50% 50%",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d.replace(/(\d+)%/g, (_m, n) => {
              const isX = i % 2 === 0;
              return isX ? n : n;
            })}
            stroke="url(#lg)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
            transition={{
              duration: 4,
              delay: 0.4 * i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
