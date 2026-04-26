import React from "react";

/**
 * Lightweight, dependency-free Markdown renderer.
 *
 * Supports:
 *  - ## H2, ### H3
 *  - Paragraphs
 *  - Unordered lists: lines starting with "-" or "*"
 *  - Horizontal rules: "---"
 *  - Inline: **bold**, *italic*, [text](url)
 *
 * Links render with target="_blank" rel="noopener noreferrer".
 * Inline formatting is applied via controlled string transformations;
 * all inputs are HTML-escaped before any markup is injected.
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  if (trimmed.startsWith("mailto:")) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function renderInline(raw: string): string {
  // Escape first so no user-provided HTML is ever injected.
  let s = escapeHtml(raw);

  // Links [text](url) — validate URL, drop unsafe ones.
  s = s.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, text: string, url: string) => {
      if (!isSafeUrl(url)) return text;
      const safeUrl = escapeHtml(url);
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors">${text}</a>`;
    }
  );

  // Bold **text**
  s = s.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-semibold text-white">$1</strong>'
  );

  // Italic *text* (avoid matching a lone asterisk used for list markers)
  s = s.replace(
    /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
    '$1<em class="italic text-white/90">$2</em>'
  );

  return s;
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^---\s*$/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "hr" });
      continue;
    }

    if (/^###\s+/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") });
      continue;
    }

    if (/^##\s+/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      continue;
    }

    const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      list.push(listMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-white/75">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-6 text-xl sm:text-2xl font-semibold tracking-tight text-white"
              >
                {block.text}
              </h3>
            );
          case "hr":
            return (
              <hr key={i} className="my-10 border-white/10" />
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc pl-6 space-y-2 marker:text-white/30"
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    dangerouslySetInnerHTML={{ __html: renderInline(item) }}
                  />
                ))}
              </ul>
            );
          case "p":
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: renderInline(block.text) }}
              />
            );
        }
      })}
    </div>
  );
}
