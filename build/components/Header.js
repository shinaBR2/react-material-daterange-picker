"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var react_1 = __importDefault(require("react"));
var ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
var ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
var date_fns_1 = require("date-fns");
var styles = core_1.createStyles({
    iconContainer: {
        padding: 5
    },
    icon: {
        padding: 10,
        "&:hover": {
            background: "none"
        }
    }
});
var MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];
var generateYears = function (relativeTo, count) {
    var half = Math.floor(count / 2);
    return Array(count)
        .fill(0)
        .map(function (y, i) { return relativeTo.getFullYear() - half + i; }); // TODO: make part of the state
};
var Header = function (_a) {
    var date = _a.date, classes = _a.classes, setDate = _a.setDate, nextDisabled = _a.nextDisabled, prevDisabled = _a.prevDisabled, onClickNext = _a.onClickNext, onClickPrevious = _a.onClickPrevious;
    var handleMonthChange = function (event) {
        setDate(date_fns_1.setMonth(date, parseInt(event.target.value)));
    };
    var handleYearChange = function (event) {
        setDate(date_fns_1.setYear(date, parseInt(event.target.value)));
    };
    return (react_1.default.createElement(core_1.Grid, { container: true, justify: "space-between", alignItems: "center" },
        react_1.default.createElement(core_1.Grid, { item: true, className: classes.iconContainer },
            react_1.default.createElement(core_1.IconButton, { className: classes.icon, disabled: prevDisabled, onClick: onClickPrevious },
                react_1.default.createElement(ChevronLeft_1.default, { color: prevDisabled ? "disabled" : "action" }))),
        react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(core_1.Select, { value: date_fns_1.getMonth(date), onChange: handleMonthChange, MenuProps: { disablePortal: true } }, MONTHS.map(function (month, idx) { return (react_1.default.createElement(core_1.MenuItem, { key: month, value: idx }, month)); }))),
        react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(core_1.Select, { value: date_fns_1.getYear(date), onChange: handleYearChange, MenuProps: { disablePortal: true } }, generateYears(date, 30).map(function (year) { return (react_1.default.createElement(core_1.MenuItem, { key: year, value: year }, year)); }))),
        react_1.default.createElement(core_1.Grid, { item: true, className: classes.iconContainer },
            react_1.default.createElement(core_1.IconButton, { className: classes.icon, disabled: nextDisabled, onClick: onClickNext },
                react_1.default.createElement(ChevronRight_1.default, { color: nextDisabled ? "disabled" : "action" })))));
};
exports.default = core_1.withStyles(styles)(Header);
//# sourceMappingURL=Header.js.map