/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sketch-book': 'src/src_assets/img/diaryImg.svg',
      }
    },
  },
  plugins: [],
}
