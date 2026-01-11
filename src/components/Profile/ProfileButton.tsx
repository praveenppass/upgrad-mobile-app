import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Divider } from "react-native-paper";

import RNText from "@components/Reusable/RNText";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

interface IProfileBtnProps {
	title: string;
	icon?: JSX.Element;
	onBtnHandler: () => void;
	withDivider?: boolean;
}

const {
	themes: { primary, border },
	commonStyles: {
		spacing: { ml8, ph20 },
		align: { row, flex1, alignCenter },
		text: { md, clrBlue, semiBold },
	},
} = C;

const {
	BORDER: { b6 },
} = measures;

const ProfileButton = ({
	icon,
	title,
	onBtnHandler,
	withDivider = true,
}: IProfileBtnProps) => {
	return (
		<View>
			<TouchableOpacity
				onPress={onBtnHandler}
				style={[styles.btnContainer, !icon && ph20]}
			>
				{icon && icon}
				<RNText
					style={[icon && ml8, md, semiBold, clrBlue]}
					title={title}
				/>
			</TouchableOpacity>
			{withDivider ? <Divider style={styles.dividerStyle} /> : null}
		</View>
	);
};

export default memo(ProfileButton);

const styles = StyleSheet.create({
	btnContainer: {
		...row,
		...flex1,
		backgroundColor: primary.color2,
		paddingHorizontal: moderateScale(28),
		paddingVertical: moderateScale(16),
		...alignCenter,
		borderBottomLeftRadius: b6,
		borderBottomRightRadius: b6,
	},
	dividerStyle: {
		backgroundColor: border.color1,
		height: 1.5,
	},
});
