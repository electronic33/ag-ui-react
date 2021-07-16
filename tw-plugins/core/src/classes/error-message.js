const ErrorBaseClasses = (theme) => ({
  '.error-message': {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme('colors.red.100'),
    color: theme('colors.red.600'),
    padding: theme('spacing.2'),
    borderRadius: theme('borderRadius.md'),
    width: '100%',
    maxWidth: theme('maxWidth.sm'),
  },
  '.error-message-svg': {
    marginRight: theme('spacing.2'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    minWidth: theme('spacing.5'),
    flexShrink: 0,
  },
});

module.exports = ErrorBaseClasses;
