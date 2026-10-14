"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";
import { ProjectItem } from "@/lib/constants";
import { TechBadge } from "./TechBadge";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05070C]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl rounded-3xl card-2026 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-3">
              {project.category}
            </span>
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1.5">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400 font-semibold">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center p-2">
                <div className="text-[10px] text-slate-500 mb-1 font-mono uppercase tracking-widest">
                  Metric 0{i + 1}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">
                  {metric}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Overview */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Architecture Overview
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Deep Topology Box */}
          <div className="mb-6 p-4 rounded-2xl bg-indigo-500/[0.06] border border-indigo-500/20">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Deep Topology & Implementation
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              {project.architectureDetails}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Key Engineering Features
            </h4>
            <ul className="space-y-2.5">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Protocols
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <TechBadge key={tag} name={tag} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-5 hairline-t">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-xs transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white font-medium text-xs transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
