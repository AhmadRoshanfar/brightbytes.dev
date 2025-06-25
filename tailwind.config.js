/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "footer-bg": "#132942",
        "post-bg": "#025464",
        "linkedin-bg": " #0a66c2",
        "youtube-bg": "#CD201F",
        "logo-color": "#0DD04E",
        "logo-bg-color": "#232323",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
