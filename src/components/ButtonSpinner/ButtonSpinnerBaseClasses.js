const ButtonSpinnerBaseClasses = (theme) => ({
  ".btn-spinner": {
    animation: theme("animation.spin"),
    height: theme("spacing.5"),
    width: theme("spacing.5"),
  },
});

module.exports = ButtonSpinnerBaseClasses;
