import React, { memo } from "react";
import { C } from "@assets/constants";
import { Divider } from "react-native-paper";
import RNText from "@components/Reusable/RNText";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppCheckBox from "@components/CheckBox/AppCheckBox";

interface IDropDownBtnProps {
	title: string;
	isActive: boolean;
	withDivider?: boolean;
	onBtnHandler: () => void;
	disabled?: boolean;
	isCheckBox?: boolean;
}

const {
	themes: { bg, border },
	commonStyles: {
		spacing: { p12 },
		align: { rowStart, flex1 },
		text: { md, clrBlue, bold, clrBlack },
	},
} = C;

function DropDownButton({
	title,
	isActive,
	onBtnHandler,
	withDivider = true,
	disabled = false,
	isCheckBox = false,
}: IDropDownBtnProps) {
	const textStyle = StyleSheet.compose(styles.txtStyle, isActive && clrBlack);
	const btnContainer = StyleSheet.compose(
		styles.btnContainer,
		isActive && styles.activeBg,
	);
	return (
		<>
			<TouchableOpacity
				disabled={disabled}
				style={btnContainer}
				onPress={onBtnHandler}
			>
				{isCheckBox ? (
					<AppCheckBox title={title} isSelected={isActive} onClickBox={onBtnHandler}/>
				) : (
					<RNText title={title} style={textStyle} />
				)}
			</TouchableOpacity>
			{withDivider ? <Divider style={styles.dividerStyle} /> : null}
		</>
	);
}

export default memo(DropDownButton);

const styles = StyleSheet.create({
	dividerStyle: {
		height: 1.5,
		backgroundColor: border.color1,
	},
	txtStyle: {
		...md,
		...clrBlue,
		textTransform: "capitalize",
	},
	btnContainer: {
		...p12,
		...flex1,
		...rowStart,
	},
	activeBg: {
		...bold,
		backgroundColor: bg.chip,
	},
});
