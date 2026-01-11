import React from "react";
import { StyleSheet } from "react-native";

import {
	IFilterSessionEvents,
	ISessionFilterType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import {
	sessionFilterStatusTypes,
	sessionFilterTaskTypes,
} from "@components/Courses/CourseDetails/Session/sessionFilter.util";
import FilterChips from "@components/Reusable/Filter/FilterChips";
import FilterModal from "@components/Reusable/Filter/FilterModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import { strings } from "@assets/strings";

interface ISessionFilter {
	isVisible: boolean;
	onCloseModal: () => void;
	filterState: IFilterSessionEvents;
	setFilterState: (value: IFilterSessionEvents) => void;
}

const filters = [
	{
		title: strings.STATUS,
		type: ISessionFilterType.STATUS,
		options: sessionFilterStatusTypes,
	},
	{
		title: strings.TYPE,
		type: ISessionFilterType.TYPE,
		options: sessionFilterTaskTypes,
	},
];

const SessionFilter = ({
	filterState,
	isVisible,
	onCloseModal,
	setFilterState,
}: ISessionFilter) => {
	return (
		<>
			<FilterChips<ISessionFilterType>
				filterState={filterState}
				setFilterState={setFilterState}
				filters={filters}
				style={styles.filterChipsContainer}
			/>
			<FilterModal<ISessionFilterType>
				isVisible={isVisible}
				onCloseModal={onCloseModal}
				initialFilterState={filterState}
				filters={filters}
				setFilterState={setFilterState}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	filterChipsContainer: {
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(10),
	},
});

export default SessionFilter;
