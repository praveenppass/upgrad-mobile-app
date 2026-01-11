import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import Svg, {
	Defs,
	LinearGradient,
	Stop,
	Text as SvgText,
} from "react-native-svg";

import { moderateScale } from "@utils/functions";

interface GradientTextProps {
	text: string;
	style?: StyleProp<TextStyle>;
	colors: string[];
}

const GradientText: React.FC<GradientTextProps> = ({ text, style, colors }) => {
	return (
		<View style={{ width: "auto", height: "auto" }}>
			<Svg height="40" width="100%">
				<Defs>
					<LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
						<Stop offset="0" stopColor={colors[0]} />
						<Stop offset="0.5" stopColor={colors[1]} />
						<Stop offset="1" stopColor={colors[2]} />
					</LinearGradient>
				</Defs>
				<SvgText
					fill="url(#gradient)"
					fontSize={moderateScale(20)}
					fontWeight="600"
					x="50%"
					y="30"
					letterSpacing={0.8}
					textAnchor="middle"
					style={style}
				>
					{text}
				</SvgText>
			</Svg>
		</View>
	);
};

export default GradientText;
