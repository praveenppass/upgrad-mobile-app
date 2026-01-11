import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { state } = colors;

const {
	text: { md, regular, semiBold, reg, bold, lg, xxSm },
} = commonStyles;

interface IAddFieldModal {
	isVisible: boolean;
	onModalClose: () => void;
	onCancelPress: () => void;
	onAddPress: () => void;
}

const AddFieldModal = ({
	isVisible,
	onModalClose,
	onCancelPress,
	onAddPress,
}: IAddFieldModal) => (
	<ConfirmationModal
		visible={isVisible}
		onClose={onModalClose}
		bgColor={state.warning_light_yellow}
		icon={IMAGE_URLS.WARNING}
	>
		<RNText
			title={strings.YOU_PREFERRED_OPTION_NOT_AVAILABLE}
			style={styles.addModalHeading}
		/>

		<RNText
			title={strings.ARE_YOU_SURE_YOU_WANT_TO_ADD}
			style={styles.addModalDescription}
		/>

		<View style={styles.addModalButtonContainer}>
			<Pressable
				style={[styles.addModalButton, styles.addModalButtonLight]}
				onPress={onCancelPress}
			>
				<RNText style={styles.addModalButtonText}>
					{strings.CANCEL}
				</RNText>
			</Pressable>

			<Pressable
				style={[styles.addModalButton, styles.addModalButtonDark]}
				onPress={onAddPress}
			>
				<RNText
					style={[
						styles.addModalButtonText,
						styles.addModalButtonTextWhite,
					]}
				>
					{strings.ADD}
				</RNText>
			</Pressable>
		</View>
	</ConfirmationModal>
);

export default AddFieldModal;

const styles = StyleSheet.create({
	addButton: {
		alignItems: "center",
		backgroundColor: colors.highlight.bg_blue,
		borderColor: colors.highlight.text_blue,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		columnGap: horizontalScale(2),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(5),
	},
	addButtonText: {
		color: colors.highlight.text_blue,
		...xxSm,
		...semiBold,
	},
	addItemText: {
		...semiBold,
	},
	addModalButton: {
		alignItems: "center",
		borderRadius: horizontalScale(6),
		flex: 1,
		justifyContent: "center",
		marginHorizontal: horizontalScale(5),
		paddingVertical: verticalScale(13),
	},
	addModalButtonContainer: {
		flexDirection: "row",
		marginBottom: verticalScale(22),
		marginTop: verticalScale(32),
		width: "100%",
	},
	addModalButtonDark: {
		backgroundColor: colors.cta.text.default_secondary,
	},
	addModalButtonLight: {
		backgroundColor: colors.bg.fill.bg_default,
		borderColor: colors.cta.text.default_secondary,
		borderWidth: 1,
	},
	addModalButtonText: {
		...reg,
		...semiBold,
		color: colors.cta.text.default_secondary,

		textAlign: "center",
	},
	addModalButtonTextWhite: {
		color: colors.cta.text.default_primary,
	},
	addModalDescription: {
		color: colors.neutral.grey_07,
		...regular,
		lineHeight: verticalScale(20),
		marginTop: verticalScale(12),
		textAlign: "center",
		...md,
	},
	addModalHeading: {
		color: colors.neutral.black,
		...bold,
		...lg,
	},
});
