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
          50: '#FEF6EC',
          100: '#FCEDD9',
          200: '#FADDB8',
          300: '#F7CB92',
          400: '#F5BB70',
          500: '#F2AA4C',
          600: '#EE8E11',
          700: '#B0690D',
          800: '#774709',
          900: '#392204',
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
