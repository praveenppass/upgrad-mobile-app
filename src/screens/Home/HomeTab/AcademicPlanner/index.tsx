import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import useAcademicPlannerController from "@screens/Home/HomeTab/AcademicPlanner/useAcademicPlannerController";

import EventDateSelector from "@components/academicPlanner/common/EventDateSelector";
import { IEventViewType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import EventCalendarView from "@components/academicPlanner/EventCalendarView";
import EventListView from "@components/academicPlanner/EventListView";
import NotEnrolledUserComponent from "@components/web/UserNotEnrolled";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const BodyComponent = () => {
	const {
		eventCardData,
		loading,
		eventViewType,
		filterState,
		isEventViewTypeCalendar,
		maxDate,
		minDate,
		rangeSelectionType,
		handleViewTypeChange,
		handleFilterStateChange,
		handleSortTypeChange,
		sortType,
		loadMore,
		urgentEventCardData,
		calendarSelectedDate,
		handleCalendarSelectedDateChange,
		handleCustomDatesSubmit,
		handleRangeSelectionChange,
		handleShiftDates,
		showCustomDateSelector,
		showDateSelector,
		setShowCustomDateSelector,
		setShowDateSelector,
		handleRefetchEvents,
		showEmptyView,
		showUrgentEvents,
		courseInfos,
		hasLearnCourses,
	} = useAcademicPlannerController();

	if (!hasLearnCourses) {
		return (
			<NotEnrolledUserComponent
				title={strings.YOU_HAVENT_ENROLLED_IN_ANY_COURSES_YET}
				showButton
			/>
		);
	}

	return (
		<View style={styles.container}>
			<EventDateSelector
				loading={false}
				maxDate={maxDate}
				minDate={minDate}
				eventViewType={eventViewType}
				setEventViewType={handleViewTypeChange}
				rangeSelectionType={rangeSelectionType}
				hideCustomDateSelector={isEventViewTypeCalendar}
				showCustomDateSelector={showCustomDateSelector}
				showDateSelector={showDateSelector}
				onRangeSelectionChange={handleRangeSelectionChange}
				onCustomDatesSubmit={handleCustomDatesSubmit}
				onShiftDates={handleShiftDates}
				setShowCustomDateSelector={setShowCustomDateSelector}
				setShowDateSelector={setShowDateSelector}
			/>

			{eventViewType === IEventViewType.List ? (
				<EventListView
					programList={courseInfos || []}
					urgentEventCardData={urgentEventCardData || []}
					eventCardData={eventCardData}
					filterState={filterState}
					setFilterState={handleFilterStateChange}
					sortType={sortType}
					setSortType={handleSortTypeChange}
					loading={loading}
					loadMore={loadMore}
					onRefetchEvents={handleRefetchEvents}
					showEmptyView={showEmptyView}
					showUrgentEvents={showUrgentEvents}
				/>
			) : (
				<EventCalendarView
					events={eventCardData}
					maxDate={maxDate}
					minDate={minDate}
					rangeSelectionType={rangeSelectionType}
					selectedDate={calendarSelectedDate}
					onSelectedDateChange={handleCalendarSelectedDateChange}
					onRefetchEvents={handleRefetchEvents}
				/>
			)}
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const AcademicPlanner = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showProfile
		backgroundColor={colors.neutral.white}
		removeBottomInset
		showBottomShadow={false}
	/>
);

export default memo(AcademicPlanner);

const styles = StyleSheet.create({
	container: { flex: 1 },
});
