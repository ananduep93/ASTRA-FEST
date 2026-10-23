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
          black: "#060609",
          dark: "#0B0C12",
          surface: "#10121C",
          card: "#131622",
          border: "rgba(0, 240, 255, 0.15)",
          warm: "#FFFFFF",
          muted: "#94A3B8",
          accent: "#00F0FF", // Electric Cyber Cyan - High-end, futuristic on black
          accentHover: "#38BDF8",
          secondary: "#8B5CF6", // Neon Violet
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
        "accent-glow": "0 0 35px rgba(0, 240, 255, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
