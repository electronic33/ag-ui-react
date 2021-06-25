const PaginationBaseClasses = (theme) => ({
  '.pagination': {
    marginRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    boxShadow: theme('boxShadow.DEFAULT'),
    color: theme('colors.blue.400'),
    fontWeight: '500',
    cursor: 'pointer',
  },
});

module.exports = PaginationBaseClasses;
