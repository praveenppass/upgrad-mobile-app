import LottieView from "lottie-react-native";
import React, { memo, useEffect, useRef } from "react";
import {
	Animated,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import RNText from "@components/Reusable/RNText";
import useResumeAssetStickyController from "@components/studyPlan/common/ResumeAssetSticky/useResumeAssetStickyController";

import { IGetUserCourseNextAssetQuery } from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import { IGetUserProgramNextAssetQuery } from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";

import WhitePlayIcon from "@assets/animations/white-play-icon.json";
import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { xxSm, regular, bold, sm } = commonStyles.text;

interface IResumeAssetSticky {
	isVisible?: boolean;
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathName: string;
	learningPathCode: string;
	cardStyle?: StyleProp<ViewStyle>;
	testID?: string;
	programData?: IGetUserProgramNextAssetQuery;
	courseData?: IGetUserCourseNextAssetQuery;
	loading?: boolean;
}

const ANIMATION_DURATION = 250;

const STRINGS = createStringConstants({
	continueLearning: "studyPlan.resumeAssetSticky.continueLearning",
	startLearning: "studyPlan.resumeAssetSticky.startLearning",
});

const ResumeAssetSticky = ({
	isVisible = true,
	learningPathId,
	learningPathType,
	learningPathName,
	learningPathCode,
	cardStyle,
	testID,
	programData,
	courseData,
	loading,
}: IResumeAssetSticky) => {
	const { subtitle, onPress, assetCode, resumeAssetLoading, isStarted } =
		useResumeAssetStickyController({
			learningPathId,
			learningPathType,
			learningPathName,
			learningPathCode,
			programData,
			courseData,
			loading,
		});

	const fadeAnim = useRef(new Animated.Value(0)).current;

	const showSticky = isVisible && assetCode && !resumeAssetLoading;

	const title = isStarted
		? getString(STRINGS.continueLearning)
		: getString(STRINGS.startLearning);

	useEffect(() => {
		if (showSticky)
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: ANIMATION_DURATION,
				useNativeDriver: true,
			}).start();
		else fadeAnim.setValue(0);
	}, [showSticky]);

	if (!showSticky) return null;

	return (
		<Animated.View style={{ opacity: fadeAnim }}>
			<Pressable
				onPress={onPress}
				style={[styles.container, cardStyle]}
				testID={testID || "resume_asset_sticky"}
			>
				<View style={styles.textContainer}>
					<RNText
						title={title}
						style={styles.title}
						numberOfLines={1}
					/>
					<RNText
						title={subtitle}
						style={styles.subtitle}
						numberOfLines={1}
					/>
				</View>
				<LottieView
					source={WhitePlayIcon}
					autoPlay
					style={styles.playIcon}
				/>
			</Pressable>
		</Animated.View>
	);
};

export default memo(ResumeAssetSticky);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(8),
		boxShadow: `0 8px 14px rgba(0, 0, 0, 0.25)`,
		flexDirection: "row",
		maxHeight: verticalScale(50),
		opacity: 0.8,
		paddingHorizontal: horizontalScale(24),
		paddingVertical: verticalScale(10),
		zIndex: 1000,
	},
	playIcon: {
		height: horizontalScale(40),
		width: horizontalScale(40),
	},
	subtitle: {
		...xxSm,
		...regular,
		color: neutral.white,
		marginRight: horizontalScale(25),
	},
	textContainer: {
		flex: 1,
		gap: verticalScale(2),
	},
	title: {
		...sm,
		...bold,
		color: neutral.white,
	},
});
