const ModalBaseClasses = (theme) => ({
  '.overlay': {
    position: 'fixed',
    zIndex: '40',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme('spacing.10'),
    paddingTop: theme('spacing.10'),
    paddingLeft: theme('spacing.6'),
    paddingRight: theme('spacing.6'),
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  '.modal': {
    backgroundColor: theme('colors.gray.50'),
    borderRadius: theme('borderRadius.lg'),
    padding: theme('spacing.6'),
  },
});

module.exports = ModalBaseClasses;
