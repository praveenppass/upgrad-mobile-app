import React, { memo } from "react";
import { C } from "@assets/constants";
import { StyleSheet, TouchableOpacity } from "react-native";
import RNText from "@components/Reusable/RNText";
import measures from "@utils/measures";
import { AttachIcon } from "@assets/icons";
import { moderateScale } from "@utils/functions";

const {
	strings,
	themes: { bg, border },
	commonStyles: {
		align: { row },
		spacing: { ph12, mt12, pv12, mr8 },
		text: { w600 },
	},
} = C;

const {
	BORDER: { b6, b1 },
} = measures;

interface IAttachmentChip {
	onPressBtn: () => void;
}

function AttachmentButton({ onPressBtn }: IAttachmentChip) {
	return (
		<TouchableOpacity onPress={onPressBtn} style={style.rootStyle}>
			<RNText title={strings.ADD_ATTACHMENT} style={style.buttonText} />
			<AttachIcon color={bg.dark} />
		</TouchableOpacity>
	);
}

const style = StyleSheet.create({
	rootStyle: {
		...row,
		...ph12,
		...mt12,
		...pv12,
		alignContent: "center",
		alignItems: "center",
		width: moderateScale(150),
		borderRadius: b6,
		borderWidth: b1,
		borderColor: border.black,
	},
	buttonText: {
		color: bg.dark,
		...w600,
		...mr8,
	},
});

export default memo(AttachmentButton);
