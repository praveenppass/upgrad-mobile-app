import React from "react";
import { Pressable, View } from "react-native";

import SessionSortFilter from "@components/Courses/CourseDetails/Session/components/SessionSortFilter";
import SessionSubHeader from "@components/Courses/CourseDetails/Session/components/SessionSubHeader";
import {
	ICarrerStatusType,
	IFilterSessionEvents,
	ILearningOrCareerStatusType,
	ILearningType,
	IPrepartionType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import { IEventData } from "@components/Courses/CourseDetails/Session/index.interface";
import { SessionStyles as styles } from "@components/Courses/CourseDetails/Session/SessionStyles";
import RNText from "@components/Reusable/RNText";
import { ISortType } from "@components/Reusable/SortModal";

import { strings } from "@assets/strings";

interface ISessionHeader {
	eventStatus: IPrepartionType;
	isEventLearning: boolean;
	handleEventStatus: (val: IPrepartionType) => void;
	toggleSortModal: () => void;
	toggleFilterModal: () => void;
	eventsData: IEventData[];
	setSelectedEvent: (val: ILearningOrCareerStatusType) => void;
	setSortType: (sortType: ISortType) => void;
	setFilterState: (value: IFilterSessionEvents) => void;
	selectedEvent: ILearningOrCareerStatusType;
}

interface IGetEvent {
	event: IPrepartionType;
	selectedEvent: ILearningOrCareerStatusType;
	setSelectedEvent: (val: ILearningOrCareerStatusType) => void;
	setSortType: (sortType: ISortType) => void;
	setFilterState: (value: IFilterSessionEvents) => void;
}

const careerOptions = [
	{ title: strings.TO_BE_SCHEDULED, type: ICarrerStatusType.TO_BE_SCHEDULED },
	{ title: strings.SCHEDULED, type: ICarrerStatusType.SCHEDULED },
	{ title: strings.EXPIRED, type: ICarrerStatusType.EXPIRED },
];

const learningOptions = [
	{ title: strings.UPCOMING, type: ILearningType.UPCOMING },
	{ title: strings.PAST_EVENTS, type: ILearningType.PAST },
	{ title: strings.COURSES, type: ILearningType.COURSES },
];

const getEventStatus = ({
	event,
	selectedEvent,
	setSelectedEvent,
	setSortType,
	setFilterState,
}: IGetEvent) => {
	let options = [];

	if (event === IPrepartionType.LIVE_LEARNING) {
		options = learningOptions || [];
	} else {
		options = careerOptions || [];
	}

	return options.map((item) => (
		<Pressable
			key={item?.type}
			style={[
				styles.selectedEventStatus,
				selectedEvent === item?.type && styles.regularEventStatus,
			]}
			onPress={() => {
				setSelectedEvent(item?.type);
				setSortType(0);
				setFilterState({ status: [], type: [] });
			}}
		>
			<RNText
				title={item?.title}
				style={[
					styles.selectEventText,
					selectedEvent === item?.type && styles.regularEventText,
				]}
			/>
		</Pressable>
	));
};

const SessionHeader = ({
	eventStatus,
	isEventLearning,
	handleEventStatus,
	selectedEvent,
	setSelectedEvent,
	eventsData,
	setSortType,
	setFilterState,
	toggleSortModal,
	toggleFilterModal,
}: ISessionHeader) => {
	return (
		<>
			<View style={styles.container}>
				<SessionSubHeader
					eventsData={eventsData}
					eventStatus={eventStatus}
					handleEventStatus={handleEventStatus}
					setSelectedEvent={setSelectedEvent}
					setFilterState={setFilterState}
				/>

				<View style={styles.flex1} />
				{isEventLearning ? (
					<SessionSortFilter
						toggleSortModal={toggleSortModal}
						toggleFilterModal={toggleFilterModal}
					/>
				) : null}
			</View>

			<View style={styles.subContainer}>
				{getEventStatus({
					event: eventStatus,
					selectedEvent,
					setSelectedEvent,
					setSortType,
					setFilterState,
				})}
			</View>
		</>
	);
};

export default SessionHeader;
