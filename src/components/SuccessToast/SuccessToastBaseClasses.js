const SuccessToastBaseClasses = (theme) => ({
  ".success-toast": {
    display: "flex",
    alignItems: "center",
    color: theme("colors.green.500"),
    fontWeight: theme("fontWeight.semibold"),
  },
});

module.exports = SuccessToastBaseClasses;
