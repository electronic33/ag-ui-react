const TextAreaBaseClasses = (theme) => ({
  ".text-area": {
    borderRadius: theme("borderRadius.md"),
    borderWidth: theme("borderWidth.2"),
    borderColor: theme("color.gray.300"),
    padding: theme("spacing.2"),
    maxWidth: theme("spacing.96"),
  },
});

module.exports = TextAreaBaseClasses;
