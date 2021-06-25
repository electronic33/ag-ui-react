const PopoverBaseClasses = (theme) => ({
  '.popover-wrapper': {
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
