import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@assets/colors";

export const StatusbarLxp = () => {
	const { top } = useSafeAreaInsets();

	return (
		<View
			style={{
				height: top,
				backgroundColor: colors.neutral.white,
			}}
		>
			<StatusBar
				translucent
				animated={true}
				showHideTransition="fade"
				backgroundColor="transparent"
				barStyle="dark-content"
			/>
		</View>
	);
};

export default StatusbarLxp;
