import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

interface ProgressBarProps {
	progress: number;
	height?: string | number;
	leftTextTitle: string;
	rightTextTitle?: string;
	leftTextStyle?: StyleProp<TextStyle>;
	rightTextStyle?: StyleProp<TextStyle>;
	LeftIcon?: React.FC;
	activeProgressColor?: string;
	inactiveProgressColor?: string;
	showProgress?: boolean;
}

const {
	commonStyles: {
		text: { med, bold, w400 },
		align: { row, overFlowHidden, alignCenter, justifyBetween },
		spacing: { mb4, mb10 },
	},
} = C;

const { BORDER } = measures;

const ProgressBar: React.FC<ProgressBarProps> = ({
	activeProgressColor = colors.icon.successful,
	inactiveProgressColor = colors.state.success_light_green,
	progress,
	height = verticalScale(4),
	leftTextTitle,
	rightTextTitle,
	leftTextStyle,
	rightTextStyle,
	LeftIcon,
	showProgress = true,
}) => {
	return (
		<>
			<View style={styles.main}>
				{leftTextTitle ? (
					<View style={styles.container}>
						{LeftIcon ? <LeftIcon /> : <></>}
						<RNText
							title={leftTextTitle}
							numberOfLines={1}
							style={[styles.leftTitleStyle, leftTextStyle]}
						/>
					</View>
				) : (
					<View />
				)}
				{rightTextTitle ? (
					<RNText
						title={rightTextTitle}
						numberOfLines={1}
						style={[styles.textStyle, rightTextStyle]}
					/>
				) : (
					<></>
				)}
			</View>
			{/* Progress bar commented : Hakuna Matata */}
			{showProgress && (
				<View
					style={[
						styles.progressContainer,
						{ height, backgroundColor: inactiveProgressColor },
					]}
				>
					<View
						style={[
							styles.progressBar,
							{
								width: progress + "%",
								height,
								backgroundColor: activeProgressColor,
							},
						]}
					/>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		...row,
		...alignCenter,
		flex: 1,
		gap: horizontalScale(4),
	},
	leftTitleStyle: {
		...alignCenter,
		color: colors.neutral.black,
		...med,
		...w400,
	},
	main: {
		...row,
		...justifyBetween,
		...mb4,
	},

	progressBar: {
		borderRadius: BORDER.b8,
	},
	progressContainer: {
		borderRadius: BORDER.b8,
		...overFlowHidden,
		...mb10,
	},
	textStyle: {
		...med,
		...bold,
		color: colors.neutral.grey_07,
	},
});

export default React.memo(ProgressBar);
