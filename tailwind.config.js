/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#faf8ff",
        surface: "#faf8ff",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "surface-variant": "#dae2fd",
        "on-surface": "#131b2e",
        "on-surface-variant": "#3c4a43",
        outline: "#6c7a72",
        "outline-variant": "#bbcac1",
        primary: "#006c4f",
        "primary-container": "#00c896",
        "on-primary": "#ffffff",
        "on-primary-container": "#004d38",
        secondary: "#0051d5",
        "secondary-container": "#316bf3",
        "on-secondary-container": "#fefcff",
        tertiary: "#9a451f",
        "tertiary-container": "#ff9467",
        "primary-fixed-dim": "#3adfab",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        headline: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        ambient: "0 24px 70px -36px rgba(19, 27, 46, 0.24)",
        glow: "0 0 30px rgba(0, 200, 150, 0.15)",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
