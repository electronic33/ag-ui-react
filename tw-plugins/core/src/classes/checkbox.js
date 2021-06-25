const CheckboxBaseClasses = (theme) => ({
  '.label-right-container': {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  '.label-left-container': {
    display: 'flex',
    alignItems: 'center',
  },
  '.label-top-container': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.label-bottom-container': {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  '.label-right': {
    marginBottom: '0',
    marginLeft: theme('spacing.2'),
  },
  '.label-left': {
    marginBottom: '0',
    marginRight: theme('spacing.2'),
  },
  '.label-top': {
    marginBottom: theme('spacing.2'),
  },
  '.label-bottom': {
    marginBottom: '0',
    marginTop: theme('spacing.2'),
  },
  '.hidden-input-checkbox': {
    border: 0,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  '.checkbox': {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: theme('spacing.4'),
    width: theme('spacing.4'),
    transitionProperty: theme('transitionProperty.colors'),
    transitionTimingFunction: theme('transitionTimingFunction.in-out'),
    transitionDuration: theme('transitionDuration.150'),
    border: `2px solid ${theme('colors.gray.500')}`,
    borderRadius: theme('borderRadius.DEFAULT'),
  },
});

module.exports = CheckboxBaseClasses;
