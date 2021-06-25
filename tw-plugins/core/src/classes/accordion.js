const AccordionbBaseClasses = (theme) => ({
  '.accordion-container': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.accordion-button': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme('colors.coolGray.50'),
    paddingLeft: theme('spacing.2'),
    paddingRight: theme('spacing.2'),
    paddingTop: theme('spacing.3'),
    paddingBottom: theme('spacing.3'),
  },
  '.accordion-content': {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'height 0.3s ease-out',
  },
  '.accordion-arrow-icon': {
    transitionProperty: theme('transitionProperty.transform'),
    transitionTimingFunction: theme('transitionTimingFunction.in'),
    transitionDuration: theme('transitionDuration.300'),
    marginLeft: 'auto',
  },
});

module.exports = AccordionbBaseClasses;
