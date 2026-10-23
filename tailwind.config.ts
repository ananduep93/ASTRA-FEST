import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fest: {
          black: "#08080C",
          dark: "#0E0F16",
          surface: "#141520",
          card: "#171826",
          border: "rgba(245, 158, 11, 0.2)",
          warm: "#FFFFFF",
          muted: "#94A3B8",
          accent: "#F59E0B", // Royal Solar Gold
          accentLight: "#FBBF24", // Radiant Amber
          accentHover: "#D97706",
          secondary: "#F97316", // Warm Solar Flare
          gold: "#FDE047", // Sparkling Champagne
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        wide: "0.15em",
        wider: "0.25em",
        widest: "0.35em",
      },
      boxShadow: {
        "liquid-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
        "accent-glow": "0 0 35px rgba(245, 158, 11, 0.35)",
        "gold-halo": "0 0 45px rgba(245, 158, 11, 0.25), 0 0 15px rgba(249, 115, 22, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
