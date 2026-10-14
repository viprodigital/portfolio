"use client";

import React from "react";
import Link from "next/link";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import {
  ArrowUp,
  Terminal,
  Linkedin,
  Github,
  Youtube,
  Mail,
} from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { icon: Linkedin, href: PERSONAL_INFO.socials.linkedin, label: "LinkedIn" },
    { icon: Github, href: PERSONAL_INFO.socials.github, label: "GitHub" },
    { icon: Youtube, href: PERSONAL_INFO.socials.youtube, label: "YouTube" },
    { icon: Mail, href: PERSONAL_INFO.socials.email, label: "Email" },
  ];

  return (
    <footer className="relative bg-[#06080E] hairline-t pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 hairline-b">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Network Engineer, Systems Architect, and AI Strategist.
              Building high-throughput, self-healing digital infrastructures.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  className="text-slate-400 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* System Telemetry & Back to top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-6">
            <div className="text-left md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[11px] font-mono mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                Latency: &lt;14ms &bull; Next.js 14 App Router
              </p>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl card-2026 text-xs font-mono text-slate-300 hover:text-white transition-all active:scale-95"
              aria-label="Scroll to top of page"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with Next.js, Three.js & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
