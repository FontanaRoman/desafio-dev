// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dorado: {
          DEFAULT: 'rgb(234, 190, 63)',
        },
      },
    },
  },
  plugins: [],
};
