import React, { memo } from "react";
import { Animated, StatusBar, View } from "react-native";
import Svg, { SvgProps } from "react-native-svg";

import {
	LOGO_ICON_SIZE,
	SVG_SIZE,
} from "@screens/SplashScreen/splashScreen.constants";
import splashStyles from "@screens/SplashScreen/splashScreen.styles";
import useSplashScreenController from "@screens/SplashScreen/useSplashScreenController";

import { colors } from "@assets/colors";
import { SplashLogo, UpGradLogo } from "@assets/icons";

const { neutral, icon } = colors;

interface ILogoComponent {
	changeLogo: boolean;
	svgProps: SvgProps;
}

const LogoComponent = ({ changeLogo, svgProps }: ILogoComponent) => {
	if (changeLogo) return <UpGradLogo {...svgProps} />;

	return <SplashLogo {...svgProps} />;
};

const MemoizedLogoComponent = memo(LogoComponent);

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SplashScreen = () => {
	const { scaleAnim, changeLogo } = useSplashScreenController();

	const logoProps = changeLogo
		? { ...LOGO_ICON_SIZE, color: neutral.white }
		: {
				...SVG_SIZE,
				style: { transform: [{ scale: scaleAnim }] },
				color: icon.default_red,
			};

	return (
		<View
			style={[
				splashStyles.container,
				changeLogo && splashStyles.logoTransitionBackground,
			]}
		>
			<StatusBar hidden />
			<AnimatedSvg {...logoProps}>
				<MemoizedLogoComponent
					changeLogo={changeLogo}
					svgProps={{
						...LOGO_ICON_SIZE,
						color: neutral.white,
					}}
				/>
			</AnimatedSvg>
		</View>
	);
};

export default SplashScreen;
