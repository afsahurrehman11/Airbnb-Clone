/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Button': '#FB335A',
        "searchButton": "#E41D56",
        "primary": "#E41D56",
      },
    },
  },
  plugins: [],
}