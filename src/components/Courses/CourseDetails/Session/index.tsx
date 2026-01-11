import React, { memo } from "react";

import CourseListView from "@components/Courses/CourseDetails/Session/components/CourseListView";
import SessionFilter from "@components/Courses/CourseDetails/Session/components/SessionFilter";
import SessionHeader from "@components/Courses/CourseDetails/Session/components/SessionHeader";
import SessionListView from "@components/Courses/CourseDetails/Session/components/SessionListView";
import {
	ICarrerStatusType,
	ILearningType,
	IPrepartionType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import useSessionController from "@components/Courses/CourseDetails/Session/useSessionController";
import SortModal from "@components/Reusable/SortModal";

import { strings } from "@assets/strings";

const eventsPrepStatuses = [
	{
		title: strings.UPCOMING,
		type: ILearningType.UPCOMING,
	},
	{
		title: strings.PAST_EVENTS,
		type: ILearningType.PAST,
	},
];

const eventsCarrerStatuses = [
	{
		title: strings.TO_BE_SCHEDULED,
		type: ICarrerStatusType.TO_BE_SCHEDULED,
	},
	{
		title: strings.SCHEDULED,
		type: ICarrerStatusType.SCHEDULED,
	},
	{
		title: strings.EXPIRED,
		type: ICarrerStatusType.EXPIRED,
	},
];

interface ISessionProps {
	courseId: string;
}

const Session = ({ courseId }: ISessionProps) => {
	const eventsData = [
		{
			title: strings.LIVE_LEARNING,
			type: IPrepartionType.LIVE_LEARNING,
			options: eventsPrepStatuses,
		},
		{
			title: strings.CAREER_PREP,
			type: IPrepartionType.CAREER_PREP,
			options: eventsCarrerStatuses,
		},
	];

	const {
		eventCardData,
		isFetchingMore,
		overallLoading,
		sortType,
		filterState,
		eventStatus,
		isFilterModalOpen,
		isSortModalOpen,
		isEventLearning,
		selectedEvent,
		isResultEmpty,
		isCoursesTabSelected,
		coursesData,
		loadMore,
		setSelectedEvent,
		toggleFilterModal,
		toggleSortModal,
		setSortType,
		handleEventStatus,
		setFilterState,
		handleRefetchEvents,
	} = useSessionController({ courseId });

	return (
		<>
			<SessionHeader
				eventStatus={eventStatus}
				eventsData={eventsData}
				isEventLearning={isEventLearning}
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
				handleEventStatus={handleEventStatus}
				setSortType={setSortType}
				setFilterState={setFilterState}
				toggleFilterModal={toggleFilterModal}
				toggleSortModal={toggleSortModal}
			/>

			<SessionFilter
				isVisible={isFilterModalOpen}
				onCloseModal={toggleFilterModal}
				filterState={filterState}
				setFilterState={setFilterState}
			/>

			{isCoursesTabSelected ? (
				<CourseListView
					courses={coursesData}
					loading={overallLoading}
					userProgramId={courseId}
					onRefetch={handleRefetchEvents}
				/>
			) : (
				<SessionListView
					eventCardData={eventCardData}
					loading={overallLoading}
					showEmptyView={isResultEmpty}
					filterState={filterState}
					loadMore={loadMore}
					isFetchingMore={isFetchingMore}
					onRefetchEvents={handleRefetchEvents}
				/>
			)}

			<SortModal
				isVisible={isSortModalOpen}
				sortType={sortType}
				setSortType={setSortType}
				onCloseModal={toggleSortModal}
			/>
		</>
	);
};

export default memo(Session);
