/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig }
 */
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
        green: {
          css: {
            "--tw-prose-body": theme("colors.green[700]"),
            "--tw-prose-invert-body": theme("colors.green[200]"),
            "--tw-prose-links": theme("colors.green[700]"),
            "--tw-prose-invert-links": theme("colors.green[200]"),
          },
        },
        blue: {
          css: {
            "--tw-prose-body": theme("colors.blue[700]"),
            "--tw-prose-invert-body": theme("colors.blue[200]"),
            "--tw-prose-links": theme("colors.blue[700]"),
            "--tw-prose-invert-links": theme("colors.blue[200]"),
          },
        },
        yellow: {
          css: {
            "--tw-prose-body": theme("colors.yellow[700]"),
            "--tw-prose-invert-body": theme("colors.yellow[200]"),
            "--tw-prose-links": theme("colors.yellow[700]"),
            "--tw-prose-invert-links": theme("colors.yellow[200]"),
          },
        },
        red: {
          css: {
            "--tw-prose-body": theme("colors.red[700]"),
            "--tw-prose-invert-body": theme("colors.red[200]"),
            "--tw-prose-links": theme("colors.red[700]"),
            "--tw-prose-invert-links": theme("colors.red[200]"),
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
