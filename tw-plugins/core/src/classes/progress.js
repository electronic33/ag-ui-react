const ProgressBaseClasses = (theme) => ({
  '.main-div-progress': {
    width: theme('width.full'),
    display: 'flex',
    itemsAlign: 'center',
  },
  '.progress-container': {
    width: theme('width.full'),
    height: theme('spacing.2'),
    backgroundColor: theme('colors.gray.200'),
    borderRadius: theme('borderRadius.full'),
  },
  '.progress-bar': {
    height: theme('height.full'),
    backgroundColor: theme('colors.blue.700'),
    borderRadius: theme('borderRadius.full'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.in-out'),
    transitionDuration: theme('transitionDuration.1000'),
  },
  '.progress-tracker': {
    color: theme('colors.gray.500'),
    marginLeft: theme('spacing.2'),
  },
});

module.exports = ProgressBaseClasses;
