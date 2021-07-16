const CalloutBaseClasses = (theme) => ({
  '.callout-container': {
    display: 'flex',
    paddingRight: theme('components.callout.sizes.lg.px') || theme('spacing.4'),
    paddingLeft: theme('components.callout.sizes.lg.px') || theme('spacing.4'),
    paddingTop: theme('components.callout.sizes.lg.py') || theme('spacing.4'),
    paddingBottom: theme('components.callout.sizes.lg.py') || theme('spacing.4'),
  },

  '.callout-container-nointent-bg': {
    backgroundColor: theme('components.callout.intents.nointent.bg') || theme('colors.gray.200'),
  },

  '.callout-container-primary-bg': {
    backgroundColor: theme('components.callout.intents.primary.bg') || theme('colors.blue.100'),
  },
  '.callout-container-success-bg': {
    backgroundColor: theme('components.callout.intents.success.bg') || theme('colors.green.100'),
  },
  '.callout-container-warning-bg': {
    backgroundColor: theme('components.callout.intents.warning.bg') || theme('colors.yellow.100'),
  },
  '.callout-container-danger-bg': {
    backgroundColor: theme('components.callout.intents.danger.bg') || theme('colors.red.100'),
  },

  '.callout-container-nointent-text': {
    color: theme('components.callout.intents.nointent.text') || theme('colors.gray.700'),
  },
  '.callout-container-primary-text': {
    color: theme('components.callout.intents.primary.text') || theme('colors.blue.600'),
  },
  '.callout-container-success-text': {
    color: theme('components.callout.intents.success.text') || theme('colors.green.600'),
  },
  '.callout-container-warning-text': {
    color: theme('components.callout.intents.warning.text') || theme('colors.yellow.600'),
  },
  '.callout-container-danger-text': {
    color: theme('components.callout.intents.danger.text') || theme('colors.red.600'),
  },
});

module.exports = CalloutBaseClasses;
