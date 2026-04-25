"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const links = [
  { label: "Product", href: "/#solution" },
  { label: "Why LinguaBatch", href: "/#why" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled
          ? "border-b hairline backdrop-blur-xl bg-[rgba(5,6,8,0.7)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => trackEvent("nav_click", { target: "logo" })}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_30px_-8px_rgba(99,102,241,0.7)]">
            <Languages className="h-4 w-4 text-white" strokeWidth={2.4} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            LinguaBatch
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => trackEvent("nav_click", { target: l.label })}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#pricing"
            onClick={() => trackEvent("pricing_click", { source: "nav" })}
            className="text-sm text-zinc-300 hover:text-white transition-colors"
          >
            View Pricing
          </Link>
          <Link
            href="/#cta"
            onClick={() => trackEvent("start_free_click", { source: "nav" })}
            className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            Start Free
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-md border hairline text-zinc-300"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-[rgba(5,6,8,0.95)] backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => {
                  trackEvent("nav_click", { target: l.label });
                  setOpen(false);
                }}
                className="text-sm text-zinc-300 py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#cta"
              onClick={() => {
                trackEvent("start_free_click", { source: "nav_mobile" });
                setOpen(false);
              }}
              className="mt-2 inline-flex justify-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
