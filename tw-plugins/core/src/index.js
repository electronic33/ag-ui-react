const plugin = require('tailwindcss/plugin');

const ButtonClasses = require('./classes/button');
const AccordionClasses = require('./classes/accordion');
const AlertDialog = require('./classes/alert-dialog');
const BottomNav = require('./classes/bottom-nav');
const BreadCrumbs = require('./classes/bread-crumbs');
const ButtonSpinner = require('./classes/button-spinner');
const Button = require('./classes/button');
const Calendar = require('./classes/calendar');
const Checkbox = require('./classes/checkbox');
const Drawer = require('./classes/drawer');
const DropwdownButton = require('./classes/dropdown-button');
const ErrorMessage = require('./classes/error-message');
const ErrorToast = require('./classes/error-toast');
const Label = require('./classes/label');
const Markdown = require('./classes/markdown');
const Menu = require('./classes/menu');
const Modal = require('./classes/modal');
const Pagination = require('./classes/pagination');
const Popover = require('./classes/popover');
const Progress = require('./classes/progress');
const Rate = require('./classes/rate');
const ScrollTo = require('./classes/scroll-to');
const Skeleton = require('./classes/skeleton');
const Slider = require('./classes/slider');
const SuccessToast = require('./classes/success-toast');
const Tabs = require('./classes/tabs');
const TextArea = require('./classes/text-area');
const TextInput = require('./classes/text-input');
const Tooltip = require('./classes/tooltip');

module.exports = plugin(({ addComponents, addBase, theme }) => {
  const newComponents = {
    ...ButtonClasses(theme),
    ...AccordionClasses(theme),
    ...AlertDialog(theme),
    ...BottomNav(theme),
    ...BreadCrumbs(theme),
    ...ButtonSpinner(theme),
    ...Button(theme),
    ...Calendar(theme),
    ...Checkbox(theme),
    ...Drawer(theme),
    ...DropwdownButton(theme),
    ...ErrorMessage(theme),
    ...ErrorToast(theme),
    ...Label(theme),
    ...Markdown(theme),
    ...Menu(theme),
    ...Modal(theme),
    ...Pagination(theme),
    ...Popover(theme),
    ...Progress(theme),
    ...Rate(theme),
    ...ScrollTo(theme),
    ...Skeleton(theme),
    ...Slider(theme),
    ...SuccessToast(theme),
    ...Tabs(theme),
    ...TextArea(theme),
    ...TextInput(theme),
    ...Tooltip(theme),
  };

  addComponents(newComponents);

  addBase({
    button: {
      '&:focus': {
        outline: 'none',
        // "box-shadow": `var(--tw-ring-inset) 0 0 0 calc(1px + var(${theme(
        //   "ringOffsetWidth.2",
        // )})) var(${theme("ringColor.DEFAULT")})`,
      },
    },
  });
});
