"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { Menu, X, Terminal, ArrowUpRight, FileText } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith("/blog")) {
        setActiveSection("blog");
      }
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll Spy
      const sections = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((link) =>
        link.href.substring(1)
      );
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 sm:px-6 pointer-events-none">
      <div
        className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 pointer-events-auto ${
          scrolled ? "py-1" : "py-2"
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-3 px-3.5 py-2 rounded-2xl nav-pill-2026 hover:border-white/20 transition-all duration-300 active:scale-95"
          aria-label="Ruban Portfolio Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:border-indigo-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider -mt-0.5">
              Network Arch &bull; 2.5y+
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Floating Pill */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full nav-pill-2026">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.startsWith("#") ? link.href.substring(1) : link.href.replace("/", "");
            const isActive = activeSection === sectionId;
            const targetHref = isHomePage ? link.href : (link.href.startsWith("#") ? `/${link.href}` : link.href);
            return (
              <Link
                key={link.name}
                href={targetHref}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator2026"
                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="/resume.pdf"
            download="Ruban_Network_Engineer_Resume.pdf"
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white nav-pill-2026 hover:border-white/20 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </a>

          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl nav-pill-2026 text-slate-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 inset-x-4 p-5 rounded-3xl nav-pill-2026 bg-[#080B11]/95 backdrop-blur-2xl border border-white/10 shadow-2xl pointer-events-auto"
          >
            <div className="space-y-1.5">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.startsWith("#") ? link.href.substring(1) : link.href.replace("/", "");
                const isActive = activeSection === sectionId;
                const targetHref = isHomePage ? link.href : (link.href.startsWith("#") ? `/${link.href}` : link.href);
                return (
                  <Link
                    key={link.name}
                    href={targetHref}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/[0.08] text-white border border-white/[0.12] font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="/resume.pdf"
                  download="Ruban_Network_Engineer_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-xs font-mono font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Resume (PDF)</span>
                </a>
                <Link
                  href={isHomePage ? "#contact" : "/#contact"}
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-medium text-xs shadow-lg shadow-primary/20"
                >
                  <span>Connect With Ruban</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
