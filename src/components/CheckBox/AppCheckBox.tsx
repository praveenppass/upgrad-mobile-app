import { C } from "@assets/constants";
import measures from "@utils/measures";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import RNText from "@components/Reusable/RNText";
import { moderateScale } from "@utils/functions";

const {
	themes: { text, bg, border },
	commonStyles: {
		spacing: { pv4, p8 },
		align: { row },
		text: { clrBlack, md },
	},
} = C;

const {
	BORDER: { b8, b1 },
} = measures;
const AndroidCheckBox = ({
	title,
	disabled,
	isSelected,
	onClickBox,
}: {
	title: string;
	disabled?: boolean;
	isSelected?: boolean;
	onClickBox?: () => void;
}) => {
	return (
		<TouchableOpacity
			key={title}
			disabled={disabled}
			onPress={onClickBox}
			style={[
				styles.checkBoxItemStyle,
				disabled ? styles.disabled : null,
			]}
		>
			<Checkbox.Android
				color={bg.dark}
				disabled={disabled}
				onPress={onClickBox}
				status={isSelected ? "checked" : "unchecked"}
			/>
			<RNText style={styles.checkBoxTextStyle} title={title} />
		</TouchableOpacity>
	);
};

export default memo(AndroidCheckBox);

const styles = StyleSheet.create({
	checkBoxItemStyle: {
		...row,
		alignItems: "center",
		marginLeft: -8,
	},
	inputStyle: {
		...clrBlack,
		borderColor: border.color1,
		...p8,
		borderWidth: b1,
		borderRadius: b8,
		minHeight: moderateScale(85),
	},
	checkBoxTextStyle: { color: text.dark, ...md, ...pv4 },
	disabled: {
		opacity: 0.5,
	},
});
