"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  enableTilt = true,
  glowColor = "primary",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    primary: "group-hover:border-primary/40 group-hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)]",
    secondary: "group-hover:border-secondary/40 group-hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)]",
    accent: "group-hover:border-accent/40 group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative rounded-2xl bg-surface/80 border border-white/10 p-6 backdrop-blur-xl transition-colors duration-300",
        glowStyles[glowColor],
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          opacity: glarePosition.opacity,
        }}
      />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
