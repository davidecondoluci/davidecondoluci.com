/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Funnel Display"', ...defaultTheme.fontFamily.sans],
        serif: ['"Fraunces 72pt"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        transparent: "transparent",
        black: "#030712",
        white: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
