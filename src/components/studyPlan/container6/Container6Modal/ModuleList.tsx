import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import CommonAssetCard from "@components/studyPlan/common/CommonAssetCard";
import Container3Skeleton from "@components/studyPlan/common/Container3Skeleton";
import { IModuleCardListItem } from "@components/studyPlan/container3/Container3Component/container3Component.interface";
import SessionCard, {
	ISessionList,
} from "@components/studyPlan/container3/SessionCard";

import { horizontalScale, verticalScale } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

interface IModuleList {
	moduleCardList: IModuleCardListItem[];
	learningPathName: string;
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	onSessionPress: (index: number) => void;
	sessionList: ISessionList[];
	container3SessionDataLoading: boolean;
	closeModal: () => void;
	workshopId: string;
	assetCode: string;
	expandedSessionIndex: number;
	currentTopicIndex: number;
}

const ModuleList = ({
	moduleCardList,
	learningPathName,
	learningPathId,
	learningPathType,
	learningPathCode,
	onSessionPress,
	sessionList,
	container3SessionDataLoading,
	closeModal,
	workshopId,
	assetCode,
	expandedSessionIndex,
	currentTopicIndex,
}: IModuleList) => {
	const renderItem: ListRenderItem<IModuleCardListItem> = useCallback(
		({ item, index }) => {
			return item.type ? (
				<CommonAssetCard
					title={item.name}
					status={item.status}
					assetType={item.type}
					isLocked={item.isLocked}
					assetCode={item.assetCode}
					level1={item.level1}
					level2={item.level2}
					level3={item.level3}
					level4={item.level4}
					elective={item.elective}
					electiveGroup={item.electiveGroup}
					track={item.track}
					trackGroup={item.trackGroup}
					learningPathName={learningPathName}
					learningPathId={learningPathId}
					learningPathType={learningPathType}
					learningPathCode={learningPathCode}
					workshopId={workshopId}
					onPress={closeModal}
					currentAssetCode={assetCode}
				/>
			) : (
				<SessionCard
					sessionList={sessionList}
					sessionLabel={item?.label}
					sessionTitle={item?.name}
					progressPercentage={item?.progress || 0}
					isOptional={item?.isOptional || false}
					onPress={() => onSessionPress(index)}
					loading={container3SessionDataLoading}
					isLocked={item.isLocked}
					learningPathName={learningPathName}
					learningPathId={learningPathId}
					learningPathType={learningPathType}
					learningPathCode={learningPathCode}
					workshopId={workshopId}
					onAssetPress={closeModal}
					currentAssetCode={assetCode}
					expandedIndex={expandedSessionIndex === index}
					status={item.status}
					currentTopicIndex={currentTopicIndex}
				/>
			);
		},
		[
			sessionList,
			container3SessionDataLoading,
			onSessionPress,
			learningPathName,
			learningPathId,
			learningPathType,
			learningPathCode,
			workshopId,
			currentTopicIndex,
			expandedSessionIndex,
			assetCode,
		],
	);
	return (
		<FlatList
			data={moduleCardList}
			renderItem={renderItem}
			keyExtractor={(item) => `container3-${item.code}`}
			contentContainerStyle={styles.contentContainer}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={Container3Skeleton}
		/>
	);
};

export default ModuleList;

const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: horizontalScale(14),
		paddingTop: verticalScale(20),
	},
	separator: {
		height: verticalScale(16),
	},
});
