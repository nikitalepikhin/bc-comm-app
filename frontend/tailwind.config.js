const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      colors: {
        // text colors
        primary: colors.slate["900"],
        secondary: colors.slate["500"],
        // background colors
        background: colors.slate["100"],
        "background-dark": colors.slate["900"],
        transparent: "transparent",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
