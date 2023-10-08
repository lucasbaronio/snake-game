/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js}'
  ],
  theme: {
    extend: {
      colors: {
        banner: 'rgba(1, 22, 39, 0.84)'
      },
      boxShadow: {
        banner: '1px 5px 11px 0px rgba(2, 18, 27, 0.71) inset'
      }
    }
  },
  plugins: []
}
