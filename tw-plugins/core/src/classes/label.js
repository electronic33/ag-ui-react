const LabelBaseClasses = (theme) => ({
  '.label': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme('spacing.2'),
    fontSize: '1rem',
    lineHeight: theme('spacing.6'),
    color: theme('colors.gray.700'),
  },
});

module.exports = LabelBaseClasses;
