import React, { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ReadMore from "@components/Reusable/ReadMore";
import RNText from "@components/Reusable/RNText";
import CourseInfoModal from "@components/studyPlan/container2/CourseInfoModal";
import ExtensionInfoModal from "@components/studyPlan/container2/ExtensionInfoModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { MenuListIcon } from "@assets/icons";
import { InfoOutlineIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { regular, xxSm, semiBold, sm } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	SPECIALIZATION_TAG: "studyPlan.container2.specializationTag",
	EXTENSIONS_USED: "studyPlan.container2.courseInfo.extensionsUsed",
});

/**
 * CourseDescription Component - Displays course or program description with modal interactions
 *
 * This component renders a collapsible description section for courses and programs in the study plan.
 * It provides functionality to view full descriptions and extension information through modals.
 *
 * Key Features:
 * - Collapsible description text with "read more" functionality
 * - Extension usage display for programs (extensions used/allowed)
 * - Course information modal with detailed course data
 * - Extension information modal explaining extension system
 *
 * Modal Interactions:
 * - Course Info Modal: Shows full description, progress, duration, and extension details
 * - Extension Info Modal: Provides information about the extension system for programs
 *
 * @param {string} description - The course or program description text to display
 * @param {boolean} isCourseInfoModalVisible - Controls visibility of the course information modal
 * @param {boolean} isExtensionInfoModalVisible - Controls visibility of the extension information modal
 * @param {Function} toggleCourseInfoModal - Callback function to toggle course info modal visibility
 * @param {Function} toggleExtensionInfoModal - Callback function to toggle extension info modal visibility
 * @param {string} learningPathName - The name of the course or program learning path
 * @param {number} totalExtensionsTaken - Number of extensions currently used by the user
 * @param {number} totalExtensionsAllowed - Maximum number of extensions allowed for the program
 * @param {string} totalLearningDuration - Formatted string showing total learning duration
 * @param {number} progress - Progress percentage (0-100) for the course/program completion
 * @param {boolean} isProgram - Flag to distinguish between course and program contexts
 *
 * @returns {JSX.Element} The CourseDescription component
 */

interface ICourseDescription {
	description: string;
	learningPathName: string;
	totalExtensionsTaken: number;
	totalExtensionsAllowed: number;
	totalLearningDuration: string;
	progress: number;
	isProgram: boolean;
	isSpecialization: boolean;
}

const CourseDescription = ({
	description,
	learningPathName,
	totalExtensionsTaken,
	totalExtensionsAllowed,
	totalLearningDuration,
	progress,
	isProgram,
	isSpecialization,
}: ICourseDescription) => {
	const [isCourseInfoModalVisible, setIsCourseInfoModalVisible] =
		useState(false);
	const [isExtensionInfoModalVisible, setIsExtensionInfoModalVisible] =
		useState(false);

	const toggleCourseInfoModal = useCallback(
		() => setIsCourseInfoModalVisible((prev) => !prev),
		[],
	);

	const toggleExtensionInfoModal = useCallback(
		() => setIsExtensionInfoModalVisible((prev) => !prev),
		[],
	);

	return (
		<View style={styles.welcomeContent}>
			{isSpecialization ? (
				<View style={styles.specializationTag}>
					<RNText
						title={getString(STRINGS.SPECIALIZATION_TAG)}
						style={styles.specializationText}
					/>
				</View>
			) : null}
			<ReadMore
				text={description}
				numberOfLines={2}
				textStyle={styles.descriptionText}
				readMoreStyle={styles.readMoreText}
				onCustomReadMorePress={toggleCourseInfoModal}
				persistentReadMore
				testID={"container2_description_read_more"}
			/>

			{isProgram && totalExtensionsAllowed ? (
				<View style={styles.extensionInfo}>
					<MenuListIcon
						width={horizontalScale(12)}
						height={verticalScale(12)}
						color={neutral.grey_07}
					/>
					<RNText
						title={`${getString(STRINGS.EXTENSIONS_USED)}: ${totalExtensionsTaken}/${totalExtensionsAllowed}`}
						style={styles.extensionText}
					/>
					<Pressable
						onPress={toggleExtensionInfoModal}
						testID={"container2_description_extension_info_modal"}
					>
						<InfoOutlineIcon
							width={horizontalScale(12)}
							height={verticalScale(12)}
							color={neutral.grey_07}
						/>
					</Pressable>
				</View>
			) : null}
			<CourseInfoModal
				visible={isCourseInfoModalVisible}
				onClose={toggleCourseInfoModal}
				title={learningPathName}
				description={description}
				progress={progress}
				duration={totalLearningDuration}
				extensionsUsed={totalExtensionsTaken}
				maxExtensions={totalExtensionsAllowed}
			/>
			<ExtensionInfoModal
				visible={isExtensionInfoModalVisible}
				onClose={toggleExtensionInfoModal}
				totalExtensions={totalExtensionsAllowed}
				usedExtensions={totalExtensionsTaken}
			/>
		</View>
	);
};

export default memo(CourseDescription);

const styles = StyleSheet.create({
	descriptionText: {
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(19),
		...sm,
	},
	extensionInfo: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
		marginTop: verticalScale(8),
	},
	extensionText: {
		...regular,
		...xxSm,
		color: neutral.grey_08,
	},
	readMoreText: {
		...semiBold,
		...sm,
		textDecorationLine: "underline",
	},
	specializationTag: {
		alignSelf: "flex-start",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(100),
		left: horizontalScale(-8),
		marginBottom: verticalScale(4),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(4),
	},
	specializationText: {
		...semiBold,
		...xxSm,
		color: neutral.black,
	},
	welcomeContent: {
		gap: verticalScale(4),
		paddingHorizontal: horizontalScale(4),
		paddingTop: verticalScale(20),
	},
});
