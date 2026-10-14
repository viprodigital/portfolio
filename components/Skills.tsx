"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
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
    Networking: <Network className="w-5 h-5" />,
    Programming: <Code className="w-5 h-5" />,
    "Security & Cloud": <ShieldAlert className="w-5 h-5" />,
    "Tools & DevOps": <Wrench className="w-5 h-5" />,
    "Artificial Intelligence": <BrainCircuit className="w-5 h-5" />,
  };

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#0B1120] overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical Expertise"
          title="Battle-Tested"
          highlightedText="Core Competencies"
          subtitle="A comprehensive inventory of networking protocols, enterprise server management, modern coding languages, and AI tools."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-neon-primary scale-105"
                    : "bg-white/[0.04] text-muted hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {filteredCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={fadeIn("up", catIdx * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl shadow-glass"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-accent">
                    {categoryIcons[category.title] || <Network className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted">
                      {category.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  {category.skills.length} Capabilities
                </span>
              </div>

              {/* Skills Progress Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-white text-sm">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary group-hover:text-accent transition-colors">
                        {skill.level}%
                      </span>
                    </div>

                    <p className="text-xs text-muted mb-3 font-normal leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-neon-primary"
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
