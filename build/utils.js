"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
exports.identity = function (x) { return x; };
exports.chunks = function (array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, function (v, i) {
        return array.slice(i * size, i * size + size);
    });
};
exports.combine = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(exports.identity).join(" ");
};
// Date
exports.getDaysInMonth = function (date) {
    var startWeek = date_fns_1.startOfWeek(date_fns_1.startOfMonth(date));
    var endWeek = date_fns_1.endOfWeek(date_fns_1.endOfMonth(date));
    var days = [];
    for (var curr = startWeek; date_fns_1.isBefore(curr, endWeek);) {
        days.push(curr);
        curr = date_fns_1.addDays(curr, 1);
    }
    return days;
};
exports.isStartOfRange = function (_a, day) {
    var startDate = _a.startDate;
    return (startDate && date_fns_1.isSameDay(day, startDate));
};
exports.isEndOfRange = function (_a, day) {
    var endDate = _a.endDate;
    return (endDate && date_fns_1.isSameDay(day, endDate));
};
exports.inDateRange = function (_a, day) {
    var startDate = _a.startDate, endDate = _a.endDate;
    return (startDate &&
        endDate &&
        (date_fns_1.isWithinRange(day, startDate, endDate) ||
            date_fns_1.isSameDay(day, startDate) ||
            date_fns_1.isSameDay(day, endDate)));
};
exports.isRangeSameDay = function (_a) {
    var startDate = _a.startDate, endDate = _a.endDate;
    if (startDate && endDate) {
        return date_fns_1.isSameDay(startDate, endDate);
    }
    return false;
};
exports.parseOptionalDate = function (date, defaultValue) {
    if (date) {
        var parsed = date_fns_1.parse(date);
        if (date_fns_1.isValid(parsed))
            return parsed;
    }
    return defaultValue;
};
//# sourceMappingURL=utils.js.map