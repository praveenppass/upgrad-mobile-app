import React, {
	memo,
	PropsWithChildren,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { Animated, StyleSheet, TextStyle, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import {
	createProgressAnimation,
	createStrokeDashoffsetInterpolation,
} from "@components/Reusable/CircleProgressBar/circleProgressBar.util";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AssetCardLockedIcon } from "@assets/icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export enum IStrokeLinecap {
	BUTT = "butt",
	ROUND = "round",
}

interface ICircleProgressBar extends PropsWithChildren {
	progress: number;
	radius: number;
	strokeWidth: number;
	animationDuration?: number;
	showAnimation?: boolean;
	strokeLinecap?: IStrokeLinecap;
	progressBarColors: {
		active: string;
		inactive?: string;
	};
	textStyle: TextStyle;
	isLocked?: boolean;
}

const CircleProgressBar = ({
	progress,
	textStyle,
	radius,
	strokeWidth,
	animationDuration = 1000,
	showAnimation = true,
	strokeLinecap = IStrokeLinecap.ROUND,
	progressBarColors,
	children,
	isLocked = false,
}: ICircleProgressBar) => {
	const progressAnim = useRef(new Animated.Value(0)).current;

	const effectiveProgress = isLocked ? 0 : progress;

	const inactiveStrokeColor = useMemo(
		() =>
			effectiveProgress === 0
				? colors.neutral.grey_06
				: progressBarColors.inactive || progressBarColors.active,
		[
			progressBarColors.inactive,
			progressBarColors.active,
			effectiveProgress,
		],
	);

	const { svgSize, center } = useMemo(
		() => ({
			svgSize: (radius + strokeWidth) * 2,
			center: radius + strokeWidth,
		}),
		[radius, strokeWidth],
	);

	const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

	const strokeDashoffset = useMemo(
		() => createStrokeDashoffsetInterpolation(progressAnim, circumference),
		[progressAnim, circumference],
	);

	useEffect(() => {
		createProgressAnimation(
			progressAnim,
			effectiveProgress || 0,
			showAnimation ? animationDuration : 0,
		).start();
	}, [effectiveProgress, showAnimation, animationDuration]);

	return (
		<View style={[styles.container, { width: svgSize, height: svgSize }]}>
			<Svg width={svgSize} height={svgSize}>
				<Defs>
					<LinearGradient
						id="progressGradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<Stop
							offset="0%"
							stopColor={progressBarColors.active}
							stopOpacity="1"
						/>
						<Stop
							offset="100%"
							stopColor={progressBarColors.active}
							stopOpacity="0.8"
						/>
					</LinearGradient>
				</Defs>

				<Circle
					cx={center}
					cy={center}
					r={radius}
					stroke={inactiveStrokeColor}
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeOpacity={progressBarColors.inactive ? 1 : 0.15}
				/>

				{effectiveProgress ? (
					<AnimatedCircle
						cx={center}
						cy={center}
						r={radius}
						stroke="url(#progressGradient)"
						strokeWidth={strokeWidth}
						fill="transparent"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap={strokeLinecap}
						transform={`rotate(-90 ${center} ${center})`}
					/>
				) : null}
			</Svg>
			<MemoizedChildContainer
				isLocked={isLocked}
				child={children}
				percentageText={`${Math.round(effectiveProgress)}%`}
				textStyle={textStyle}
			/>
		</View>
	);
};

interface IChildContainer extends PropsWithChildren {
	child: React.ReactNode;
	percentageText: string;
	textStyle: TextStyle;
	isLocked: boolean;
}

const ChildContainer = ({
	child,
	percentageText,
	textStyle,
	isLocked,
}: IChildContainer) => {
	if (isLocked)
		return (
			<View style={styles.childContainer}>
				<AssetCardLockedIcon
					width={horizontalScale(12)}
					height={verticalScale(15)}
					color={colors.neutral.grey_06}
				/>
			</View>
		);
	if (child) return <View style={styles.childContainer}>{child}</View>;
	return <RNText title={percentageText} style={[styles.text, textStyle]} />;
};

const MemoizedChildContainer = memo(ChildContainer);

const styles = StyleSheet.create({
	childContainer: {
		position: "absolute",
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		position: "absolute",
		textAlign: "center",
	},
});

export default memo(CircleProgressBar);
