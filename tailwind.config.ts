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
          black: "#080A0E",
          dark: "#0B0E14",
          surface: "#10141C",
          card: "#141822",
          border: "rgba(255, 85, 0, 0.22)",
          warm: "#F4F6FB", // Crisp off-white
          muted: "#94A3B8",
          accent: "#FF5500", // Electric Orange
          accentLight: "#FF7722",
          accentHover: "#E64A00",
          secondary: "#FFA040", // Warm Amber
          orange: "#FF5500",
          gold: "#FFB03A",
        },
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        syne: ["'Syne'", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["'Bebas Neue'", "'Syne'", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
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
        "accent-glow": "0 0 35px rgba(255, 85, 0, 0.4)",
        "orange-halo": "0 0 50px rgba(255, 85, 0, 0.3), 0 0 15px rgba(255, 119, 34, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
