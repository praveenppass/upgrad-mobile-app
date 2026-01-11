import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { TimerLxp } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { md, xxSm, semiBold, regular } = commonStyles.text;

const TIMER_ICON_PROPS = {
	width: horizontalScale(12),
	height: verticalScale(12),
	color: neutral.white,
};

interface IContainer1BaseCard {
	navigate: () => void;
	courseName: string;
	timeLeftText: string;
	progress: number;
}

/**
 * A reusable card component that displays program/course information with progress tracking.
 * Features a dark theme with course name, time remaining, and circular progress indicator.
 *
 * @component
 * @param {IContainer1BaseCard} props - The component props
 * @param {() => void} props.navigate - Callback function executed when card is pressed
 * @param {string} props.courseName - The name of the course to display
 * @param {string} props.timeLeftText - Text indicating time remaining (e.g., "2 days left")
 * @param {number} props.progress - Progress value between 0-100 for the circular progress bar
 *
 * @returns {JSX.Element} A pressable card component with course information and progress
 */
const Container1BaseCard = ({
	navigate,
	courseName,
	timeLeftText,
	progress,
}: IContainer1BaseCard) => (
	<Pressable
		onPress={navigate}
		style={styles.cardBlack}
		testID="container1_base_program_card"
	>
		<RNText
			title={courseName}
			style={styles.cardTitle}
			testID="container1_base_program_card_title"
		/>

		<View style={styles.progressContainer}>
			<View style={styles.timeLeft}>
				<TimerLxp {...TIMER_ICON_PROPS} />
				<RNText
					title={timeLeftText}
					style={styles.timeLeftText}
					testID="container1_base_program_card_duration"
				/>
			</View>
			<View testID="container1_base_program_card_progress_bar">
				<CircleProgressBar
					progress={progress}
					radius={horizontalScale(26)}
					strokeWidth={horizontalScale(5)}
					progressBarColors={{
						active: neutral.white,
					}}
					textStyle={styles.rightTxtStyle}
				/>
			</View>
		</View>
	</Pressable>
);

export default Container1BaseCard;

const styles = StyleSheet.create({
	cardBlack: {
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(8),
		flexDirection: "column",
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(12),
	},
	cardTitle: {
		color: neutral.white,
		...md,
		...semiBold,
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rightTxtStyle: {
		color: neutral.white,
	},
	timeLeft: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
	},
	timeLeftText: {
		color: neutral.white,
		...xxSm,
		...regular,
	},
});
