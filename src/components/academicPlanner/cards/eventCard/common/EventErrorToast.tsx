import React from "react";
import { Modal, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm } = commonStyles.text;

interface IEventErrorToast {
	isVisible: boolean;
	text: string;
}

const EventErrorToast = ({ isVisible, text }: IEventErrorToast) => {
	return (
		<Modal
			statusBarTranslucent
			transparent
			visible={isVisible}
			animationType="fade"
		>
			<View style={styles.container}>
				<View style={styles.toastContainer}>
					<RNText style={styles.text}>{text}</RNText>
				</View>
			</View>
		</Modal>
	);
};

export default EventErrorToast;

const styles = StyleSheet.create({
	container: {
		bottom: verticalScale(80),
		position: "absolute",
		width: "100%",
	},
	text: {
		color: neutral.white,
		textAlign: "center",
		...sm,
	},
	toastContainer: {
		alignItems: "center",
		backgroundColor: neutral.grey_08,
		borderRadius: horizontalScale(4),
		marginHorizontal: horizontalScale(10),
		paddingHorizontal: verticalScale(10),
		paddingVertical: verticalScale(15),
	},
});
