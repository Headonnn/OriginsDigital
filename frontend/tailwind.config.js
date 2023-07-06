/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    safelist: {},
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animated")],
};
