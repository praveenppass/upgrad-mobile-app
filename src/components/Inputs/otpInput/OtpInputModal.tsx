import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import { useOtpController } from "@components/Inputs/otpInput/useOtpController";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import RNText from "@components/Reusable/RNText";
import SmoothOtpInput from "@components/Reusable/TextInput/SmoothOtpInput";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { EditPencilRedIcon } from "@assets/icons";
import { AlertIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, md, regular, semiBold, xlg } = commonStyles.text;

interface IOtpInputProps {
	mobileNumber: string;
	isVisible: boolean;
	handleModal: () => void;
}

const OtpInputModal = ({
	mobileNumber,
	isVisible,
	handleModal,
}: IOtpInputProps) => {
	const { otp, timer, errorMsg, verifyOtp, handleResendOtp, onTextChange } =
		useOtpController({
			isVisible,
			mobileNumber,
			handleModal,
		});

	return (
		<ActionModal
			isOpen={isVisible}
			onBackPress={handleModal}
			closeModal={handleModal}
		>
			<View style={styles.modalHeaderIndicator} />
			<View style={styles.modalContent}>
				<RNText style={styles.title} title={strings.OTP_VERIFICATION} />
				<RNText
					style={styles.description}
					title={strings.OTP_SENT_TEXT}
				/>
				<View style={styles.phoneContainer}>
					<RNText
						style={styles.phoneNumber}
						title={`+91-${mobileNumber}`}
					/>
					<Pressable
						style={styles.editIconContainer}
						onPress={handleModal}
					>
						<EditPencilRedIcon />
					</Pressable>
				</View>

				<SmoothOtpInput
					value={otp}
					onChangeText={onTextChange}
					codeLength={4}
					cellSize={48}
					restrictToNumbers
					cellSpacing={horizontalScale(35)}
					cellStyle={styles.otpCell}
					textStyle={styles.otpTxtStyle}
					containerStyle={styles.otpContainer}
					cellStyleFocused={{
						borderColor: colors.neutral.grey_08,
					}}
					cellStyleFilled={{
						borderColor: colors.neutral.grey_08,
					}}
					password={false}
					keyboardType="number-pad"
				/>

				{errorMsg ? (
					<View style={styles.errorView}>
						<AlertIcon />
						<RNText style={styles.invalidOtp} title={errorMsg} />
					</View>
				) : null}
				<View style={styles.txtContainer}>
					{timer > 0 ? (
						<RNText
							style={styles.didNotReceiveOtp}
							title={`${strings.RESEND_IN} ${timer} sec`}
						/>
					) : (
						<>
							<RNText
								style={styles.didNotReceiveOtp}
								title={strings.DIDNT_RECEIVE_OTP_SECOND_CASE}
							/>
							<Pressable onPress={handleResendOtp}>
								<RNText
									style={styles.resendOtp}
									title={strings.RESEND_OTP}
								/>
							</Pressable>
						</>
					)}
				</View>

				<CommonButton
					title={strings.VERIFY}
					isDisabled={otp.length !== 4}
					variant={IButtonVariant.Secondary}
					onPress={verifyOtp}
					isLoading={false}
				/>
			</View>
		</ActionModal>
	);
};

export default OtpInputModal;

const styles = StyleSheet.create({
	description: {
		color: colors.neutral.grey_06,
		marginTop: verticalScale(16),
		...regular,
		...md,
	},
	didNotReceiveOtp: {
		color: colors.neutral.grey_06,
		...semiBold,
		...sm,
	},
	editIconContainer: {
		marginTop: verticalScale(5),
	},
	errorView: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
		marginTop: verticalScale(10),
	},
	invalidOtp: {
		color: colors.icon.default_red,
		...semiBold,
		...sm,
	},
	loginBtnDisabled: {
		backgroundColor: colors.cta.fill.disable,
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(48),
		marginTop: horizontalScale(50),
	},
	loginBtnEnabled: {
		backgroundColor: colors.neutral.black,
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(48),
		marginTop: horizontalScale(50),
	},
	modalContent: {
		padding: horizontalScale(10),
	},
	modalHeaderIndicator: {
		alignSelf: "center",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(8),
		height: verticalScale(3),
		marginVertical: verticalScale(4),
		width: horizontalScale(80),
	},
	otpCell: {
		borderBottomWidth: 2,
		borderColor: colors.neutral.grey_03,
		width: horizontalScale(55),
	},
	otpContainer: {
		alignSelf: "center",
		marginTop: verticalScale(10),
	},
	otpTxtStyle: {
		color: colors.neutral.black,
		...xlg,
	},
	phoneContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
	},
	phoneNumber: {
		color: colors.neutral.black,
		marginTop: verticalScale(5),
		...semiBold,
		...md,
	},
	resendOtp: {
		color: colors.icon.default_red,
		...semiBold,
		...sm,
	},
	title: {
		color: colors.neutral.black,
		...semiBold,
		...xlg,
	},
	txtContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "center",
		marginBottom: horizontalScale(30),
		marginTop: verticalScale(12),
	},
});
