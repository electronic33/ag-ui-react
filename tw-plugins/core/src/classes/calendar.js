const CalendarBaseClasses = (theme) => ({
  /// / RENDER HEADER ////
  '.calendar-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ///
  '.calendar-arrow-container': {
    borderRadius: theme('borderRadius.full'),
    padding: theme('spacing.1'),
    margin: theme('spacing.2'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.300'),
  },

  '.month-container': {
    display: 'flex',
    maxWidth: theme('maxWidth.full'),
    justifyContent: 'center',
    textAlign: 'center',
  },
  '.month-class': {
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
    fontWeight: theme('fontWeight.bold'),
    color: theme('colors.gray.500'),
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  /// / RENDER DAYS ////
  '.days-container': {
    fontSize: theme('fontSize.xs'),
    lineHeight: theme('lineHeight.4'),
    textTransform: 'uppercase',
    color: theme('colors.gray.400'),
    fontWeight: theme('fontWeight.medium'),
    paddingTop: theme('spacing.3'),
    paddingBottom: theme('spacing.3'),
    borderBottomWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.gray.200'),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: theme('width.full'),
  },
  '.days-class': {
    display: 'flex',
    maxWidth: theme('maxWidth.full'),
    justifyContent: 'center',
    textAlign: 'center',
  },
  '.tile-class': {
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
    display: 'flex',
    flexGrow: theme('flexGrow.DEFAULT'),
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme('colors.white'),
    transitionProperty: theme('transitionProperty.DEFAULT'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.300'),
    maxWidth: theme('maxWidth.full'),
  },
  '.hovered-tile': {
    backgroundColor: theme('colors.gray.100'),
  },
  '.rounded-full-left-side': {
    borderTopLeftRadius: '9999px',
    borderBottomLeftRadius: '9999px',
  },
  '.rounded-full-right-side': {
    borderTopRightRadius: '9999px',
    borderBottomRightRadius: '9999px',
  },
  '.first-day-in-range-no-selected-end-date': {
    backgroundColor: theme('colors.gray.200'),
    boxShadow: theme('boxShadow.inner'),
  },
  '.disabled-tiles': {
    color: theme('colors.gray.300'),
    pointerEvents: 'none',
  },
  '.active-tiles': {
    cursor: 'pointer',
  },
  '.selected-tiles': {
    backgroundColor: theme('colors.blue.200'),
    boxShadow: theme('boxShadow.inner'),
  },
  '.selected-and-hovered-tiles': {
    backgroundColor: theme('colors.blue.500'),
  },

  'focus-blue': {
    '--tw-ring-offset-shadow':
      'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow':
      'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    '--tw-ring-opacity': '1',
    '--tw-ring-color': 'rgba(96, 165, 250, var(--tw-ring-opacity))',
    boxShadow: theme('boxShadow.DEFAULT'),
    // 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
  },

  '.tile-characters-class': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    inset: theme('inset.0'),
    fontWeight: theme('fontWeight.bold'),
    position: 'absolute',
  },
  '.row-item': {
    display: 'flex',
    flexWrap: 'wrap',
    width: theme('width.full'),
  },
  '.rows': {
    fontWeight: theme('fontWeight.light'),
    color: theme('colors.gray.600'),
    backgroundColor: theme('colors.white'),
    position: 'relative',
  },
  '.calendar': {
    display: 'block',
    userSelect: 'none',
    position: 'relative',
    width: theme('width.full'),
    backgroundColor: theme('colors.white'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.gray.200'),
  },
});

module.exports = CalendarBaseClasses;

// const DropdownButtonBaseClasses = (theme) => ({
//   ".menu-button": {
//     "--tw-bg-opacity": "0.5",
//     backgroundColor: theme("colors.blue.600"),
//     transitionProperty: theme("transitionProperty.DEFAULT"),
//     transitionTimingFunction: theme("transitionTimingFunction.DEFAULT"),
//     transitionDelay: theme("transitionDelay.150"),
//     color: theme("colors.white"),
//     paddingTop: theme("spacing.2"),
//     paddingBottom: theme("spacing.2"),
//     paddingLeft: theme("spacing.4"),
//     paddingRight: theme("spacing.4"),
//     boxShadow: theme("boxShadow.md"),
//   },
//   ".menu-items-container": {
//     display: "flex",
//     flexDirection: "column",
//     // outline: theme("outline.none"),
//     // outlineOffset: theme("outline.none"),
//     paddingTop: theme("spacing.4"),
//     paddingBottom: theme("spacing.4"),
//     paddingLeft: theme("spacing.2"),
//     paddingRight: theme("spacing.2"),
//     borderWidth: theme("borderWidth.2"),
//     borderColor: theme("color.gray.400"),
//     boxShadow: theme("boxShadow.md"),
//     maxWidth: theme("spacing.80"),
//   },
// });

// module.exports = DropdownButtonBaseClasses;
