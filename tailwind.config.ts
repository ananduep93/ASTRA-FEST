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
          black: "#060607",
          dark: "#0C0C0E",
          surface: "#121215",
          border: "rgba(245, 242, 235, 0.08)",
          warm: "#F5F2EB",
          muted: "#9E9A90",
          accent: "#FF3D00", // Electric Vermillion - The single bold festival accent
          accentHover: "#FF5722",
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
        "accent-glow": "0 0 35px rgba(255, 61, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
