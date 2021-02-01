const ButtonBaseClasses = (theme) => ({
  ".btn": {
    backgroundColor: theme("colors.green.500"),
    padding: theme("spacing.40"),
    borderRadius: ".25rem",
    fontWeight: "600",
  },
});

module.exports = ButtonBaseClasses;
