import React from "react";
import {
	Paper,
	Grid,
	Typography,
	Divider,
	createStyles,
	WithStyles,
	Theme,
	withStyles
} from "@material-ui/core";
import { format, differenceInCalendarMonths, isSameMonth } from "date-fns";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "..";

const styles = (theme: Theme) =>
	createStyles({
		header: {
			padding: "20px 70px"
		},
		headerItem: {
			flex: 1,
			textAlign: "center"
		},
		divider: {
			borderLeft: `1px solid ${theme.palette.action.hover}`,
			marginBottom: 20
		}
	});

interface MenuProps extends WithStyles<typeof styles> {
	dateRange: DateRange;
	ranges: DefinedRange[];
	minDate: Date;
	maxDate: Date;
	isSingleMonth: boolean;
	firstMonth: Date;
	secondMonth: Date;
	setFirstMonth: Setter<Date>;
	setSecondMonth: Setter<Date>;
	setDateRange: Setter<DateRange>;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Menu: React.FunctionComponent<MenuProps> = props => {
	const {
		classes,
		ranges,
		dateRange,
		minDate,
		maxDate,
		isSingleMonth,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { startDate, endDate } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers };

	/**
	 * From now, we always sure:
	 * 
	 * - firstMonth >= minDate
	 * - secondMonth <= maxDate
	 */
	const canGoPrev = !isSameMonth(firstMonth, minDate);
	const canGoNext = !isSameMonth(secondMonth, maxDate);
	console.log('isSingleMonth', isSingleMonth);
	console.log('firstMonth', firstMonth);
	console.log('secondMonth', secondMonth);
	console.log('minDate', minDate);
	console.log('maxDate', maxDate);
	console.log('canGoPrev', canGoPrev);
	console.log('canGoNext', canGoNext);

	return (
		<Paper elevation={5} square>
			<Grid container direction="row" wrap="nowrap">
				<Grid>
					<Grid container className={classes.header} alignItems="center">
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{startDate ? format(startDate, "MMMM DD, YYYY") : "Start Date"}
							</Typography>
						</Grid>
						<Grid item className={classes.headerItem}>
							<ArrowRightAlt color="action" />
						</Grid>
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{endDate ? format(endDate, "MMMM DD, YYYY") : "End Date"}
							</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container direction="row" justify="center" wrap="nowrap">
						<Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={isSingleMonth ? [canGoPrev, canGoNext] : [canGoPrev, canNavigateCloser]}
							marker={isSingleMonth ? MARKERS.NONE : MARKERS.FIRST_MONTH}
						/>
						{!isSingleMonth && <div className={classes.divider} />}
						{!isSingleMonth && <Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[canNavigateCloser, canGoNext]}
							marker={MARKERS.SECOND_MONTH}
						/>}
					</Grid>
				</Grid>
				<Grid>
					<DefinedRanges
						selectedRange={dateRange}
						ranges={ranges}
						setRange={setDateRange}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Menu);
