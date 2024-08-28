/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
  'default': 'rgb(255, 255, 255)',   
  'blue-grey': 'rgb(220, 230, 242)', 
  'aqua': 'rgb(154, 184, 252)', 
  'turquoise': 'rgb(166, 248, 227)', 
  'green': 'rgb(170, 242, 160)',
  'yellow': 'rgb(255, 255, 143)', 
  'golden': 'rgb(255, 222, 117)', 
  'purple': 'rgb(191, 149, 223)',
  'peach': 'rgb(252, 213, 181)',
  'rose': 'rgb(227, 176, 175)',
  'grey': 'rgb(217, 217, 217)',
},
    },
  },
  plugins: [],
}