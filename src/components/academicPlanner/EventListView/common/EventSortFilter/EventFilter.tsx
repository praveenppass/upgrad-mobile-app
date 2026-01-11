import React from "react";
import { StyleSheet } from "react-native";

import {
	eventFilterStatusTypes,
	eventFilterTaskTypes,
} from "@components/academicPlanner/common/EventSortFilter/eventFilter.util";
import {
	IEventFilterState,
	IEventFilterType,
} from "@components/academicPlanner/EventListView/common/EventSortFilter/index.interface";
import { IFilterOption } from "@components/Reusable/Filter/filter.interface";
import FilterChips from "@components/Reusable/Filter/FilterChips";
import FilterModal from "@components/Reusable/Filter/FilterModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import { strings } from "@assets/strings";

interface IEventFilter {
	isVisible: boolean;
	onCloseModal: () => void;
	filterState: IEventFilterState;
	setFilterState: (fs: IEventFilterState) => void;
	programs: IFilterOption[];
}

const EventFilter = ({
	filterState,
	isVisible,
	onCloseModal,
	setFilterState,
	programs,
}: IEventFilter) => {
	const filters = [
		{
			title: strings.STATUS,
			type: IEventFilterType.STATUS,
			options: eventFilterStatusTypes,
		},
		{
			title: strings.TASK,
			type: IEventFilterType.TASK,
			options: eventFilterTaskTypes,
		},
		{
			title: strings.PROGRAM_NAME,
			type: IEventFilterType.PROGRAM,
			options: programs,
		},
	];

	return (
		<>
			<FilterChips<IEventFilterType>
				filterState={filterState}
				setFilterState={setFilterState}
				filters={filters}
				style={styles.filterChipsContainer}
			/>
			<FilterModal<IEventFilterType>
				isVisible={isVisible}
				onCloseModal={onCloseModal}
				initialFilterState={filterState}
				filters={filters}
				setFilterState={setFilterState}
			/>
		</>
	);
};

export default EventFilter;

const styles = StyleSheet.create({
	filterChipsContainer: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(10),
	},
});
