module.exports = {
  semi: false,
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'es5',

  tailwindConfig: './tailwind.config.js',

  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
      },
    },
  ],
};
