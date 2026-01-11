import React from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import TickIconLxp from "@assets/icons/svg/tick-icon-lxp.svg";
import { commonStyles } from "@assets/styles";

import RNText from "./RNText";

const { content } = colors;

const {
	text: { regular, md },
} = commonStyles;

interface ICustomCheckbox {
	label?: string;
	isChecked: boolean;
	setIsChecked: (b: boolean) => void;
	labelStyle?: StyleProp<TextStyle>;
	style?: StyleProp<ViewStyle>;
	checkboxStyle?: StyleProp<ViewStyle>;
	checkmarkColor?: string;
}

const CustomCheckbox: React.FC<ICustomCheckbox> = ({
	label,
	isChecked,
	setIsChecked,
	checkboxStyle,
	labelStyle,
	style,
	checkmarkColor,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Pressable
				style={[styles.checkbox, checkboxStyle]}
				onPress={() => setIsChecked(!isChecked)}
				testID="upload-assignment-checkbox"
			>
				{isChecked ? (
					<TickIconLxp
						color={checkmarkColor || colors.neutral.grey_07}
					/>
				) : (
					<></>
				)}
			</Pressable>
			{label ? (
				<RNText title={label} style={[styles.label, labelStyle]} />
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	checkbox: {
		alignItems: "center",
		borderColor: colors.neutral.grey_07,
		borderRadius: horizontalScale(4),
		borderWidth: horizontalScale(2),
		height: verticalScale(21),
		justifyContent: "center",
		marginRight: horizontalScale(10),
		width: horizontalScale(21),
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: verticalScale(16),
		marginVertical: verticalScale(10),
	},
	label: {
		color: content.text.body_grey_07,
		flex: 1,
		...md,
		...regular,
		lineHeight: horizontalScale(21),
		marginLeft: horizontalScale(4),
	},
});

export default CustomCheckbox;
