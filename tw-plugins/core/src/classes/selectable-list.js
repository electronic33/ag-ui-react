const SelectableListBaseClasses = (theme) => ({
  '.selectable-list-loading': {
    boxShadow: theme('boxShadow.md'),
    borderRadius: theme('borderRadius.md'),
    width: theme('spacing.56'),
    paddingTop: theme('spacing.4'),
    paddingBottom: theme('spacing.4'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    itemsAlign: 'center',
    height: theme('spacing.60'),
  },
  '.selectable-list-error': {
    boxShadow: theme('boxShadow.md'),
    borderRadius: theme('borderRadius.md'),
    width: theme('spacing.56'),
    paddingTop: theme('spacing.4'),
    paddingBottom: theme('spacing.4'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    itemsAlign: 'center',
    height: theme('spacing.60'),
    color: theme('colors.red.500'),
  },
  '.selectable-list-container': {
    boxShadow: theme('boxShadow.md'),
    borderRadius: theme('borderRadius.md'),
    paddingTop: theme('spacing.4'),
    paddingBottom: theme('spacing.4'),
    display: 'flex',
    flexDirection: 'column',
    maxHeight: theme('spacing.80'),
  },
  '.selectable-list-title': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontWeight: theme('fontWeight.semibold'),
    borderBottomWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    paddingBottom: theme('spacing.2'),
  },
  '.selectable-list-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
  },
  '.selectable-list-item': {
    display: 'flex',
    justifyContent: 'center',
    itemsAlign: 'center',
    paddingLeft: theme('spacing.4'),
    paddingRight: theme('spacing.4'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    cursor: 'pointer',
    width: '100%',
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
    '&:active': {
      backgroundColor: theme('colors.gray.200'),
      boxShadow: theme('boxShadow.inner'),
    },
  },
  '.selectable-list-item-active-bg': {
    backgroundColor: theme('colors.gray.100'),
  },
  '.selectable-list-item-active-text': {
    fontWeight: theme('fontWeight.semibold'),
  },
  '.selectable-list-item-icon': {
    flexShrink: 0,
    marginRight: theme('spacing.2'),
  },
});

module.exports = SelectableListBaseClasses;
