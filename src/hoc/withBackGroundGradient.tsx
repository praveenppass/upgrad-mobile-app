import React from "react";
import { C } from "@assets/constants";
import LinearGradient from "react-native-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

const {
	themes: { bg },
	commonStyles: {
		align: { flex1 },
	},
} = C;

type IBackGroundGradientProps = {
	contentToRender: JSX.Element;
	colors?: (string | number)[];
	backGroundStyle?: StyleProp<ViewStyle>;
};

export const WithBackGroundGradient = ({
	contentToRender,
	colors,
	backGroundStyle,
}: IBackGroundGradientProps) => {
	return (
		<LinearGradient
			colors={colors ?? [bg.primary, bg.topicState]}
			style={[backGroundStyle, flex1]}
		>
			{contentToRender}
		</LinearGradient>
	);
};
