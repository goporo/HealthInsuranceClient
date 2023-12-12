/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#2DA3CA',
          light: '#2DA3CA',
          darker: '#3699B8',
          200: '#D5E5F1',
        },
        black: {
          primary: '#000000',
        },
        green: {
          primary: '#355E3B',
        }

      }
    },
  },
  plugins: [],
}
