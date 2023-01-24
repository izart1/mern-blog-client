/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: theme => ({
      center: true,

      // To add horizontal padding by default
      // padding: theme('spacing.4'),
    }),
    extend: {
      fontFamily: {
        // // sans: ['"Inter var"', "sans-serif"],
        // play: ['Play', 'sans-serif', 'system-ui'],
        // roboto: ['"Roboto Condensed"', 'sans-serif', 'system-ui'],
        // logo: ['"Aqum 2 Classic"'],
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
