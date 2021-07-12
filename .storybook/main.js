module.exports = {
  stories: ['../packages/**/*.stories.@(tsx|mdx)'],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        }
      },
    }
  ],
  typescript: {
    check: false,
    checkOptions: {},
    // TODO: react-docgen-typescript when https://github.com/styleguidist/react-docgen-typescript/issues/356 gets resolved
    reactDocgen: 'none',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
