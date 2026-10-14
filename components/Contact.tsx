"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { PERSONAL_INFO } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import {
  Send,
  Linkedin,
  Github,
  Youtube,
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to save message. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#4F46E5", "#6366F1", "#06B6D4", "#10B981"],
        });
      } catch {
        // Fallback
      }

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
        setIsSuccess(false);
      }, 5000);
    } catch {
      setIsSubmitting(false);
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: "LinkedIn",
      href: PERSONAL_INFO.socials.linkedin,
      icon: Linkedin,
      label: "Professional Profile & Network",
      color: "hover:text-blue-400 hover:border-blue-500/30",
    },
    {
      name: "GitHub",
      href: PERSONAL_INFO.socials.github,
      icon: Github,
      label: "Production Scripts & Infra Code",
      color: "hover:text-purple-400 hover:border-purple-500/30",
    },
    {
      name: "YouTube",
      href: PERSONAL_INFO.socials.youtube,
      icon: Youtube,
      label: "Lab Demos & Tech Walkthroughs",
      color: "hover:text-rose-400 hover:border-rose-500/30",
    },
    {
      name: "Direct Email",
      href: PERSONAL_INFO.socials.email,
      icon: Mail,
      label: PERSONAL_INFO.email,
      color: "hover:text-cyan-400 hover:border-cyan-500/30",
    },
  ];

  return (
    <section id="contact" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-primary/[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Get In Touch"
          title="Initiate Contact &"
          highlightedText="Start Building"
          subtitle="Have an enterprise network engineering challenge, systems architecture requirement, or an AI workflow idea? Let's discuss."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form (Backed by Supabase API) */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl card-2026 relative">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                Messages route directly to Ruban&apos;s database and primary inbox with rapid SLA turnaround.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Network Architecture Consultation"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your infrastructure goals, timeline, or scope of work..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Anti-spam honeypot field (hidden from legitimate users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Error Banner */}
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-primary via-indigo-600 to-cyan-500 hover:opacity-95 shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Packet...</span>
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Check className="w-4 h-4" />
                      <span>Message Dispatched Successfully!</span>
                    </div>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Availability & Verified Social Channels */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Status Card */}
            <div className="p-7 rounded-3xl card-2026">
              <div className="flex items-center justify-between pb-4 mb-4 hairline-b">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Current Availability</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  Open for Offers
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Available for full-time engineering roles, high-impact network consulting, or custom AI systems advisory.
              </p>

              <div className="space-y-2.5 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Global / Remote & On-Premises Ready</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Response Time: Typically under 4 hours</span>
                </div>
              </div>

              {/* Direct Copy Email Box */}
              <div className="mt-5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-200 truncate pr-2">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1.5 text-xs font-mono shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels List */}
            <div className="p-7 rounded-3xl card-2026 space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Network Channels & Social Profiles
              </h4>

              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 ${social.color} transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 group-hover:bg-white/10 transition-colors">
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {social.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {social.label}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
