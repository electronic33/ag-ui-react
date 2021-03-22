const plugin = require("tailwindcss/plugin");

const ButtonClasses = require("./classes/button");

module.exports = plugin(({ addUtilities, addBase, theme }) => {
  const newComponents = {
    ...ButtonClasses(theme),
  };

  addUtilities(newComponents, {
    respectImportant: false,
  });

  addBase({
    button: {
      "&:focus": {
        outline: "none",
        // "box-shadow": `var(--tw-ring-inset) 0 0 0 calc(1px + var(${theme(
        //   "ringOffsetWidth.2",
        // )})) var(${theme("ringColor.DEFAULT")})`,
      },
    },
  });
});
