import { C } from "@assets/constants";
import { StyleSheet, View } from "react-native";
import React from "react";
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { horizontalScale } from "@utils/functions";

const {
	themes: { text, border },
} = C;

export const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
	return (
		<View
			style={[
				style,
				bottomSheetIndicatorStyle.customBackdropBackGround,
			]}
		/>
	);
};

interface IRenderBackdropType extends BottomSheetBackdropProps {
	onHide?: () => void;
}

export const renderBackdrop = (props: IRenderBackdropType) => (
	<BottomSheetBackdrop
		{...props}
		onPress={props?.onHide}
		appearsOnIndex={0}
		opacity={0.6}
		disappearsOnIndex={-1}
	>
		<CustomBackdrop {...props} />
	</BottomSheetBackdrop>
);

export const bottomSheetIndicatorStyle = StyleSheet.create({
	indicatorStyle: {
		width: 64,
		height: horizontalScale(4),
		backgroundColor: border.color1,
	},
	customBackdropBackGround: {
		backgroundColor: text.dark,
	},
});
