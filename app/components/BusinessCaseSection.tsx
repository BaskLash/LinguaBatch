"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For small users exploring document workflows.",
    features: [
      "Up to 5 documents / month",
      "PDF, DOCX, XLSX, PPTX support",
      "Format-preserving exports",
      "Basic glossary",
    ],
    cta: { label: "Start Free", event: "start_free_click" as const },
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "/ month",
    description: "For professionals and freelancers translating daily.",
    features: [
      "Unlimited documents",
      "Batch processing (50 files)",
      "Advanced glossary & terminology",
      "Priority processing",
      "Email support",
    ],
    cta: { label: "Start Free", event: "start_free_click" as const },
    highlight: true,
  },
  {
    name: "Team",
    price: "Custom",
    cadence: "for organizations",
    description: "For teams localizing at scale across multiple regions.",
    features: [
      "Shared workspaces & queues",
      "SSO & role-based access",
      "Audit trails & exports",
      "Dedicated success manager",
      "Enterprise SLAs",
    ],
    cta: { label: "Request Demo", event: "demo_request_click" as const },
    highlight: false,
  },
];

export default function BusinessCaseSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            The business case
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Time is the most expensive resource.
            <br />
            <span className="text-zinc-400">
              LinguaBatch gives it back to your team.
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-400 max-w-2xl">
            Built as a freemium platform — accessible to individuals,
            production-ready for teams, and enterprise-ready for organizations
            scaling localization across regions.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`relative rounded-2xl p-7 ${
                t.highlight
                  ? "surface glow-ring border-white/15"
                  : "surface"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black">
                  Most popular
                </span>
              )}
              <h3 className="text-sm font-medium text-zinc-400">{t.name}</h3>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {t.price}
                </span>
                <span className="text-sm text-zinc-500">{t.cadence}</span>
              </p>
              <p className="mt-3 text-sm text-zinc-400">{t.description}</p>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <Check className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#cta"
                onClick={() =>
                  trackEvent(t.cta.event, {
                    source: "pricing",
                    tier: t.name.toLowerCase(),
                  })
                }
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  t.highlight
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "border hairline bg-white/[0.03] text-white hover:bg-white/[0.06]"
                }`}
              >
                {t.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
