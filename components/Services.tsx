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
    Headphones: <Headphones className="w-6 h-6" />,
    Network: <Network className="w-6 h-6" />,
    AppWindow: <AppWindow className="w-6 h-6" />,
    Globe: <Globe className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    CloudCog: <CloudCog className="w-6 h-6" />,
  };

  return (
    <section id="services" className="relative py-28 bg-[#0B1120] overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Specialized Offerings"
          title="High-Impact Solutions &"
          highlightedText="Professional Services"
          subtitle="From 24/7 mission-critical IT support and Cisco network overhauls to bespoke modern web applications and autonomous AI agents."
        />

        {/* Six Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              variants={fadeIn("up", idx * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="group relative rounded-3xl bg-[#0F172A]/75 border border-white/10 hover:border-primary/50 p-7 backdrop-blur-xl shadow-glass hover:shadow-neon-primary transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:shadow-neon-accent transition-all duration-300">
                  {serviceIcons[service.icon] || <Sparkles className="w-6 h-6" />}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-mono text-muted mb-4 font-semibold">
                  {service.tagline}
                </p>

                {/* Service Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary group-hover:text-accent transition-colors"
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
