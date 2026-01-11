import React from "react";
import { Keyboard, Pressable, StatusBar, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

import { C } from "@assets/constants";

const {
	themes: { primary },
	commonStyles: {
		align: { flex1 },
	},
} = C;

const withAuthWrapper = ({
	BodyComponent,
}: {
	BodyComponent: React.FunctionComponent;
}) => {
	return (
		<KeyboardAwareScrollView
			enableOnAndroid
			enableAutomaticScroll
			contentContainerStyle={styles.fG1}
			resetScrollToCoords={{ x: 0, y: 0 }}
			automaticallyAdjustContentInsets={false}
		>
			<Pressable style={flex1} onPress={Keyboard.dismiss}>
				<StatusBar barStyle="light-content" />
				<LinearGradient
					style={styles.main}
					colors={[primary.color1, primary.color2]}
				>
					<BodyComponent />
				</LinearGradient>
			</Pressable>
		</KeyboardAwareScrollView>
	);
};

export default withAuthWrapper;

const styles = StyleSheet.create({
	fG1: { flexGrow: 1 },
	main: {
		...flex1,
		backgroundColor: primary.color1,
	},
});
