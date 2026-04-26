import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts, formatDate, getBlogPost } from "../../lib/blog";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";
import BlogCTA from "./BlogCTA";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-12 pb-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <span className="text-cyan-300">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {formatDate(post.date)}
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-6 flex items-center gap-3 border-t hairline pt-6">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white text-xs font-semibold">
            LB
          </div>
          <div>
            <p className="text-sm text-white">{post.author}</p>
            <p className="text-xs text-zinc-500">LinguaBatch · Editorial</p>
          </div>
        </div>
      </header>

      <div className="mt-10">
  <MarkdownRenderer content={post.content} />
</div>

      <BlogCTA slug={post.slug} />

      {others.length > 0 && (
        <section className="mt-16 border-t hairline pt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Continue reading
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="surface rounded-xl p-5 hover:bg-white/[0.04] transition-colors"
              >
                <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-300">
                  {p.category}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-500">
                  {formatDate(p.date)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
