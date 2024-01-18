/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "murotal.html", "./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#739072",
        secondary: "#86A789",
        dark: "#4F6F52",
        light: "#D2E3C8",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
