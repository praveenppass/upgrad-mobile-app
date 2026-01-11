import React, { memo } from "react";
import { C } from "@assets/constants";
import { StyleSheet } from "react-native";
import { ArrowIcon, CalendarArrowIcon } from "@assets/icons";

const {
	themes: { text },
} = C;

const ARROW_DIMENSION = {
	width: 16,
	height: 16,
};

const IconArrow = ({
	isLeft,
	color,
	isCalendar = false,
}: {
	isLeft?: boolean;
	color?: string;
	isCalendar?: boolean;
}) => {
	const arrowStyle = StyleSheet.compose(
		null,
		isLeft ? styles.arrowLeft : null,
	);

	if (isCalendar) {
		return (
			<CalendarArrowIcon
				style={arrowStyle}
				{...ARROW_DIMENSION}
				color={color ?? text.steelBlue}
			/>
		);
	}

	return (
		<ArrowIcon
			style={arrowStyle}
			{...ARROW_DIMENSION}
			color={color ?? text.steelBlue}
		/>
	);
};

export default memo(IconArrow);

const styles = StyleSheet.create({
	arrowLeft: {
		transform: [
			{
				rotate: "180deg",
			},
		],
	},
});
