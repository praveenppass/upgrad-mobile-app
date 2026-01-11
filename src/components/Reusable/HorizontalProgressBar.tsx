
import React, { memo } from "react";
import { C } from "@assets/constants";
import measures from "@utils/measures";
import { ProgressBar } from "react-native-paper";
import { type StyleProp, type TextStyle, View } from "react-native";
import RNText from "./RNText";
import { verticalScale } from "@utils/functions";
const {
	themes: { border, bg },
	commonStyles: {
		text: { md, bold, clrBlack },
		align: { rowBetween },
	},
} = C;
const {
	BORDER: { b8 },
} = measures;
function HorizontalProgressBar({
	width,
	progress,
	textStyle,
	hideText,
	height = verticalScale(4),
}: {
	progress: number;
	width: string | number;
	textStyle?: StyleProp<TextStyle>;
	hideText?: boolean;
	height?: string | number;
}) {
	return (
		<View style={[rowBetween]}>
			<ProgressBar
					style={{ width, borderRadius: b8, height }}
				theme={{
					colors: {
						primary: border.green,
						surfaceVariant: bg.green,
					},
				}}
				progress={progress / 100}
			/>
			{!hideText ? (
				<RNText
					title={`${progress?.toFixed(0)}% Completed`}
					style={textStyle ?? [md, bold, clrBlack]}
				/>
			) : (
				<></>
			)}
		</View>
	);
}
export default memo(HorizontalProgressBar);