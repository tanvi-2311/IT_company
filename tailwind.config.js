/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#234b2f', // Deep Forest Green
          dark: '#16311e',
        },
        secondary: {
          DEFAULT: '#112517', // Very Dark Green for headings
          dark: '#08130b',
        },
        brand: {
          sand: '#cdbfa8', // Sand/Beige
          sage: '#e8f1ec', // Light Mint/Sage
          cream: '#f5f0e7', // Cream
        },
        dark: '#112517',
        lightbg: '#f5f0e7', // Light background now cream
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
