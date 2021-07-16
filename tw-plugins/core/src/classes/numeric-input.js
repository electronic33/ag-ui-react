const NumericInputBaseClasses = (theme) => ({
  // '.no-arrows-numeric-input': {
  //   '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
  //     '-webkit-appearance': 'none',
  //     margin: 0,
  //   },
  // },
  '.numeric-input-container': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  '.numeric-input-label': {
    width: theme('spacing.5'),
    marginRight: theme('spacing.2'),
  },
  '.numeric-input-main-div': {
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
    '.numeric-input-main-div': {
      boxShadow: theme('boxShadow.md'),
    },
  },
  '.numeric-input-input': {
    width: '100%',
    // outline-none
    outline: '2px solid transparent',
    outlineOffset: '2px',
    marginLeft: theme('spacing.2'),
  },
  '.numeric-input-input-formik-error': {
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.red.700'),
  },
  '.numeric-input-input-disabled': {
    backgroundColor: theme('colors.gray.200'),
    borderColor: theme('color.red.700'),
    cursor: 'not-allowed',
  },
  '.numeric-input-div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme('spacing.8'),
  },
  '.numeric-input-div-button': {
    height: '100%',
    backgroundColor: theme('colors.gray.100'),
    width: '100%',
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.gray.300'),
    borderTopRightRadius: theme('borderRadius.md'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.75'),
    '&:active': {
      backgroundColor: theme('colors.gray.300'),
      boxShadow: theme('boxShadow.inner'),
    },
  },
  '.numeric-input-div-button-2': {
    height: '100%',
    backgroundColor: theme('colors.gray.100'),
    width: '100%',
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.gray.300'),
    borderBottomRightRadius: theme('borderRadius.md'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.75'),
    '&:active': {
      backgroundColor: theme('colors.gray.300'),
      boxShadow: theme('boxShadow.inner'),
    },
  },
  '.numeric-input-div-button-svg': {
    flexShrink: 0,
    width: '100%',
  },
  '.numeric-input-with-button': {
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
  '.numeric-input-with-max': {
    display: 'flex',
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    color: theme('colors.gray.400'),
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
    marginBottom: `-${theme('spacing.4')}`,
  },
  '.numeric-input-with-error-in-label': {
    display: 'flex',
    position: 'absolute',
    right: '0px',
    left: '0px',
    bottom: '0px',
    color: theme('colors.red.700'),
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
    marginBottom: `-${theme('spacing.4')}`,
  },
});

module.exports = NumericInputBaseClasses;
