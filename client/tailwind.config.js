/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      pop: ["Poppins", "sans-serif"],
      lobStar: ["Lobster", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
