const SwitchBaseClasses = (theme) => ({
  '.switch-not-active-bg-default': {
    backgroundColor: theme('gray.400'),
  },
  '.switch-color-transition': {
    transitionProperty: theme('transitionProperty.colors'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: '150ms',
  },
  '.switch-active-bg-default': {
    backgroundColor: theme('gray.200'),
  },
  '.switch-dot-bg-default': {
    backgroundColor: theme('gray.100'),
  },
  '.switch-active-dot': {
    left: theme('spacing.4'),
    top: `-${theme('spacing.1')}`,
    bottom: `-${theme('spacing.1')}`,
    right: theme('spacing.4'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
  },
  '.switch-not-active-dot': {
    left: theme('spacing.0'),
    top: `-${theme('spacing.1')}`,
    bottom: `-${theme('spacing.1')}`,
    right: theme('spacing.0'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
  },
  '.switch-container': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.switch-button': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    width: theme('spacing.8'),
    height: theme('spacing.3'),
  },
  '.switch-button-disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  '.switch-box': {
    position: 'absolute',
    top: theme('spacing.0'),
    right: theme('spacing.0'),
    bottom: theme('spacing.0'),
    left: theme('spacing.0'),
    borderRadius: theme('borderRadius.xl'),
  },
  '.switch-dot': {
    position: 'absolute',
    borderRadius: theme('borderRadius.full'),
    width: theme('spacing.5'),
    height: theme('spacing.5'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.linear'),
    transitionDuration: theme('transitionDuration.100'),
  },
  '.switch-error': {
    color: theme('colors.red.600'),
    marginTop: theme('spacing.2'),
  },
});

module.exports = SwitchBaseClasses;
