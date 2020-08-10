module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/ui"),
    require("tailwindcss-font-inter")({
      importFontFace: true,
    }),
  ],
};
