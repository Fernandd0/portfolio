/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
				primary: "#111111",
        secondary: "rgba(0, 0, 0, 0.2)"
			},
      fontFamily: {
        retro: ['"Press Start 2P"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace", "sans-serif"],
      },
      boxShadow: {
        'default': '0.3em 0.3em  rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};
