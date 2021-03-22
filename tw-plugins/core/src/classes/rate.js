const RateBaseClasses = (theme) => ({
  ".main-div-rate": {
    display: "flex",
    alignItems: "center",
  },
  ".icon-rate": {
    flexShrink: 0,
    transitionProperty: theme("transitionProperty.DEFAULT"),
    transitionTimingFunction: theme("transitionTimingFunction.DEFAULT"),
    transitionDuration: theme("transitionDuration.150"),
    cursor: "pointer",
    paddingLeft: theme("spacing.1"),
    paddingRight: theme("spacing.1"),
    fontSize: theme("fontSize.4xl"),
    lineHeight: theme("lineHeight.10"),
  },
  ".rate-text-container": {
    display: "flex",
    alignItems: "center",
    marginLeft: theme("spacing.2"),
  },
  ".rate-text": {
    display: "flex",
    alignItems: "center",
    marginLeft: theme("spacing.2"),
    fontWeight: theme("fontWeight.700"),
  },
});

module.exports = RateBaseClasses;
