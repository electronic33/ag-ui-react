const { rgba } = require('polished');

const CustomSelectBaseClasses = (theme) => ({
  '.custom-select-container': {
    position: 'relative',
  },
  '.custom-select-classes': {
    display: 'inline-flex',
    width: '100%',
    position: 'relative',
    '--tw-ring-color': rgba(theme('colors.blue.500'), Number(theme('ringOpacity.DEFAULT'))),
    '&:focus': {
      boxShadow:
        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    },
    borderRadius: theme('components.customSelect.borderRadius') || theme('borderRadius.md'),
    borderWidth: theme('components.customSelect.borderWidth') || theme('borderWidth.DEFAULT'),
    borderColor: theme('components.customSelect.borderColor') || theme('color.gray.300'),
    backgroundColor: theme('components.customSelect.bg') || theme('colors.white'),
    paddingRight: theme('components.customSelect.pr') || theme('spacing.2'),
    paddingLeft: theme('components.customSelect.pl') || theme('spacing.2'),
    paddingTop: theme('components.customSelect.pt') || theme('spacing.2'),
    paddingBottom: theme('components.customSelect.pb') || theme('spacing.2'),
    height: theme('components.customSelect.height') || theme('spacing.10'),
  },
  '.custom-select-status-div': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',

    textAlign: 'left',
    transitionProperty: theme('transitionProperty.all'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
    '@media (min-width: 640px)': {
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.5'),
    },
  },

  '.custom-select-status-loading': {
    justifyContent: 'space-between',
  },
  '.custom-select-status-not-loading': {
    justifyContent: 'flex-start',
  },
  '.custom-select-status-error': {
    borderColor: theme('color.red.600'),
    justifyContent: 'space-between',
    paddingRight: theme('spacing.2'),
  },
  '.custom-select-status-no-error': {
    borderColor: theme('color.gray.300'),
    paddingRight: theme('spacing.8'),
    '&:focus': {
      borderColor: theme('color.blue.300'),
    },
  },
  '.custom-select-loading-spinner': {
    flexShrink: 0,
    width: theme('spacing.5'),
    height: theme('spacing.5'),
  },
  '.custom-select-loading-text': {
    color: theme('colors.gray.400'),
  },
  '.custom-select-error-text': {
    color: theme('colors.red.600'),
    whiteSpace: 'nowrap',
  },
  '.custom-select-retry-button': {
    color: theme('colors.white'),
    fontWeight: theme('fontWeight.semibold'),
    backgroundColor: theme('colors.red.400'),
    paddingRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    paddingTop: theme('spacing.1'),
    paddingBottom: theme('spacing.1'),
    borderRadius: theme('borderRadius.DEFAULT'),
    marginLeft: theme('spacing.2'),
    '&:hover': {
      backgroundColor: theme('colors.red.500'),
    },
    '&:focus': {
      backgroundColor: theme('colors.red.500'),
    },
  },
  '.custom-select-ready-icon': {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme('spacing.1.5'),
  },

  '.custom-select-ready-label': {
    display: 'block',
    // truncate:
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  '.custom-select-ready-svg-container': {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme('spacing.2'),
    pointerEvents: 'none',
  },

  '.custom-select-ready-svg': {
    width: theme('spacing.5'),
    height: theme('spacing.5'),
    color: theme('colors.gray.400'),
  },

  '.custom-select-options-container': {
    maxHeight: theme('spacing.60'),
    borderRadius: theme('borderRadius.md'),
    paddingTop: theme('spacing.1'),
    paddingBottom: theme('spacing.1'),
    lineHeight: theme('spacing.6'),
    boxShadow: theme('boxShadow.lg'),
    overflow: 'auto',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: theme('colors.white'),
    left: '0px',
    right: '0px',

    '&:focus': {
      // outline-none
      outline: '2px solid transparent',
      outlineOffset: '2px',
    },
    '@media (min-width: 640px)': {
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.5'),
    },
  },

  '.custom-select-option': {
    width: '100%',
    userSelect: 'none',
    position: 'relative',
    paddingTop: theme('spacing.2'),
    paddingBottom: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    paddingLeft: theme('spacing.2'),
    display: 'flex',
    alignItems: 'center',
  },
  '.custom-select-active-option': {
    color: theme('colors.white'),
    backgroundColor: theme('colors.blue.600'),
  },
  '.custom-select-not-active-option': {
    color: theme('colors.gray.900'),
  },
  '.custom-select-option-icon': {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme('spacing.1.5'),
  },
  '.custom-select-option-icon-active': {
    color: theme('colors.white'),
  },
  '.custom-select-option-icon-not-active': {
    color: theme('colors.blue.600'),
  },
  '.custom-select-option-label': {
    display: 'block',
    // truncate:
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '.custom-select-option-label-selected': {
    fontWeight: theme('fontWeight.semibold'),
  },
  '.custom-select-option-label-not-selected': {
    fontWeight: theme('fontWeight.normal'),
  },
});

module.exports = CustomSelectBaseClasses;
