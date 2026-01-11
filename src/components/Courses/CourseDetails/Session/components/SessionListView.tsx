import React from "react";
import { StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventList from "@components/academicPlanner/common/EventList";
import { IFilterSessionEvents } from "@components/Courses/CourseDetails/Session/index.interface";

interface ISessionListView {
	urgentCardData?: IEventCardProps[];
	eventCardData: IEventCardProps[];
	showEmptyView: boolean;
	loading: boolean;
	loadMore?: () => void;
	isFetchingMore?: boolean;
	onRefetchEvents: () => void;
	filterState: IFilterSessionEvents;
}

const SessionListView = ({
	eventCardData,
	loading,
	showEmptyView,
	onRefetchEvents,
	isFetchingMore,
	loadMore,
}: ISessionListView) => {
	return (
		<View style={styles.container}>
			<EventList
				eventCardData={eventCardData}
				loading={loading}
				isFetchingMore={isFetchingMore}
				showEmptyView={showEmptyView}
				showUrgentEvents={false}
				loadMore={loadMore}
				onRefetchEvents={onRefetchEvents}
				isFromStudyPlan={true}
			/>
		</View>
	);
};

export default SessionListView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
