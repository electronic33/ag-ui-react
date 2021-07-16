const ModalBaseClasses = (theme) => ({
  '.modal-overlay': {
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
  '.modal-button': {
    position: 'fixed',
    top: theme('spacing.4'),
    right: theme('spacing.4'),
    zIndex: 50,
    fontSize: theme('fontSize.5xl'),
    color: theme('spacing.gray.50'),
  },
});

module.exports = ModalBaseClasses;
