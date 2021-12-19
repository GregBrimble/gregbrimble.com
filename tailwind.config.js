const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./public/**/*.html", "./app/**/*.{js,jsx,ts,tsx,md,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "ping-small": "ping-small 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "ping-small": {
          "75%, 100%": {
            transform: "scale(1.5)",
            opacity: "0",
          },
        },
      },
      // This mess until dark mode is added to @tailwindcss/typography
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "pre code": {
              paddingRight: "24px",
            },

            "--tw-prose-body": theme("colors.gray[500]"),
            "--tw-prose-invert-body": theme("colors.gray[400]"),
            "--tw-prose-links": theme("colors.blue[600]"),
            "--tw-prose-invert-links": theme("colors.blue[300]"),
            "--tw-prose-invert-pre-bg": "#080c13",
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addVariant }) => {
      addVariant("no-js", ".no-js &");
    }),
  ],
};
