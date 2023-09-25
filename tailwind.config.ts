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
      fontFamily: {
        iranyekan: ["var(--font-iranyekan)"],
      },
      screens: {
        "2xs": "375px",
        xs: "425px",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
export default config;
