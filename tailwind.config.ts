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
        "primary-light-color": "#dc4c3eba",
        "active-color": "#FFEFE5",
        "hover-color": "#f2efed",
        "sidebar-color": "#fcfaf8",
        "secondary-color": "#155e75",
        "secondary-light-color": "#0e7490",
        "warm-color": "#fbbf24",
        "warm-light-color": "#fcd34d",
        "danger-color": "#dc2626",
        "danger-light-color": "#ef4444",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
