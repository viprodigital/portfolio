"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Shield,
  Server,
  Activity,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
  Code2,
  Headphones,
  Network,
  AppWindow,
  Globe,
  Cloud,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { ThreeCanvas } from "./ui/ThreeCanvas";
import confetti from "canvas-confetti";

export const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const keywords = PERSONAL_INFO.typingKeywords;

  useEffect(() => {
    const word = keywords[currentWordIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % keywords.length);
      } else {
        setCurrentText((prev) =>
          isDeleting ? word.substring(0, prev.length - 1) : word.substring(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, keywords]);

  const handleDownloadResume = () => {
    // Fire celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#4F46E5", "#7C3AED", "#06B6D4", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    // Trigger resume download or fallback
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ruban_Network_Engineer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-background"
    >
      {/* 3D Three.js Interactive Particle Mesh Background */}
      <ThreeCanvas particleCount={80} />

      {/* Aurora Ambient Glow Overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-secondary/20 blur-[140px] pointer-events-none animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-accent/15 blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: "8s" }} />

      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
                Network & Systems Engineer &bull; Available for Impact
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="text-gradient-primary">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Typing Animation Line */}
              <div className="flex items-center gap-2 text-2xl sm:text-4xl xl:text-5xl font-bold text-slate-200 min-h-[48px] sm:min-h-[56px]">
                <span className="text-accent font-mono">&gt;</span>
                <span className="text-white tracking-tight">{currentText}</span>
                <span className="inline-block w-1 h-8 sm:h-10 bg-accent animate-pulse" />
              </div>
            </div>

            {/* Hero Description (EXACT BIO) */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              {PERSONAL_INFO.heroBio}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Button */}
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-neon-primary hover:shadow-neon-secondary transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Button */}
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </button>

              {/* Ghost Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-muted hover:text-white hover:bg-white/[0.04] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Core Capability Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-muted font-mono">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <span>99.98% System Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                <span>Dynamic BGP / OSPF</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Animated Glass Profile & Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Glowing Ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse-glow" />

            {/* Main Interactive Glass Card */}
            <div className="relative rounded-3xl bg-[#0F172A]/90 border border-white/15 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
              
              {/* Card Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted bg-white/[0.05] px-3 py-1 rounded-md border border-white/5">
                  <Terminal className="w-3 h-3 text-accent" />
                  <span>ruban@noc-core-01:~</span>
                </div>
              </div>

              {/* Interactive Terminal Output */}
              <div className="space-y-3 font-mono text-xs mb-6 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between text-muted">
                  <span className="text-emerald-400 font-semibold">$ netstat -an | grep 443</span>
                  <span className="text-[10px] text-accent">ESTABLISHED</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  [OK] Cisco Catalyst 3850 Core Trunk: Up / Line Protocol Up<br />
                  [OK] VMware vSphere 8.0 Cluster: 3 Nodes Synced<br />
                  [OK] Active Directory & AWS IAM Federation: Active<br />
                  [OK] AI Automated Watchdog: 0 Anomalies Detected
                </div>
                <div className="flex items-center gap-2 text-indigo-400 text-[11px] pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Workflow: Real-time packet telemetry streaming</span>
                </div>
              </div>

              {/* Profile Card Summary */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-accent p-0.5 shrink-0 shadow-neon-primary">
                  <div className="w-full h-full bg-[#0B1120] rounded-[14px] flex items-center justify-center font-extrabold text-xl text-white">
                    R
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">Ruban</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-indigo-300 border border-primary/30">
                      2.5+ Yrs
                    </span>
                  </div>
                  <p className="text-xs text-muted">Network Engineer & Systems Specialist</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-emerald-400 font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Cisco
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> AWS Cloud
                    </span>
                  </div>
                </div>
              </div>

              {/* My Services in Ecosystem Grid */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>My Services</span>
                  <span className="text-accent">Available For Hire</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: "IT-SUPPORT", icon: Headphones, color: "text-blue-400", desc: "Enterprise SLA" },
                    { label: "Network Support", icon: Network, color: "text-indigo-400", desc: "Cisco & Routing" },
                    { label: "App Support", icon: AppWindow, color: "text-purple-400", desc: "Uptime & Debug" },
                    { label: "Web Development", icon: Globe, color: "text-cyan-400", desc: "Next.js & React" },
                    { label: "AI Solutions", icon: Sparkles, color: "text-amber-400", desc: "Agent Workflows" },
                    { label: "Cloud & Infra", icon: Cloud, color: "text-emerald-400", desc: "AWS & VMware" },
                  ].map((service) => (
                    <a
                      key={service.label}
                      href="#services"
                      className="group/item flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 text-center cursor-pointer"
                    >
                      <service.icon className={`w-4 h-4 mb-1.5 ${service.color} group-hover/item:scale-110 transition-transform`} />
                      <span className="text-[11px] font-mono text-white font-semibold truncate w-full group-hover/item:text-primary transition-colors">
                        {service.label}
                      </span>
                      <span className="text-[9px] font-mono text-muted truncate w-full mt-0.5">
                        {service.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Satellite Badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-4 px-3.5 py-1.5 rounded-xl bg-[#0B1120]/90 border border-primary/40 text-xs font-mono text-white shadow-neon-primary backdrop-blur-xl flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>CI/CD Automated</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 px-3.5 py-1.5 rounded-xl bg-[#0B1120]/90 border border-accent/40 text-xs font-mono text-white shadow-neon-accent backdrop-blur-xl flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>AI Augmented</span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
