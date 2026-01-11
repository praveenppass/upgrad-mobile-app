import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { reg, semiBold, md, regular, sm } = commonStyles.text;

const { neutral, icon } = colors;

interface NegativeResponseFeedbackModal {
	visible: boolean;
	onClose: () => void;
	onConfirm: (answer: string) => void;
}

const NegativeResponseFeedbackModal: React.FC<
	NegativeResponseFeedbackModal
> = ({ visible, onClose, onConfirm }) => {
	const [answer, setAnswer] = useState("");
	const isDisabled = !answer;

	const handleConfirm = () => {
		onConfirm(answer);
		setAnswer("");
		onClose();
	};

	return (
		<>
			<ConfirmationModal visible={visible} onClose={onClose}>
				<RNText
					title={strings.HELP_US_IMPROVE}
					style={styles.heading}
				/>

				<RNText
					title={strings.WHAT_WENT_WRONG_TEXT}
					style={styles.description}
				/>

				<KeyboardAvoidingView>
					<TextInput
						style={styles.openResponseInput}
						onChangeText={(text) => setAnswer(text)}
						value={answer ? answer : ""}
						multiline={true}
						spellCheck={false}
						numberOfLines={10}
						selectTextOnFocus={false}
						keyboardType={"ascii-capable"}
						placeholder={strings.WRITE_REASON_HERE}
					/>
				</KeyboardAvoidingView>

				<View style={styles.containerBoxes}>
					<Pressable
						style={styles.modalFullWidthButton}
						onPress={onClose}
					>
						<RNText
							style={[
								styles.modalButtonText,
								{ color: neutral.black },
							]}
						>
							{strings.CANCEL}
						</RNText>
					</Pressable>

					<Pressable
						style={[
							styles.modalFullWidthButton,
							styles.yesButtonStyle,
							isDisabled && styles.submitIfValidButton,
						]}
						disabled={isDisabled}
						onPress={handleConfirm}
					>
						<RNText
							style={[
								styles.modalButtonText,
								{ color: neutral.white },
							]}
						>
							{strings.SUBMIT}
						</RNText>
					</Pressable>
				</View>
			</ConfirmationModal>
		</>
	);
};

export default NegativeResponseFeedbackModal;

const styles = StyleSheet.create({
	containerBoxes: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(12),
	},
	description: {
		...regular,
		...sm,
		lineHeight: verticalScale(15),
		paddingBottom: verticalScale(36),
	},
	heading: {
		lineHeight: verticalScale(20),
		...semiBold,
		...reg,
		color: neutral.black,
		paddingBottom: verticalScale(18),
		paddingHorizontal: horizontalScale(45),
		paddingTop: verticalScale(30),
		textAlign: "center",
	},
	maxLimitStyle: {
		...regular,
		...sm,
		lineHeight: verticalScale(14),
		marginBottom: verticalScale(30),
	},
	modalButtonText: {
		...semiBold,
		...md,
		lineHeight: verticalScale(21),
	},
	modalFullWidthButton: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.black,
		borderRadius: 5,
		borderWidth: 1,
		color: neutral.white,
		flex: 1,
		marginBottom: 15,
		padding: horizontalScale(15),
	},
	openResponseInput: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: 8,
		borderWidth: 1,
		...regular,
		...sm,
		height: verticalScale(120),
		lineHeight: verticalScale(19),
		marginBottom: verticalScale(20),
		padding: verticalScale(10),
		textAlignVertical: "top",
		width: verticalScale(320),
	},
	submitIfValidButton: {
		backgroundColor: icon.disable,
		borderWidth: 0,
	},
	yesButtonStyle: {
		backgroundColor: neutral.black,
		borderColor: neutral.black,
		borderWidth: 1,
		marginBottom: verticalScale(15),
	},
});
