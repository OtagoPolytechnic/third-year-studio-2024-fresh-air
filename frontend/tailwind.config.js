/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'default': '#f0f0f0', // Default color, adjust as needed
        'blue-grey': '#607d8b',
        'aqua': '#00ffff',
        'turquoise': '#40e0d0',
        'green': '#4caf50',
        'yellow': '#ffeb3b',
        'golden': '#ffd700',
        'purple': '#9c27b0',
        'peach': '#ffcba4',
        'rose': '#f06292',
        'grey': '#9e9e9e',
      },
    },
  },
  plugins: [],
}