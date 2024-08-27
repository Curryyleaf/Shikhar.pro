/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgb(44, 174, 186) -2px 0px 0px 0px",
      },
       colors: {
        jade: '#00A86B',
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};



