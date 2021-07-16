const MarkdownbaseClasses = (theme) => ({
  '.markdown-container': {
    display: 'flex',
  },
  '.markdown-textarea': {
    width: '100%',
  },
  '.markdown-textarea-container': {
    width: theme('width.1/2'),
    backgroundColor: theme('colors.gray.400'),
    padding: theme('spacing.10'),
  },
  '.markdown': {
    width: theme('width.1/2'),
    backgroundColor: theme('colors.gray.400'),
    padding: theme('spacing.10'),
    '>h1': {
      fontWeight: 700,
      fontSize: theme('fontSize.2xl'),
      lineHeight: theme('lineHeight.8'),
    },
    '>h2': {
      fontWeight: 700,
      fontSize: theme('fontSize.xl'),
      lineHeight: theme('lineHeight.5'),
    },
  },
});

module.exports = MarkdownbaseClasses;
