"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "../lib/analytics";

type Props = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  variant?: "default" | "featured";
};

export default function BlogCard({
  slug,
  title,
  description,
  date,
  readTime,
  category,
  variant = "default",
}: Props) {
  const onClick = () =>
    trackEvent("blog_post_click", {
      slug,
      source: variant === "featured" ? "blog_featured" : "blog_grid",
    });

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 surface rounded-2xl p-8 md:p-10 grid lg:grid-cols-12 gap-6 items-center"
      >
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <span className="text-cyan-300">Featured · {category}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>{readTime}</span>
          </div>
          <h2 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">{description}</p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href={`/blog/${slug}`}
              onClick={onClick}
              className="inline-flex items-center gap-1 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Read article <ArrowUpRight className="h-4 w-4" />
            </Link>
            <span className="text-[11px] text-zinc-500">{date}</span>
          </div>
        </div>
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative h-56 rounded-xl border hairline overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-400/20" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-[11px] font-mono tracking-[0.3em] text-zinc-300">
                LINGUABATCH · INSIGHTS
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5 }}
      className="surface rounded-2xl p-6 flex flex-col"
    >
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
        <span className="text-cyan-300">{category}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-700" />
        <span>{readTime}</span>
      </div>
      <h3 className="mt-4 text-lg md:text-xl font-semibold text-white leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
        {description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
        <span className="text-[11px] text-zinc-500">{date}</span>
        <Link
          href={`/blog/${slug}`}
          onClick={onClick}
          className="inline-flex items-center gap-1 text-sm text-white hover:text-cyan-300 transition-colors"
        >
          Read <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
