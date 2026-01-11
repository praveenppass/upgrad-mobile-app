import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { C } from "@assets/constants";

export const CustomStatusBar = () => {
	const route = useRoute();
	const { top } = useSafeAreaInsets();

	// Check route to decide the background color and bar style
	const condition =
		route?.name === "CourseDetails" ||
		route?.name === "CourseDetailsModuleScreen";

	// Compute the background color based on the route
	const backgroundColor = condition ? "#000000" : C.themes.primary.color2;

	// Compute the bar style based on the background color
	const barStyle = condition ? "light-content" : "dark-content";

	// Apply the status bar settings dynamically
	useFocusEffect(
		useCallback(() => {
			StatusBar.setBarStyle(barStyle, true); // Ensure smooth animation for the text color
		}, [barStyle]),
	);

	return (
		<View
			style={{
				height: top,
				backgroundColor,
			}}
		>
			<StatusBar
				translucent
				animated
				backgroundColor="transparent"
				barStyle={barStyle}
				showHideTransition="fade"
			/>
		</View>
	);
};

export default CustomStatusBar;
