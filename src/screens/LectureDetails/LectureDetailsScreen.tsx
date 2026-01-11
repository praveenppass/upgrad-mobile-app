import React from "react";
import { StyleSheet, View } from "react-native";

import useLectureDetailsController from "@screens/LectureDetails/useLectureDetailsController";

import SessionFilter from "@components/Courses/CourseDetails/Session/components/SessionFilter";
import SessionListView from "@components/Courses/CourseDetails/Session/components/SessionListView";
import SessionSortFilter from "@components/Courses/CourseDetails/Session/components/SessionSortFilter";
import SortModal from "@components/Reusable/SortModal";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

const BodyComponent = () => {
	const route = useAppRoute<typeof HOME_ROUTES.LectureDetailsScreen>();

	const { userProgramId, level1Id } = route.params || {};

	const {
		eventCardData,
		loading,
		isResultEmpty,
		loadMore,
		handleRefetchEvents,
		isFilterModalOpen,
		isSortModalOpen,
		filterState,
		toggleFilterModal,
		toggleSortModal,
		sortType,
		handleSortTypeChange,
		handleFilterStateChange,
	} = useLectureDetailsController({
		userProgramId: userProgramId || "",
		level1Id: level1Id || "",
	});

	return (
		<View style={styles.container}>
			<View style={styles.filterContainer}>
				<SessionSortFilter
					toggleSortModal={toggleSortModal}
					toggleFilterModal={toggleFilterModal}
				/>
			</View>

			<SessionFilter
				isVisible={isFilterModalOpen}
				onCloseModal={toggleFilterModal}
				filterState={filterState}
				setFilterState={handleFilterStateChange}
			/>

			<SortModal
				isVisible={isSortModalOpen}
				sortType={sortType}
				setSortType={handleSortTypeChange}
				onCloseModal={toggleSortModal}
			/>

			<SessionListView
				eventCardData={eventCardData}
				loading={loading}
				showEmptyView={isResultEmpty}
				filterState={filterState}
				loadMore={loadMore}
				onRefetchEvents={handleRefetchEvents}
			/>
		</View>
	);
};

const LectureDetailsScreen = () => {
	const route = useAppRoute<typeof HOME_ROUTES.LectureDetailsScreen>();

	const { courseName, courseLabel } = route.params || {};
	return (
		<WithHeaderLxp
			BodyComponent={BodyComponent}
			showBack
			title={courseName || courseLabel}
		/>
	);
};

export default LectureDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	filterContainer: {
		alignSelf: "flex-end",
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(20),
	},
});
