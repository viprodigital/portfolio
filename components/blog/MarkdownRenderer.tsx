"use client";

import React from "react";
import { CodeBlock } from "./CodeBlock";
import { Info, Lightbulb, AlertTriangle, ShieldAlert, AlertCircle } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function renderInlineText(text: string): React.ReactNode[] {
  // Regex splitting by bold, inline code, links
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // 1. Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*(.*?)\*\*([\s\S]*)$/);
    // 2. Inline Code: `code`
    const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)$/);
    // 3. Link: [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[(.*?)\]\((.*?)\)([\s\S]*)$/);

    // Pick closest match
    let closestType: "bold" | "code" | "link" | null = null;
    let minIndex = Infinity;

    if (boldMatch && boldMatch[1].length < minIndex) {
      closestType = "bold";
      minIndex = boldMatch[1].length;
    }
    if (codeMatch && codeMatch[1].length < minIndex) {
      closestType = "code";
      minIndex = codeMatch[1].length;
    }
    if (linkMatch && linkMatch[1].length < minIndex) {
      closestType = "link";
      minIndex = linkMatch[1].length;
    }

    if (!closestType) {
      elements.push(remaining);
      break;
    }

    if (closestType === "bold" && boldMatch) {
      if (boldMatch[1]) elements.push(boldMatch[1]);
      elements.push(
        <strong key={`b-${keyIndex++}`} className="text-white font-semibold">
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
    } else if (closestType === "code" && codeMatch) {
      if (codeMatch[1]) elements.push(codeMatch[1]);
      elements.push(
        <code
          key={`c-${keyIndex++}`}
          className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-cyan-300 font-mono text-[0.88em]"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
    } else if (closestType === "link" && linkMatch) {
      if (linkMatch[1]) elements.push(linkMatch[1]);
      elements.push(
        <a
          key={`l-${keyIndex++}`}
          href={linkMatch[3]}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-medium transition-colors"
          target={linkMatch[3].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[3].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkMatch[2]}
        </a>
      );
      remaining = linkMatch[4];
    }
  }

  return elements;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse blocks
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code Block
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      let codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(
        <CodeBlock
          key={`block-${blockKey++}`}
          language={language}
          code={codeLines.join("\n")}
        />
      );
      i++;
      continue;
    }

    // 2. Alert / Callout: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
    if (trimmed.startsWith("> [!")) {
      const alertTypeMatch = trimmed.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      const alertType = alertTypeMatch ? alertTypeMatch[1].toUpperCase() : "NOTE";
      let alertLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        alertLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }

      let alertStyles = {
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        text: "text-blue-300",
        icon: Info,
      };

      if (alertType === "TIP") {
        alertStyles = {
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/10",
          text: "text-emerald-300",
          icon: Lightbulb,
        };
      } else if (alertType === "WARNING") {
        alertStyles = {
          border: "border-amber-500/30",
          bg: "bg-amber-500/10",
          text: "text-amber-300",
          icon: AlertTriangle,
        };
      } else if (alertType === "IMPORTANT") {
        alertStyles = {
          border: "border-purple-500/30",
          bg: "bg-purple-500/10",
          text: "text-purple-300",
          icon: AlertCircle,
        };
      } else if (alertType === "CAUTION") {
        alertStyles = {
          border: "border-rose-500/30",
          bg: "bg-rose-500/10",
          text: "text-rose-300",
          icon: ShieldAlert,
        };
      }

      const AlertIcon = alertStyles.icon;

      blocks.push(
        <div
          key={`block-${blockKey++}`}
          className={`my-6 p-4 rounded-2xl border ${alertStyles.border} ${alertStyles.bg} flex items-start gap-3.5`}
        >
          <AlertIcon className={`w-5 h-5 ${alertStyles.text} shrink-0 mt-0.5`} />
          <div className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider block ${alertStyles.text}`}>
              {alertType}
            </span>
            <div>{renderInlineText(alertLines.join(" "))}</div>
          </div>
        </div>
      );
      continue;
    }

    // 3. Regular Blockquote (> quote)
    if (trimmed.startsWith("> ")) {
      let quoteLines: string[] = [trimmed.replace(/^>\s?/, "")];
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={`block-${blockKey++}`}
          className="my-6 pl-4 border-l-2 border-cyan-400 italic text-slate-300 text-sm leading-relaxed"
        >
          {renderInlineText(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // 4. Markdown Table (| col | col |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split("|")
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((c) => c.trim());

        const bodyRows = tableLines.slice(2).map((row) =>
          row
            .split("|")
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim())
        );

        blocks.push(
          <div key={`block-${blockKey++}`} className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#080B11]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/10">
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-semibold text-white font-mono">
                      {renderInlineText(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 text-slate-300">
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 5. Headings
    if (trimmed.startsWith("## ")) {
      const rawTitle = trimmed.replace("## ", "").trim();
      const id = slugify(rawTitle.replace(/\*\*/g, ""));
      blocks.push(
        <h2
          key={`block-${blockKey++}`}
          id={id}
          className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-12 mb-4 scroll-mt-28 flex items-center group"
        >
          <span>{renderInlineText(rawTitle)}</span>
          <a
            href={`#${id}`}
            className="ml-2.5 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-cyan-400 font-mono text-lg transition-opacity"
            aria-label={`Link to ${rawTitle}`}
          >
            #
          </a>
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const rawTitle = trimmed.replace("### ", "").trim();
      const id = slugify(rawTitle.replace(/\*\*/g, ""));
      blocks.push(
        <h3
          key={`block-${blockKey++}`}
          id={id}
          className="text-lg sm:text-xl font-bold text-white tracking-tight mt-8 mb-3 scroll-mt-28 flex items-center group"
        >
          <span>{renderInlineText(rawTitle)}</span>
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-cyan-400 font-mono text-base transition-opacity"
            aria-label={`Link to ${rawTitle}`}
          >
            #
          </a>
        </h3>
      );
      i++;
      continue;
    }

    // 6. Horizontal Rule
    if (trimmed === "---" || trimmed === "***") {
      blocks.push(<hr key={`block-${blockKey++}`} className="my-10 border-white/10" />);
      i++;
      continue;
    }

    // 7. Unordered List Items (- item or * item)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push(
        <ul key={`block-${blockKey++}`} className="my-4 space-y-2 text-slate-300 text-sm leading-relaxed pl-5 list-disc marker:text-cyan-400">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 8. Numbered List (1. item)
    if (/^\d+\.\s/.test(trimmed)) {
      const numItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        numItems.push(lines[i].trim().replace(/^\d+\.\s*/, ""));
        i++;
      }
      blocks.push(
        <ol key={`block-${blockKey++}`} className="my-4 space-y-2 text-slate-300 text-sm leading-relaxed pl-5 list-decimal marker:text-cyan-400 marker:font-mono">
          {numItems.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInlineText(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 9. Standard Paragraph (ignore empty line)
    if (trimmed.length > 0) {
      blocks.push(
        <p key={`block-${blockKey++}`} className="my-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          {renderInlineText(trimmed)}
        </p>
      );
    }

    i++;
  }

  return <div className="markdown-article max-w-none prose prose-invert">{blocks}</div>;
};
