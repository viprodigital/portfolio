"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { EXPERIENCES } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import {
  Briefcase,
  Shield,
  Layers,
  Database,
  Cloud,
  Users,
  Lock,
  GitBranch,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { TechBadge } from "./ui/TechBadge";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#0B1120] overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Career Journey"
          title="Enterprise Production"
          highlightedText="Experience"
          subtitle="2.5+ years of real-world operational responsibility across security, systems, virtualization, and corporate networks."
        />

        <div className="max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, expIdx) => (
            <motion.div
              key={expIdx}
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative pl-6 sm:pl-10 border-l-2 border-primary/30"
            >
              {/* Timeline Marker Pulse */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0B1120] border-2 border-primary flex items-center justify-center shadow-neon-primary">
                <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent absolute" />
              </div>

              {/* Main Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A]/85 border border-white/10 backdrop-blur-xl shadow-glass">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                        {exp.badge}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-primary">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-muted bg-white/[0.04] px-3.5 py-1.5 rounded-xl border border-white/5">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  {exp.description}
                </p>

                {/* Core Responsibilities Grid (Security, Virtualization, Backup, Configuration, Asset management, Cloud, AD, VPN, Routing, Switching) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {exp.coreResponsibilities.map((group, groupIdx) => (
                    <div
                      key={groupIdx}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2 text-gradient-primary">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {group.title}
                      </h4>
                      <ul className="space-y-2">
                        {group.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Primary Toolchain & Hardware Protocols
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
