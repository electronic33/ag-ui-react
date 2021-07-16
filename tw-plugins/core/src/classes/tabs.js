const TabsBaseClasses = (theme) => ({
  '.tabs': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme('colors.gray.100'),
  },
  '.tabs-wrapper': {
    display: 'flex',
  },
  '.tabs-tab': {
    paddingTop: theme('spacing.5'),
    paddingBottom: theme('spacing.5'),
    cursor: 'pointer',
  },
  '.tabs-tab-active': {
    backgroundColor: theme('colors.white'),
  },
  '.tabs-tab-label': {
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    paddingLeft: theme('spacing.7'),
    paddingRight: theme('spacing.7'),
    borderRightWidth: theme('borderWidth.2'),
    borderColor: theme('colors.gray.300'),
    color: theme('colors.gray.400'),
    fontWeight: theme('fontWeight.medium'),
    '&:hover': {
      color: theme('colors.gray.800'),
    },
  },
  '.tabs-tab--active': {
    borderStyle: 'none',
  },
});

module.exports = TabsBaseClasses;
