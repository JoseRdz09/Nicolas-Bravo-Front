/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'friar-gray': {
          '50': '#f7f7f6',
          '100': '#e5e4e2',
          '200': '#cbc9c4',
          '300': '#a9a79f',
          '400': '#7d7c72',
          '500': '#6c6a60',
          '600': '#55544c',
          '700': '#46463f',
          '800': '#3a3a35',
          '900': '#33322e',
          '950': '#1b1b18',
        },
        'picton-blue': {
          '400': '#35abe5'
        },
        'persian-blue': {
          '50': '#eaf5ff',
          '100': '#d9ecff',
          '200': '#bbdcff',
          '300': '#92c3ff',
          '400': '#679dff',
          '500': '#4477ff',
          '600': '#244dff',
          '700': '#193de9',
          '800': '#1633b2',
          '900': '#1c3593',
          '950': '#111e55',
        },
      },
    },
  },
  plugins: [],
}
