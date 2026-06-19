import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#FFFFFF",
        ivory: "#FAFAF8",
        platinum: "#F4F4F2",
        gold: {
          primary: "#C9A84C",
          light: "#E8C96B",
          dark: "#A8832A",
          mist: "rgba(201,168,76,0.12)",
        },
        navy: {
          deep: "#0A0F1E",
          mid: "#1A2035",
          soft: "#2A3050",
        },
        glass: {
          white: "rgba(255,255,255,0.65)",
          gold: "rgba(201,168,76,0.10)",
          dark: "rgba(10,15,30,0.65)",
        },
        status: {
          indigo: "#6366F1",
          sky: "#0EA5E9",
          amber: "#F59E0B",
          emerald: "#10B981",
          green: "#059669",
          red: "#EF4444",
          gray: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl": ["96px", { lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.02em" }],
        "display-lg": ["72px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["56px", { lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.015em" }],
        h2: ["40px", { lineHeight: "1.12", fontWeight: "700", letterSpacing: "-0.01em" }],
        h3: ["28px", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.005em" }],
        h4: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-xl": ["20px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.55", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.02em" }],
        label: ["11px", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "0.08em" }],
      },
      backdropBlur: {
        glass: "20px",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(10,15,30,0.08)",
        "glass-lg": "0 16px 48px rgba(10,15,30,0.12)",
        gold: "0 8px 24px rgba(201,168,76,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2.2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
