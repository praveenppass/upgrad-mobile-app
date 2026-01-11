import React, { memo } from "react";
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from "react-native";

import AccordionIcon from "@components/IconComponents/AccordionIcon";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, trimText, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: { primary, text },
	commonStyles: {
		spacing: { mr6, ph16 },
		align: { rowStart, itemsCenter, justifyCenter, selfStart },
		text: { clrBlue, txtCenter, bold },
	},
} = C;

const {
	BORDER: { b90 },
} = measures;

interface IDropdownContainerType {
	label: string;
	loading?: boolean;
	onDropdownPress?: () => void;
	isOpen?: boolean;
	style?: StyleProp<ViewStyle>;
}

const DropdownContainer = ({
	label,
	onDropdownPress,
	isOpen,
	style,
	loading,
}: IDropdownContainerType) => {
	return (
		<TouchableOpacity
			style={[loading ? null : ph16, selfStart, styles.mainTitle, style]}
			onPress={onDropdownPress}
		>
			{loading ? (
				<Skeleton style={styles.loadingStyle} />
			) : (
				<>
					<RNText
						title={trimText(label ?? "", 16) ?? ""}
						numberOfLines={2}
						style={styles.milestoneTitle}
					/>
					<AccordionIcon iconColor={text.dark} isOpen={isOpen} />
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	loadingStyle: {
		borderRadius: horizontalScale(90),
		height: "100%",
		width: "100%",
	},
	mainTitle: {
		backgroundColor: primary.color2,
		...rowStart,
		borderRadius: b90,
		elevation: 4,
		height: verticalScale(50),
		shadowColor: primary.color3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		...justifyCenter,
	},
	milestoneTitle: {
		...mr6,
		...txtCenter,
		...clrBlue,
		...bold,
		...itemsCenter,
	},
	svgIcon: { height: verticalScale(16), width: horizontalScale(16) },
});

export default memo(DropdownContainer);
