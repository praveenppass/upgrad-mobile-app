import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

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

const { sm, regular, bold } = commonStyles.text;

interface IAssetCard {
	showBorder?: boolean;
	name: string;
	isOptional?: boolean;
	assetType: IAssetType;
	assetStatus: IAssetStatusEnum;
	isLocked?: boolean;
	learningPathName: string;
	learningPathId: string;
	learningPathType: LearningPathType;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	assetCode: string;
	learningPathCode: string;
	onPress?: () => void;
	workshopId: string;
	workshopCode: string;
	userProgramId: string;
	currentAssetCode?: string;
	testID?: string;
	labelTestID?: string;
}

const AssetCard = ({
	showBorder = false,
	name,
	isOptional = false,
	assetType,
	assetStatus,
	isLocked,
	learningPathName,
	learningPathId,
	learningPathType,
	level1,
	level2,
	level3,
	level4,
	elective,
	electiveGroup,
	track,
	trackGroup,
	assetCode,
	learningPathCode,
	onPress,
	workshopId,
	workshopCode,
	userProgramId,
	currentAssetCode,
	testID,
	labelTestID,
}: IAssetCard) => {
	const assetTitle = isOptional
		? `${name} (${getString("common.optional")})`
		: name;

	const isInProgress = assetStatus === IAssetStatusEnum.inProgress;
	const isCompleted = assetStatus === IAssetStatusEnum.completed;

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

	return (
		<Pressable onPress={handleAssetNavigation} testID={testID}>
			<View style={styles.container}>
				<StudyPlanAssetIcon
					assetType={assetType}
					assetStatus={assetStatus}
					isLocked={isLocked}
				/>
				<RNText
					style={[
						styles.assetTitle,
						isLocked && styles.isLocked,
						isInProgress && styles.isInProgress,
						isCompleted && styles.isCompleted,
					]}
					numberOfLines={2}
					ellipsizeMode="tail"
					testID={labelTestID}
				>
					{amIHere && <YouAreHereTag />}
					{amIHere && `  `}
					{getTruncatedOptionalTitle(assetTitle, isOptional)}
				</RNText>
			</View>
			{showBorder && <View style={styles.border} />}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	assetIcon: {
		color: colors.neutral.grey_07,
	},
	assetTitle: {
		...sm,
		...regular,
		color: colors.neutral.grey_07,
		flexShrink: 1,
		lineHeight: verticalScale(18),
	},
	border: {
		alignSelf: "center",
		backgroundColor: colors.neutral.grey_04,
		borderBottomColor: colors.neutral.grey_08,
		height: verticalScale(1),
		marginTop: verticalScale(4),
		width: "95%",
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(10),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(16),
	},
	isCompleted: {
		color: colors.neutral.black,
	},
	isInProgress: {
		...bold,
		color: colors.neutral.black,
	},
	isLocked: {
		color: colors.neutral.grey_07,
	},
});

export default AssetCard;
