import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import CustomCheckbox from "@components/Reusable/CustomCheckbox";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { ILanguage } from "@interface/userProgram.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { lg, semiBold } = commonStyles.text;

interface ILanguageSwitchConfirmationModal {
	isVisible: boolean;
	selectedLanguage: ILanguage | null;
	onConfirm: () => void;
	onCancel: () => void;
}
const STRINGS = createStringConstants({
	title: "asset.languageSwitchConfirmationModal.title",
	checkboxLabel: "asset.languageSwitchConfirmationModal.checkboxLabel",
	confirmButton: "asset.languageSwitchConfirmationModal.confirmButton",
});
const LanguageSwitchConfirmationModal = ({
	isVisible,
	selectedLanguage: _selectedLanguage,
	onConfirm,
	onCancel,
}: ILanguageSwitchConfirmationModal) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			setIsChecked(false);
		}
	}, [isVisible]);

	const handleConfirm = () => {
		if (isChecked) {
			onConfirm();
		}
	};

	const handleCancel = () => {
		onCancel();
	};

	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={handleCancel}
			onBackPress={handleCancel}
			style={styles.modalContainer}
			disableCloseOnSwipeDown
		>
			<View style={styles.dragHandle} />

			<RNText title={getString(STRINGS.title)} style={styles.title} />

			<View style={styles.checkboxContainer}>
				<CustomCheckbox
					label={getString(STRINGS.checkboxLabel)}
					isChecked={isChecked}
					setIsChecked={setIsChecked}
					checkboxStyle={styles.checkbox}
				/>
			</View>

			<CustomButton
				title={getString(STRINGS.confirmButton)}
				isDisabled={!isChecked}
				onBtnHandler={handleConfirm}
				btnStyle={styles.confirmButton}
			/>
		</ActionModal>
	);
};

export default LanguageSwitchConfirmationModal;

const styles = StyleSheet.create({
	checkbox: {
		alignSelf: "flex-start",
		marginTop: verticalScale(5),
	},
	checkboxContainer: {
		marginBottom: verticalScale(24),
	},
	confirmButton: {
		borderRadius: horizontalScale(8),
		marginBottom: verticalScale(10),
	},
	dragHandle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(2),
		height: verticalScale(4),
		marginBottom: verticalScale(16),
		width: horizontalScale(40),
	},
	modalContainer: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		paddingBottom: verticalScale(24),
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(12),
	},
	title: {
		...lg,
		...semiBold,
		color: neutral.black,
		textAlign: "center",
	},
});
