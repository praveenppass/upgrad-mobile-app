import React from "react";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventList from "@components/academicPlanner/common/EventList";
import EventSortFilter from "@components/academicPlanner/EventListView/common/EventSortFilter";
import { IEventFilterState } from "@components/academicPlanner/EventListView/common/EventSortFilter/index.interface";
import { ISortType } from "@components/Reusable/SortModal";

import { ILearningCourseSection } from "@graphql/query/academicPlanner/interfaces";

interface IEventListView {
	programList: ILearningCourseSection[];
	urgentEventCardData: IEventCardProps[];
	eventCardData: IEventCardProps[];
	filterState: IEventFilterState;
	setFilterState: (filterState: IEventFilterState) => void;
	sortType: ISortType;
	setSortType: (sortType: ISortType) => void;
	loading: boolean;
	loadMore: () => void;
	onRefetchEvents: () => void;
	showEmptyView?: boolean;
	showUrgentEvents?: boolean;
}

const EventListView = ({
	programList,
	filterState,
	setFilterState,
	sortType,
	setSortType,
	urgentEventCardData,
	eventCardData,
	loading,
	loadMore,
	onRefetchEvents,
	showEmptyView,
	showUrgentEvents,
}: IEventListView) => {
	return (
		<>
			<EventSortFilter
				loading={loading}
				filterState={filterState}
				setFilterState={setFilterState}
				sortType={sortType}
				setSortType={setSortType}
				filterPrograms={programList}
			/>
			<EventList
				loading={loading}
				urgentEventCardData={urgentEventCardData}
				eventCardData={eventCardData}
				loadMore={loadMore}
				onRefetchEvents={onRefetchEvents}
				showEmptyView={showEmptyView}
				showUrgentEvents={showUrgentEvents}
				isFromStudyPlan={false}
			/>
		</>
	);
};

export default EventListView;
