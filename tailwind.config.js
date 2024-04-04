/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./client/components/*.{jsx,js}", "./public/*.{html}", "./client/*.{js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1', 
        'main': '#0a1828'
      }
    },
  }
}

