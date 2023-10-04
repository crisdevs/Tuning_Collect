/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./client/components/*.{jsx,js}", "./public/*.{html}", "./client/*.{js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#3BBA9C', 
      }
    },
  },
  plugins: [],
}

