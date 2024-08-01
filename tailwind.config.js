/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
    },
  },
  plugins: [],
});
