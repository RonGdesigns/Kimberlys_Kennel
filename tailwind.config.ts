import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Warm, earthy, natural palette for Kimberly Labradoodle Kennel
        cream: "#FBF7F0",
        sand: "#F0E6D6",
        clay: "#D9C3A9",
        caramel: "#C9A26A",
        bark: "#7A5C3E",
        cocoa: "#4A3526",
        sage: "#8A9A6B",
        moss: "#5E6B47",
        terracotta: "#C2734A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "1.25rem",
      },
      boxShadow: {
        warm: "0 10px 40px -12px rgba(74, 53, 38, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
