import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AssetCardLockedIcon, TimerLxp } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { md, xxSm, semiBold, regular } = commonStyles.text;

/**
 * Container1SpecializationCard - A card component that displays specialization information with progress tracking
 *
 * @param {string} courseName - The name of the course/specialization to display
 * @param {() => void} navigate - Function to handle navigation when card is pressed
 * @param {number} progress - Progress value between 0-100 for the circular progress bar
 * @param {string} progressText - Text to display inside the progress circle (e.g., "50%")
 * @param {string} totalLearningDuration - Duration text to display (e.g., "2h 30m")
 * @param {boolean} isLocked - Whether the course is locked/inaccessible to the user
 * @returns {JSX.Element} The rendered specialization card component
 */

interface IProgressChild {
	isLocked: boolean;
	progressText: string;
	index: number;
}

const ProgressChild = ({ isLocked, progressText, index }: IProgressChild) => {
	return isLocked ? (
		<AssetCardLockedIcon
			width={horizontalScale(12)}
			height={verticalScale(15)}
			color={neutral.grey_06}
		/>
	) : (
		<RNText
			title={progressText}
			style={styles.cardProgressText}
			testID={`container1_specialization_card_${index}_progress`}
		/>
	);
};

interface IContainer1SpecializationCard {
	courseName: string;
	navigate: () => void;
	progress: number;
	progressText: string;
	totalLearningDuration: string;
	isLocked: boolean;
	index: number;
}

const Container1SpecializationCard = ({
	courseName,
	navigate,
	progress,
	progressText,
	totalLearningDuration,
	isLocked,
	index,
}: IContainer1SpecializationCard) => {
	const displayProgress = useMemo(() => {
		return isLocked ? 0 : progress;
	}, [isLocked, progress]);

	return (
		<Pressable
			style={styles.courseCard}
			onPress={navigate}
			disabled={isLocked}
			testID={`container1_specialization_card_${index}`}
		>
			<RNText
				title={courseName}
				style={styles.courseName}
				testID={`container1_specialization_card_${index}_title`}
			/>

			<View style={styles.cardProgressContainer}>
				<View style={styles.courseInfoContainer}>
					<View style={styles.courseInfo}>
						<TimerLxp
							width={horizontalScale(12)}
							height={verticalScale(12)}
							color={neutral.grey_07}
						/>
						<RNText
							title={totalLearningDuration}
							style={styles.cardProgressText}
							testID={`container1_specialization_card_${index}_duration`}
						/>
					</View>
				</View>

				<View
					testID={`container1_specialization_card_${index}_progress_bar`}
				>
					<CircleProgressBar
						progress={displayProgress}
						radius={horizontalScale(21)}
						strokeWidth={horizontalScale(4)}
						progressBarColors={{
							active: colors.state.success_green,
						}}
						textStyle={styles.cardProgressText}
					>
						<ProgressChild
							isLocked={isLocked}
							progressText={progressText}
							index={index}
						/>
					</CircleProgressBar>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	cardProgressContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardProgressText: {
		color: neutral.grey_08,
		...xxSm,
		...regular,
	},
	courseCard: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(10),
		borderWidth: 1,
		boxShadow: "2px 0px 12px 0px rgba(0, 0, 0, 0.06)",
		gap: horizontalScale(8),
		padding: verticalScale(16),
	},
	courseInfo: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
	},
	courseInfoContainer: {
		gap: verticalScale(8),
	},
	courseName: {
		color: neutral.grey_08,
		...md,
		...semiBold,
	},
});

export default Container1SpecializationCard;
