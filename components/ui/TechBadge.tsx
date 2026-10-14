import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:text-white hover:bg-primary/10 transition-all duration-200 shadow-sm",
        className
      )}
    >
      {name}
    </span>
  );
};
