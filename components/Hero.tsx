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
  Sparkles,
  CheckCircle,
  Headphones,
  Network,
  AppWindow,
  Globe,
  Cloud,
  Check,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { ThreeCanvas } from "./ui/ThreeCanvas";
import confetti from "canvas-confetti";

export const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const keywords = PERSONAL_INFO.typingKeywords;

  useEffect(() => {
    const word = keywords[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
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
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#4F46E5", "#6366F1", "#06B6D4", "#F8FAFC"],
      });
    } catch {
      // Fallback
    }

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);

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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#080B11]"
    >
      {/* 3D Interactive Three.js Particle Mesh Background */}
      <ThreeCanvas particleCount={70} />

      {/* 2026 Minimalist Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />

      {/* Subtle Technical Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none bg-radial-fade" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left space-y-7"
          >
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full card-2026">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
                Network & Systems Engineer &bull; 2.5+ Years Experience
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-[-0.03em] text-white leading-[1.05]">
                Hi, I&apos;m{" "}
                <span className="text-gradient-brand">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Dynamic Typing Keyword Stream */}
              <div className="flex items-center gap-2.5 text-2xl sm:text-4xl xl:text-5xl font-bold text-slate-300 min-h-[48px] sm:min-h-[56px]">
                <span className="text-cyan-400 font-mono text-xl sm:text-3xl">&gt;</span>
                <span className="text-white tracking-tight font-mono">{currentText}</span>
                <span className="inline-block w-[3px] h-7 sm:h-9 bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* EXACT Hero Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {PERSONAL_INFO.heroBio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-xs text-slate-200 card-2026 card-2026-hover transition-all duration-300 active:scale-95"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Architecture Metrics Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Trust Perimeter</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>99.98% System Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cisco Dynamic BGP / OSPF</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2026 Interactive Network Operations Console Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Subtle Keyline Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-xl opacity-60" />

            {/* Main NOC Console Card */}
            <div className="relative rounded-3xl card-2026 p-6 overflow-hidden">
              
              {/* Card Window Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 hairline-b">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>ruban@noc-core-01:~</span>
                </div>
              </div>

              {/* Terminal Diagnostics */}
              <div className="space-y-2.5 font-mono text-xs mb-5 bg-[#05070C]/70 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="text-emerald-400 font-semibold">$ netstat -an | grep 443</span>
                  <span className="text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    ESTABLISHED
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  [OK] Cisco Catalyst 3850 Core Trunk: Up / Line Protocol Up<br />
                  [OK] VMware vSphere 8.0 Cluster: 3 Nodes Synced<br />
                  [OK] Active Directory & AWS IAM Federation: Active<br />
                  [OK] AI Real-Time Watchdog: 0 Anomalies Detected
                </div>
                <div className="flex items-center gap-2 text-indigo-400 text-[11px] pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Workflow: Telemetry streaming &bull; 0 latency</span>
                </div>
              </div>

              {/* Profile Summary Badge */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 p-[1px] shrink-0">
                  <div className="w-full h-full bg-[#080B11] rounded-[11px] flex items-center justify-center font-bold text-lg text-white">
                    R
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm truncate">Ruban</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      2.5+ Yrs Exp
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">Network Engineer & Systems Architect</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-emerald-400 font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Cisco Certified
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> AWS Cloud
                    </span>
                  </div>
                </div>
              </div>

              {/* My Services Grid */}
              <div className="pt-4 hairline-t">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>My Services</span>
                  <span className="text-cyan-400">Available For Impact</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                      className="group/item flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/[0.08] transition-all duration-200 text-center"
                    >
                      <service.icon className={`w-4 h-4 mb-1.5 ${service.color} group-hover/item:scale-110 transition-transform`} />
                      <span className="text-[11px] font-mono text-white font-semibold truncate w-full group-hover/item:text-primary transition-colors">
                        {service.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 truncate w-full mt-0.5">
                        {service.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Minimalist 2026 Micro Status Badges */}
            <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full card-2026 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CI/CD Pipeline Healthy</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
