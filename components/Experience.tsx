"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { EXPERIENCES } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { TechBadge } from "./ui/TechBadge";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Background Subtle Backlight */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/[0.05] blur-[150px] pointer-events-none" />

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
              className="relative pl-6 sm:pl-10 border-l border-white/10"
            >
              {/* Timeline Indicator */}
              <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[#080B11] border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Main Experience Card */}
              <div className="p-7 sm:p-9 rounded-3xl card-2026">
                {/* Header Information */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 hairline-b">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                        {exp.badge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-indigo-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  {exp.description}
                </p>

                {/* Responsibilities Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {exp.coreResponsibilities.map((group, groupIdx) => (
                    <div
                      key={groupIdx}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{group.title}</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {group.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="text-xs text-slate-400 leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-5 hairline-t">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    Primary Toolchain & Hardware Protocols
                  </div>
                  <div className="flex flex-wrap gap-1.5">
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
