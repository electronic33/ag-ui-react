const ErrorBaseClasses = (theme) => ({
  ".error-message": {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme("colors.red.100"),
    color: theme("colors.red.600"),
    padding: theme("spacing.2"),
    borderRadius: theme("borderRadius.md"),
    width: '100%',
    maxWidth: theme('maxWidth.sm')
  },
});

module.exports = ErrorBaseClasses;
