"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { PROJECTS, ProjectItem } from "@/lib/constants";
import { TechBadge } from "./ui/TechBadge";
import { ProjectModal } from "./ui/ProjectModal";
import { fadeIn } from "@/lib/animations";
import {
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

  // Stylized 2026 Technical Architectural Diagrams
  const renderVisualDiagram = (projectId: string) => {
    switch (projectId) {
      case "active-directory-aws":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#05070C] border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Cloud className="w-3.5 h-3.5" /> AWS IAM Identity Center
              </span>
              <span className="text-emerald-400 font-semibold">SAML 2.0 SSO</span>
            </div>
            {/* Visual Node Topology */}
            <div className="flex items-center justify-around my-auto">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Server className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">On-Prem DC</span>
              </div>
              <div className="flex-1 px-3">
                <div className="h-[1px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute -top-[3px] left-1/2 -translate-x-1/2 animate-ping" />
                </div>
                <div className="text-[9px] font-mono text-center text-slate-500 mt-1">IPSec VPN</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Cloud className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">AWS Cloud</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Kerberos / LDAP Sync</span>
              <span className="text-indigo-400 font-bold">100% Policy Parity</span>
            </div>
          </div>
        );

      case "vmware-virtualization":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#05070C] border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-purple-500/30 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Server className="w-3.5 h-3.5" /> vSphere 8.0 Cluster
              </span>
              <span className="text-emerald-400 font-semibold">vMotion Active</span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-auto">
              {[1, 2, 3].map((node) => (
                <div key={node} className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <span className="text-[10px] font-mono text-white block font-bold">ESXi Node 0{node}</span>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-[75%]" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">12 VMs</span>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>All-Flash iSCSI SAN</span>
              <span className="text-purple-400 font-bold">N+1 Redundant</span>
            </div>
          </div>
        );

      case "file-server-management":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#05070C] border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Database className="w-3.5 h-3.5" /> DFS Distributed Namespace
              </span>
              <span className="text-emerald-400 font-semibold">AES-256 BitLocker</span>
            </div>
            <div className="flex items-center justify-around my-auto">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Database className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">Target Server A</span>
              </div>
              <div className="flex-1 px-3 text-center">
                <div className="h-[1px] bg-gradient-to-r from-cyan-500 to-teal-500 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute right-0 -top-[3px] animate-ping" />
                </div>
                <div className="text-[9px] font-mono text-slate-500 mt-1">Bi-Directional Sync</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Database className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-slate-300">Target Server B</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>VSS Tiered Snapshots</span>
              <span className="text-cyan-400 font-bold">12TB Clustered</span>
            </div>
          </div>
        );

      case "small-office-network":
        return (
          <div className="relative w-full h-44 rounded-2xl bg-[#05070C] border border-white/5 p-4 flex flex-col justify-between overflow-hidden group-hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Network className="w-3.5 h-3.5" /> Cisco Multi-VLAN Topology
              </span>
              <span className="text-emerald-400 font-semibold">Dual-WAN Failover</span>
            </div>
            <div className="flex items-center justify-around my-auto">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">Cisco ASA</span>
              </div>
              <div className="flex-1 px-2">
                <div className="h-[1px] bg-emerald-500/40 relative" />
                <div className="text-[8px] font-mono text-center text-slate-500 mt-1">Trunk 802.1Q</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Server className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">Catalyst 3850</span>
              </div>
              <div className="flex-1 px-2">
                <div className="h-[1px] bg-emerald-500/40 relative" />
                <div className="text-[8px] font-mono text-center text-slate-500 mt-1">Access Ports</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <Network className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <span className="text-[9px] font-mono text-slate-300">6x VLANs</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
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
    <section id="projects" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Dynamic Ambient Blur */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Featured Engineering"
          title="Architectural Case Studies &"
          highlightedText="Flagship Projects"
          subtitle="Explore four enterprise production architectures spanning identity federation, virtualization, clustered storage, and turnkey Cisco campus networks."
        />

        {/* 4 Flagship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", idx * 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group relative rounded-3xl card-2026 card-2026-hover p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Expand Button */}
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/[0.08] transition-colors"
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
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{metric}</span>
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
              <div className="flex items-center gap-3 pt-5 hairline-t">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-200 text-xs font-medium transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
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
