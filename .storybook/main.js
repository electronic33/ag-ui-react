module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // webpackFinal: (config) => {
  //   return {
  //     ...config,
  //     module: {
  //       ...config.module,
  //       rules: [
  //         // Filter out the default .css rule.
  //         ...config.module.rules.filter((rule) => /\.css$/ !== rule.test),
  //         // Add our own css rule which in turn will read the postcss.config.js from project root.
  //         {
  //           test: /\.css1$/,
  //           exclude: [/\.module\.css$/, /@storybook/],
  //           use: [
  //             "style-loader",
  //             {
  //               loader: "css-loader",
  //               options: { importLoaders: 1, sourceMap: false },
  //             },
  //             {
  //               loader: "postcss-loader",
  //               options: {
  //                 ident: "postcss",
  //                 sourceMap: false,
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   };
  // },
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          // Filter out the default .css and .module.css rules and replace them with our own.
          ...(config.module.rules = config.module.rules.map((f) => {
            if (f.oneOf === undefined) {
              return f
            }

            return {
              oneOf: f.oneOf.map((r) => {
                if (r.test === undefined) {
                  return r
                }

                if (r.test.toString() === '/\\.css$/' || r.test.toString() === '/\\.js$/') {
                  return {
                    test: /(\.css|\.js)$/,
                    exclude: [/\.module\.css$/, /@storybook/],
                    include: path.resolve(__dirname, "../"),
                    use: [
                      'style-loader',
                      {
                        loader: 'css-loader',
                        options: { importLoaders: 1, sourceMap: false },
                      },
                      { loader: 'postcss-loader', options: {
                        postcssOptions: {
                          parser: "postcss-js",
                        },
                        execute: true,
                      } },
                    ],
                  }
                }
                if (r.test.toString() === '/\\.module\\.css$/') {
                  return {
                    test: /\.module\.css$/,
                    exclude: [/@storybook/],
                    include: path.resolve(__dirname, "../"),
                    use: [
                      'style-loader',
                      {
                        loader: 'css-loader',
                        options: { importLoaders: 1, sourceMap: false, modules: true },
                      },
                      'postcss-loader',
                    ],
                  }
                }
                return r
              }),
            }
          })),
        ],
      },
    }
  },
};
