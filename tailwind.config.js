/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#000F0F',
        'teal': '#00C59A',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
