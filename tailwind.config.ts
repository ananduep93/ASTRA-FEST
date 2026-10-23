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
        void: "#0A0A0A",
        "warm-white": "#F5F0E8",
        "electric-orange": "#FF4D00",
        fest: {
          black: "#0A0A0A",
          dark: "#121214",
          surface: "#18181B",
          card: "#1D1D20",
          border: "rgba(255, 77, 0, 0.25)",
          warm: "#F5F0E8",
          muted: "#9CA3AF",
          accent: "#FF4D00", // Electric Orange (#FF4D00)
          accentLight: "#FF6A26",
          accentHover: "#E64500",
          secondary: "#FFA040",
          orange: "#FF4D00",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "'Bebas Neue'", "sans-serif"],
        syne: ["var(--font-syne)", "'Syne'", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "var(--font-syne)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.6)",
        "accent-glow": "0 0 35px rgba(255, 77, 0, 0.4)",
        "orange-halo": "0 0 50px rgba(255, 77, 0, 0.35), 0 0 15px rgba(255, 106, 38, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
