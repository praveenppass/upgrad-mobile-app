import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RNText from "@components/Reusable/RNText";
import { C } from "@assets/constants";
import { DismissIcon } from "@assets/icons";
import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

const {
	themes: { bg },
	commonStyles: {
		spacing: { p10, mb2 },
		align: { row, justifyBetween },
		text: { md, w400 },
	},
} = C;
const {
	BORDER: { b12 },
} = measures;

const ICON_DIMENSIONS = {
	width: verticalScale(26),
	height: verticalScale(26),
};

interface isDueDateAssetCrossProps {
	title?: string;
}

const DueDateAssetCross = ({ title }: isDueDateAssetCrossProps) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<View style={styles.main}>
			<RNText title={title} style={styles.text} />
			<TouchableOpacity onPress={handleClose}>
				<DismissIcon color={bg.purpleDark} {...ICON_DIMENSIONS} />
			</TouchableOpacity>
		</View>
	);
};

export default DueDateAssetCross;

const styles = StyleSheet.create({
	text: {
		color: bg.purpleDark,
		width: horizontalScale(300),
		lineHeight: 19,
		...md,
		...w400,
		paddingHorizontal: 2,
	},
	main: {
		...p10,
		backgroundColor: bg.lightPurple,
		borderBottomLeftRadius: b12,
		borderBottomRightRadius: b12,
		...mb2,
		elevation: 1,
		...row,
		...justifyBetween,
	},
});
