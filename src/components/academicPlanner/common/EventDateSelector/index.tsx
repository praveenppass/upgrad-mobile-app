import React from "react";
import { StyleSheet, View } from "react-native";

import CustomDatesModal from "@components/academicPlanner/common/EventDateSelector/CustomDatesModal";
import DateRangeShifter, {
	IDateRangeShifterSetDates,
} from "@components/academicPlanner/common/EventDateSelector/DateRangeShifter";
import EventViewSelector from "@components/academicPlanner/common/EventDateSelector/EventViewSelector";
import {
	ICustomDatesModalOnSubmit,
	IEventViewType,
	IRangeSelectionType,
} from "@components/academicPlanner/common/EventDateSelector/index.interface";
import RangeSelectionModal from "@components/academicPlanner/common/EventDateSelector/RangeSelectionModal";
import RangeTypeSelector from "@components/academicPlanner/common/EventDateSelector/RangeTypeSelector";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

interface IEventDateSelector {
	loading?: boolean;
	minDate: string;
	maxDate: string;

	eventViewType: IEventViewType;
	setEventViewType: (evt: IEventViewType) => void;

	rangeSelectionType: IRangeSelectionType;

	hideCustomDateSelector?: boolean;

	showCustomDateSelector: boolean;
	setShowCustomDateSelector: (show: boolean) => void;

	showDateSelector: boolean;
	setShowDateSelector: (show: boolean) => void;

	onRangeSelectionChange: (rst: IRangeSelectionType) => void;

	onCustomDatesSubmit: (data: ICustomDatesModalOnSubmit) => void;
	onShiftDates: (data: IDateRangeShifterSetDates) => void;
}

const { neutral } = colors;

const EventDateSelectorSkeleton = () => (
	<Skeleton style={styles.container}>
		<View style={styles.rangeTypeSelectorSkeleton} />
		<View style={styles.dateRangeShifterSkeleton} />
		<View style={styles.eventViewSelectorSkeleton} />
	</Skeleton>
);

const EventDateSelector = ({
	loading,
	maxDate,
	minDate,
	eventViewType,
	setEventViewType,
	rangeSelectionType,
	hideCustomDateSelector,
	setShowCustomDateSelector,
	setShowDateSelector,
	showCustomDateSelector,
	showDateSelector,
	onRangeSelectionChange,
	onCustomDatesSubmit,
	onShiftDates,
}: IEventDateSelector) => {
	const handleCloseDateSelector = () => setShowDateSelector(false);

	const handleCloseCustomDateSelector = () =>
		setShowCustomDateSelector(false);

	if (loading) return <EventDateSelectorSkeleton />;

	return (
		<>
			<View style={styles.container}>
				<RangeTypeSelector
					rangeSelectionType={rangeSelectionType}
					onRangeSelectionPress={() => setShowDateSelector(true)}
				/>

				<DateRangeShifter
					endDate={maxDate}
					startDate={minDate}
					rangeSelectionType={rangeSelectionType}
					onShiftDates={onShiftDates}
				/>

				<EventViewSelector
					eventViewType={eventViewType}
					setEventViewType={setEventViewType}
				/>
			</View>

			<RangeSelectionModal
				isVisible={showDateSelector}
				onCloseModal={handleCloseDateSelector}
				rangeSelectionType={rangeSelectionType}
				setRangeSelectionType={onRangeSelectionChange}
				hideCustomDateSelector={hideCustomDateSelector}
			/>

			<CustomDatesModal
				isVisible={showCustomDateSelector}
				onCloseModal={handleCloseCustomDateSelector}
				onSubmit={onCustomDatesSubmit}
			/>
		</>
	);
};

export default EventDateSelector;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.black,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(12),
	},
	dateRangeShifterSkeleton: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(20),
		height: verticalScale(14),
		width: horizontalScale(80),
	},
	eventViewSelectorSkeleton: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(30),
		height: verticalScale(24),
		width: horizontalScale(72),
	},
	rangeTypeSelectorSkeleton: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(4),
		height: verticalScale(25),
		width: horizontalScale(55),
	},
});
