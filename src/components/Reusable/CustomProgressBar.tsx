import React, { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ProgressBar } from "react-native-paper";
import { verticalScale } from "@utils/functions";
import measures from "@utils/measures";
import { colors } from "@assets/colors";
import { C } from "@assets/constants";

interface IProgressType {
	progress: number;
	progressBarStyle?: StyleProp<ViewStyle>;
	quizScreen?: boolean;
	totalQuestion?: number;
}

const {
	BORDER: { b10 },
} = measures;

const {
	themes: { bg, snackbar },
} = C;

const CustomProgressBar = ({
	progress,
	progressBarStyle,
	quizScreen,
	totalQuestion = 1, // Default to 1 to avoid division by zero
}: IProgressType) => {
	// Ensure that progress and totalQuestion are valid numbers
	const validProgress = isNaN(progress) ? 0 : progress; // Default to 0 if progress is NaN
	const validTotalQuestion = isNaN(totalQuestion) || totalQuestion === 0 ? 1 : totalQuestion; // Avoid division by zero

	// Calculate progress percentage ensuring it's between 0 and 1
	const progressPercentage = Math.min(validProgress / validTotalQuestion, 1);

	return (
		<View style={styles.container}>
			<ProgressBar
				style={[styles.progressBar, progressBarStyle]} // Fixed usage of style
				progress={progressPercentage} // Ensure the progress is between 0 and 1
				color={quizScreen ? colors.neutral.black : ""}
				theme={{
					colors: {
						primary: snackbar.success,
						surfaceVariant: colors.state.success_light_green,
					},
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderTopLeftRadius: b10,
		borderTopRightRadius: b10,
		height: verticalScale(4),
		overflow: "hidden", // Added this to prevent the progress bar from overflowing
	},
	progressBar: {
		height: verticalScale(4), // Adjust progress bar height if necessary
		borderRadius: b10,
		width: "100%", // Ensure the progress bar takes full width of the container
	},
});

export default memo(CustomProgressBar);
