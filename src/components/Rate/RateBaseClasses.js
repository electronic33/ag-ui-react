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

// const DropdownButtonBaseClasses = (theme) => ({
//   ".menu-button": {
//     "--tw-bg-opacity": "0.5",
//     backgroundColor: theme("colors.blue.600"),
//     transitionProperty: theme("transitionProperty.DEFAULT"),
//     transitionTimingFunction: theme("transitionTimingFunction.DEFAULT"),
//     transitionDelay: theme("transitionDelay.150"),
//     color: theme("colors.white"),
//     paddingTop: theme("spacing.2"),
//     paddingBottom: theme("spacing.2"),
//     paddingLeft: theme("spacing.4"),
//     paddingRight: theme("spacing.4"),
//     boxShadow: theme("boxShadow.md"),
//   },
//   ".menu-items-container": {
//     display: "flex",
//     flexDirection: "column",
//     // outline: theme("outline.none"),
//     // outlineOffset: theme("outline.none"),
//     paddingTop: theme("spacing.4"),
//     paddingBottom: theme("spacing.4"),
//     paddingLeft: theme("spacing.2"),
//     paddingRight: theme("spacing.2"),
//     borderWidth: theme("borderWidth.2"),
//     borderColor: theme("color.gray.400"),
//     boxShadow: theme("boxShadow.md"),
//     maxWidth: theme("spacing.80"),
//   },
// });

// module.exports = DropdownButtonBaseClasses;
