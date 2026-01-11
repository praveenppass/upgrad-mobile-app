import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import EventFilter from "@components/academicPlanner/EventListView/common/EventSortFilter/EventFilter";
import { IEventFilterType } from "@components/academicPlanner/EventListView/common/EventSortFilter/index.interface";
import { IFilterOption } from "@components/Reusable/Filter/filter.interface";
import SortModal, { ISortType } from "@components/Reusable/SortModal";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { SessionFilterIcon, SortIcon } from "@assets/icons";

interface IEventSortFilter {
	filterState: Record<IEventFilterType, string[]>;
	setFilterState: (fs: Record<IEventFilterType, string[]>) => void;
	sortType: ISortType;
	setSortType: (st: ISortType) => void;
	loading?: boolean;
	filterPrograms: IFilterOption[];
}

const { neutral } = colors;

const EventSortFilterSkeleton = () => (
	<View style={styles.container}>
		<Skeleton
			style={[styles.innerContainer, styles.skeletonInnerContainer]}
		>
			<View style={styles.skeletonIcon} />
			<View style={styles.skeletonIcon} />
		</Skeleton>
	</View>
);

const EventSortFilter = ({
	filterState,
	setFilterState,
	sortType,
	setSortType,
	loading,
	filterPrograms,
}: IEventSortFilter) => {
	const [isSortModalVisible, setIsSortModalVisible] = useState(false);
	const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

	if (loading) return <EventSortFilterSkeleton />;

	return (
		<>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Pressable
						style={styles.iconContainer}
						onPress={() => setIsSortModalVisible(true)}
					>
						<SortIcon
							height={horizontalScale(14)}
							width={horizontalScale(14)}
							color={neutral.white}
						/>
					</Pressable>
					<Pressable
						style={styles.iconContainer}
						onPress={() => setIsFilterModalVisible(true)}
					>
						<SessionFilterIcon
							height={horizontalScale(14)}
							width={horizontalScale(14)}
							color={neutral.white}
						/>
					</Pressable>
				</View>
			</View>
			<SortModal
				isVisible={isSortModalVisible}
				sortType={sortType}
				setSortType={setSortType}
				onCloseModal={() => setIsSortModalVisible(false)}
			/>
			<EventFilter
				isVisible={isFilterModalVisible}
				onCloseModal={() => setIsFilterModalVisible(false)}
				filterState={filterState}
				setFilterState={setFilterState}
				programs={filterPrograms}
			/>
		</>
	);
};

export default EventSortFilter;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		bottom: verticalScale(10),
		justifyContent: "center",
		position: "absolute",
		width: "100%",
		zIndex: 5,
	},
	iconContainer: {
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(4),
	},
	innerContainer: {
		alignItems: "center",
		backgroundColor: neutral.grey_08,
		borderRadius: horizontalScale(30),
		elevation: 4,
		flexDirection: "row",
		gap: horizontalScale(4),
		height: verticalScale(36),
		justifyContent: "center",
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: verticalScale(2) },
		shadowOpacity: 0.25,
		shadowRadius: horizontalScale(4),
		width: horizontalScale(82),
	},
	skeletonIcon: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(5),
		height: verticalScale(14),
		width: horizontalScale(14),
	},
	skeletonInnerContainer: {
		gap: horizontalScale(16),
	},
});
