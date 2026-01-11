import React, { useEffect, useRef } from "react";
import {
	Animated,
	FlatList,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import RNText from "@components/Reusable/RNText";
import useScrollToTop from "@components/Reusable/ScrollToTop/useScrollToTop";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import { colors } from "@assets/colors";
import { ArrowUpIcon } from "@assets/icons/svg/common";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const { xxSm, regular } = commonStyles.text;

const BACK_TO_TOP_TEXT = getString("common.backToTop");

interface ScrollToTopProps<T> {
	flatListRef: React.RefObject<FlatList<T> | null>;
	showButton: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

const ScrollToTop = <T,>({
	flatListRef,
	showButton,
	style,
	testID,
}: ScrollToTopProps<T>) => {
	const scrollToTop = () => {
		flatListRef.current?.scrollToOffset({
			offset: 0,
			animated: true,
		});
	};

	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (showButton)
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		else
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start();
	}, [showButton, fadeAnim]);

	return (
		<View
			style={[styles.container, style]}
			pointerEvents={showButton ? "auto" : "none"}
			testID={testID || "scroll_to_top_container"}
		>
			<Animated.View
				style={[styles.innerContainer, { opacity: fadeAnim }]}
			>
				<Pressable style={styles.button} onPress={scrollToTop}>
					<ArrowUpIcon
						color={neutral.white}
						width={horizontalScale(8)}
						height={verticalScale(9)}
					/>
					<RNText style={styles.text} title={BACK_TO_TOP_TEXT} />
				</Pressable>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(10),
		boxShadow: `0px ${verticalScale(4)}px ${horizontalScale(8)}px ${neutral.black}1A`,
		elevation: 4,
		flexDirection: "row",
		gap: horizontalScale(6),
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(4),
	},

	container: {
		width: "100%",
	},

	innerContainer: {
		alignItems: "center",
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(6),
	},
	text: {
		...xxSm,
		...regular,
		color: neutral.white,
	},
});

export default ScrollToTop;

export { useScrollToTop };
