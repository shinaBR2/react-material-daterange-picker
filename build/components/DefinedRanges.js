"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var date_fns_1 = require("date-fns");
var isSameRange = function (first, second) {
    var fStart = first.startDate, fEnd = first.endDate;
    var sStart = second.startDate, sEnd = second.endDate;
    if (fStart && sStart && fEnd && sEnd) {
        return date_fns_1.isSameDay(fStart, sStart) && date_fns_1.isSameDay(fEnd, sEnd);
    }
    return false;
};
var DefinedRanges = function (props) {
    return (react_1.default.createElement(core_1.List, null, props.ranges.map(function (range, idx) { return (react_1.default.createElement(core_1.ListItem, { button: true, key: idx, onClick: function () { return props.setRange(range); } },
        react_1.default.createElement(core_1.ListItemText, { primaryTypographyProps: {
                variant: "body2",
                style: {
                    fontWeight: isSameRange(range, props.selectedRange)
                        ? "bold"
                        : "normal"
                }
            } }, range.label))); })));
};
exports.default = DefinedRanges;
//# sourceMappingURL=DefinedRanges.js.map