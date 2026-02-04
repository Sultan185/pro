/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b00",
        "primary-dark": "#e65c00",
        dark: "#1a1a1a",
        "dark-light": "#2a2a2a",
        "text-primary": "#f0f0f0",
        "text-secondary": "#b0b0b0",
        "blue-glow": "#00bfff",
        "blue-dark": "#0099e6",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Inconsolata", "monospace"],
      },
      boxShadow: {
        "glow-orange":
          "0 0 10px rgba(255, 107, 0, 0.5), 0 0 20px rgba(255, 107, 0, 0.3)",
        "glow-blue":
          "0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3)",
        "glow-cyan":
          "0 0 10px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)",
        "glow-orange-lg":
          "0 0 15px rgba(255, 107, 0, 0.6), 0 0 30px rgba(255, 107, 0, 0.4)",
        "glow-blue-lg":
          "0 0 15px rgba(0, 191, 255, 0.6), 0 0 30px rgba(0, 191, 255, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      borderColor: {
        "orange-glow": "#ff6b00",
        "blue-glow": "#00bfff",
      },
    },
  },
  plugins: [],
};
