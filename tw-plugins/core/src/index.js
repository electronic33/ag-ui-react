const plugin = require('tailwindcss/plugin');
const defaultConfig = require('./defaultConfig');

const ButtonClasses = require('./classes/button');
const AccordionClasses = require('./classes/accordion');
const AlertDialog = require('./classes/alert-dialog');
const BottomNav = require('./classes/bottom-nav');
const BreadCrumbs = require('./classes/bread-crumbs');
const Button = require('./classes/button');
const Calendar = require('./classes/calendar');
const Checkbox = require('./classes/checkbox');
const Drawer = require('./classes/drawer');
const DropwdownButton = require('./classes/dropdown-button');
const ErrorMessage = require('./classes/error-message');
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
const Tabs = require('./classes/tabs');
const TextArea = require('./classes/text-area');
const TextInput = require('./classes/text-input');
const Tooltip = require('./classes/tooltip');
const NumericInputBaseClasses = require('./classes/numeric-input');

module.exports = plugin(({ addComponents, theme }) => {
  const newComponents = {
    ...ButtonClasses(theme),
    ...AccordionClasses(theme),
    ...AlertDialog(theme),
    ...BottomNav(theme),
    ...BreadCrumbs(theme),
    ...Button(theme),
    ...Calendar(theme),
    ...Checkbox(theme),
    ...Drawer(theme),
    ...DropwdownButton(theme),
    ...ErrorMessage(theme),
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
    ...Tabs(theme),
    ...TextArea(theme),
    ...TextInput(theme),
    ...Tooltip(theme),
    ...NumericInputBaseClasses(theme),
  };

  addComponents(newComponents);
}, defaultConfig);
