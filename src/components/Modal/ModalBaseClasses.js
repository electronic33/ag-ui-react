const ModalBaseClasses = (theme) => ({
  ".modal": {
    position: "fixed",
    zIndex: "40",
    display: "flex",
    justifyContent: "center",
    itemsAlign: "center",
    paddingBottom: theme("spacing.10"),
    paddingTop: theme("spacing.10"),
    paddingLeft: theme("spacing.6"),
    paddingRight: theme("spacing.6"),
    backgroundColor: theme("colors.gray.900"),
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    // backgroundOpacity: theme("backgroundOpacity.60"),
  },
});

module.exports = ModalBaseClasses;
