const ToggleButtonGroupBaseClasses = (theme) => ({
  '.toggle-button-group-button': {
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
  },
  '.toggle-button-group-button-not-multiple': {
    backgroundColor: theme('colors.blue.700'),
  },
});

module.exports = ToggleButtonGroupBaseClasses;
