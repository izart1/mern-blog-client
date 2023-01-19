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
    },
  },
  plugins: [],
};
