/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        fondo: '#0f0e0b',
        superficie: '#1a1814',
        'superficie-2': '#252219',
        borde: '#2e2b24',
        oro: '#c9a84c',
        'oro-claro': '#e8c96a',
        crema: '#f0ead6',
        apagado: '#8a8070',
        marron: '#b8af8e',
        libre: '#6fbf73',
        ocupado: '#d06a5a',
      },
      fontFamily: {
        display: ['CormorantGaramond-SemiBold'],
        body: ['PlusJakartaSans-Regular'], 'body-semibold': ['PlusJakartaSans-SemiBold'],
      },
    },
  },

  plugins: [],
};