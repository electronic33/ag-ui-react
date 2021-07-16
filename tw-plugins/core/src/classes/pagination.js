const PaginationBaseClasses = (theme) => ({
  '.pagination-contaier': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.pagination-contaier-div': {
    display: 'flex',
  },
  '.pagination-buttons': {
    marginRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    borderRadius: theme('borderRadius.md'),
    boxShadow: theme('boxShadow.DEFAULT'),
    color: theme('colors.blue.400'),
    fontWeight: '500',
    cursor: 'pointer',
  },
  '.pagination-contaier-prev-next-buttons-disabled': {
    cursor: 'default',
    backgroundColor: theme('colors.gray.100'),
  },
  '.pagination-active-button': {
    backgroundColor: theme('colors.blue.400'),
    color: theme('colors.white'),
  },
  '.pagination-not-active-button': {
    color: theme('colors.blue.400'),
  },
  '.pagination-dots': {
    fontSize: theme('fontSize.xl'),
    lineHeight: theme('lineHeight.7'),
    alignSelf: 'flex-end',
    marginRight: theme('spacing.2'),
    marginLeft: theme('spacing.2'),
  },
  '.pagination-initial-go-to-input': {
    backgroundColor: theme('colors.gray.100'),
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('borderRadius.DEFAULT'),
    paddingRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    paddingTop: theme('spacing.1'),
    paddingBottom: theme('spacing.1'),
  },
  '.pagination-items-per-page-select': {
    maxWidth: theme('spacing.16'),
    width: theme('spacing.64'),
    marginBottom: theme('spacing.4'),
    marginTop: theme('spacing.4'),
    marginRight: theme('spacing.2'),
  },
  '.pagination-action-button': {
    fontWeight: theme('fontWeight.medium'),
    cursor: 'pointer',
    backgroundColor: theme('colors.gray.500'),
  },
  '.pagination-action-button-invalid-input': {
    cursor: 'default',
    // '&:hover': {
    //   backgroundColor: theme('colors.gray.500'),
    // },
  },
});

module.exports = PaginationBaseClasses;
