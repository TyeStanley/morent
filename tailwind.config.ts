import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        growShrink: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(1.25)",
            opacity: "1",
          },
        },
        heartJump: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.5)",
          },
        },
      },
      animation: {
        growShrink: "growShrink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        heartJump: "heartJump 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
      },
      colors: {
        "primary-blue": {
          50: "#C3D4E9",
          100: "#94A7CB",
          300: "#5CAFFC",
          500: "#3563E9",
        },
        "primary-gray": {
          400: "#90A3BF",
          700: "#3D5278",
          800: "#424B5C",
          850: "#293346",
          900: "#1A202C",
        },
        "light-white": {
          100: "#F7F9FC",
          200: "#F6F7F9",
        },
        "primary-red": "#ED3F3F",
        "off-gray": "#1E2430",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        customShadow: "20px 0 60px 60px #F6F7F9",
        customShadowDark: "20px 0 60px 60px #1A202C",
      },
      screens: {
        smd: "700px",
        mdl: "960px",
        lgx: "1100px",
      },
    },
  },
  plugins: [],
};
export default config;
