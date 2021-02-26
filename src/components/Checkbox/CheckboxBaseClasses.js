const CheckboxBaseClasses = (theme) => ({
  //// RENDER HEADER ////
  ".container-div-checkbox": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  ".hidden-input-checkbox": {
    border: 0,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
  },
  ".main-div-checkbox": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme("spacing.4"),
    width: theme("spacing.4"),
    transitionProperty: theme("transitionProperty.all"),
    transitionTimingFunction: theme("transitionTimingFunction.in-out"),
    transitionDuration: theme("transitionDuration.150"),
    border: "2px solid black",
  },
});

module.exports = CheckboxBaseClasses;
