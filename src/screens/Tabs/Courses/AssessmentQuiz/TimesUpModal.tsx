import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { BottomButton } from "@interface/app.interface";

import { C } from "@assets/constants";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const {
	colors: { neutral, bg },
	commonStyles: {
		text: { semiBold, xlg, regular, md },
	},
} = C;
interface ITimesupProps {
	questionHandler: (data: string) => void;
}
const TimesUpModal = ({ questionHandler }: ITimesupProps) => {
	const [isModalVisible, setIsModalVisible] = useState(true);
	return (
		<ConfirmationModal
			visible={isModalVisible}
			icon={IMAGE_URLS.TIMES_UP}
			bgColor={bg.fill.bg_accent_3}
		>
			<View style={styles.modalContent2}>
				<RNText style={styles.unattemptedText}>
					{strings.TIMES_UP}
				</RNText>

				<RNText style={styles.timeLeftText}>
					{strings.AUTO_SUBMIT_TEXT}
				</RNText>
			</View>
			<CommonButton
				title={strings.OKAY}
				onPress={() => {
					setIsModalVisible(false);
					questionHandler(BottomButton.MODAL_OKAY_NAVIGATE);
				}}
				variant={IButtonVariant.Secondary}
				style={styles.button}
			/>
		</ConfirmationModal>
	);
};

export default TimesUpModal;

const styles = StyleSheet.create({
	button: {
		marginVertical: verticalScale(40),
		width: "100%",
	},
	modalButtonText1: {
		color: neutral.white,
		fontWeight: "bold",
	},
	modalContent2: {
		alignItems: "center",
		gap: horizontalScale(16),
		marginBottom: verticalScale(32),
		marginHorizontal: horizontalScale(20),
	},
	timeLeftText: {
		color: neutral.grey_07,
		...regular,
		...md,
		lineHeight: verticalScale(21),
	},
	unattemptedText: {
		color: neutral.black,
		lineHeight: verticalScale(27),
		...semiBold,
		...xlg,
	},
});
