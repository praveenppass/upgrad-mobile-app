import React, { memo } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import { getTruncatedOptionalTitle } from "@screens/Home/StudyPlan/common/studyPlan.utils";

import RNText from "@components/Reusable/RNText";
import StudyPlanAssetIcon from "@components/studyPlan/common/StudyPlanAssetIcon";
import YouAreHereTag from "@components/studyPlan/common/YouAreHere";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { regular, sm, semiBold } = commonStyles.text;

/**
 * CommonAssetCard - A reusable card component for displaying assets
 * with an icon and title in study plan screens
 *
 * @param props - ICommonAssetCard interface properties
 * @returns JSX.Element - The rendered card component
 */

interface ICommonAssetCard {
	title: string;
	isOptional?: boolean;
	status: IAssetStatusEnum;
	assetType: IAssetType;
	containerStyle?: StyleProp<ViewStyle>;
	isLocked?: boolean;
	assetCode: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	learningPathName: string;
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	workshopId: string;
	workshopCode: string;
	userProgramId: string;
	onPress?: () => void;
	currentAssetCode?: string;
	testID?: string;
	labelTestID?: string;
}

const CommonAssetCard = ({
	title,
	isOptional,
	status,
	assetType,
	containerStyle,
	isLocked,
	assetCode,
	level1,
	level2,
	level3,
	level4,
	elective,
	electiveGroup,
	track,
	trackGroup,
	learningPathName,
	learningPathId,
	learningPathType,
	learningPathCode,
	workshopId,
	workshopCode,
	onPress,
	currentAssetCode,
	testID,
	labelTestID,
	userProgramId,
}: ICommonAssetCard) => {
	const isInProgress = status === IAssetStatusEnum.inProgress;
	const navigation = useAppNavigation();

	const handleAssetNavigation = () => {
		if (isLocked) return;
		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.Container6Screen,
			params: {
				assetCode,
				learningPathName,
				learningPathType,
				learningPathId,
				courseId: level1 ?? null,
				moduleId: level2 ?? null,
				sessionId: level3 ?? null,
				segmentId: level4 ?? null,
				elective,
				electiveGroup,
				track,
				trackGroup,
				learningPathCode,
				workshopId,
				workshopCode,
				userProgramId,
				assetType,
			},
		});
		onPress?.();
	};

	const amIHere = currentAssetCode === assetCode;

	const titleText = isOptional
		? `${title} (${getString("common.optional")})`
		: title;

	return (
		<Pressable
			style={[styles.container, containerStyle]}
			onPress={handleAssetNavigation}
			testID={testID}
		>
			<View style={styles.contentContainer}>
				<StudyPlanAssetIcon
					assetType={assetType}
					assetStatus={status}
					isLocked={isLocked}
				/>
				<RNText
					style={[
						styles.titleText,
						isInProgress && styles.inProgress,
					]}
					numberOfLines={2}
					ellipsizeMode="tail"
					testID={labelTestID}
				>
					{amIHere && <YouAreHereTag />}
					{amIHere && `  `}
					{getTruncatedOptionalTitle(titleText, isOptional || false)}
				</RNText>
			</View>
		</Pressable>
	);
};

export default memo(CommonAssetCard);

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.grey_02,
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		boxShadow: "2px 0px 12px 0px rgba(0, 0, 0, 0.06)",
		height: verticalScale(62),
		justifyContent: "center",
	},
	contentContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
		paddingHorizontal: horizontalScale(12),
	},
	inProgress: {
		...sm,
		...semiBold,
	},
	titleText: {
		...regular,
		...sm,
		color: neutral.black,
		flexShrink: 1,
		lineHeight: verticalScale(19),
	},
});
