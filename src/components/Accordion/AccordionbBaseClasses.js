const AccordionbBaseClasses = (theme) => ({
  ".accordion": {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme("borderRadius.md"),
    boxShadow: theme("boxShadow.lg"),
    backgroundColor: theme("colors.coolGray.50"),
    paddingLeft: theme("spacing.4"),
    paddingRight: theme("spacing.4"),
    paddingTop: theme("spacing.6"),
    paddingBottom: theme("spacing.6"),
    overflow: "hidden",
  },
  ".drop-down": {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "height 0.3s ease-out",
  },
});

module.exports = AccordionbBaseClasses;
