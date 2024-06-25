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
        primary: "#5067d9",
        deepBlue: "#203f80",
        backcground: "#8bb2ff",
        // primary: "#464646",
        // secondary: "#CCCCF5",
        "title-text": "#515B6F",
        gray: "#828282",
        "gray-2": "#F8FAFE",
        neutrals: "#25324B",
      },
    },
  },
  plugins: [
    daisyui
  ],
}

