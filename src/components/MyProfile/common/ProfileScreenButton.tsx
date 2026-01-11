import React, { memo } from "react";
import {
	StyleProp,
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import { View } from "react-native";
import { Divider } from "react-native-paper";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, highlight, cta } = colors;

interface IProfileBtnProps {
	title: string;
	icon?: JSX.Element;
	onBtnHandler: () => void;
	withDivider?: boolean;
	style?: StyleProp<ViewStyle>;
	extraText?: string;
	dropdownIcon?: JSX.Element;
	hideIcon?: boolean;
	testID?: string;
	textStyle?: StyleProp<TextStyle>;
}

const { md, medium, semiBold } = commonStyles.text;

// Updated to support textStyle prop
const ProfileScreenButton = ({
	icon,
	title,
	extraText,
	onBtnHandler,
	withDivider = true,
	style,
	dropdownIcon,
	hideIcon = false,
	testID,
	textStyle,
}: IProfileBtnProps) => {
	return (
		<View>
			<TouchableOpacity
				onPress={onBtnHandler}
				style={[styles.btnContainer, style]}
				testID={testID}
			>
				{!hideIcon && <View style={styles.iconContainer}>{icon}</View>}
				<RNText
					style={[styles.buttonText, textStyle]}
					title={`${title}`}
				/>
				{extraText ? (
					<RNText style={styles.extraText} title={extraText} />
				) : (
					<></>
				)}
				{dropdownIcon && (
					<View style={styles.dropdownIconContainer}>
						{dropdownIcon}
					</View>
				)}
			</TouchableOpacity>
			{withDivider ? <Divider style={styles.dividerStyle} /> : <></>}
		</View>
	);
};

export default memo(ProfileScreenButton);

const styles = StyleSheet.create({
	btnContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flexDirection: "row",
		gap: horizontalScale(8),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(12),
	},
	buttonText: {
		...md,
		...semiBold,
		color: neutral.black,
	},
	dividerStyle: {
		backgroundColor: cta.fill.disable,
		height: verticalScale(1),
	},
	dropdownIconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
	},
	extraText: {
		...medium,
		...semiBold,
		color: neutral.grey_07,
	},
	iconContainer: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		borderRadius: horizontalScale(12),
		height: horizontalScale(24),
		justifyContent: "center",
		width: horizontalScale(24),
	},
});
