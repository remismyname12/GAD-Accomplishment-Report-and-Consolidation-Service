/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#B51FE0',
        'secondary': '#62F4B5',
        'accent': '#F4B562'
      },
    
      dropShadow: {
        'gs': ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.3)']
      },

      scale: {
        'sm': '1.05',
        '1xl': '1.5'
      },
    },
  },
  plugins: [],
}

