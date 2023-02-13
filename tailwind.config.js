/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
    },
    colors: {
      primary: '#ff55a5',
      text: '#ffffffbf',
      bgd: '#2b2b31',
    },
    fontFamily: {
      openSans: ['"Open Sans"'],
    },
  },
  plugins: [],
};
