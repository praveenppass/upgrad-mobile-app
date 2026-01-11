import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import { IContainer3Data } from "@components/studyPlan/container3/Container3Component/container3Component.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowHeadRightLxp } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { bold, md, xxSm, regular } = commonStyles.text;

interface IModuleItem {
	label: string;
	name: string;
	code: string;
}

export interface IModuleNavigation {
	selectedModule: IModuleItem | IContainer3Data;
	onPreviousModule: () => void;
	onNextModule: () => void;
	disabledNext: boolean;
	disabledPrevious: boolean;
}

const ModuleNavigation = ({
	selectedModule,
	onPreviousModule,
	onNextModule,
	disabledNext,
	disabledPrevious,
}: IModuleNavigation) => (
	<View style={styles.moduleNavigationContainer}>
		<Pressable
			onPress={onPreviousModule}
			hitSlop={horizontalScale(5)}
			disabled={disabledPrevious}
		>
			<ArrowHeadRightLxp
				color={disabledPrevious ? neutral.grey_05 : neutral.grey_07}
				height={verticalScale(16)}
				width={horizontalScale(10)}
				style={styles.previousArrow}
			/>
		</Pressable>
		<View style={styles.moduleInfoContainer}>
			<RNText
				title={selectedModule?.label}
				style={styles.label}
				numberOfLines={1}
			/>
			<RNText
				title={selectedModule?.name}
				style={styles.title}
				numberOfLines={2}
			/>
		</View>
		<Pressable
			onPress={onNextModule}
			hitSlop={horizontalScale(5)}
			disabled={disabledNext}
		>
			<ArrowHeadRightLxp
				color={disabledNext ? neutral.grey_05 : neutral.grey_07}
				height={verticalScale(16)}
				width={horizontalScale(10)}
			/>
		</Pressable>
	</View>
);

export default ModuleNavigation;

const styles = StyleSheet.create({
	label: {
		...xxSm,
		...regular,
		color: neutral.grey_07,
	},
	moduleInfoContainer: {
		alignItems: "center",
		flexShrink: 1,
	},
	moduleNavigationContainer: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		gap: horizontalScale(25),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(14),
		paddingVertical: verticalScale(10),
	},
	previousArrow: {
		transform: [{ rotate: "180deg" }],
	},
	title: {
		...bold,
		...md,
		color: neutral.grey_08,
		textAlign: "center",
	},
});
