const MarkdownbaseClasses = (theme) => ({
  ".markdown": {
    ">h1": {
      fontWeight: 700,
      fontSize: theme("fontSize.2xl"),
      lineHeight: theme("lineHeight.8"),
    },
    ">h2": {
      fontWeight: 700,
      fontSize: theme("fontSize.xl"),
      lineHeight: theme("lineHeight.5"),
    },
  },
});

module.exports = MarkdownbaseClasses;
