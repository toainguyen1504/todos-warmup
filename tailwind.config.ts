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
        transparent: "transparent",
        current: "currentColor",
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#ffffff",
        black: "#000000",
        "text-color": "#605A5A",
        "primary-color": "#DC4C3E",
        "active-color": "#FFEFE5",
        "hover-color": "#f2efed",
        "sidebar-color": "#fcfaf8",
      },
    },
  },
  plugins: [],
};
export default config;
