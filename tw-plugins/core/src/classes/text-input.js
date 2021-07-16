const TextInputBaseClasses = (theme) => ({
  '.text-input': {
    borderRadius: theme('borderRadius.md'),
    borderWidth: theme('borderWidth.2'),
    borderColor: theme('color.gray.200'),
    padding: theme('input.py') || theme('spacing.2'),
    // height: theme('spacing.10'),
    paddingLeft: theme('input.px') || theme('spacing.3'),
    paddingRight: theme('input.px') || theme('spacing.3'),
    // maxWidth: theme('spacing.96'),
  },
  '.text-input-container': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  '.text-input-label-icon': {
    width: theme('spacing.5'),
    marginRight: theme('spacing.2'),
  },
  '.text-input-input-wrapper': {
    display: 'flex',
    justifyContent: 'space-between',
    height: theme('spacing.10'),
    borderRadius: theme('borderRadius.md'),
    boxShadow: theme('boxShadow.DEFAULT'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
    '&:hover': {
      boxShadow: theme('boxShadow.md'),
    },
  },
  '.text-input-input-wrapper-focus': {
    boxShadow: theme('boxShadow.md'),
  },
  '.text-input-input': {
    width: '100%',
    marginLeft: theme('spacing.2'),
    outline: '2px solid transparent',
    outlineOffset: '2px',
  },
  '.text-input-input-error': {
    borderColor: theme('colors.red.700'),
  },
  '.text-input-input-disabled': {
    backgroundColor: theme('colors.gray.200'),
    cursor: 'not-allowed',
  },
  '.text-input-input-button': {
    flexShrink: 0,
    borderTopLeftRadius: theme('borderRadius.none'),
    borderBottomLeftRadius: theme('borderRadius.none'),
    outline: '2px solid transparent',
    outlineOffset: '2px',
    '&:hover': {
      backgroundColor: theme('colors.blue.600'),
    },
    '&:active': {
      boxShadow: theme('boxShadow.inner'),
    },
  },
  '.text-input-with-max': {
    display: 'flex',
    position: 'absolute',
    right: theme('spacing.0'),
    bottom: theme('spacing.0'),
    color: theme('colors.gray.400'),
    marginBottom: `-${theme('spacing.4')}`,
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
  },
  '.text-input-with-error': {
    display: 'flex',
    position: 'absolute',
    left: theme('spacing.0'),
    right: theme('spacing.0'),
    bottom: theme('spacing.0'),
    color: theme('colors.red.700'),
    marginBottom: `-${theme('spacing.4')}`,
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
  },
});

module.exports = TextInputBaseClasses;
