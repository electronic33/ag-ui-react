const AccordionbBaseClasses = (theme) => ({
  '.accordion-container': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.accordion-button': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    fontSize: theme('components.accordion.fontSize') || theme('fontSize.xl'),
    backgroundColor: theme('components.accordion.bg') || theme('colors.coolGray.50'),
    paddingLeft: theme('components.accordion.px') || theme('spacing.2'),
    paddingRight: theme('components.accordion.px') || theme('spacing.2'),
    paddingTop: theme('components.accordion.py') || theme('spacing.3'),
    paddingBottom: theme('components.accordion.py') || theme('spacing.3'),
    borderWidth: theme('components.accordion.borderWidth'),
    borderColor: theme('components.accordion.borderColor'),
  },
  '.accordion-content': {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'height 0.3s ease-out',
  },
  '.accordion-icon-mr': {
    marginRight: theme('spacing.2'),
  },
  '.accordion-arrow-icon': {
    transitionProperty: theme('transitionProperty.transform'),
    transitionTimingFunction: theme('transitionTimingFunction.in'),
    transitionDuration: theme('transitionDuration.300'),
    marginLeft: 'auto',
  },
});

module.exports = AccordionbBaseClasses;
