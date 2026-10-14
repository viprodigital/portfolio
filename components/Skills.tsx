"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import {
  Network,
  Code,
  ShieldAlert,
  Wrench,
  BrainCircuit,
  CheckCircle2,
} from "lucide-react";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    Networking: <Network className="w-4 h-4" />,
    Programming: <Code className="w-4 h-4" />,
    "Security & Cloud": <ShieldAlert className="w-4 h-4" />,
    "Tools & DevOps": <Wrench className="w-4 h-4" />,
    "Artificial Intelligence": <BrainCircuit className="w-4 h-4" />,
  };

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-primary/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical Expertise"
          title="Battle-Tested"
          highlightedText="Core Competencies"
          subtitle="A comprehensive inventory of networking protocols, enterprise server management, modern coding languages, and AI tools."
        />

        {/* 2026 Segmented Category Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl card-2026 max-w-fit mx-auto mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/[0.1] text-white shadow-sm border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={fadeIn("up", catIdx * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="p-7 sm:p-9 rounded-3xl card-2026"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 hairline-b">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center text-cyan-400">
                    {categoryIcons[category.title] || <Network className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {category.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  {category.skills.length} Capabilities
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-semibold text-white text-sm">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                        {skill.level}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Minimalist 2026 Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
