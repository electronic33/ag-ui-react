const PopoverBaseClasses = (theme) => ({
  '.popover-wrapper': {
    display: 'inline-block',
  },
  '.popover-click-container': {
    backgroundColor: theme('colors.white'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    borderRadius: theme('borderRadius.DEFAULT'),
    zIndex: 20,
    '&:focus': {
      borderColor: 'transparent',
    },
  },
  '.popover-header-text': {
    color: theme('colors.gray.700'),
    fontWeight: theme('fontWeight.semibold'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    paddingBottom: theme('spacing.2'),
    borderBottomWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    width: '100%',
    marginRight: theme('spacing.10'),
  },
  '.popover-close-button': {
    position: 'absolute',
    flexShrink: 0,
    top: theme('spacing.1'),
    right: theme('spacing.2'),
    fontSize: theme('fontSize.lg'),
    lineHeight: theme('lineHeight.7'),
    color: theme('colors.gray.400'),
    zIndex: 10,
  },
  '.popover-with-arrow': {
    backgroundColor: theme('colors.white'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
  },

  '.popover-hover-container': {
    backgroundColor: theme('colors.white'),
    borderWidth: theme('borderWidth.DEFAULT'),
    borderColor: theme('colors.gray.200'),
    borderRadius: theme('borderRadius.DEFAULT'),
    zIndex: 20,
  },

  '.popover-hover-icon': {
    flexShrink: 0,
  },

  '#arrow': {
    visibility: 'hidden',
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: 'inherit',
    '&:before': {
      visibility: 'visible',
      content: "''",
      transform: 'rotate(45deg)',
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'inherit',
      backgroundColor: theme('colors.white'),
      borderWidth: '1px',
      borderColor: theme('colors.gray.200'),
    },
  },

  '.popover-content': {},

  '#arrow-base': {
    backgroundColor: theme('colors.white'),
    borderWidth: '1px',
    borderColor: theme('colors.gray.200'),
  },
});

module.exports = PopoverBaseClasses;
