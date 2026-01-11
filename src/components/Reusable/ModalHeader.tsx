import React, { memo } from "react";
import {
	Pressable,
	type StyleProp,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

import RNText from "./RNText";

const {
	commonStyles: {
		spacing: { ph20 },
		align: { rowBetween },
		text: { bold, reg, clrBlack },
	},
} = C;

const { BORDER } = measures;

interface IModalHeaderType {
	title: string;
	isShadow?: boolean;
	onAction?: () => void;
	containerStyles?: StyleProp<ViewStyle>;
}

const ModalHeader = ({
	title,
	isShadow,
	onAction,
	containerStyles,
}: IModalHeaderType) => {
	const ModalHeaderContent = () => {
		return (
			<View style={[styles.root, containerStyles]}>
				<RNText title={title} style={styles.title} />
				{onAction ? (
					<Pressable onPress={onAction}>
						<RNText title="Close" />
					</Pressable>
				) : (
					<View />
				)}
			</View>
		);
	};
	return (
		<>
			{isShadow ? (
				<View style={styles.shadowStyle}>
					<ModalHeaderContent />
				</View>
			) : (
				<ModalHeaderContent />
			)}
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		...ph20,
		width: "100%",
		...rowBetween,
		height: moderateScale(45),
	},
	shadowStyle: {
		borderTopLeftRadius: BORDER.b12,
		borderTopRightRadius: BORDER.b12,
		boxShadow: "0px 4px 0px rgba(0, 0, 0, 0.05)",
		width: "100%",
	},
	title: {
		...bold,
		...reg,
		...clrBlack,
	},
});

export default memo(ModalHeader);
