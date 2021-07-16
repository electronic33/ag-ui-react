const { rgba } = require('polished');

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
    height: theme('checkbox.size') || theme('spacing.4'),
    width: theme('checkbox.size') || theme('spacing.4'),
    transitionProperty: theme('transitionProperty.colors'),
    transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
    transitionDuration: theme('transitionDuration.150'),
    border: `2px solid ${theme('checkbox.borderColor') || theme('colors.gray.500')}`,
    borderRadius: theme('checkbox.borderRadius') || theme('borderRadius.DEFAULT'),
  },
  '.checkbox-error': {
    color: theme('colors.red.600'),
    marginTop: theme('spacing.2'),
  },
  '.checkbox-focus': {
    '--tw-ring-color': rgba(theme('colors.blue.500'), Number(theme('ringOpacity.DEFAULT'))),
    '&:focus': {
      boxShadow:
        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    },
  },
});

module.exports = CheckboxBaseClasses;
