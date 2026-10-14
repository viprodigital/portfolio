"use client";

import React, { useState } from "react";
import { Linkedin, Twitter, Copy, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={shareLinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-cyan-400" />
      </a>

      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors"
        aria-label="Share on Twitter / X"
        title="Share on Twitter / X"
      >
        <Twitter className="w-4 h-4 text-cyan-400" />
      </a>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-all text-xs font-mono"
        aria-label="Copy article link"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};
