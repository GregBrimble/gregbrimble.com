const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.html", "./app/**/*.{js,jsx,ts,tsx,md,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      // This mess until dark mode is added to @tailwindcss/typography
      typography: (theme) => ({
        "@light": {
          css: {
            '[class~="lead"]': {
              color: theme("colors.gray.300", colors.gray[300]),
            },
            a: {
              color: theme("colors.white", colors.white),
            },
            strong: {
              color: theme("colors.white", colors.white),
            },
            "ol > li::before": {
              color: theme("colors.gray.400", colors.gray[400]),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.600", colors.gray[600]),
            },
            hr: {
              borderColor: theme("colors.gray.700", colors.gray[700]),
            },
            blockquote: {
              color: theme("colors.white", colors.white),
              borderLeftColor: theme("colors.gray.700", colors.gray[700]),
            },
            h1: {
              color: theme("colors.white", colors.white),
            },
            h2: {
              color: theme("colors.white", colors.white),
            },
            h3: {
              color: theme("colors.white", colors.white),
            },
            h4: {
              color: theme("colors.white", colors.white),
            },
            "figure figcaption": {
              color: theme("colors.gray.400", colors.gray[400]),
            },
            code: {
              color: theme("colors.white", colors.white),
            },
            "a code": {
              color: theme("colors.white", colors.white),
            },
            // pre is intentionally omitted
            thead: {
              color: theme("colors.white", colors.white),
              borderBottomColor: theme("colors.gray.600", colors.gray[600]),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.700", colors.gray[700]),
            },
          },
        },
        "blue@light": {
          css: {
            a: {
              color: theme("colors.blue.300", colors.blue[300]),
            },
            "a code": {
              color: theme("colors.blue.300", colors.blue[300]),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
