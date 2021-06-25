const AlertDialogBaseClasses = (theme) => ({
  '.alert-dialog-modal': {
    backgroundColor: theme('colors.white'),
    paddingLeft: theme('spacing.7'),
    paddingRight: theme('spacing.7'),
    paddingTop: theme('spacing.5'),
    paddingBottom: theme('spacing.5'),
    boxShadow: theme('boxShadow.xl'),
    maxWidth: theme('maxWidth.lg'),
    borderRadius: theme('borderRadius.lg'),
  },
  '.alert-dialog-header': {
    fontWeight: theme('fontWeight.bold'),
    fontSize: theme('fontSize.xl'),
    lineHeight: theme('lineHeight.7'),
    marginBottom: theme('spacing.5'),
  },
  '.alert-dialog-body': {
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    color: theme('colors.gray.700'),
  },
  '.alert-dialog-buttons-container': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme('spacing.5'),
  },
  '.alert-dialog-cancel-button': {
    marginRight: theme('spacing.5'),
    backgroundColor: theme('colors.blue.50'),
    color: theme('colors.gray.600'),
    fontWeight: theme('fontWeight.bold'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    borderRadius: theme('borderRadius.lg'),
  },
  '.alert-dialog-confirm-button': {
    backgroundColor: theme('colors.red.500'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    borderRadius: theme('borderRadius.lg'),
  },
});

module.exports = AlertDialogBaseClasses;
