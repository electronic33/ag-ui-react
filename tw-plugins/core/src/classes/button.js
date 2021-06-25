const ButtonBaseClasses = (theme) => ({
  '.btn': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('colors.blue.500'),
    paddingRight: theme('spacing.8'),
    paddingLeft: theme('spacing.8'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    fontSize: theme('fontSize.xl'),
    color: theme('colors.white'),
  },
  '.btn-sm': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('colors.blue.500'),
    paddingRight: theme('spacing.4'),
    paddingLeft: theme('spacing.4'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    fontSize: theme('fontSize.sm'),
    color: theme('colors.white'),
  },
  '.btn-lg': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('colors.blue.500'),
    paddingRight: theme('spacing.12'),
    paddingLeft: theme('spacing.12'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    fontSize: theme('fontSize.3xl'),
    color: theme('colors.white'),
  },
  '.btn-disabled': {
    opacity: theme('opacity.75'),
    pointerEvents: 'none',
  },
  '.btn-icon-spinner-left': {
    marginRight: 'spacing.2',
    flexShrink: 0,
  },
  '.btn-icon-spinner-right': {
    marginLeft: 'spacing.2',
    flexShrink: 0,
  },
});

module.exports = ButtonBaseClasses;
