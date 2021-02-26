const AccordionbBaseClasses = (theme) => ({
  ".bottom-nav-container": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: theme("width.full"),
    height: theme("height.full"),
    backgroundColor: theme("colors.gray.50"),
  },
  ".bottom-nav-link": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: theme("width.full"),
    height: theme("height.full"),
    fontSize: theme("fontSize.sm"),
    lineHeight: theme("lineHeight.5"),
    maxHeight: theme("spacing.24"),
  },
  ".bottom-nav-icon": {
    fontSize: theme("fontSize.xl"),
    lineHeight: theme("lineHeight.7"),
    color: theme("colors.gray.500"),
  },
});

module.exports = AccordionbBaseClasses;
