import React, { memo, useCallback, useMemo, useState } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import CourseCompletionModal from "@components/microInteractions/CourseCompletionModal";
import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import RNText from "@components/Reusable/RNText";

import { IUserMilestoneCertificate } from "@graphql/query/studyPlan/container2/getProgramListDataQuery";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { AnalyticsIcon, TimerLxp } from "@assets/icons";
import { ShareIcon } from "@assets/icons/svg/common";
import { commonStyles } from "@assets/styles";

const { sm, md, semiBold, regular, xxSm } = commonStyles.text;
const { neutral, state, highlight } = colors;

const STRINGS = createStringConstants({
	COURSE: "studyPlan.container2.courseCard.course",
	OPTIONAL: "studyPlan.container2.courseCard.optional",
	ASSESSMENTS: "studyPlan.container2.courseCard.assessments",
	TRACK: "studyPlan.container2.courseCard.track",
	TRACK_GROUP: "studyPlan.container2.courseCard.trackGroup",
	ELECTIVE_GROUP: "studyPlan.container2.courseCard.electiveGroup",
	ELECTIVE: "studyPlan.container2.courseCard.elective",
	SHARE_ACHIEVEMENT: "studyPlan.container2.courseCard.shareAchievement",
});

export interface ICourseCard {
	label: string;
	name: string;
	totalCompletedGradableAssets?: number;
	totalGradableAssets?: number;
	timeLeft?: string;
	isOptional?: boolean;
	progress: number;
	isProgram: boolean;
	index: number;
	onCourseCardPress: () => void;
	isTrack?: boolean;
	isTrackGroup?: boolean;
	isElectiveGroup?: boolean;
	isElective?: boolean;
	style?: StyleProp<ViewStyle>;
	isLocked: boolean;
	certificate?: IUserMilestoneCertificate | null;
	onShareAchievementPress: () => void;
}

/**
 * CourseCard component displays course information in a card format.
 *
 * @param courseNumber - The course identifier/number
 * @param title - The course title (truncated to 2 lines)
 * @param assessments - Assessment information to display
 * @param timeLeft - Time-related information
 * @param progress - Completion progress percentage (0-100)
 * @param isProgram - Whether the card is for a program or course
 * @param isOptional - Whether the course is optional
 * @param index - The index of the course in the list
 * @param isTrack - Whether the course is a track
 * @param isTrackGroup - Whether the course is a track group
 * @param isElectiveGroup - Whether the course is an elective group
 * @param isElective - Whether the course is an elective
 * @returns {JSX.Element} - A styled course card component with progress indicator
 */

const getLabelString = (labelText: string, tabText: string | number) =>
	tabText ? `${labelText} • ${tabText}` : labelText;

interface IGetLabelText {
	label: string;
	isOptional?: boolean;
	isTrack?: boolean;
	isTrackGroup?: boolean;
	isElectiveGroup?: boolean;
	isElective?: boolean;
	index?: number;
}
const getLabelText = ({
	label,
	isOptional = false,
	isTrack = false,
	isTrackGroup = false,
	isElectiveGroup = false,
	isElective = false,
	index = 0,
}: IGetLabelText) => {
	const courseNumber = index >= 0 ? index + 1 : "";
	const labelText = label || `${getString(STRINGS.COURSE)} ${courseNumber}`;

	if (isOptional)
		return getLabelString(labelText, getString(STRINGS.OPTIONAL));
	if (isTrackGroup)
		return getLabelString(labelText, getString(STRINGS.TRACK_GROUP));
	if (isTrack) return getLabelString(labelText, getString(STRINGS.TRACK));
	if (isElectiveGroup)
		return getLabelString(labelText, getString(STRINGS.ELECTIVE_GROUP));
	if (isElective)
		return getLabelString(labelText, getString(STRINGS.ELECTIVE));

	return labelText;
};

const CourseCard = ({
	label,
	name,
	totalCompletedGradableAssets,
	totalGradableAssets,
	timeLeft,
	progress,
	isProgram,
	isOptional = false,
	isTrack = false,
	isTrackGroup = false,
	isElectiveGroup = false,
	isElective = false,
	index,
	onCourseCardPress,
	onShareAchievementPress,
	certificate,
	style,
	isLocked,
}: ICourseCard) => {
	const [isCertificateModalVisible, setIsCertificateModalVisible] =
		useState(false);

	const handleOpenCertificateModal = useCallback(() => {
		setIsCertificateModalVisible(true);
	}, []);

	const handleCloseCertificateModal = useCallback(() => {
		setIsCertificateModalVisible(false);

		onShareAchievementPress();
	}, []);

	const showShareAchievement = useMemo(() => {
		return certificate && progress === 100;
	}, [certificate, progress]);

	return (
		<>
			<View
				style={[styles.courseCard, style]}
				testID={`container2_course_card_${index}`}
			>
				<Pressable
					onPress={onCourseCardPress}
					style={styles.courseCardContent}
				>
					<RNText
						title={getLabelText({
							label,
							isOptional,
							isTrack,
							isTrackGroup,
							isElectiveGroup,
							isElective,
							index,
						})}
						style={styles.labelText}
						numberOfLines={1}
					/>
					<RNText
						title={name}
						style={styles.courseTitle}
						numberOfLines={2}
					/>

					<View style={styles.courseMetadata}>
						<View style={styles.metadataContainer}>
							{isProgram && !!totalGradableAssets ? (
								<View style={styles.metadataRow}>
									<AnalyticsIcon
										width={horizontalScale(12)}
										height={verticalScale(12)}
										color={neutral.grey_07}
									/>
									<RNText
										title={`${getString(STRINGS.ASSESSMENTS)}: ${totalCompletedGradableAssets}/${totalGradableAssets}`}
										style={styles.metadataText}
									/>
								</View>
							) : null}
							{timeLeft ? (
								<View style={styles.metadataRow}>
									<TimerLxp
										width={horizontalScale(12)}
										height={verticalScale(12)}
										color={neutral.grey_07}
									/>
									<RNText
										title={timeLeft}
										style={styles.metadataText}
									/>
								</View>
							) : null}
						</View>
						<CircleProgressBar
							progress={progress}
							textStyle={styles.progressText}
							radius={horizontalScale(21)}
							strokeWidth={horizontalScale(4)}
							progressBarColors={{
								active: state.success_green,
							}}
							isLocked={isLocked}
						/>
					</View>
				</Pressable>
				{showShareAchievement ? (
					<Pressable
						style={styles.shareAchievementContainer}
						onPress={handleOpenCertificateModal}
					>
						<ShareIcon
							width={horizontalScale(12)}
							height={verticalScale(12)}
							color={highlight.text_blue}
						/>
						<RNText
							title={getString(STRINGS.SHARE_ACHIEVEMENT)}
							style={styles.shareAchievementText}
						/>
					</Pressable>
				) : null}
			</View>

			<CourseCompletionModal
				isVisible={isCertificateModalVisible}
				onClose={handleCloseCertificateModal}
				courseName={name}
				certificateUrl={certificate?.certificate ?? ""}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	courseCard: {
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.06)",
		overflow: "hidden",
	},
	courseCardContent: {
		backgroundColor: neutral.white,
		flexDirection: "column",
		gap: verticalScale(8),

		padding: horizontalScale(12),
	},
	courseMetadata: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	courseTitle: {
		...semiBold,
		...md,
		color: neutral.black,
		lineHeight: verticalScale(20),
	},
	labelText: {
		...regular,
		...sm,
		color: neutral.grey_06,
	},
	metadataContainer: {
		flexDirection: "column",
		gap: verticalScale(8),
		justifyContent: "center",
	},
	metadataRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
	},
	metadataText: {
		...regular,
		...xxSm,
		color: neutral.grey_07,
	},
	progressText: {
		...regular,
		color: neutral.grey_08,
		...xxSm,
	},
	shareAchievementContainer: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		flexDirection: "row",
		gap: horizontalScale(8),
		justifyContent: "flex-end",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(10),
	},
	shareAchievementText: {
		...semiBold,
		...sm,
		color: highlight.text_blue,
	},
});

export default memo(CourseCard);
