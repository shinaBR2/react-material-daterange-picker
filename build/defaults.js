"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var getDefaultRanges = function (date) { return [
    {
        label: "Today",
        startDate: date,
        endDate: date
    },
    {
        label: "Yesterday",
        startDate: date_fns_1.addDays(date, -1),
        endDate: date_fns_1.addDays(date, -1)
    },
    {
        label: "This Week",
        startDate: date_fns_1.startOfWeek(date),
        endDate: date_fns_1.endOfWeek(date)
    },
    {
        label: "Last Week",
        startDate: date_fns_1.startOfWeek(date_fns_1.addWeeks(date, -1)),
        endDate: date_fns_1.endOfWeek(date_fns_1.addWeeks(date, -1))
    },
    {
        label: "Last 7 Days",
        startDate: date_fns_1.addWeeks(date, -1),
        endDate: date
    },
    {
        label: "This Month",
        startDate: date_fns_1.startOfMonth(date),
        endDate: date_fns_1.endOfMonth(date)
    },
    {
        label: "Last Month",
        startDate: date_fns_1.startOfMonth(date_fns_1.addMonths(date, -1)),
        endDate: date_fns_1.endOfMonth(date_fns_1.addMonths(date, -1))
    }
]; };
exports.defaultRanges = getDefaultRanges(new Date());
//# sourceMappingURL=defaults.js.map