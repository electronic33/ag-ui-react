const ToastBaseClasses = (theme) => ({
  '.toast-default-icon-primary': {
    flexShrink: 0,
    marginRight: theme('spacing.2'),
    fontSize: theme('fontSize.2xl'),
    lineHeight: theme('lineHeight.8'),
    color: theme('colors.blue.500'),
  },
  '.toast-default-icon-success': {
    flexShrink: 0,
    marginRight: theme('spacing.2'),
    fontSize: theme('fontSize.3xl'),
    lineHeight: theme('lineHeight.9'),
    color: theme('colors.green.500'),
  },
  '.toast-default-icon-warning': {
    flexShrink: 0,
    marginRight: theme('spacing.2'),
    fontSize: theme('fontSize.3xl'),
    lineHeight: theme('lineHeight.9'),
    color: theme('colors.yellow.500'),
  },
  '.toast-default-icon-danger': {
    flexShrink: 0,
    marginRight: theme('spacing.4'),
    fontSize: theme('fontSize.3xl'),
    lineHeight: theme('lineHeight.9'),
    color: theme('colors.red.500'),
  },
  '.toast': {
    display: 'flex',
    padding: theme('spacing.4'),
  },
  '.toast-no-intent': {
    backgroundColor: theme('colors.gray.200'),
  },
  '.toast-primary': {
    backgroundColor: theme('colors.blue.100'),
  },
  '.toast-success': {
    backgroundColor: theme('colors.green.100'),
  },
  '.toast-warning': {
    backgroundColor: theme('colors.yellow.100'),
  },
  '.toast-danger': {
    backgroundColor: theme('colors.red.100'),
  },
  '.toast-text-container': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.toast-header-container': {
    fontSize: theme('fontSize.xl'),
    lineHeight: theme('lineHeight.7'),
    marginTop: `-${theme('spacing.0.5')}`,
    marginBottom: theme('spacing.1'),
    fontWeight: theme('fontWeight.semibold'),
  },
  '.toast-header-no-intent': {
    color: theme('colors.gray.700'),
  },
  '.toast-header-primary': {
    color: theme('colors.blue.600'),
  },
  '.toast-header-success': {
    color: theme('colors.green.600'),
  },
  '.toast-header-warning': {
    color: theme('colors.yellow.600'),
  },
  '.toast-header-danger': {
    color: theme('colors.red.600'),
  },
  '.toast-top-left': {
    position: 'fixed',
    top: theme('spacing.0'),
    left: theme('spacing.3'),
  },
  '.toast-top-center': {
    position: 'fixed',
    top: theme('spacing.0'),
    left: '50%',
  },
  '.toast-top-right': {
    position: 'fixed',
    top: theme('spacing.0'),
    right: theme('spacing.3'),
  },
  '.toast-bottom-left': {
    position: 'fixed',
    bottom: theme('spacing.0'),
    left: theme('spacing.3'),
  },
  '.toast-bottom-center': {
    position: 'fixed',
    bottom: theme('spacing.0'),
    left: '50%',
  },
  '.toast-bottom-right': {
    position: 'fixed',
    bottom: theme('spacing.0'),
    right: theme('spacing.3'),
  },
});

module.exports = ToastBaseClasses;
