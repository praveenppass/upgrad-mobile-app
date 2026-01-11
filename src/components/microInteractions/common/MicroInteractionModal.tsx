import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import useMicroInteractionAudio from "@components/microInteractions/common/useMicroInteractionAudio";

import { colors } from "@assets/colors";

const { neutral } = colors;

interface IMicroInteractionModal {
	isOpen: boolean;
	closeModal: () => void;
	children: React.ReactNode;
}
const MicroInteractionModal = ({
	isOpen,
	closeModal,
	children,
}: IMicroInteractionModal) => {
	useMicroInteractionAudio(isOpen);

	return (
		<Modal
			statusBarTranslucent
			transparent
			visible={isOpen}
			animationType="fade"
			onRequestClose={closeModal}
			supportedOrientations={["portrait", "landscape"]}
		>
			<Pressable style={styles.backdrop} onPress={closeModal}>
				{children}
			</Pressable>
		</Modal>
	);
};

export default MicroInteractionModal;

const styles = StyleSheet.create({
	backdrop: {
		alignItems: "center",
		backgroundColor: `${neutral.black}89`,
		flex: 1,
		justifyContent: "center",
	},
});
