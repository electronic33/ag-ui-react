const SuggestionTextInputBaseClasses = (theme) => ({
  '.suggestion-text-input-container': {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme('boxShadow.md'),
    marginTop: theme('spacing.4'),
    marginBottom: theme('spacing.4'),
  },
  '.suggestion-text-input-suggestion': {
    paddingLeft: theme('spacing.4'),
    paddingRight: theme('spacing.4'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    textAlign: 'left',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme('colors.gray.200'),
    },
  },
  '.suggestion-text-input-suggestion-active': {
    backgroundColor: theme('colors.gray.200'),
  },
});

module.exports = SuggestionTextInputBaseClasses;
