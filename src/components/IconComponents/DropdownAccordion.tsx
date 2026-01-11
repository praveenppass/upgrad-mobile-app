import React, { memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { C } from "@assets/constants";
import { AccordionDownIcon, ArrowUpIcon, DropDownIcon } from "@assets/icons";

const {
	themes: { primary },
} = C;

export interface IDropdownAccordionProps {
	isOpen?: boolean;
	iconColor?: string;
	svgSize?: ISvgSizeType;
	iconStyle?: StyleProp<ViewStyle>;
}
const ARROW_DIMENSION = {
	width: horizontalScale(14),
	height: verticalScale(14),
};
interface ISvgSizeType {
	width: number;
	height: number;
}
const DropdownAccordion = ({
	isOpen,
	iconColor,
	svgSize,
	iconStyle,
}: IDropdownAccordionProps) => {
	// Choose the icon component based on the `isOpen` prop
	const IconComponent = isOpen ? ArrowUpIcon : AccordionDownIcon;

	return (
		<View>
			<IconComponent
				style={iconStyle}
				{...ARROW_DIMENSION}
				{...svgSize}
				color={iconColor ?? primary.color2}
			/>
		</View>
	);
};

export default memo(DropdownAccordion);
