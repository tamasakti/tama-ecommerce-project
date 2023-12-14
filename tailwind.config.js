/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cardLogin" : "#D8DAE6",
        "cardColor" : "#FBFDFC"
      }
    },
  },
  plugins: [],
}

