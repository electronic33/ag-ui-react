const TextInputBaseClasses = (theme) => ({
  ".text-input": {
    borderRadius: theme("borderRadius.md"),
    borderWidth: theme("borderWidth.2"),
    borderColor: theme("color.gray.200"),
    padding: theme("spacing.2"),
    height: theme("spacing.10"),
    paddingLeft: theme("spacing.3"),
    paddingRight: theme("spacing.3"),
    maxWidth: theme("spacing.96"),
  },
});

module.exports = TextInputBaseClasses;