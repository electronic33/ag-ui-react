const MultiSelectBaseClasses = (theme) => ({
  '.multi-select-container': {
    position: 'relative',
  },
  '.multi-select-label': {
    display: 'block',
    fontSize: theme('fontSize.sm'),
    lineHeight: theme('lineHeight.5'),
    fontWeight: theme('fontWeight.medium'),
    color: theme('colors.gray.700'),
    marginBottom: theme('spacing.2'),
  },
  '.multi-select-label-error': {
    color: theme('colors.red.600'),
  },
  '.multi-select-main-button': {
    display: 'inline-flex',
    width: '100%',
    boxShadow: theme('boxShadow.sm'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('color.gray.300'),
    overflow: 'hidden',
    borderRadius: theme('components.multiSelect.borderRadius') || theme('borderRadius.md'),
    backgroundColor: theme('components.multiSelect.bg') || theme('colors.white'),
    paddingRight: theme('components.multiSelect.pr') || theme('spacing.2'),
    paddingLeft: theme('components.multiSelect.pl') || theme('spacing.2'),
    paddingTop: theme('components.multiSelect.pt') || theme('spacing.2'),
    paddingBottom: theme('components.multiSelect.pb') || theme('spacing.2'),
  },
  '.multi-select-selected-options-status-div': {
    display: 'flex',
    alignItems: 'center',
    minHeight: theme('spacing.8'),
    flexWrap: 'wrap',
    gap: theme('spacing.2'),
    position: 'relative',
    width: '100%',
    textAlign: 'left',
    transitionProperty: theme('transitionProperty.DEFAULT'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDelay: theme('transitionDelay.150'),

    '&:focus': {
      // outline-none
      outline: ' 2px solid transparent',
      outlineOffset: '2px',
    },
    '@media (min-width: 640px)': {
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.5'),
    },
  },
  '.multi-select-status-loading': {
    justifyContent: 'space-between',
  },
  '.multi-select-status-not-loading': {
    justifyContent: 'flex-start',
  },
  '.multi-select-status-error': {
    borderColor: theme('color.red.600'),
    justifyContent: 'space-between',
    paddingRight: theme('spacing.2'),
  },
  '.multi-select-loading-spinner': {
    flexShrink: 0,
    width: theme('spacing.5'),
    height: theme('spacing.5'),
  },
  '.multi-select-loading-text': {
    color: theme('colors.gray.400'),
    marginRight: theme('spacing.5'),
  },
  '.multi-select-error-text': {
    color: theme('colors.red.600'),
  },
  '.multi-select-retry-button': {
    color: theme('colors.white'),
    fontWeight: theme('fontWeight.semibold'),
    backgroundColor: theme('colors.red.400'),
    paddingRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    paddingTop: theme('spacing.1'),
    paddingBottom: theme('spacing.1'),
    borderRadius: theme('borderRadius.DEFAULT'),
    '&:hover': {
      backgroundColor: theme('colors.red.500'),
    },
    '&:focus': {
      backgroundColor: theme('colors.red.500'),
    },
  },
  '.multi-select-ready-no-selected': {
    color: theme('colors.gray.400'),
  },
  '.multi-select-selected-options-container': {
    display: 'flex',
  },
  '.multi-select-selected-options-label-icon-container': {
    display: 'flex',
    alignItems: 'center',
    color: theme('colors.white'),
    backgroundColor: theme('colors.blue.500'),
    paddingLeft: theme('spacing.2'),
    paddingRight: theme('spacing.1'),
    paddingTop: theme('spacing.1'),
    paddingBottom: theme('spacing.1'),
    borderTopLeftRadius: theme('borderRadius.full'),
    borderBottomLeftRadius: theme('borderRadius.full'),
  },
  '.multi-select-selected-options-icon': {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme('spacing.1.5'),
  },
  '.multi-select-selected-options-label': {
    paddingBottom: theme('spacing.0.5'),
  },
  '.multi-select-remove-selected-option-button': {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme('colors.blue.500'),
    borderTopRightRadius: theme('borderRadius.full'),
    borderBottomRightRadius: theme('borderRadius.full'),
    paddingLeft: theme('spacing.1'),
    paddingRight: theme('spacing.1'),
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.200'),
    '&:hover': {
      backgroundColor: theme('colors.blue.700'),
      color: theme('colors.white'),
    },
  },
  '.multi-select-remove-selected-option-button-svg': {
    flexShrink: 0,
    marginTop: theme('spacing.0.5'),
  },
  '.multi-select-unselect-all-button': {
    padding: theme('spacing.1'),
    alignSelf: 'center',
    color: theme('colors.gray.600'),
    marginRight: theme('spacing.5'),
    '&:hover': {
      color: theme('colors.black'),
    },
  },
  '.multi-select-options-container': {
    maxHeight: theme('spacing.60'),
    borderRadius: theme('borderRadius.md'),
    paddingBottom: theme('spacing.1'),
    paddingTop: theme('spacing.1'),
    lineHeight: theme('spacing.6'),
    boxShadow: theme('boxShadow.lg'),
    overflow: 'auto',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: theme('colors.white'),
    left: '0px',
    right: '0px',

    '&:focus': {
      color: theme('colors.black'),
      // outline-none
      outline: '2px solid transparent',
      outlineOffset: '2px',
    },
    '@media (min-width: 640px)': {
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.5'),
    },
  },
  '.multi-select-options-filter': {
    width: '100%',
    marginBottom: theme('spacing.2'),
  },
  '.multi-select-options-filter-input': {
    paddingLeft: theme('spacing.4'),
    paddingRight: theme('spacing.4'),
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
  },
  '.multi-select-options-error': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme('colors.red.600'),
    marginBottom: theme('spacing.5'),
    margintTop: theme('spacing.5'),
  },
  '.multi-select-options-list-container': {
    width: '100%',
    // outline-none
    outline: '2px solid transparent',
    outlineOffset: '2px',
  },
  '.multi-select-options-list-div': {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    position: 'relative',
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
  },
  '.multi-select-options-list-div-active': {
    color: theme('colors.white'),
    backgroundColor: theme('colors.blue.600'),
  },
  '.multi-select-options-list-div-not-active': {
    color: theme('colors.gray.900'),
  },
  '.multi-select-options-list-div-div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  '.multi-select-options-list-div-div-option': {
    display: 'flex',
  },
  '.multi-select-options-list-div-div-option-icon': {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme('spacing.1.5'),
  },
  '.multi-select-options-list-div-div-option-icon-active': {
    color: theme('colors.white'),
  },
  '.multi-select-options-list-div-div-option-icon-not-active': {
    color: theme('colors.blue.600'),
  },
  '.multi-select-options-list-div-div-option-label': {
    display: 'block',
    // truncate:
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '.multi-select-options-list-div-div-option-label-active': {
    fontWeight: theme('fontWeight.semibold'),
  },
  '.multi-select-options-list-div-div-option-label-not-active': {
    fontWeight: theme('fontWeight.normal'),
  },
  '.multi-select-options-list-div-div-active-icon': {
    flexShrink: 0,
    color: theme('colors.green.500'),
    fontSize: theme('fontSize.xl'),
    lineHeight: theme('lineHeight.7'),
  },
});

module.exports = MultiSelectBaseClasses;
