import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { ANIMATION_CONSTANTS } from "@screens/SplashScreen/splashScreen.constants";

const useSplashScreenController = () => {
	const scaleAnim = useRef(new Animated.Value(0)).current;

	const [changeOrientationColor, setChangeOrientationColor] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [changeLogo, setChangeLogo] = useState(false);

	const {
		ANIMATION_DURATION,
		LOGO_CHANGE_DELAY,
		ANIMATION_FOCUS_DURATION,
		START_ANIMATION_VALUE,
		SCALE_ANIMATION_DURATION,
	} = ANIMATION_CONSTANTS;

	useEffect(() => {
		Animated.timing(scaleAnim, {
			toValue: 1,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start();

		setChangeOrientationColor(true);
	}, []);

	useFocusEffect(
		useCallback(() => {
			const timeoutId = setTimeout(() => {
				Animated.timing(scaleAnim, {
					toValue: START_ANIMATION_VALUE,
					duration: SCALE_ANIMATION_DURATION,
					useNativeDriver: true,
				}).start();

				setShowLogo(true);
			}, ANIMATION_FOCUS_DURATION);

			return () => clearTimeout(timeoutId);
		}, [changeOrientationColor]),
	);

	useEffect(() => {
		const timeoutId = setTimeout(
			() => setChangeLogo(true),
			LOGO_CHANGE_DELAY,
		);

		return () => clearTimeout(timeoutId);
	}, [showLogo]);

	return {
		scaleAnim,
		changeLogo,
	};
};

export default useSplashScreenController;
