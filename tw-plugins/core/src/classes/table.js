const TableBaseClasses = (theme) => ({
  '.table-container': {
    boxShadow: theme('boxShadow.DEFAULT'),
    overFlow: 'hidden',
    overflowX: 'auto',
    borderBottomWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    borderRadius: theme('borderRadius.md'),
  },
  '.table': {
    minWidth: '100%',
    borderRadius: theme('borderRadius.md'),
    // divide-y
    borderTopWidth: 'calc(1px * calc(1 - 0))',
    borderBottomWidth: 'calc(1px * 0)',
    // divide-gray-200
    borderColor: theme('colors.gray.200'),
  },
  '.table-tbody': {
    backgroundColor: theme('colors.white'),
    // divide-y
    borderTopWidth: 'calc(1px * calc(1 - 0))',
    borderBottomWidth: 'calc(1px * 0)',
    // divide-gray-200
    borderColor: theme('colors.gray.200'),
  },
  '.table-td': {
    paddingTop: theme('spacing.4'),
    paddingBottom: theme('spacing.4'),
    paddingLeft: theme('spacing.6'),
    paddingRight: theme('spacing.6'),
    whiteSpace: 'nowrap',
  },
  '.table-th': {
    paddingTop: theme('spacing.3'),
    paddingBottom: theme('spacing.3'),
    paddingLeft: theme('spacing.6'),
    paddingRight: theme('spacing.6'),
    textAlign: 'left',
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
    fontWeight: theme('fontWeight.medium'),
    color: theme('colors.gray.500'),
    textTransform: 'uppercase',
    letterSpacing: theme('letterSpacing.wider'),
  },
  '.table-thead': {
    backgroundColor: theme('colors.gray.50'),
  },
});

module.exports = TableBaseClasses;
