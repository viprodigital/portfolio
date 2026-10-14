"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { CERTIFICATIONS, CertificationItem } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  FileCheck,
  Calendar,
  X,
  FileText,
  Download,
  Lock,
} from "lucide-react";

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Subtle Ambient Backlights */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-cyan-500/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Validated Credentials"
          title="Professional Certifications &"
          highlightedText="Qualifications"
          subtitle="Authentic industry credentials and rigorous academic engineering qualifications in network security, systems, and enterprise infrastructure."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CERTIFICATIONS.map((cert, index) => {
            const isVerified = cert.status === "Verified";

            return (
              <motion.div
                key={cert.id}
                variants={fadeIn("up", index * 0.1)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative rounded-3xl card-2026 card-2026-hover p-7 flex flex-col justify-between overflow-hidden border ${
                  isVerified ? "border-primary/40 shadow-[0_0_30px_rgba(79,70,229,0.15)]" : "border-white/5"
                }`}
              >
                {/* Glow accent bar at top */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${
                    cert.category === "Security"
                      ? "from-red-500 via-rose-500 to-indigo-500"
                      : cert.category === "Networking"
                      ? "from-blue-500 via-cyan-500 to-indigo-500"
                      : cert.category === "Cloud"
                      ? "from-amber-500 via-orange-500 to-purple-500"
                      : "from-emerald-500 via-teal-500 to-cyan-500"
                  }`}
                />

                <div>
                  {/* Category & Status Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-slate-300">
                      {cert.category}
                    </span>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{cert.status}</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 mb-4">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{cert.issuer}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-slate-300 hover:border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 hairline-t flex items-center justify-between text-xs">
                  {cert.verificationUrl ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-indigo-300 border border-primary/30 font-mono text-[11px] font-medium transition-all"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Preview Certificate</span>
                      </button>
                      <a
                        href={cert.verificationUrl}
                        download="Ruban_FortiGate_Certificate.pdf"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5 font-mono text-[11px] transition-all"
                        title="Download Certificate PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cert.badgeText}</span>
                    </div>
                  )}

                  {cert.credentialId && (
                    <span className="text-[10px] font-mono text-slate-500">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl card-2026 bg-[#0B1120] border border-white/10 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 mb-6 hairline-b">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Verified Credential
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Issued to Ruban P by {selectedCert.issuer} &bull; {selectedCert.date}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Details Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#080B11] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase">Recipient</span>
                    <span className="text-white font-semibold text-sm">Ruban P</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#080B11] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase">Issuer</span>
                    <span className="text-white font-semibold text-sm">{selectedCert.issuer}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#080B11] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase">Issue Date</span>
                    <span className="text-white font-semibold text-sm">{selectedCert.date}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#080B11] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase">Status</span>
                    <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Official Self-Paced Completion
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                  {selectedCert.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Verified Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-indigo-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-mono font-medium transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Open PDF in New Tab</span>
                </a>

                <a
                  href={selectedCert.verificationUrl}
                  download="Ruban_FortiGate_Certificate.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified PDF</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
