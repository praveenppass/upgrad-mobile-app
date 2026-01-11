import React from "react";
import {
	FlatList,
	ScrollView,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import EventCard from "@components/academicPlanner/cards/eventCard";
import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import CollapsibleListView from "@components/academicPlanner/common/CollapsibleListView";
import CollapsibleListViewSkeleton from "@components/academicPlanner/common/CollapsibleListViewSkeleton";
import EventListSkeleton from "@components/academicPlanner/common/EventListSkeleton";
import EmptyUseEventsView from "@components/academicPlanner/EmptyUseEventsView";

import { horizontalScale, verticalScale } from "@utils/functions";

import { strings } from "@assets/strings";

interface EventListProps {
	urgentEventCardData?: IEventCardProps[];
	eventCardData: IEventCardProps[];
	loading: boolean;
	loadMore?: () => void;
	onRefetchEvents: () => void;
	marginStyle?: StyleProp<ViewStyle>;
	showEmptyView?: boolean;
	showUrgentEvents?: boolean;
	isFromStudyPlan: boolean;
}

interface IRenderCardProps {
	item: IEventCardProps;
	onRefetchEvents: () => void;
}
const renderCard = ({ item, onRefetchEvents }: IRenderCardProps) => (
	<EventCard
		event={{
			...item,
			style: styles.listStyle,
		}}
		onRefetchEvents={onRefetchEvents}
	/>
);

const ItemSeparator = () => <View style={styles.itemSeparatorStyle} />;
const AcademicPlannerFooterView = () => <View style={styles.footerStyle} />;
const StudyPlanFotterView = () => <View style={styles.footerGap} />;
const EventList: React.FC<EventListProps> = ({
	urgentEventCardData,
	eventCardData,
	loading,
	loadMore,
	onRefetchEvents,
	marginStyle,
	showEmptyView,
	showUrgentEvents,
	isFromStudyPlan,
}) => {
	if (loading) {
		return (
			<ScrollView nestedScrollEnabled={true}>
				<CollapsibleListViewSkeleton />
				<EventListSkeleton />
			</ScrollView>
		);
	}

	if (!loading && showEmptyView)
		return <EmptyUseEventsView isFromStudyPlan={isFromStudyPlan} />;

	return (
		<ScrollView
			nestedScrollEnabled={false}
			showsVerticalScrollIndicator={false}
		>
			{showUrgentEvents &&
				urgentEventCardData &&
				urgentEventCardData.length > 0 && (
					<CollapsibleListView
						title={`${strings.URGENT} (${urgentEventCardData.length})`}
						data={urgentEventCardData}
						renderItem={({ item }) =>
							renderCard({ item, onRefetchEvents })
						}
					/>
				)}

			<FlatList
				style={[styles.listMain, marginStyle]}
				contentContainerStyle={styles.contentContainer}
				data={eventCardData}
				scrollEnabled={true}
				renderItem={({ item }) => renderCard({ item, onRefetchEvents })}
				keyExtractor={(_, index) => index.toString()}
				ItemSeparatorComponent={ItemSeparator}
				onEndReached={loadMore}
				onEndReachedThreshold={0.1}
				nestedScrollEnabled={false}
				ListFooterComponent={
					isFromStudyPlan
						? StudyPlanFotterView
						: AcademicPlannerFooterView
				}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flexGrow: 1,
		paddingBottom: verticalScale(20),
	},
	footerGap: {
		height: verticalScale(50),
	},
	footerStyle: {
		height: verticalScale(50),
	},
	itemSeparatorStyle: {
		height: verticalScale(12),
	},
	listMain: {
		marginTop: verticalScale(24),
	},
	listStyle: {
		marginHorizontal: horizontalScale(20),
	},
});

export default EventList;
