const { rgba } = require('polished');

const MenuButtonBaseClasses = (theme) => ({
  '.menu-button-popper-container': {
    backgroundColor: theme('colors.white'),
    borderRadius: theme('borderRadius.DEFAULT'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    zIndex: 20,
    '&:focus': {
      borderColor: 'transparent',
    },
  },
  '.menu-button-content': {
    position: 'relative',
  },
  '.menu-button-header-text': {
    color: theme('colors.gray.700'),
    fontWeight: theme('fontWeight.semibold'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    paddingBottom: theme('spacing.2'),
    borderBottomWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    width: '100%',
    marginRight: theme('spacing.10'),
  },
  '.menu-button-button': {
    position: 'absolute',
    flexShrink: 0,
    top: theme('spacing.1'),
    right: theme('spacing.2'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    color: theme('colors.gray.400'),
    zIndex: 10,
    '--tw-ring-color': rgba(theme('colors.blue.400'), Number(theme('ringOpacity.DEFAULT'))),
    '&:focus': {
      boxShadow:
        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    },
  },
  '.menu-button-svg': {
    flexShrink: 0,
  },
});

module.exports = MenuButtonBaseClasses;
