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
  'blue-grey': '#5d737e', // A more neutral, slightly desaturated blue-grey
  'aqua': '#0077bb', // A more distinct aqua that works better with blue-yellow color blindness
  'turquoise': '#00aaff', // Slightly darker and more saturated turquoise
  'green': '#009e73', // A distinct green that is friendly for red-green color blindness
  'yellow': '#f0e442', // A softer yellow, more distinct from green and red
  'golden': '#ffde75', // An orange-gold to differentiate from green and yellow
  'purple': '#cc79a7', // A magenta-purple that stands out
  'peach': '#f9a65a', // A peach with more orange tones
  'rose': '#e69f00', // A warm rose color
  'grey': '#999999', // A neutral grey
},

    },
  },
  plugins: [],
}