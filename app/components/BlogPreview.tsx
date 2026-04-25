"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts, formatDate } from "../lib/blog";
import { trackEvent } from "../lib/analytics";

export default function BlogPreview() {
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              From the blog
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Notes on document workflows, scale, and AI.
            </h2>
          </div>
          <Link
            href="/blog"
            onClick={() =>
              trackEvent("blog_cta_click", { source: "blog_preview" })
            }
            className="self-start md:self-auto inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
          >
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group surface rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                <span className="text-cyan-300">{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span>{post.readTime}</span>
              </div>

              <h3 className="mt-4 text-lg md:text-xl font-semibold text-white leading-snug">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-4">
                {post.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
                <span className="text-[11px] text-zinc-500">
                  {formatDate(post.date)}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() =>
                    trackEvent("blog_post_click", {
                      slug: post.slug,
                      source: "blog_preview",
                    })
                  }
                  className="inline-flex items-center gap-1 text-sm text-white group-hover:text-cyan-300 transition-colors"
                >
                  Read <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
