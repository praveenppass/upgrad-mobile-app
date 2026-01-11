import moment from "moment-timezone";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import RNText from "@components/Reusable/RNText";
import Container3ExtendDueDate from "@components/studyPlan/container3/ExtendDueDate";
import CourseDetailsInfo from "@components/studyPlan/container3/ModuleDetailsCard/common/CourseDetailsInfo";
import { InfoType } from "@components/studyPlan/container3/ModuleDetailsCard/common/Icon";
import OptionalText from "@components/studyPlan/container3/ModuleDetailsCard/common/OptionalText";

import {
	IAssetPenaltyConfiguration,
	IDeadlineExtensionMode,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IDateFormat, LearningPathType } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { md, regular, semiBold } = commonStyles.text;

const { state, neutral } = colors;

// String constants
const STRINGS = createStringConstants({
	CANCEL_EXTENSION: "studyPlan.container3.moduleDetailsCard.cancelExtension",
	EXTEND_DUE_DATE: "studyPlan.container3.moduleDetailsCard.extendDueDate",
	LEFT: "studyPlan.container3.moduleDetailsCard.left",
	ASSESSMENTS: "studyPlan.container3.moduleDetailsCard.assessments",
	DUE_DATE: "studyPlan.container3.moduleDetailsCard.dueDate",
	EXTENDED_DUE_DATE: "studyPlan.container3.moduleDetailsCard.extendedDueDate",
});

/**
 * Course details card component displaying course information with progress tracking and action buttons.
 *
 * @param {string} title - Course title
 * @param {string} timeLeft - Time remaining for course completion
 * @param {string} gradableAssetsCount - Number of assessments in the course
 * @param {string} dueDate - Course due date
 * @param {number} progress - Course completion percentage (0-100)
 * @param {string} extendButtonText - Text displayed on the action button
 * @param {() => void} onCtaPress - Callback function when action button is pressed
 * @param {boolean} isOptional - Whether the course is optional
 *
 *
 */

// Interfaces

export interface IModuleDetailsCard {
	totalGradableAssetsCount: number;
	completedGradableAssetsCount?: number;
	title: string;
	timeLeft: string | number;
	dueAt?: string;
	progress: number;
	isOptional?: boolean;
	learningPathType: LearningPathType;
	isLocked: boolean;
	hardDeadlineDays: number;
	isDueDateExtended: boolean;
	dueDateExtensionMode?: IDeadlineExtensionMode;
	penaltyConfigurationData?: IAssetPenaltyConfiguration[];
	courseCode: string;
	moduleCode: string;
	learningPathId: string;
	refetchContainer3Data: () => void;
	totalExtensionsTaken: number;
	totalExtensionsAllowed: number;
	status: string;
}

const DUE_DATE_WARNING_THRESHOLD = 2;

const ModuleDetailsCard = ({
	title,
	timeLeft,
	totalGradableAssetsCount,
	completedGradableAssetsCount,
	dueAt,
	progress,
	isOptional,
	learningPathType,
	isLocked,
	hardDeadlineDays,
	isDueDateExtended,
	dueDateExtensionMode,
	penaltyConfigurationData,
	courseCode,
	moduleCode,
	learningPathId,
	refetchContainer3Data,
	totalExtensionsTaken,
	totalExtensionsAllowed,
	status,
}: IModuleDetailsCard) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const { name: userTimezone } = useGetTimezone();

	const gradableAssetsCount = `${completedGradableAssetsCount}/${totalGradableAssetsCount}`;

	const dueDate = moment(dueAt)
		.tz(userTimezone)
		.format(IDateFormat.dayAndHour);

	const currentDate = moment();

	const isDueDateWarningEnabled =
		moment(dueAt).diff(currentDate, "days") < DUE_DATE_WARNING_THRESHOLD;

	const dueDateText = dueDate
		? `${isDueDateExtended ? getString(STRINGS.EXTENDED_DUE_DATE) : getString(STRINGS.DUE_DATE)}: ${dueDate}`
		: "";

	const infoList = useMemo(
		() => [
			{
				type: InfoType.TIME_LEFT,
				text: `${timeLeft} ${getString(STRINGS.LEFT)}`,
				visible: !!timeLeft,
			},
			{
				type: InfoType.ASSESSMENTS,
				text: `${getString(STRINGS.ASSESSMENTS)}: ${gradableAssetsCount}`,
				visible: isProgram && !!totalGradableAssetsCount,
			},
			{
				type: InfoType.DUEDATE,
				text: dueDateText,
				isDueDatePassed: isDueDateWarningEnabled,
				visible: isProgram && !!totalGradableAssetsCount && !!dueAt,
			},
		],
		[
			timeLeft,
			gradableAssetsCount,
			isProgram,
			totalGradableAssetsCount,
			dueDateText,
			isDueDateWarningEnabled,
			dueAt,
			isOptional,
		],
	);

	const renderInfoList = useMemo(
		() =>
			infoList
				.filter(({ visible }) => visible)
				.map(({ type, text, isDueDatePassed }) => (
					<CourseDetailsInfo
						key={type}
						type={type}
						text={text}
						isDueDatePassed={isDueDatePassed}
					/>
				)),
		[infoList],
	);

	return (
		<View style={styles.container}>
			<OptionalText
				isOptional={isOptional}
				testID="container3_moduleDetailsCard_label"
			/>
			<RNText title={title} style={styles.title} />

			<View style={styles.contentContainer}>
				<View style={styles.infoContainer}>{renderInfoList}</View>

				<CircleProgressBar
					radius={horizontalScale(26)}
					strokeWidth={horizontalScale(5)}
					progressBarColors={{
						active: state.success_green,
					}}
					progress={progress}
					textStyle={styles.progressText}
					isLocked={isLocked}
				/>
			</View>
			<Container3ExtendDueDate
				dueDate={dueAt ?? ""}
				hardDeadlineDays={hardDeadlineDays}
				isDueDateExtended={isDueDateExtended}
				dueDateExtensionMode={dueDateExtensionMode}
				penaltyConfigurationData={penaltyConfigurationData}
				totalGradableAssets={totalGradableAssetsCount}
				totalCompletedGradableAssets={completedGradableAssetsCount || 0}
				courseCode={courseCode}
				moduleCode={moduleCode}
				learningPathId={learningPathId}
				onSubmit={refetchContainer3Data}
				moduleName={title}
				totalExtensionsTaken={totalExtensionsTaken}
				totalExtensionsAllowed={totalExtensionsAllowed}
				status={status}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.white,
		padding: horizontalScale(16),
	},

	contentContainer: {
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(12),
	},

	infoContainer: {
		alignSelf: "stretch",
		justifyContent: "space-around",
	},

	progressText: {
		...regular,
		...md,
		color: neutral.black,
		margin: horizontalScale(10),
	},
	title: {
		color: neutral.black,
		...semiBold,
		...md,
		lineHeight: verticalScale(20),
		marginBottom: verticalScale(16),
	},
});

export default memo(ModuleDetailsCard);
