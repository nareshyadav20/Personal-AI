/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark shades for sleek UI
        slate: {
          850: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
  plugins: [],
}