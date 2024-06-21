const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: px0_50,
      fontSize: px0_100,
      spacing: px0_200,
      width: px0_400,

      colors: {
        red: '#D6173A',
        green: '#7AC555',
        purple: '#760DDE',
        orange: '#FFA500',
        pink: '#E876EA',
        blue: '#76A5EA',

        gray: {
          10: '#FAFAFA',
          20: '#EEEEEE',
          30: '#D9D9D9',
          40: '#9FA6B2',
          50: '#787486',
        },

        black: {
          DEFAULT: '#000000',
          10: '#4B4B4B',
          20: '#333236',
          30: '#171717',
        },

        violet: {
          10: '#F1EFFD',
          20: '#5534DA',
        },
      },
    },
  },
  plugins: [],
};
