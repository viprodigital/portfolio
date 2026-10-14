"use client";

import React from "react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import {
  ArrowUp,
  Terminal,
  Linkedin,
  Github,
  Youtube,
  Mail,
  Heart,
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
    <footer className="relative bg-[#070B14] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px] shadow-neon-primary">
                <div className="w-full h-full bg-[#0B1120] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-accent" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-sm">
              Network Engineer, Systems Architect, and AI Strategist.
              Building high-throughput, self-healing digital infrastructures.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-muted hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted hover:text-white hover:translate-x-1 transition-all py-1"
                >
                  {link.name}
                </a>
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
              <p className="text-[11px] font-mono text-muted">
                Latency: &lt;18ms &bull; Next.js 14 App Router
              </p>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Scroll to top of page"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
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
