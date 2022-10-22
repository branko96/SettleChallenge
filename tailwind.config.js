/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/screens/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        error: 'red',
      },
    },
  },
  plugins: [],
};
