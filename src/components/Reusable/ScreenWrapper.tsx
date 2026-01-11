/**
 * ScreenWrapper Component
 *
 * A screen wrapper component that provides safe area handling and status bar configuration.
 * This component wraps screens with proper safe area insets and handles the status bar
 * configuration. It provides separate background colors for the header area and main content,
 * and allows customization of safe area behavior.
 *
 * @component
 * @param {React.ReactNode} children - The child components to render inside the wrapper
 * @param {StyleProp<ViewStyle>} [style] - Additional styles to apply to the container
 * @param {boolean} [removeBottomInset] - Whether to remove the bottom safe area inset
 * @param {StatusBarStyle} [barStyle="dark-content"] - Status bar style (light-content, dark-content, default)
 * @param {ColorValue} [headerBackgroundColor=neutral.white] - Background color for the header safe area
 * @param {ColorValue} [backgroundColor=neutral.white] - Background color for the main content area
 *
 * @returns {React.FC<IScreenWrapper>} A React functional component that wraps children with safe area and status bar handling
 *
 * @example
 * ```tsx
 * <ScreenWrapper
 *   backgroundColor={colors.neutral.gray100}
 *   barStyle="light-content"
 *   removeBottomInset={true}
 * >
 *   <YourScreenContent />
 * </ScreenWrapper>
 * ```
 */
import React from "react";
import {
	ColorValue,
	StatusBar,
	StatusBarStyle,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@assets/colors";

interface IScreenWrapper {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	removeBottomInset?: boolean;
	barStyle?: StatusBarStyle;
	headerBackgroundColor?: ColorValue;
	backgroundColor?: ColorValue;
}

const { neutral } = colors;

const ScreenWrapper: React.FC<IScreenWrapper> = ({
	children,
	style,
	removeBottomInset,
	headerBackgroundColor = neutral.white,
	barStyle = "dark-content",
	backgroundColor = neutral.white,
	...props
}) => {
	return (
		<>
			<SafeAreaView
				style={{ backgroundColor: headerBackgroundColor }}
				edges={["top"]}
			/>
			<SafeAreaView
				style={[
					styles.safeContainer,
					{ backgroundColor: backgroundColor },
				]}
				edges={[
					"left",
					"right",
					...(removeBottomInset ? [] : (["bottom"] as Edge[])),
				]}
			>
				<StatusBar
					animated
					translucent
					backgroundColor={colors.transparent}
					barStyle={barStyle}
					showHideTransition="fade"
				/>
				<View style={[styles.container, style]} {...props}>
					{children}
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safeContainer: {
		backgroundColor: neutral.white,
		flex: 1,
	},
});

export default ScreenWrapper;
