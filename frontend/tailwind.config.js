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
  'blue-grey-irlen': 'rgb(220, 230, 242)', 
  'aqua-irlen': 'rgb(154, 184, 252)', 
  'turquoise-irlen': 'rgb(166, 248, 227)', 
  'green-irlen': 'rgb(170, 242, 160)',
  'yellow-irlen': 'rgb(255, 255, 143)', 
  'golden-irlen': 'rgb(255, 222, 117)', 
  'purple-irlen': 'rgb(191, 149, 223)',
  'peach-irlen': 'rgb(252, 213, 181)',
  'rose-irlen': 'rgb(227, 176, 175)',
  'grey-irlen': 'rgb(217, 217, 217)',
},
    },
  },
  plugins: [],
}