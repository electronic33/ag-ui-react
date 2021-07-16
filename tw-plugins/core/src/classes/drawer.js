const DrawerBaseClasses = (theme) => ({
  '.drawer-container': {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 10,
    width: '100vw',
    height: '100vh',
    backgroundColor: theme('colors.black'),
  },
  '.drawer': {
    backgroundColor: theme('drawer-bg-color') || theme('colors.gray.700'),
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 20,
  },
  '.drawer-horizontal': {
    width: '100%',
    height: 'auto',
  },
  '.drawer-vertical': {
    width: theme('spacing.64'),
    height: theme('height.screen'),
  },
  '.drawer-ul': {
    width: theme('width.full'),
  },
  '.drawer-li-1': {
    width: theme('width.full'),
    backgroundColor: theme('colors.gray.700'),
    height: theme('spacing.20'),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  '.drawer-li-left': {
    justifyContent: 'flex-start',
  },
  '.drawer-li-right': {
    justifyContent: 'flex-end',
  },
  '.drawer-close-button-left': {
    paddingLeft: theme('spacing.8'),
  },
  '.drawer-close-button-right': {
    paddingRight: theme('spacing.8'),
  },

  '.close-button-container': {
    marginLeft: theme('spacing.8'),
    fontSize: theme('fontSize.3xl'),
    lineHeight: theme('lineHeight.9'),
    color: theme('colors.white'),
  },
  '.drawer-link': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    height: theme('spacing.14'),
    paddingLeft: theme('spacing.5'),
    color: theme('colors.white'),
    '&:hover': {
      backgroundColor: theme('colors.gray.500'),
    },
  },
  '.drawer-link-icon': {
    marginRight: theme('spacing.2'),
  },
});

module.exports = DrawerBaseClasses;
