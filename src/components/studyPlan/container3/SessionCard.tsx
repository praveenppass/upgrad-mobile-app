import React, { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	ListRenderItem,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import RNText from "@components/Reusable/RNText";
import CommonAssetCard from "@components/studyPlan/common/CommonAssetCard";
import Container3Skeleton from "@components/studyPlan/common/Container3Skeleton";
import StudyPlanAssetIcon from "@components/studyPlan/common/StudyPlanAssetIcon";
import TopicCard from "@components/studyPlan/container3/TopicCard";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { ArrowDownIcon } from "@assets/icons/svg/common";
import { commonStyles } from "@assets/styles";

const { neutral, state } = colors;
const { regular, sm, semiBold } = commonStyles.text;

/**
 * SessionCard - Expandable Session Card Component
 *
 * A React Native component that displays session information with expandable content.
 * Features a session number, title, chevron indicator, and progress tracking lines.
 *
 * @param {string} label - Session identifier (e.g., "Session 1")
 * @param {string} sessionTitle - Main session title
 * @param {boolean} isExpanded - Whether the card is currently expanded
 * @param {function} onPress - Callback function when card is pressed
 * @param {number} progressPercentage - Progress completion percentage (0-100)
 * @param {boolean} isCompleted - Whether the session is completed
 * @param {boolean} isActive - Whether this is the currently active session
 */

export enum ISessionCardItemType {
	ASSET,
	TOPIC,
}

const STRINGS = createStringConstants({
	OPTIONAL: "common.optional",
});

export interface IAsset {
	assetType: IAssetType;
	name: string;
	label: string;
	isOptional: boolean;
	status: IAssetStatusEnum;
	isLocked: boolean;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	assetCode: string;
}

export interface ISessionList {
	progress: number;
	label: string;
	name: string;
	cardType: ISessionCardItemType;
	isOptional?: boolean;
	assetListForTopic?: IAsset[];
	assetType: IAssetType;
	status: IAssetStatusEnum;
	isLocked: boolean;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	assetCode: string;
	code: string;
}

interface ISessionCard {
	sessionLabel: string;
	sessionTitle: string;
	onPress?: () => void;
	progressPercentage?: number;
	isOptional?: boolean;
	sessionList: ISessionList[];
	loading: boolean;
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
	status: IAssetStatusEnum;
	expandedIndex: boolean;
	currentTopicIndex: number;
	parentIndex: number;
}

const SessionCard = ({
	sessionList,
	sessionLabel,
	sessionTitle,
	onPress,
	progressPercentage = 0,
	isOptional = false,
	loading,
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
	status,
	expandedIndex,
	currentTopicIndex,
	parentIndex,
}: ISessionCard) => {
	const [expandedTopicIndex, setExpandedTopicIndex] =
		useState(currentTopicIndex);

	useEffect(() => {
		setExpandedTopicIndex(currentTopicIndex);
	}, [currentTopicIndex]);

	const handleTopicPress = useCallback((index: number) => {
		setExpandedTopicIndex((prev) => (prev === index ? -1 : index));
	}, []);

	const renderItem: ListRenderItem<ISessionList> = useCallback(
		({ item, index }) => {
			if (item.cardType === ISessionCardItemType.ASSET)
				return (
					<CommonAssetCard
						{...item}
						title={item.name}
						learningPathName={learningPathName}
						learningPathId={learningPathId}
						learningPathType={learningPathType}
						learningPathCode={learningPathCode}
						workshopId={workshopId}
						workshopCode={workshopCode}
						userProgramId={userProgramId}
						onPress={onAssetPress}
						currentAssetCode={currentAssetCode}
						testID={`container3_item_card_l2_${index}`}
						labelTestID={`container3_sessioncard_${parentIndex}_commonassetcard_label_${index}`}
					/>
				);
			return (
				<TopicCard
					{...item}
					assetList={item.assetListForTopic}
					onPress={() => handleTopicPress(index)}
					title={item.name}
					learningPathName={learningPathName}
					learningPathId={learningPathId}
					learningPathType={learningPathType}
					learningPathCode={learningPathCode}
					workshopId={workshopId}
					workshopCode={workshopCode}
					onAssetPress={onAssetPress}
					currentAssetCode={currentAssetCode}
					testID={`container3_item_card_l2_${index}`}
					labelTestID={`container3_sessioncard_${parentIndex}_topiccard_label_${index}`}
					isExpanded={expandedTopicIndex === index}
					parentIndex={parentIndex}
					sessionIndex={index}
				/>
			);
		},
		[
			onAssetPress,
			learningPathName,
			learningPathId,
			learningPathType,
			learningPathCode,
			workshopId,
			currentAssetCode,
			expandedTopicIndex,
			parentIndex,
			workshopCode,
			userProgramId,
		],
	);

	return (
		<Pressable
			style={styles.cardContainer}
			onPress={onPress}
			testID={testID}
		>
			<View style={styles.innerContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.textContainer}>
						<View style={styles.iconContainer}>
							<StudyPlanAssetIcon
								assetStatus={status}
								isLocked={isLocked}
							/>
							<RNText
								title={sessionLabel}
								style={styles.label}
								numberOfLines={1}
							/>
							{isOptional && (
								<RNText
									title={`• ${getString(STRINGS.OPTIONAL)}`}
									style={styles.tag}
									testID={`container3_sessioncard_label_${parentIndex}`}
								/>
							)}
						</View>
						<RNText
							title={sessionTitle}
							style={styles.sessionTitle}
							numberOfLines={2}
						/>
					</View>
					<ArrowDownIcon
						width={horizontalScale(12)}
						height={verticalScale(20)}
						color={neutral.grey_06}
						style={{
							transform: [
								{ rotate: expandedIndex ? "180deg" : "0deg" },
							],
						}}
					/>
				</View>
				{expandedIndex && (
					<FlatList
						data={sessionList}
						style={styles.contentContainer}
						keyExtractor={(item) => `session-${item.name}`}
						renderItem={renderItem}
						scrollEnabled={false}
						ListEmptyComponent={Container3Skeleton}
						initialNumToRender={sessionList?.length}
					/>
				)}
			</View>
			<ProgressBar
				progressPercentage={progressPercentage}
				isVisible={!(expandedIndex || loading)}
			/>
		</Pressable>
	);
};

interface IProgressBar {
	progressPercentage: number;
	isVisible: boolean;
}

const ProgressBar = ({ progressPercentage, isVisible }: IProgressBar) => {
	if (!isVisible) return null;

	return (
		<View style={styles.progressLineBackground}>
			<View
				style={[
					{ width: `${progressPercentage}%` },
					styles.progressLine,
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		boxShadow: `2px 0px 12px ${neutral.black}0F`,
		overflow: "hidden",
	},
	collapsed: {
		display: "none",
	},
	contentContainer: {
		gap: verticalScale(20),
	},
	expanded: {
		display: "flex",
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
	},
	innerContainer: {
		gap: verticalScale(16),
		paddingHorizontal: horizontalScale(14),
		paddingVertical: verticalScale(16),
	},
	label: {
		...sm,
		...regular,
		color: neutral.grey_06,
		flexShrink: 1,
	},
	progressLine: {
		backgroundColor: state.success_green,
		height: verticalScale(3),
	},
	progressLineBackground: {
		backgroundColor: state.success_light_green,
	},
	sessionTitle: {
		...semiBold,
		color: neutral.black,
		fontSize: verticalScale(14),
	},
	tag: {
		...sm,
		...regular,
		color: neutral.grey_06,
	},
	textContainer: {
		flexShrink: 1,
		gap: horizontalScale(10),
	},
});

export default SessionCard;
