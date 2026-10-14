"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SERVICES } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import {
  Headphones,
  Network,
  AppWindow,
  Globe,
  Sparkles,
  CloudCog,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const Services: React.FC = () => {
  const serviceIcons: Record<string, React.ReactNode> = {
    Headphones: <Headphones className="w-5 h-5" />,
    Network: <Network className="w-5 h-5" />,
    AppWindow: <AppWindow className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    CloudCog: <CloudCog className="w-5 h-5" />,
  };

  return (
    <section id="services" className="relative py-28 bg-[#080B11] overflow-hidden">
      {/* Background Subtle Backlight */}
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-indigo-500/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Specialized Offerings"
          title="High-Impact Solutions &"
          highlightedText="Professional Services"
          subtitle="From 24/7 mission-critical IT support and Cisco network overhauls to bespoke modern web applications and autonomous AI agents."
        />

        {/* Six Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              variants={fadeIn("up", idx * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group relative rounded-3xl card-2026 card-2026-hover p-7 flex flex-col justify-between"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-300">
                  {serviceIcons[service.icon] || <Sparkles className="w-5 h-5" />}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-mono text-cyan-400 mb-3.5 font-medium">
                  {service.tagline}
                </p>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 hairline-t">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 group-hover:text-cyan-400 transition-colors"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
