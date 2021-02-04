const TooltipBaseClasses = (theme) => ({
  ".tooltip-wrapper": {
    display: "inline-block",
    position: "relative",
  },

  ".tooltip-tip": {
    position: "absolute",
    borderRadius: "4px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "14px",
    fontFamily: "sans-serif",
    lineHeight: 1,
    zIndex: 100,
    whiteSpace: "nowrap",
    "&:before": {
      content: '""',
      left: "50%",
      border: "solid transparent",
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderWidth: "var(--tooltip-arrow-size)",
      marginLeft: "calc(var(--tooltip-arrow-size)*-1)",
    },
    "&.top": {
      top: "calc(var(--tooltip-margin)*-1)",
      "&:before": {
        top: "100%",
      },
    },
    "&.bottom": {
      bottom: "calc(var(--tooltip-margin)*-1)",
      "&:before": {
        bottom: "100%",
      },
    },
    "&.right": {
      left: "calc(100% + var(--tooltip-margin))",
      top: "50%",
      transform: "translateX(0) translateY(-50%)",
      "&:before": {
        left: "calc(var(--tooltip-arrow-size) * -1)",
        top: "50%",
        transform: "translateX(0) translateY(-50%)",
      },
    },
    "&.left": {
      left: "auto",
      right: "calc(100% + var(--tooltip-margin))",
      top: "50%",
      transform: "translateX(0) translateY(-50%)",
      "&:before": {
        left: "auto",
        right: "calc(var(--tooltip-arrow-size) * -2)",
        top: "50%",
        transform: "translateX(0) translateY(-50%)",
      },
    },
    ".margin-calc-x": {
      marginLeft: `calc(50% - ${theme("spacing.3")})`,
    },
    ".margin-calc-y": {
      marginTop: `calc(0.2rem)`,
    },
  },
});

module.exports = TooltipBaseClasses;
