/* eslint-disable @typescript-eslint/no-var-requires */
const { pick, omit } = require("lodash")
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        workshop: {
          charcoal: "#1a1a2e",
          midnight: "#0f0f23",
          amber: "#f5a623",
          "amber-dim": "#b8860b",
          neon: "#00d4ff",
          "neon-dim": "#0a7e9e",
          wood: "#8B6914",
          "wood-dark": "#5C4510",
          "wood-light": "#C4A035",
          gold: "#ffd700",
          "gold-dim": "#b8960f",
          parchment: "#f5e6c8",
          "parchment-dark": "#d4c4a0",
          hearth: "#ff6b35",
          "hearth-glow": "#ff4500",
          "desk-bg": "#2a1f3d",
          "desk-surface": "#1e1533",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "wood-grain": "repeating-linear-gradient(90deg, #8B6914 0px, #A07818 2px, #6B510F 4px, #8B6914 6px)",
        "wood-grain-dark": "repeating-linear-gradient(90deg, #5C4510 0px, #7A5C18 2px, #4A360C 4px, #5C4510 6px)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "10%": { opacity: "0.85" },
          "20%": { opacity: "0.95" },
          "30%": { opacity: "0.8" },
          "50%": { opacity: "0.92" },
          "70%": { opacity: "0.88" },
          "90%": { opacity: "0.96" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(255, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 20px 6px rgba(255, 215, 0, 0.6)" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-80px) scale(0)", opacity: "0" },
        },
        "typewriter-cursor": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "chest-open": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-120deg)" },
        },
        "level-up-text": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-60px) scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "particle-rise": "particle-rise 1s ease-out forwards",
        "typewriter-cursor": "typewriter-cursor 0.8s step-end infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-up": "slide-in-up 0.5s ease-out",
        "chest-open": "chest-open 0.6s ease-out forwards",
        "level-up-text": "level-up-text 1.5s ease-out forwards",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      minHeight: {
        ...defaultTheme.height,
      },
      minWidth: {
        ...defaultTheme.width,
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
