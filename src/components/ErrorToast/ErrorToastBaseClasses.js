const ErrorToastBaseClasses = (theme) => ({
  ".error-toast": {
    display: "flex",
    alignItems: "center",
    color: theme("colors.red.500"),
    fontWeight: theme("fontWeight.semibold"),
  },
});

module.exports = ErrorToastBaseClasses;
