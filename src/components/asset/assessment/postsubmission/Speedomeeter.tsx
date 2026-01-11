import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
import { SvgXml } from "react-native-svg";

import { moderateScale } from "@utils/functions";

import { SpedometerIcon } from "@assets/icons";

interface SpeedometerProps {
	value: number; // Current score value to display on the speedometer (0-100)
	maxValue?: number; // Max value for the speedometer (default is 100)
}

const Speedometer: React.FC<SpeedometerProps> = ({ value, maxValue = 100 }) => {
	const arcColors = [
		"#FF0000",
		"#FF4500",
		"#FFA500",
		"#FFD700",
		"#FFFF00",
		"#9ACD32",
		"#32CD32",
		"#006400",
	];
	const numSegments = arcColors.length;
	const segmentAngle = 180 / numSegments;

	const svgNeedle = `
   <svg width="80" height="29" viewBox="0 0 44 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.5223 18.575L24.3834 9.02117C23.4982 8.71524 22.4242 9.07952 22.274 9.73663L19.7817 20.6375C19.6315 21.2946 20.4941 21.8557 21.4768 21.7394L63.1068 20.3926C64.427 20.2304 64.7577 19.002 63.5223 18.575Z" fill="#545454"/>
      <path d="M14.5539 0.855401C6.89365 0.568054 0.450853 6.54493 0.163506 14.2052C-0.12384 21.8654 5.85303 28.3082 13.5133 28.5955C21.1735 28.8829 27.6163 22.906 27.9036 15.2458C28.191 7.58554 22.2141 1.14275 14.5539 0.855401Z" fill="#E6E6E6"/>
      <path d="M26.782 14.3221C26.4947 21.9823 20.052 27.9591 12.3918 27.6717C9.49317 27.563 6.83574 26.5727 4.66736 24.9688C7.00861 27.1117 10.0932 28.4671 13.5133 28.5954C21.1735 28.8828 27.6162 22.9059 27.9035 15.2457C28.0821 10.4841 25.8402 6.19315 22.2782 3.55835C25.1808 6.21494 26.9411 10.082 26.782 14.3221Z" fill="#D5D5D5"/>
      <path d="M21.354 14.8092C21.2025 18.8482 17.8054 21.9997 13.7663 21.8481C9.72733 21.6966 6.5759 18.2995 6.72741 14.2605C6.87892 10.2215 10.276 7.07004 14.3151 7.22155C18.3541 7.37306 21.5055 10.7702 21.354 14.8092Z" fill="#039471"/>
    </svg>
  `;

	const renderArcs = () => {
		return arcColors.map((color, index) => {
			const startAngle = segmentAngle * index - 180; // Starts at -90 degrees on the left
			const endAngle = startAngle + segmentAngle;
			const largeArc = endAngle - startAngle > 180 ? 1 : 0;

			const x1 = 50 + 45 * Math.cos((Math.PI * startAngle) / 180);
			const y1 = 50 + 45 * Math.sin((Math.PI * startAngle) / 180);
			const x2 = 50 + 45 * Math.cos((Math.PI * endAngle) / 180);
			const y2 = 50 + 45 * Math.sin((Math.PI * endAngle) / 180);

			return (
				<Path
					key={index}
					d={`M ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2}`}
					fill="none"
					stroke={color}
					strokeWidth={10}
				/>
			);
		});
	};

	return (
		<View style={styles.container}>
			<Svg height="100" width="100" viewBox="0 0 100 100">
				{/* <G>
          {renderArcs()}
        </G> */}
				<View style={{ alignSelf: "center" }}>
					<SpedometerIcon width={100} height={100} />
				</View>
			</Svg>
			<View
				style={{
					position: "absolute",
					bottom: moderateScale(10),
					zIndex: 999,
					alignSelf: "center",
					width: moderateScale(55),
					transform: [
						//{ rotate: `${(value / maxValue) * 180 - 180}deg` }, // Rotate the needle
						{ rotate: `${(value / maxValue) * 200 - 200}deg` }, // Rotate the needle
					],
				}}
			>
				<SvgXml
					xml={svgNeedle}
					width={moderateScale(65)}
					height={moderateScale(25)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		height: moderateScale(80),
		justifyContent: "center",
	},
});

export default Speedometer;
