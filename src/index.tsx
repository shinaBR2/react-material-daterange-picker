import * as React from "react";
import {
	addMonths,
	isSameDay,
	isWithinRange,
	isAfter,
	isBefore,
	isSameMonth,
	addYears,
	max,
	min
} from "date-fns";
import { DateRange, NavigationAction, DefinedRange } from "./types";
import Menu from "./components/Menu";
import { defaultRanges } from "./defaults";
import { parseOptionalDate } from "./utils";

type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
	FIRST_MONTH: Symbol("firstMonth"),
	SECOND_MONTH: Symbol("secondMonth"),
	BOTH: Symbol("all"),
	NONE: Symbol('none')
};

const getValidatedMonths = (range: DateRange, minDate: Date, maxDate: Date) => {
	let { startDate, endDate } = range;
	if (startDate && endDate) {
		const newStart = max(startDate, minDate);
		const newEnd = min(endDate, maxDate);

		return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
	} else {
		return [startDate, endDate];
	}
};

interface DateRangePickerProps {
	open: boolean;
	initialDateRange?: DateRange;
	definedRanges?: DefinedRange[];
	minDate?: Date | string;
	maxDate?: Date | string;
	isSingleMonth?: boolean;
	onChange: (dateRange: DateRange) => void;
}

const DateRangePickerImpl: React.FunctionComponent<DateRangePickerProps> = props => {
	const today = new Date();

	const {
		open,
		onChange,
		initialDateRange,
		minDate,
		maxDate,
		isSingleMonth = false,
		definedRanges = defaultRanges
	} = props;

	const minDateValid = parseOptionalDate(minDate, addYears(today, -1));
	const maxDateValid = parseOptionalDate(maxDate, addYears(today, 1));
	const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
		initialDateRange || {},
		minDateValid,
		maxDateValid
	);

	const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
	const [hoverDay, setHoverDay] = React.useState<Date>();
	const [firstMonth, setFirstMonth] = React.useState<Date>(intialFirstMonth || today);

	/**
	 * Logic here:
	 *
	 * If isSingleMonth === true, we have only one value for both firstMonth and secondMonth
	 * Otherwise, we have secondMonth >= firstMonth, default of secondMonth is firstMonth + 1
	 */
	const defaultSecondMonth = isSingleMonth ? firstMonth : addMonths(firstMonth, 1);
	const [secondMonth, setSecondMonth] = React.useState<Date>(
		initialSecondMonth || defaultSecondMonth
	);

	const { startDate, endDate } = dateRange;

	// handlers
	const setFirstMonthValidated = (date: Date) => {
		if (isBefore(minDateValid, date)) {
			if (isSingleMonth) {
				if (isBefore(date, maxDateValid)) {
					setFirstMonth(date);
				}
			} else {
				if (isBefore(date, secondMonth)) {
					setFirstMonth(date);
				}
			}
		}

		/*if (isBefore(date, secondMonth) && isBefore(minDateValid, date)) {
			setFirstMonth(date);
		}*/
	};

	const setSecondMonthValidated = (date: Date) => {
		if (isAfter(maxDateValid, date)) {
			if (isSingleMonth) {
				if (isAfter(date, minDateValid)) {
					setSecondMonth(date);
				}
			} else {
				if (isAfter(date, firstMonth)) {
					setSecondMonth(date);
				}
			}
		}

		/*if (isAfter(date, firstMonth) && isAfter(maxDateValid, date)) {
			setSecondMonth(date);
		}*/
	};

	const setDateRangeValidated = (range: DateRange) => {
		let { startDate: newStart, endDate: newEnd } = range;
		if (newStart && newEnd) {
			range.startDate = newStart = max(newStart, minDateValid);
			range.endDate = newEnd = min(newEnd, maxDateValid);
			setDateRange(range);
			onChange(range);
			setFirstMonth(newStart);
			setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
		}
	};

	const onDayClick = (day: Date) => {
		if (startDate && !endDate && !isBefore(day, startDate)) {
			const newRange = { startDate, endDate: day };
			onChange(newRange);
			setDateRange(newRange);
		} else {
			setDateRange({ startDate: day, endDate: undefined });
		}
		setHoverDay(day);
	};

	/**
	 * This hanlder will be used when user click on next/prev button
	 * on the header of month
	 * 
	 * @param  {[Marker]} marker: Marker           [determine what month is focus on]
	 * @param  {[NavigationAction]} action: NavigationAction [next or prev]
	 * @return {[void]}
	 */
	const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
		if (marker == MARKERS.FIRST_MONTH) {
			const firstNew = addMonths(firstMonth, action);
			if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
		} else if (marker == MARKERS.SECOND_MONTH) {
			const secondNew = addMonths(secondMonth, action);
			if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
		} else if (marker === MARKERS.BOTH) {
			/**
			 * This case happens when isSingleMonth is true
			 * So we need to set firstMonth and secondMonth new same value
			 */

			const newMonth = addMonths(firstMonth, action);
			setFirstMonth(newMonth);
			setSecondMonth(newMonth);
		} else {
			return;
		}
	};

	const onDayHover = (date: Date) => {
		if (startDate && !endDate) {
			if (!hoverDay || !isSameDay(date, hoverDay)) {
				setHoverDay(date);
			}
		}
	};

	// helpers
	const inHoverRange = (day: Date) => {
		return (startDate &&
			!endDate &&
			hoverDay &&
			isAfter(hoverDay, startDate) &&
			isWithinRange(day, startDate, hoverDay)) as boolean;
	};

	const helpers = {
		inHoverRange
	};

	const handlers = {
		onDayClick,
		onDayHover,
		onMonthNavigate
	};

	return open ? (
		<Menu
			dateRange={dateRange}
			minDate={minDateValid}
			maxDate={maxDateValid}
			isSingleMonth={isSingleMonth}
			ranges={definedRanges}
			firstMonth={firstMonth}
			secondMonth={secondMonth}
			setFirstMonth={setFirstMonthValidated}
			setSecondMonth={setSecondMonthValidated}
			setDateRange={setDateRangeValidated}
			helpers={helpers}
			handlers={handlers}
		/>
	) : null;
};

export { DateRange, DefinedRange } from "./types";
export const DateRangePicker = DateRangePickerImpl;
