const BreadCrumbsBaseClasses = (theme) => ({
  ".bread-crumbs": {
    display: "flex",
  },
  ".bread-crumb": {
    display: "flex",
    alignItems: "center",
    marginRight: theme("spacing.2"),
  },
  ".bread-crumb-icon": {
    marginRight: theme("spacing.2"),
    fontSize: theme("fontSize.xs"),
    lineHeight: theme("lineHeight.4"),
  },
});

module.exports = BreadCrumbsBaseClasses;
