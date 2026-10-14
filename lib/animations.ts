import { Variants } from "framer-motion";

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  delay: number = 0,
  duration: number = 0.6
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration,
        delay,
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number = 0.12,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const scaleUp: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px 0 rgba(79, 70, 229, 0.25)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
