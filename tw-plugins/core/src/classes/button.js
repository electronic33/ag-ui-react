const ButtonBaseClasses = (theme) => ({
  '.btn-sm': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('components.button.primary.filled.default.bg'),
    paddingRight: theme('components.button.sizes.sm.px'),
    paddingLeft: theme('components.button.sizes.sm.px'),
    fontSize: theme('components.button.sizes.sm.fontSize'),
    height: theme('components.button.sizes.sm.height'),
    color: theme('components.button.primary.filled.default.textColor'),
    whiteSpace: 'nowrap',
  },
  '.btn-md': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('components.button.primary.filled.default.bg'),
    paddingRight: theme('components.button.sizes.md.px'),
    paddingLeft: theme('components.button.sizes.md.px'),
    fontSize: theme('components.button.sizes.md.fontSize'),
    height: theme('components.button.sizes.md.height'),
    color: theme('components.button.primary.filled.default.textColor'),
    whiteSpace: 'nowrap',
  },
  '.btn-lg': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme('boxShadow.DEFAULT'),
    borderRadius: theme('spacing.1'),
    backgroundColor: theme('components.button.primary.filled.default.bg'),
    paddingRight: theme('components.button.sizes.lg.px'),
    paddingLeft: theme('components.button.sizes.lg.px'),
    fontSize: theme('components.button.sizes.lg.fontSize'),
    height: theme('components.button.sizes.lg.height'),
    color: theme('components.button.primary.filled.default.textColor'),
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
});

module.exports = ButtonBaseClasses;
