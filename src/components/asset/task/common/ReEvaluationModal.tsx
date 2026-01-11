import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";
import { IMAGE_URLS } from "@assets/icons/img/index";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { lg, bold, w400, sm },
} = commonStyles;

const { state, neutral, cta } = colors;

interface IReEvaluationModal {
	showModal: boolean;
	setShowModal: (val: boolean) => void;
	handleEvaluationSubmit: (val: string) => void;
}
const ReEvaluationModal = ({
	showModal,
	setShowModal,
	handleEvaluationSubmit,
}: IReEvaluationModal) => {
	const [inputDescription, setInputDescription] = useState<string>("");
	const isInputDescriptionLessThanOrEqualToTen =
		inputDescription?.length <= 10;

	const isValid = isInputDescriptionLessThanOrEqualToTen;

	return (
		<ConfirmationModal
			visible={showModal}
			onClose={() => setShowModal(false)}
			icon={{ uri: IMAGE_URLS.NOTES_ICON }}
			bgColor={state.warning_light_yellow}
		>
			<RNText
				title={strings.ARE_YOU_SURE_YOU_WANT_TO_APPLY_FOR_RE_EVALUATION}
				style={styles.heading}
			/>

			<TextInput
				placeholder={strings.WRITE_YOUR_REASON_HERE}
				multiline={true}
				style={styles.textInputstyle}
				value={inputDescription}
				onChangeText={setInputDescription}
			/>

			{isInputDescriptionLessThanOrEqualToTen ? (
				<View style={styles.errTxtContainer}>
					<RNText
						title={strings.MIN_10_CHARACTERS_REQUIRED}
						style={styles.errText}
					/>
				</View>
			) : null}

			<View style={styles.buttonContainer}>
				<CommonButton
					title={strings.NO}
					onPress={() => {
						setInputDescription("");
						setShowModal(false);
					}}
					variant={IButtonVariant.Tertiary}
					style={styles.btnStyle}
				/>
				<CommonButton
					title={strings.YES}
					isDisabled={isInputDescriptionLessThanOrEqualToTen}
					onPress={() => {
						handleEvaluationSubmit(inputDescription);
						setShowModal(false);
					}}
					variant={IButtonVariant.Secondary}
					style={styles.btnStyle}
				/>
			</View>
		</ConfirmationModal>
	);
};

export default ReEvaluationModal;

const styles = StyleSheet.create({
	btnStyle: {
		flex: 1,
	},
	button: {
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(4),
		flex: 1,
		marginRight: moderateScale(10),
		marginTop: verticalScale(24),
		paddingVertical: verticalScale(12),
	},
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		marginTop: verticalScale(20),
	},
	container: {
		alignItems: "center",
		paddingBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
	},
	description: {
		color: neutral.grey_08,
		...w400,
		lineHeight: verticalScale(20),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	descriptionHighlight: {
		color: neutral.black,
	},
	disableBtn: {
		backgroundColor: cta.fill.disable,
	},
	enableBtn: {
		backgroundColor: neutral.black,
	},
	errText: {
		color: neutral.grey_06,
		fontFamily: fontFamily.Regular,
		...sm,
	},
	errTxtContainer: {
		justifyContent: "flex-start",
		width: "100%",
	},
	heading: {
		color: neutral.black,
		...bold,
		...lg,
		textAlign: "center",
		width: moderateScale(270),
	},
	noButton: {
		borderColor: neutral.black,
		borderRadius: horizontalScale(4),
		borderWidth: 1,
		flex: 1,
		marginRight: moderateScale(10),
		marginTop: verticalScale(24),
		paddingVertical: verticalScale(12),
	},
	textInputstyle: {
		borderColor: neutral.grey_05,
		borderRadius: moderateScale(4),
		borderWidth: moderateScale(1),
		height: moderateScale(100),
		marginBottom: moderateScale(10),
		marginTop: moderateScale(20),
		textAlignVertical: "top",
		width: "100%",
	},
});
