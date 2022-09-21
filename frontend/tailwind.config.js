const colors = require("tailwindcss/lib/public/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      primary: "#111827",
      secondary: "#6b7280",
      accent: "#2563eb",
      "accent-light": "#93c5fd",
      "accent-strong": "#1e40af",
      white: "#ffffff",
      gray: "#f3f4f6",
      lightgray: "#f9fafb",
      red: "#dc2626",
      "red-strong": "#991b1b",
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
