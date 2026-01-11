import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { InfoLxp } from "@assets/icons";

interface IVideoplayerToastProps {
	message: string;
	visible: boolean;
	onHide?: (data: boolean) => void;
}

const VideoplayerToast = ({
	message,
	visible,
	onHide,
}: IVideoplayerToastProps) => {
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (visible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}).start();
			setTimeout(() => {
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}).start(() => {
					onHide?.(false);
				});
			}, 2000);
		}
	}, [visible]);

	return visible ? (
		<Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
			<InfoLxp
				width={horizontalScale(18)}
				height={horizontalScale(18)}
				color={colors.neutral.black}
			/>
			<Text style={styles.toastText}>{message}</Text>
		</Animated.View>
	) : null;
};

const styles = StyleSheet.create({
	toast: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: colors.state.info_grey,
		borderColor: colors.state.info_light_grey,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "center",
		maxWidth: "100%",
		paddingHorizontal: 20,
		paddingVertical: 5,
		position: "absolute",
		top: "10%",
		zIndex: 999,
	},
	toastText: {
		color: colors.neutral.black,
		fontWeight: "bold",
	},
});

export default VideoplayerToast;
