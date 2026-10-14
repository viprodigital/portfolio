"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { STATS, SKILL_PILLS } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { CheckCircle2, ShieldCheck, Terminal, Award } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-cyan-500/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About The Engineer"
          title="Bridging Mission-Critical Infrastructure with"
          highlightedText="Autonomous AI"
          subtitle="Engineering robust networks, hardened server operating systems, and intelligent digital pipelines."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Professional Narrative & Core Philosophies */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 sm:p-9 rounded-3xl card-2026 space-y-6">
              <div className="flex items-center gap-3.5 pb-5 hairline-b">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Network Engineer & Systems Architect
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Reliability &bull; High Availability &bull; Defense in Depth
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-base">
                With over <strong className="text-white font-semibold">2.5+ years of hands-on enterprise experience</strong>, 
                I specialize in designing, deploying, and maintaining high-availability network infrastructures, virtualized clusters, and secure hybrid cloud environments.
              </p>

              <p className="text-slate-300 leading-relaxed text-base">
                My approach marries the rigorous discipline of enterprise networking—Cisco routing, VLAN segmentation, stateful firewall policies, and Active Directory identity governance—with modern software engineering, CI/CD test frameworks (Playwright, TypeScript), and cutting-edge AI orchestration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Security-First Mindset</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Strict ACLs, zero-trust VPNs, and encrypted storage protocols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">99.98% High Availability</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Failover clustering, instant snapshots, and resilient WAN routing.</p>
                  </div>
                </div>
              </div>

              {/* Skill Pills */}
              <div className="pt-5 hairline-t">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Core Methodologies & Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact 2026 Bento Statistics */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn("up", index * 0.1)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-3xl card-2026 card-2026-hover p-6 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Metric 0{index + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500/50" />
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono text-gradient-silver">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Engineering Mission Quote Box */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              className="sm:col-span-2 p-6 rounded-3xl card-2026 bg-gradient-to-br from-indigo-500/[0.08] to-cyan-500/[0.05]"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Engineering Philosophy
                </span>
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;Systematize everything that is repetitive. Hard-wire everything that is mission-critical. Never settle for an architecture that cannot self-heal.&rdquo;
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
