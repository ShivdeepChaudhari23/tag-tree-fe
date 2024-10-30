/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Add paths to your JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        collapseBackground: '#61a2ec',
        grey: '#dedede',
      }
    },
  },
  plugins: [],
}