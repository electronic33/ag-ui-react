const SliderBaseClasses = (theme) => ({
  '.skeleton': {
    backgroundColor: theme('colors.gray.200'),
    borderRadius: theme('borderRadius.DEFAULT'),
  },
  '.skeleton-circle': {
    borderRadius: theme('borderRadius.full'),
  },
});

module.exports = SliderBaseClasses;
