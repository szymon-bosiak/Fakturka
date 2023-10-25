/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-1": "#0C1117",
        "pale-blue": "#e6f1ff",
        background: "#CFCFCF",
        "grey-light": "#E7E7E9",
        "grey-mid": "#D2D3D5",
        "grey-dark": "#3B3B3D",
        "red-accent": "#C81E1E",
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
