"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightedText?: string;
  subtitle: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightedText,
  subtitle,
  centered = true,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-16 ${centered ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}
    >
      {/* Pill Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full card-2026 mb-4 text-xs font-mono uppercase tracking-widest text-cyan-400 ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-white mb-4 leading-tight">
        {title}{" "}
        {highlightedText && (
          <span className="text-gradient-brand">{highlightedText}</span>
        )}
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
        {subtitle}
      </p>
    </motion.div>
  );
};
