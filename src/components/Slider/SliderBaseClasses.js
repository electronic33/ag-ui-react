const SliderBaseClasses = (theme) => ({
  ".main-div": {
    width: theme("width.full"),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ".carousel-and-arrow-container": {
    width: theme("width.full"),
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".carousel": {
    position: "relative",
    marginTop: theme("spacing.0"),
    marginBottom: theme("spacing.0"),
    marginLeft: theme("spacing.2"),
    marginRight: theme("spacing.2"),
    overflow: "hidden",
    width: theme("width.full"),
  },
  ".slider-content": {
    display: "flex",
  },
  ".arrow-container": {
    display: "flex",
    flexShrink: theme("flexShrink.0"),
    width: theme("spacing.10"),
    height: theme("spacing.10"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme("colors.blue.700"),
    borderRadius: theme("borderRadius.full"),
    cursor: "pointer",
    transitionProperty: theme("transitionProperty.transform"),
    transitionTimingFunction: theme("transitionTimingFunction.in"),
    transitionDuration: theme("transitionDuration.100"),
    "&:hover": {
      scale: "110",
    },
  },
  ".arrow-icon": {
    color: theme("colors.white"),
    fontSize: theme("fontSize.xl"),
    lineHeight: theme("lineHeight.7"),
    "&:hover": {
      outline: "none",
    },
  },
  ".dots": {
    paddingTop: theme("spacing.4"),
    width: theme("width.full"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".dot": {
    padding: theme("spacing.1.5"),
    width: theme("spacing.3"),
    height: theme("spacing.3"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme("spacing.2"),
    cursor: "pointer",
    borderRadius: theme("borderRadius.full"),
  },
});

module.exports = SliderBaseClasses;
