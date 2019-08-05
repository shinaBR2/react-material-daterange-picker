"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var date_fns_1 = require("date-fns");
var ArrowRightAlt_1 = __importDefault(require("@material-ui/icons/ArrowRightAlt"));
var Month_1 = __importDefault(require("./Month"));
var DefinedRanges_1 = __importDefault(require("./DefinedRanges"));
var __1 = require("..");
var styles = function (theme) {
    return core_1.createStyles({
        header: {
            padding: "20px 70px"
        },
        headerItem: {
            flex: 1,
            textAlign: "center"
        },
        divider: {
            borderLeft: "1px solid " + theme.palette.action.hover,
            marginBottom: 20
        }
    });
};
var Menu = function (props) {
    var classes = props.classes, ranges = props.ranges, dateRange = props.dateRange, minDate = props.minDate, maxDate = props.maxDate, firstMonth = props.firstMonth, setFirstMonth = props.setFirstMonth, secondMonth = props.secondMonth, setSecondMonth = props.setSecondMonth, setDateRange = props.setDateRange, helpers = props.helpers, handlers = props.handlers;
    var startDate = dateRange.startDate, endDate = dateRange.endDate;
    var canNavigateCloser = date_fns_1.differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
    var commonProps = { dateRange: dateRange, minDate: minDate, maxDate: maxDate, helpers: helpers, handlers: handlers };
    return (react_1.default.createElement(core_1.Paper, { elevation: 5, square: true },
        react_1.default.createElement(core_1.Grid, { container: true, direction: "row", wrap: "nowrap" },
            react_1.default.createElement(core_1.Grid, null,
                react_1.default.createElement(core_1.Grid, { container: true, className: classes.header, alignItems: "center" },
                    react_1.default.createElement(core_1.Grid, { item: true, className: classes.headerItem },
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1" }, startDate ? date_fns_1.format(startDate, "MMMM DD, YYYY") : "Start Date")),
                    react_1.default.createElement(core_1.Grid, { item: true, className: classes.headerItem },
                        react_1.default.createElement(ArrowRightAlt_1.default, { color: "action" })),
                    react_1.default.createElement(core_1.Grid, { item: true, className: classes.headerItem },
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1" }, endDate ? date_fns_1.format(endDate, "MMMM DD, YYYY") : "End Date"))),
                react_1.default.createElement(core_1.Divider, null),
                react_1.default.createElement(core_1.Grid, { container: true, direction: "row", justify: "center", wrap: "nowrap" },
                    react_1.default.createElement(Month_1.default, __assign({}, commonProps, { value: firstMonth, setValue: setFirstMonth, navState: [true, canNavigateCloser], marker: __1.MARKERS.FIRST_MONTH })),
                    react_1.default.createElement("div", { className: classes.divider }),
                    react_1.default.createElement(Month_1.default, __assign({}, commonProps, { value: secondMonth, setValue: setSecondMonth, navState: [canNavigateCloser, true], marker: __1.MARKERS.SECOND_MONTH })))),
            react_1.default.createElement("div", { className: classes.divider }),
            react_1.default.createElement(core_1.Grid, null,
                react_1.default.createElement(DefinedRanges_1.default, { selectedRange: dateRange, ranges: ranges, setRange: setDateRange })))));
};
exports.default = core_1.withStyles(styles)(Menu);
//# sourceMappingURL=Menu.js.map