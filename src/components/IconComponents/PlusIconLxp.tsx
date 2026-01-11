import React, { memo } from "react";

import { moderateScale } from "@utils/functions";

import { C } from "@assets/constants";
import { MinusIcon, PlusLxp } from "@assets/icons";

const {
	themes: { primary },
} = C;

export interface IPlusIconLxpProps {
	isOpen?: boolean;
	iconColor?: string;
	svgSize?: ISvgSizeType;
}

const ICON_DIMENSION = {
	width: moderateScale(24),
	height: moderateScale(24),
};

interface ISvgSizeType {
	width: number;
	height: number;
}

const PlusIconLxp = ({ isOpen, iconColor, svgSize }: IPlusIconLxpProps) => {
	if (isOpen) {
		return (
			<MinusIcon
				{...ICON_DIMENSION}
				{...svgSize}
				color={iconColor ?? primary.color2}
			/>
		);
	}

	return (
		<PlusLxp
			{...ICON_DIMENSION}
			{...svgSize}
			color={iconColor ?? primary.color2}
		/>
	);
};

export default memo(PlusIconLxp);
