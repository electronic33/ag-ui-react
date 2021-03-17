const TooltipBaseClasses = (theme) => ({
  ".tooltip-wrapper": {
    display: "inline-block",
  },

  "#arrow": {
    visibility: "hidden",
    position: "absolute",
    width: "8px",
    height: "8px",
    background: "inherit",
    "&:before": {
      visibility: "visible",
      content: "''",
      transform: "rotate(45deg)",
      position: "absolute",
      width: "8px",
      height: "8px",
      background: "inherit",
    },
  },

  ".tooltip-content": {
    paddingTop: theme("spacing.2"),
    paddingBottom: theme("spacing.2"),
    paddingLeft: theme("spacing.4"),
    paddingRight: theme("spacing.4"),
    color: theme("colors.black"),
    borderRadius: theme("borderRadius.DEFAULT"),
  },
  ".arrow-container": {
    backgroundColor: theme("colors.gray.700"),
  },
});

module.exports = TooltipBaseClasses;
