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
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-widest text-indigo-300 ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        {title}{" "}
        {highlightedText && (
          <span className="text-gradient-primary">{highlightedText}</span>
        )}
      </h2>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-muted leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
};
