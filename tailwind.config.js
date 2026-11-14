/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F1EA",
          50: "#FBF8F4",
          100: "#F6F1EA",
          200: "#EDE4D8",
          300: "#E1D5C5",
          400: "#CFC0AC",
        },
        ink: {
          DEFAULT: "#2E2A26",
          950: "#171512",
          900: "#211E1B",
          800: "#2E2A26",
          700: "#3D3731",
          600: "#574F47",
          500: "#786E63",
          400: "#9C9185",
        },
        clay: {
          DEFAULT: "#C96F4A",
          300: "#E6BCA8",
          400: "#E0A184",
          500: "#C96F4A",
          600: "#B25E3C",
          700: "#9E4E2C",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        lift: "0 24px 60px -32px rgba(46, 42, 38, 0.35)",
        glow: "0 30px 70px -35px rgba(201, 111, 74, 0.55)",
        inset: "inset 0 1px 0 0 rgba(246, 241, 234, 0.08)",
      },
      letterSpacing: {
        label: "0.22em",
        wide2: "0.16em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 9s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
