"use client";

import React, { useEffect, useState } from "react";
import { TocItem } from "@/lib/blog";
import { AlignLeft, ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  toc: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = toc.length - 1; i >= 0; i--) {
        const el = document.getElementById(toc[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(toc[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-28 p-5 rounded-3xl card-2026 bg-[#080B11]/80 backdrop-blur-xl border border-white/10 space-y-3">
      <div className="flex items-center gap-2 pb-3 hairline-b">
        <AlignLeft className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
          Table of Contents
        </h4>
      </div>

      <ul className="space-y-1 text-xs max-h-[70vh] overflow-y-auto pr-1">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "1rem" : "0rem" }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const targetEl = document.getElementById(item.id);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                    setActiveId(item.id);
                  }
                }}
                className={`group flex items-start gap-1.5 py-1 transition-all rounded-lg ${
                  isActive
                    ? "text-cyan-400 font-semibold pl-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-transform ${
                    isActive ? "rotate-90 text-cyan-400" : "text-slate-600 group-hover:text-slate-400"
                  }`}
                />
                <span className="line-clamp-2 leading-tight">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
