module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        article: '800px',
      },
      colors: {
        brand: {
          500: '#f2aa4cff',
        },
        gray: {
          10: 'rgb(250, 250, 250)',
          50: 'rgb(246, 246, 246)',
          100: 'rgb(238, 238, 238)',
          200: 'rgb(225, 225, 225)',
          300: 'rgb(202, 202, 202)',
          400: 'rgb(157, 157, 157)',
          500: 'rgb(110, 110, 110)',
          600: 'rgb(69, 69, 69)',
          700: 'rgb(46, 46, 46)',
          800: 'rgb(32, 32, 32)',
          900: 'rgb(26, 26, 26)',
        },
      },
    },
    fontFamily: {
      sans: '"Silka",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    },
  },
  plugins: [],
};
