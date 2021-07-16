const TooltipBaseClasses = (theme) => ({
  '.tooltip-wrapper': {
    display: 'inline-block',
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
      background: theme('components.toolTip.backgroundColor') || theme('colors.black'),
    },
  },

  '.tooltip-content': {
    paddingRight: theme('components.toolTip.pr') || theme('spacing.4'),
    paddingLeft: theme('components.toolTip.pl') || theme('spacing.4'),
    paddingTop: theme('components.toolTip.pt') || theme('spacing.2'),
    paddingBottom: theme('components.toolTip.pb') || theme('spacing.2'),
    color: theme('components.toolTip.color') || theme('colors.white'),
    borderRadius: theme('components.toolTip.borderRadius') || theme('borderRadius.DEFAULT'),
    backgroundColor: theme('components.toolTip.backgroundColor') || theme('colors.black'),
    fontSize: theme('components.toolTip.fontSize') || theme('fontSize.base'),
  },
  '.arrow-container': {},
});

module.exports = TooltipBaseClasses;
