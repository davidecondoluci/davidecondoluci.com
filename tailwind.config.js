/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        serif: ['"Supreme"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        transparent: "transparent",
        gray: "#3b3b3b",
        lightgray: "#96AFB8",
        green: "#5ddc5b",
        lightgreen: "#F8FFF8",
        white: "#ffffff",
        black: "#000000",
        black50: "#00000075",
        red: "#FF396F",
        blue: "#0068C8",
      },
    },
  },
  plugins: [],
};
