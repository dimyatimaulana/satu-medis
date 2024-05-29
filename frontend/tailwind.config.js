/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#2E90FA",
        "title-text": "#515B6F",
        gray: "#828282",
        "gray-2": "#F8FAFE",
        secondary: "#CCCCF5",
        neutrals: "#25324B",
      },
    },
  },
  plugins: [
    daisyui
  ],
}

