/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'belowSm': '387px',
      },
      colors: {
        "footer-darkblue": '#22262F',
        "grey-copyright" : '#AFAFAF',
        "buttonOrange":"#F2994A",
        "mainBg":"#F8FAFC"
      },
      borderWidth: {
        1: "1px",
      },
      backgroundImage: {
        "home-banner": "url('/assets/homebanner.png')",
      },
      height: {
        '450': '28rem',
        '500': '31rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
