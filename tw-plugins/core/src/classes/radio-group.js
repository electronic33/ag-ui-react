const { rgba } = require('polished');

const RadioGroupBaseClasses = (theme) => ({
  '.radio-group-unchecked-bg-default': {
    backgroundColor: theme('colors.gray.50'),
  },
  '.radio-group-checked-bg-default': {
    backgroundColor: theme('colors.blue.400'),
  },
  '.radio-group-tick-checked-default': {
    color: theme('colors.gray.50'),
  },
  '.radio-group-label-sm': {
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
  },
  '.radio-group-label-xl': {
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
  },
  '.radio-group-button': {
    borderRadius: theme('borderRadius.full'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.300'),
  },
  '.radio-group-button-unchecked': {
    borderColor: theme('colors.gray.200'),
  },
  '.radio-group-button-checked': {
    borderStyle: 'none',
  },
  '.radio-group-button-sm': {
    width: theme('spacing.3'),
    height: theme('spacing.3'),
  },
  '.radio-group-button-md': {
    width: theme('spacing.3.5'),
    height: theme('spacing.3.5'),
  },
  '.radio-group-button-lg': {
    width: theme('spacing.4'),
    height: theme('spacing.4'),
  },
  '.radio-group-button-xl': {
    width: theme('spacing.5'),
    height: theme('spacing.5'),
  },
  '.radio-group-button-is-checked': {
    backgroundColor: theme('colors.white'),
    borderRadius: theme('borderRadius.full'),
  },

  '.radio-group-button-checked-sm': {
    width: theme('spacing.1'),
    height: theme('spacing.1'),
  },
  '.radio-group-button-checked-md': {
    width: theme('spacing.1.5'),
    height: theme('spacing.1.5'),
  },
  '.radio-group-button-checked-lg': {
    width: theme('spacing.1.5'),
    height: theme('spacing.1.5'),
  },
  '.radio-group-button-checked-xl': {
    width: theme('spacing.2'),
    height: theme('spacing.2'),
  },
  '.radio-group-focus': {
    '--tw-ring-color': rgba(theme('colors.blue.300'), Number(theme('ringOpacity.DEFAULT'))),
    '&:focus': {
      boxShadow:
        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    },
  },
});

module.exports = RadioGroupBaseClasses;
