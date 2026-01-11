import React, { useState } from "react";
import {
	useController,
	UseControllerProps,
	useFormContext,
} from "react-hook-form";
import {
	Pressable,
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
	StyleSheet,
	View,
} from "react-native";

import { useNumberInputWithVerifyController } from "@components/Inputs/numberInputVerify/useNumberInputWithVerifyController";
import OtpInputModal from "@components/Inputs/otpInput/OtpInputModal";
import withFormContext from "@components/Inputs/withFormContext";
import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	AlertIcon,
	ArrowDownIcon,
	CheckMarkGreenCircleIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, md, regular, semiBold } = commonStyles.text;
const { state, neutral, primary } = colors;

interface ITextInputProps extends RNTextInputProps, UseControllerProps {
	label: string;
	isVerified?: boolean;
	defaultValue?: string;
	isMandatory?: boolean;
	description?: string;
	onVerifySuccess?: () => void;
	disabled?: boolean;
	hideVerify?: boolean;
}

const NumberInputWithVerify = (props: ITextInputProps) => {
	const {
		name,
		label,
		rules,
		isVerified,
		defaultValue,
		isMandatory,
		description,
		onVerifySuccess,
		disabled,
		hideVerify,
		...inputProps
	} = props;

	const [hasVerifyRule, setHasVerifyRule] = useState(true);

	const newRules = {
		...rules,
		validate: hasVerifyRule
			? () => isVerified || "Mobile number verification required"
			: undefined,
	};

	const {
		field,
		fieldState: { error },
	} = useController({ name, rules: newRules, defaultValue });

	const { trigger } = useFormContext();

	const { closeOtpModel, getOtp, isOtpPopupVisible, isGetOtpLoading } =
		useNumberInputWithVerifyController({ onVerifySuccess });

	const ARROW_DIMENSION = {
		height: verticalScale(15),
		width: horizontalScale(15),
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.txtContainer}>
					<RNText style={styles.label} title={label} />
					{isMandatory ? (
						<RNText style={styles.starTxt} title="*" />
					) : null}
				</View>

				<View
					style={[
						styles.inputTxtContainer,
						error ? styles.errorInput : null,
					]}
				>
					<View style={styles.flagView}>
						<RNText style={styles.flagTxt} title={"+91"} />
						<ArrowDownIcon
							{...ARROW_DIMENSION}
							color={neutral.grey_07}
						/>
					</View>
					<RNTextInput
						style={styles.input}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						value={field.value}
						placeholderTextColor={neutral.grey_05}
						keyboardType="number-pad"
						maxLength={10}
						editable={!disabled}
						{...inputProps}
					/>
					{!hideVerify ? (
						<View style={styles.verifyView}>
							{isVerified ? (
								<CheckMarkGreenCircleIcon />
							) : isGetOtpLoading ? (
								<Loading />
							) : (
								<Pressable
									onPress={async () => {
										await setHasVerifyRule(false);
										const isValid = await trigger(name);
										if (isValid) getOtp(field.value);
										setHasVerifyRule(true);
									}}
								>
									<RNText
										style={styles.verifyTxt}
										title={strings.VERIFY}
									/>
								</Pressable>
							)}
						</View>
					) : null}
				</View>

				{error?.message ? (
					<View style={styles.errorContainer}>
						<AlertIcon />
						<RNText
							style={styles.errorLabel}
							title={error.message}
						/>
					</View>
				) : null}

				{description ? (
					<RNText style={styles.discTxt} title={description} />
				) : null}
			</View>
			<OtpInputModal
				mobileNumber={field.value}
				isVisible={isOtpPopupVisible}
				handleModal={closeOtpModel}
			/>
		</>
	);
};

export default withFormContext(NumberInputWithVerify);

const styles = StyleSheet.create({
	container: {
		// marginBottom: verticalScale(20),
	},
	discTxt: {
		color: neutral.grey_07,
		lineHeight: horizontalScale(19),
		marginTop: horizontalScale(5),
		...sm,
		...regular,
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: verticalScale(5),
		marginTop: verticalScale(5),
	},
	errorInput: {
		borderColor: state.error_red,
	},
	errorLabel: {
		color: state.error_red,
		...regular,
		...sm,
	},
	flagTxt: {
		color: neutral.black,
		padding: horizontalScale(10),
		...md,
		...regular,
	},
	flagView: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderBottomLeftRadius: horizontalScale(6),
		borderColor: neutral.grey_05,
		borderTopLeftRadius: horizontalScale(6),
		flexDirection: "row",
		gap: horizontalScale(5),
		height: verticalScale(45),
		paddingRight: horizontalScale(10),
		textAlign: "center",
	},
	input: {
		color: neutral.grey_07,
		height: horizontalScale(48),
		paddingLeft: horizontalScale(16),
		paddingRight: horizontalScale(20),
		paddingVertical: horizontalScale(10),
		...md,
		...regular,
		flex: 9,
	},
	inputTxtContainer: {
		alignItems: "center",
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		color: neutral.grey_07,
		flexDirection: "row",
		height: horizontalScale(48),
	},
	label: {
		color: neutral.black,
		...md,
		...semiBold,
		// marginBottom: verticalScale(15),
		marginBottom: verticalScale(6),
	},
	modalContent: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(8),
		elevation: 5,
		height: verticalScale(250),
		padding: horizontalScale(20),
		shadowColor: neutral.black,
		shadowOffset: { width: horizontalScale(0), height: verticalScale(2) },
		shadowOpacity: 0.25,
		shadowRadius: horizontalScale(4),
		width: "20%",
	},
	modalTitle: {
		fontWeight: "bold",
		marginBottom: verticalScale(15),
		textAlign: "center",
		...md,
		...regular,
	},
	overlay: {
		alignItems: "flex-start",
		flex: 1,
		justifyContent: "center",
		left: horizontalScale(20),
	},
	starTxt: {
		...md,
		...semiBold,
		color: state.error_red,
	},
	txtContainer: {
		flexDirection: "row",
		gap: verticalScale(5),
	},
	verifyTxt: {
		color: primary.red_05,
		...semiBold,
		...md,
	},
	verifyView: {
		right: horizontalScale(15),
	},
});
