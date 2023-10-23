/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-1": "#0C1117",
        "pale-blue": "#e6f1ff",
        background: "#F1F2F3",
      },
      aspectRatio: {
        A4: "1 / 1.41",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    screens: {
      xs: "580px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
