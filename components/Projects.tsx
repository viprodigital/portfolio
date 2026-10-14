"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { PROJECTS, ProjectItem } from "@/lib/constants";
import { TechBadge } from "./ui/TechBadge";
import { ProjectModal } from "./ui/ProjectModal";
import { fadeIn } from "@/lib/animations";
import {
  ExternalLink,
  Github,
  Maximize2,
  Server,
  Cloud,
  Network,
  Database,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Render stylized visual diagrams for each project card
  const renderVisualDiagram = (projectId: string) => {
    switch (projectId) {
      case "active-directory-aws":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span className="flex items-center gap-1.5 text-accent">
                <Cloud className="w-3.5 h-3.5" /> AWS IAM Identity Center
              </span>
              <span className="text-emerald-400">SAML 2.0 SSO</span>
            </div>
            {/* Visual Node Links */}
            <div className="flex items-center justify-around my-auto">
              <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Server className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">On-Prem DC</span>
              </div>
              <div className="flex-1 px-3">
                <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-accent to-purple-500 relative">
                  <div className="w-2 h-2 rounded-full bg-accent absolute -top-[3px] animate-ping" />
                </div>
                <div className="text-[9px] font-mono text-center text-muted mt-1">IPSec Tunnel</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Cloud className="w-5 h-5 text-accent mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">AWS Cloud</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted flex items-center justify-between">
              <span>Kerberos / LDAP Sync</span>
              <span className="text-primary font-bold">100% Policy Parity</span>
            </div>
          </div>
        );

      case "vmware-virtualization":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900/60 border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-secondary/40 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Server className="w-3.5 h-3.5" /> vSphere 8.0 Cluster
              </span>
              <span className="text-emerald-400">vMotion Active</span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-auto">
              {[1, 2, 3].map((node) => (
                <div key={node} className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-white block font-bold">ESXi Node 0{node}</span>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-[75%]" />
                  </div>
                  <span className="text-[9px] font-mono text-muted mt-0.5 block">12 VMs</span>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-mono text-muted flex items-center justify-between">
              <span>All-Flash iSCSI SAN</span>
              <span className="text-secondary font-bold">N+1 Redundant</span>
            </div>
          </div>
        );

      case "file-server-management":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span className="flex items-center gap-1.5 text-accent">
                <Database className="w-3.5 h-3.5" /> DFS Distributed Namespace
              </span>
              <span className="text-emerald-400">AES-256 BitLocker</span>
            </div>
            <div className="flex items-center justify-around my-auto">
              <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Database className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">Target Server A</span>
              </div>
              <div className="flex-1 px-3 text-center">
                <div className="h-[2px] bg-gradient-to-r from-cyan-500 to-teal-500 relative">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 absolute right-0 -top-[3px] animate-ping" />
                </div>
                <div className="text-[9px] font-mono text-muted mt-1">Bi-Directional Sync</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Database className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">Target Server B</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted flex items-center justify-between">
              <span>VSS Tiered Snapshots</span>
              <span className="text-accent font-bold">12TB Clustered</span>
            </div>
          </div>
        );

      case "small-office-network":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900/60 border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Network className="w-3.5 h-3.5" /> Cisco Multi-VLAN Topology
              </span>
              <span className="text-emerald-400">Dual-WAN Failover</span>
            </div>
            <div className="flex items-center justify-around my-auto">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">Cisco ASA</span>
              </div>
              <div className="flex-1 px-2">
                <div className="h-[2px] bg-emerald-500/60 relative" />
                <div className="text-[8px] font-mono text-center text-muted mt-1">Trunk 802.1Q</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Server className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">Catalyst 3850</span>
              </div>
              <div className="flex-1 px-2">
                <div className="h-[2px] bg-emerald-500/60 relative" />
                <div className="text-[8px] font-mono text-center text-muted mt-1">Access Ports</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                <Network className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">6x VLANs</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted flex items-center justify-between">
              <span>802.1X Port Security</span>
              <span className="text-emerald-400 font-bold">1Gbps Duplex</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-28 bg-[#0B1120] overflow-hidden">
      {/* Dynamic Ambient Blur */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Featured Engineering"
          title="Architectural Case Studies &"
          highlightedText="Flagship Projects"
          subtitle="Explore four enterprise production architectures spanning identity federation, virtualization, clustered storage, and turnkey Cisco campus networks."
        />

        {/* 4 Premium Glass Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", idx * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative rounded-3xl bg-[#0F172A]/80 border border-white/10 hover:border-primary/50 p-6 sm:p-8 backdrop-blur-xl shadow-glass hover:shadow-neon-primary transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Action */}
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-accent bg-accent/10 border border-accent/20">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted group-hover:text-white group-hover:bg-white/10 transition-colors"
                    aria-label={`View ${project.title} architectural case study`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Stylized Visual Diagram */}
                <div className="mb-6">
                  {renderVisualDiagram(project.id)}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-gradient-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-primary font-semibold mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag} name={tag} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white text-xs font-medium transition-all shadow-neon-primary"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
