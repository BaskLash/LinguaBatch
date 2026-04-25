import Link from "next/link";
import { Languages } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
              <Languages className="h-4 w-4 text-white" strokeWidth={2.4} />
            </span>
            <span className="text-white font-semibold">LinguaBatch</span>
          </div>
          <p className="mt-4 text-zinc-500 max-w-xs">
            The document workflow layer for modern teams. Translate at scale,
            without breaking formatting.
          </p>
        </div>

        <div>
          <p className="text-zinc-300 font-medium mb-3">Product</p>
          <ul className="space-y-2 text-zinc-500">
            <li><Link href="/#solution" className="hover:text-white">Workflow</Link></li>
            <li><Link href="/#features" className="hover:text-white">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-zinc-300 font-medium mb-3">Company</p>
          <ul className="space-y-2 text-zinc-500">
            <li><Link href="/#vision" className="hover:text-white">Vision</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/#cta" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-zinc-300 font-medium mb-3">Resources</p>
          <ul className="space-y-2 text-zinc-500">
            <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
            <li><Link href="/blog" className="hover:text-white">Articles</Link></li>
            <li><Link href="/#cta" className="hover:text-white">Request Demo</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} LinguaBatch. All rights reserved.</p>
          <p>Built for teams who refuse to copy-paste.</p>
        </div>
      </div>
    </footer>
  );
}
