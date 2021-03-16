const PopoverBaseClasses = (theme) => ({
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
      backgroundColor: theme("colors.white"),
      borderWidth: "1px",
      borderColor: theme("colors.gray.200"),
    },
  },

  ".tooltip-content": {
    paddingTop: theme("spacing.2"),
    paddingBottom: theme("spacing.2"),
    paddingLeft: theme("spacing.4"),
    paddingRight: theme("spacing.4"),
    color: theme("colors.white"),
    borderRadius: theme("borderRadius.DEFAULT"),
  },
  "#tooltip": {
    backgroundColor: theme("colors.gray.700"),
  },
  "#arrow-base": {
    backgroundColor: theme("colors.white"),
    borderWidth: "1px",
    borderColor: theme("colors.gray.200"),
  },
});

module.exports = PopoverBaseClasses;
