import React, { useCallback } from "react";
import {
	FlatList,
	ListRenderItem,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import RNText from "@components/Reusable/RNText";
import StudyPlanAssetIcon from "@components/studyPlan/common/StudyPlanAssetIcon";
import AssetCard from "@components/studyPlan/container3/AssetCard";
import { IAsset } from "@components/studyPlan/container3/SessionCard";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { AddIconLxp, MinimizeIconLxp } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral, state } = colors;
const { regular, semiBold, xxSm, md } = commonStyles.text;

const STRINGS = createStringConstants({
	OPTIONAL: "common.optional",
});

interface ITopicCard {
	assetList?: IAsset[];
	label: string;
	title: string;
	onPress?: () => void;
	isExpanded?: boolean;
	progress?: number;
	isLocked: boolean;
	learningPathName: string;
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	onAssetPress?: () => void;
	workshopId: string;
	workshopCode: string;
	userProgramId: string;
	currentAssetCode?: string;
	testID?: string;
	labelTestID?: string;
	isOptional?: boolean;
	parentIndex: number;
	sessionIndex: number;
}

const TopicCard = ({
	assetList,
	label,
	title,
	onPress,
	progress = 50,
	isLocked,
	learningPathName,
	learningPathId,
	learningPathType,
	learningPathCode,
	onAssetPress,
	workshopId,
	workshopCode,
	userProgramId,
	currentAssetCode,
	testID,
	labelTestID,
	isOptional,
	isExpanded,
	parentIndex,
	sessionIndex,
}: ITopicCard) => {
	const renderItem: ListRenderItem<IAsset> = useCallback(
		({ item, index }) => {
			const showBorder =
				index !== Math.max(assetList?.length || 0, 1) - 1;
			return (
				<AssetCard
					{...item}
					showBorder={showBorder}
					assetStatus={item.status}
					learningPathName={learningPathName}
					learningPathId={learningPathId}
					learningPathType={learningPathType}
					learningPathCode={learningPathCode}
					workshopId={workshopId}
					workshopCode={workshopCode}
					userProgramId={userProgramId}
					onPress={onAssetPress}
					currentAssetCode={currentAssetCode}
					testID={`container3_item_card_l3_${index}`}
					labelTestID={`container3_sessioncard_${parentIndex}_topiccard_${sessionIndex}_assetcard_label_${index}`}
				/>
			);
		},
		[
			assetList,
			learningPathName,
			learningPathId,
			learningPathType,
			learningPathCode,
			workshopId,
			workshopCode,
			userProgramId,
			onAssetPress,
			currentAssetCode,
			parentIndex,
			sessionIndex,
		],
	);

	return (
		<>
			<Pressable
				onPress={onPress}
				style={[
					styles.topicHeaderContent,
					isExpanded && styles.topicHeaderContentExpanded,
					progress === 0 && styles.zeroProgressBackground,
				]}
				testID={testID}
			>
				<View
					style={[styles.progressFill, { width: `${progress}%` }]}
				/>
				<View style={styles.topicHeaderContentContainer}>
					<View style={styles.textContainer}>
						<View style={styles.iconContainer}>
							<StudyPlanAssetIcon isLocked={isLocked} />
							<RNText
								title={label}
								style={styles.topicNumber}
								numberOfLines={1}
								testID={labelTestID}
							/>
							{isOptional && (
								<RNText
									title={`• ${getString(STRINGS.OPTIONAL)}`}
									style={styles.tag}
								/>
							)}
						</View>
						<RNText
							title={title}
							style={styles.topicTitle}
							numberOfLines={1}
						/>
					</View>
					{!isExpanded ? (
						<AddIconLxp
							width={horizontalScale(16)}
							height={verticalScale(16)}
							color={neutral.grey_06}
						/>
					) : (
						<MinimizeIconLxp
							width={horizontalScale(16)}
							height={verticalScale(16)}
							color={neutral.grey_06}
						/>
					)}
				</View>
			</Pressable>

			{isExpanded && (
				<View style={styles.assetCard}>
					<FlatList
						style={[
							styles.collapsed,
							isExpanded && styles.expanded,
						]}
						data={assetList}
						keyExtractor={(item) => `topic-${item.name}`}
						renderItem={renderItem}
						scrollEnabled={false}
						initialNumToRender={assetList?.length}
					/>
				</View>
			)}
		</>
	);
};

export default TopicCard;

// Common values for reuse
const styleConstants = {
	borderRadius: horizontalScale(8),
	contentHeight: verticalScale(62),
	borderColor: neutral.grey_04,
};

const styles = StyleSheet.create({
	assetCard: {
		borderBottomLeftRadius: styleConstants.borderRadius,
		borderBottomRightRadius: styleConstants.borderRadius,
		borderBottomWidth: 1,
		borderColor: styleConstants.borderColor,
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	collapsed: {
		display: "none",
	},
	expanded: {
		display: "flex",
	},
	iconContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
	},
	progressFill: {
		backgroundColor: state.success_light_green,
		height: styleConstants.contentHeight,
		left: 0,
		position: "absolute",
		top: 0,
		zIndex: 0,
	},
	tag: {
		...xxSm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(16),
	},
	textContainer: {
		flex: 1,
		gap: verticalScale(4),
	},
	topicHeaderContent: {
		alignItems: "center",
		borderColor: styleConstants.borderColor,
		borderRadius: styleConstants.borderRadius,
		borderWidth: 1,
		flexDirection: "row",
		height: styleConstants.contentHeight,
		justifyContent: "space-between",
		overflow: "hidden",
		paddingVertical: verticalScale(10),
	},
	topicHeaderContentContainer: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(10),
	},
	topicHeaderContentExpanded: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	topicNumber: {
		flexShrink: 1,
		...xxSm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(16),
	},
	topicTitle: {
		...md,
		...semiBold,
		color: neutral.grey_08,
		lineHeight: verticalScale(21),
		marginRight: horizontalScale(10),
	},
	zeroProgressBackground: {
		backgroundColor: neutral.grey_02,
	},
});
