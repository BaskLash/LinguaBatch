import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts, formatDate } from "../lib/blog";
import BlogCard from "./BlogCard";

export const metadata: Metadata = {
  title: "Blog — LinguaBatch",
  description:
    "Notes on document workflows, translation at scale, and the future of AI-driven document processing.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "LinguaBatch Blog",
    description:
      "Notes on document workflows, translation at scale, and AI document processing.",
    type: "website",
  },
};

export default function BlogIndex() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          The LinguaBatch Blog
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Document workflows, <span className="text-gradient">at depth.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-zinc-400">
          Practical writing on translation operations, formatting, and the next
          generation of AI-powered document tooling.
        </p>
      </div>

      {featured && (
        <BlogCard
          variant="featured"
          slug={featured.slug}
          title={featured.title}
          description={featured.description}
          date={formatDate(featured.date)}
          readTime={featured.readTime}
          category={featured.category}
        />
      )}

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={formatDate(post.date)}
            readTime={post.readTime}
            category={post.category}
          />
        ))}
      </div>

      <div className="mt-16 surface rounded-2xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Ready to stop copy-pasting?
        </h2>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
          See how LinguaBatch turns manual document handling into a structured,
          automated workflow.
        </p>
        <Link
          href="/#cta"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors glow-ring"
        >
          Start Free <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
