/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
  'default': '#f0f0f0', 
  'blue-grey': '#5d737e', 
  'aqua': '#0077bb', 
  'turquoise': '#00aaff', 
  'green': '#009e73',
  'yellow': '#f0e442', 
  'golden': '#ffde75', 
  'purple': '#cc79a7',
  'peach': '#f9a65a',
  'rose': '#e69f00',
  'grey': '#999999',
},
    },
  },
  plugins: [],
}