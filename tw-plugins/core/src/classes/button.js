const { rgba } = require('polished');

const ButtonBaseClasses = (theme) => ({
  '.btn-sm': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor:
      theme('components.button.primary.filled.default.bg') || theme('colors.blue.500'),
    paddingRight: theme('components.button.sizes.sm.px') || theme('spacing.4'),
    paddingLeft: theme('components.button.sizes.sm.px') || theme('spacing.4'),
    paddingTop: theme('components.button.sizes.sm.py') || theme('spacing.2'),
    paddingBottom: theme('components.button.sizes.sm.py') || theme('spacing.2'),
    fontSize: theme('components.button.sizes.sm.fontSize') || theme('fontSize.sm'),
    height: theme('components.button.sizes.sm.height'),
    color: theme('components.button.primary.filled.default.textColor') || theme('colors.white'),
    whiteSpace: 'nowrap',
  },
  '.btn-md': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor:
      theme('components.button.primary.filled.default.bg') || theme('colors.blue.500'),
    paddingRight: theme('components.button.sizes.md.px') || theme('spacing.8'),
    paddingLeft: theme('components.button.sizes.md.px') || theme('spacing.8'),
    paddingTop: theme('components.button.sizes.md.py') || theme('spacing.2'),
    paddingBottom: theme('components.button.sizes.md.py') || theme('spacing.2'),
    fontSize: theme('components.button.sizes.md.fontSize') || theme('fontSize.xl'),
    height: theme('components.button.sizes.md.height'),
    color: theme('components.button.primary.filled.default.textColor') || theme('colors.white'),
    whiteSpace: 'nowrap',
  },
  '.btn-lg': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor:
      theme('components.button.primary.filled.default.bg') || theme('colors.blue.500'),
    paddingRight: theme('components.button.sizes.lg.px') || theme('spacing.12'),
    paddingLeft: theme('components.button.sizes.lg.px') || theme('spacing.12'),
    paddingTop: theme('components.button.sizes.lg.py') || theme('spacing.2'),
    paddingBottom: theme('components.button.sizes.lg.py') || theme('spacing.2'),
    fontSize: theme('components.button.sizes.lg.fontSize') || theme('fontSize.3xl'),
    height: theme('components.button.sizes.lg.height'),
    color: theme('components.button.primary.filled.default.textColor') || theme('colors.white'),
    whiteSpace: 'nowrap',
  },
  '.btn-xl': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('components.button.primary.filled.default.bg'),
    paddingRight: theme('components.button.sizes.xl.px'),
    paddingLeft: theme('components.button.sizes.xl.px'),
    fontSize: theme('components.button.sizes.xl.fontSize'),
    height: theme('components.button.sizes.xl.height'),
    color: theme('components.button.primary.filled.default.textColor'),
    whiteSpace: 'nowrap',
  },

  '.btn-disabled': {
    opacity: theme('opacity.75'),
    pointerEvents: 'none',
  },
  '.btn-icon-spinner-left': {
    marginRight: theme('spacing.2'),
    flexShrink: 0,
  },
  '.btn-icon-spinner-right': {
    marginLeft: theme('spacing.2'),
    flexShrink: 0,
  },
  '.btn-spinner-left-sm': {
    width: theme('spacing.4'),
    height: theme('spacing.4'),
    marginLeft: theme('spacing.2'),
  },
  '.btn-spinner-left-md': {
    width: theme('spacing.7'),
    height: theme('spacing.7'),
    marginLeft: theme('spacing.3'),
  },
  '.btn-spinner-left-lg': {
    width: theme('spacing.9'),
    height: theme('spacing.9'),
    marginLeft: theme('spacing.4'),
  },
  '.btn-spinner-left-xl': {
    width: theme('spacing.11'),
    height: theme('spacing.11'),
    marginLeft: theme('spacing.5'),
  },
  '.btn-spinner-right-sm': {
    width: theme('spacing.4'),
    height: theme('spacing.4'),
    marginRight: theme('spacing.2'),
  },
  '.btn-spinner-right-md': {
    width: theme('spacing.7'),
    height: theme('spacing.7'),
    marginRight: theme('spacing.3'),
  },
  '.btn-spinner-right-lg': {
    width: theme('spacing.9'),
    height: theme('spacing.9'),
    marginRight: theme('spacing.4'),
  },
  '.btn-spinner-right-xl': {
    width: theme('spacing.11'),
    height: theme('spacing.11'),
    marginRight: theme('spacing.5'),
  },
  '.btn-focus': {
    '--tw-ring-color': rgba(theme('colors.blue.500'), Number(theme('ringOpacity.DEFAULT'))),
    '&:focus': {
      boxShadow:
        'var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    },
  },
});
module.exports = ButtonBaseClasses;
