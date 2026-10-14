"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = code.trim().split("\n");

  // Highlight keywords depending on language
  const highlightLine = (line: string, lang: string) => {
    const trimmed = line.trim();

    // Comments
    if (trimmed.startsWith("#") || trimmed.startsWith("!") || trimmed.startsWith("//")) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    if (lang === "cisco-ios" || lang === "fortios") {
      // Match prompt e.g. Switch(config)#
      const promptMatch = line.match(/^([A-Za-z0-9_-]+(\([A-Za-z0-9_-]+\))?[#>])\s*(.*)$/);
      if (promptMatch) {
        return (
          <>
            <span className="text-cyan-400 font-semibold">{promptMatch[1]} </span>
            <span className="text-emerald-300">{promptMatch[3]}</span>
          </>
        );
      }
      if (trimmed.startsWith("set ") || trimmed.startsWith("edit ") || trimmed.startsWith("config ") || trimmed.startsWith("next") || trimmed.startsWith("end")) {
        return (
          <>
            <span className="text-purple-400 font-semibold">{line.slice(0, line.indexOf(" ") !== -1 ? line.indexOf(" ") : line.length)}</span>
            <span className="text-slate-200">{line.slice(line.indexOf(" ") !== -1 ? line.indexOf(" ") : line.length)}</span>
          </>
        );
      }
    }

    if (lang === "bash" || lang === "sh") {
      if (trimmed.startsWith("$ ")) {
        return (
          <>
            <span className="text-cyan-400 font-bold">$ </span>
            <span className="text-slate-200">{trimmed.slice(2)}</span>
          </>
        );
      }
    }

    return <span className="text-slate-200">{line}</span>;
  };

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-2xl group">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/5 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-slate-300 font-medium">
              {filename || (language ? `${language.toUpperCase()}` : "CLI")}
            </span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-all text-[11px]"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-mono">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed max-h-[500px]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="pr-4 select-none text-right text-slate-600 font-mono text-xs w-8 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-slate-200">
                  {highlightLine(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
