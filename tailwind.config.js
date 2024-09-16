/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgb(44, 174, 186) -2px 0px 0px 0px",
      },
      colors: {
        jade: "#00A86B",
        "black-100": "#0d0d0d", // lighter black
        "black-200": "#1a1a1a",
        "black-300": "#262626",
        "black-400": "#333333",
        "black-500": "#404040",
        "black-600": "#4d4d4d", // less intense black
        "black-700": "#595959",
        "black-800": "#666666", // approaching gray
        "black-900": "#000000", 
      },
      "theme-green": {
        primary: "#316b38", // Background primary
        secondary: "#b3f2b3", // Background secondary
        tertiary: "#d5e8d1",
        dark: "#304030",
        accent: "#165223",
      },
      "theme-text-green": {
        primary: "#98d69a", // Text primary
        secondary: "#316b38", // Text secondary
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};



