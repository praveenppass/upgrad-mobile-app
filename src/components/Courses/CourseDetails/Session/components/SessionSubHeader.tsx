import React from "react";
import { Pressable, View } from "react-native";

import {
	ICarrerStatusType,
	IEventData,
	IFilterSessionEvents,
	ILearningOrCareerStatusType,
	ILearningType,
	IPrepartionType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import { SessionStyles as styles } from "@components/Courses/CourseDetails/Session/SessionStyles";
import RNText from "@components/Reusable/RNText";

interface ISessionSubHeader {
	eventsData: IEventData[];
	eventStatus: IPrepartionType;
	handleEventStatus: (val: IPrepartionType) => void;
	setSelectedEvent: (val: ILearningOrCareerStatusType) => void;
	setFilterState: (value: IFilterSessionEvents) => void;
}

const SessionSubHeader = ({
	eventsData,
	eventStatus,
	handleEventStatus,
	setSelectedEvent,
	setFilterState,
}: ISessionSubHeader) => {
	return (
		<>
			{eventsData.map((item: IEventData) => {
				return (
					<>
						<Pressable
							key={item?.type}
							style={styles.liveContainer}
							onPress={() => {
								handleEventStatus(item?.type);
								setSelectedEvent(
									item?.type === IPrepartionType.LIVE_LEARNING
										? ILearningType.UPCOMING
										: ICarrerStatusType.TO_BE_SCHEDULED,
								);
								setFilterState({ status: [], type: [] });
							}}
						>
							<RNText
								title={item?.title}
								style={[
									styles.regularHeaderText,
									eventStatus === item?.type &&
										styles.selectedHeaderText,
								]}
							/>
							<View
								style={[
									styles.regularLine,
									eventStatus === item?.type &&
										styles.selectedLine,
								]}
							/>
						</Pressable>
					</>
				);
			})}
		</>
	);
};

export default SessionSubHeader;
