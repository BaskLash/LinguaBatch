"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const blocks = [
  { label: "Title", w: "60%" },
  { label: "Paragraph", w: "100%" },
  { label: "Paragraph", w: "92%" },
  { label: "Table", w: "78%" },
  { label: "Caption", w: "44%" },
  { label: "Footer", w: "30%" },
];

const queue = [
  { Icon: FileText, name: "annual-report.pdf", size: "184 blocks" },
  { Icon: FileSpreadsheet, name: "Q4-financials.xlsx", size: "62 sheets" },
  { Icon: Presentation, name: "investor-deck.pptx", size: "48 slides" },
];

export default function InteractiveDemo() {
  const [tab, setTab] = useState<"split" | "batch" | "format">("split");
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            See it in motion
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            From raw documents to translated outputs.
            <span className="text-zinc-400"> In one pipeline.</span>
          </h2>
        </div>

        <div className="mt-10 inline-flex rounded-full border hairline bg-white/[0.02] p-1 text-sm">
          {[
            { id: "split", label: "Document splitting" },
            { id: "batch", label: "Batch processing" },
            { id: "format", label: "Format preservation" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                tab === t.id
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 surface p-3 md:p-5 rounded-2xl">
          <div className="flex items-center gap-1.5 px-2 py-2 border-b hairline">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs font-mono text-zinc-500">
              {tab === "split" && "linguabatch · splitter"}
              {tab === "batch" && "linguabatch · queue"}
              {tab === "format" && "linguabatch · output"}
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 p-3 md:p-4">
            {tab === "split" && (
              <>
                <Panel label="Input · report.pdf">
                  <div className="space-y-2.5">
                    {blocks.map((b, i) => (
                      <div
                        key={i}
                        className="h-3 rounded bg-white/10"
                        style={{ width: b.w }}
                      />
                    ))}
                  </div>
                </Panel>
                <Panel label="Output · structured blocks">
                  <div className="space-y-2.5">
                    {blocks.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: reduce ? 0 : i * 0.12,
                          repeat: reduce ? 0 : Infinity,
                          repeatDelay: 2.5,
                        }}
                        className="flex items-center gap-3 rounded-md border hairline bg-black/40 px-2.5 py-2"
                      >
                        <span className="text-[10px] font-mono text-cyan-300 tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] text-zinc-400 w-20">
                          {b.label}
                        </span>
                        <div
                          className="h-2 rounded bg-white/10 flex-1"
                          style={{ width: b.w }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </Panel>
              </>
            )}

            {tab === "batch" && (
              <>
                <Panel label="Queue · 3 documents">
                  <ul className="space-y-2.5">
                    {queue.map((q, i) => (
                      <motion.li
                        key={q.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-center gap-3 rounded-md border hairline bg-black/40 px-3 py-2.5"
                      >
                        <q.Icon className="h-4 w-4 text-cyan-300" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-mono text-zinc-300 truncate">
                            {q.name}
                          </p>
                          <p className="text-[10px] text-zinc-500">{q.size}</p>
                        </div>
                        <Loader2 className="h-3.5 w-3.5 text-violet-300 animate-spin" />
                      </motion.li>
                    ))}
                  </ul>
                </Panel>
                <Panel label="Translating · EN → DE, FR, ES">
                  <div className="space-y-3">
                    {["DE", "FR", "ES"].map((lang, i) => (
                      <div key={lang}>
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                          <span>{lang}</span>
                          <span>{[68, 92, 41][i]}%</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${[68, 92, 41][i]}%` }}
                            transition={{
                              duration: 1.4,
                              delay: i * 0.2,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-400"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>184 blocks processed in parallel</span>
                    </div>
                  </div>
                </Panel>
              </>
            )}

            {tab === "format" && (
              <>
                <Panel label="Before · traditional translation" tone="warn">
                  <FakeDoc broken />
                </Panel>
                <Panel label="After · LinguaBatch output" tone="ok">
                  <FakeDoc />
                </Panel>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  label,
  children,
  tone,
}: {
  label: string;
  children: React.ReactNode;
  tone?: "warn" | "ok";
}) {
  const toneClass =
    tone === "warn"
      ? "text-rose-300"
      : tone === "ok"
      ? "text-emerald-300"
      : "text-zinc-400";

  return (
    <div className="rounded-xl border hairline bg-black/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-mono tracking-widest ${toneClass}`}>
          {label.toUpperCase()}
        </span>
      </div>
      {children}
    </div>
  );
}

function FakeDoc({ broken = false }: { broken?: boolean }) {
  return (
    <div
      className={`rounded-lg p-4 bg-white/[0.03] border hairline ${
        broken ? "" : ""
      }`}
    >
      <div
        className={`h-3 rounded bg-white/15 ${broken ? "w-[70%]" : "w-[60%]"}`}
      />
      <div className="mt-3 space-y-2">
        <div
          className={`h-2 rounded bg-white/10 ${broken ? "w-[112%] -mr-3" : "w-[100%]"}`}
        />
        <div
          className={`h-2 rounded bg-white/10 ${broken ? "w-[88%]" : "w-[92%]"}`}
        />
        <div
          className={`h-2 rounded bg-white/10 ${broken ? "w-[120%] -mr-6" : "w-[78%]"}`}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded bg-white/[0.04] border hairline p-2 ${
              broken && i === 1 ? "rotate-[2deg]" : ""
            }`}
          >
            <div
              className={`h-1.5 rounded bg-white/10 ${
                broken ? "w-[110%]" : "w-[80%]"
              }`}
            />
            <div className="mt-1.5 h-1.5 rounded bg-white/10 w-[60%]" />
          </div>
        ))}
      </div>
      <div
        className={`mt-3 h-2 rounded bg-white/10 ${
          broken ? "w-[34%] ml-6" : "w-[44%]"
        }`}
      />
    </div>
  );
}
