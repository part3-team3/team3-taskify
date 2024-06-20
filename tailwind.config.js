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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

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

        'black-10': '#4B4B4B',
        'black-20': '#333236',
        'black-30': '#171717',

        violet: {
          10: '#F1EFFD',
          20: '#5534DA',
        },
      },

      screens: {
        sm: { min: '375px', max: '767px' },
        md: { min: '768px', max: '1199px' },
      },
    },
  },
  plugins: [],
};
