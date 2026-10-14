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
    const duration = 2000;
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
    <section id="about" className="relative py-28 bg-[#0B1120] overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About The Engineer"
          title="Bridging Mission-Critical Infrastructure with"
          highlightedText="Autonomous AI"
          subtitle="Engineering robust networks, hardened server operating systems, and intelligent digital pipelines."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Professional About Bio & Core Philosophies */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-surface/70 border border-white/10 backdrop-blur-xl shadow-glass space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary">
                  <Terminal className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Network Engineer & Systems Architect
                  </h3>
                  <p className="text-xs font-mono text-muted">
                    Reliability &bull; High Availability &bull; Defense in Depth
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-base">
                With over <strong className="text-white font-semibold">2.5+ years of hands-on enterprise experience</strong>, 
                I specialize in designing, deploying, and maintaining high-availability network infrastructures, virtualized clusters, and secure hybrid cloud environments.
              </p>

              <p className="text-slate-300 leading-relaxed text-base">
                My approach marries the rigorous discipline of enterprise networking—Cisco routing, VLAN segmentation, stateful firewall policies, and Active Directory identity governance—with modern software engineering, CI/CD automated test frameworks (Playwright, TypeScript), and cutting-edge AI orchestration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Security-First Mindset</h4>
                    <p className="text-xs text-muted mt-0.5">Strict ACLs, zero-trust VPNs, and encrypted storage protocols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">99.98% High Availability</h4>
                    <p className="text-xs text-muted mt-0.5">Failover clustering, automated snapshots, and resilient WAN routing.</p>
                  </div>
                </div>
              </div>

              {/* Skill Pills from master prompt */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Core Methodologies & Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-slate-200 bg-white/[0.05] border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 shadow-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Statistics Cards */}
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {STATS.map((stat, index) => {
              const borderAccents = [
                "group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.25)]",
                "group-hover:border-secondary/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]",
                "group-hover:border-accent/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
                "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
              ];

              return (
                <motion.div
                  key={stat.label}
                  variants={fadeIn("up", index * 0.1)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative rounded-3xl bg-[#0F172A]/80 border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${borderAccents[index % 4]}`}
                >
                  <div className="absolute top-4 right-4 text-xs font-mono text-muted/50">
                    0{index + 1}
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl sm:text-5xl font-black text-white tracking-tight text-gradient-primary">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Engineering Mission Quote Box spanning both columns */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              className="sm:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
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
