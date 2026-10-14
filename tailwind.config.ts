import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B1120",
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          glow: "rgba(79, 70, 229, 0.4)",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
          glow: "rgba(124, 58, 237, 0.4)",
        },
        accent: {
          DEFAULT: "#06B6D4",
          hover: "#0891B2",
          glow: "rgba(6, 182, 212, 0.4)",
        },
        muted: {
          DEFAULT: "#94A3B8",
          dark: "#64748B",
        },
        surface: {
          DEFAULT: "#0F172A",
          card: "rgba(15, 23, 42, 0.75)",
          glass: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      animation: {
        "aurora": "aurora 20s linear infinite",
        "blob": "blob 12s infinite ease-in-out",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "neon-primary": "0 0 25px -5px rgba(79, 70, 229, 0.5)",
        "neon-secondary": "0 0 25px -5px rgba(124, 58, 237, 0.5)",
        "neon-accent": "0 0 25px -5px rgba(6, 182, 212, 0.5)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-hover": "0 14px 40px 0 rgba(79, 70, 229, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
