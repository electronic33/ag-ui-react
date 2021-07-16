const ScrollToBaseClasses = (theme) => ({
  '.scroll-to-main-div': {
    backgroundColor: theme('colors.gray.50'),
    borderRadius: theme('borderRadius.full'),
    position: 'fixed',
    right: theme('spacing.2'),
    bottom: theme('spacing.4'),
    zIndex: 10,
    color: theme('colors.gray.500'),
    boxShadow: theme('boxShadow.xl'),
    fontSize: theme('fontSize.3xl'),
    lineHeight: theme('lineHeight.9'),
    padding: theme('spacing.2'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.300'),
    cursor: 'pointer',
    '@media (min-width: 640px)': {
      right: theme('spacing.7'),
      bottom: theme('spacing.12'),
      fontSize: theme('fontSize.5xl'),
    },
  },
  '.scroll-to-hide-scroll': {
    opacity: 0,
    pointerEvents: 'none',
  },
  '.scroll-to-show-scroll': {
    opacity: 100,
  },
});

module.exports = ScrollToBaseClasses;
