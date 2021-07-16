const TextAreaBaseClasses = (theme) => ({
  '.text-area-container': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  '.text-area': {
    borderRadius: theme('borderRadius.md'),
    borderWidth: theme('borderWidth.2'),
    borderColor: theme('color.gray.300'),
    padding: theme('spacing.2'),
    maxWidth: theme('spacing.96'),
  },
  '.text-area-label-icon': {
    width: theme('spacing.5'),
    marginRight: theme('spacing.2'),
  },
  '.text-area-error': {
    borderColor: theme('colors.red.700'),
    backgroundColor: theme('colors.gray.200'),
  },
  '.text-area-with-max': {
    display: 'flex',
    position: 'absolute',
    right: theme('spacing.0'),
    bottom: theme('spacing.0'),
    color: theme('colors.gray.400'),
    marginBottom: `-${theme('spacing.4')}`,
  },
  '.text-area-with-error-label': {
    display: 'flex',
    position: 'absolute',
    right: theme('spacing.0'),
    left: theme('spacing.0'),
    bottom: theme('spacing.0'),
    color: theme('colors.red.700'),
    marginBottom: `-${theme('spacing.4')}`,
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
  },
});

module.exports = TextAreaBaseClasses;
