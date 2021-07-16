const LabelBaseClasses = (theme) => ({
  '.label': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme('spacing.2'),
    fontSize: '1rem',
    lineHeight: theme('spacing.6'),
    color: theme('colors.gray.700'),
  },
  '.label-with-required-indicator': {
    marginLeft: theme('spacing.px'),
    alignSelf: 'flex-start',
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
    fontWeight: theme('fontWeight.thin'),
    color: theme('colors.red.600'),
  },
  '.label-secondary-text': {
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
    color: theme('colors.gray.400'),
  },
  '.label-with-indicator-margin': {
    marginLeft: theme('spacing.1'),
  },
  '.label-without-indicator-margin': {
    marginLeft: theme('spacing.2'),
  },
  '.label-error-text': {
    marginLeft: theme('spacing.1'),
    color: theme('colors.red.600'),
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
  },
});

module.exports = LabelBaseClasses;
