/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the Web Auth flow instead of this screen.
 */
import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Keyboard,
	Platform,
	TouchableOpacity,
	View,
} from "react-native";
import { useOtpVerify } from "react-native-otp-verify";
import { useDispatch, useSelector } from "react-redux";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import AuthInputError from "@components/Reusable/AuthInputError";
import RNText from "@components/Reusable/RNText";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";

import withAuthWrapper from "@hoc/withAuthWrapper";

import { horizontalScale, verticalScale } from "@utils/functions";

import { authSlice } from "@redux/slices/auth.slice";
import { RootState } from "@redux/store/root.reducer";

import { PlatformType } from "@interface/app.interface";
import { type AuthRouteProps } from "@interface/types/rootAuthStack.type";

import { C } from "@assets/constants";
import { ArrowLeft, EditIcon } from "@assets/icons";
import { UpGradTextLogo } from "@assets/icons";
import { strings } from "@assets/strings";

import SmoothOtpInput from "../../../components/Reusable/TextInput/SmoothOtpInput";
import useOtpController from "./OtpController";
import otpStyles from "./OtpStyles";

const {
	themes: { text, border },
	commonStyles: {
		spacing: { mt20 },
		align: { flex1, alignCenter },
	},
	colors: { neutral, primary },
} = C;

const UPGRAD_ICON_LOGO = {
	height: verticalScale(40),
	width: horizontalScale(110),
};

const ICON_TOP_DIMENSION = {
	height: horizontalScale(13),
	width: horizontalScale(13),
};

type FormInputs = {
	pinCode: string;
};

const BodyComponent = () => {
	let intervalId: any;
	const dispatch = useDispatch();
	const route = useRoute<AuthRouteProps<"OtpView">>();
	const { credential, loginType, regId } = route.params;
	const { apiType, authError, loading } = useSelector(
		(state: RootState) => state.auth,
	);
	const {
		control,
		getValues,
		setError,
		setValue,
		clearErrors,
		formState: { errors, isValid },
	} = useForm<FormInputs>({ mode: "all" });
	const { otp, stopListener, startListener } = useOtpVerify({
		numberOfDigits: 4,
	});
	const { handleEditCredential, onGoBack, onResend, timer, setTimer } =
		useOtpController();

	useEffect(() => {
		if (apiType === "resend" && !loading) {
			clearInterval(intervalId);
			setTimer(30);
		}
	}, [apiType, loading]);

	useEffect(() => {
		if (otp) {
			setValue("pinCode", otp);
		}
	}, [otp]);

	useEffect(() => {
		if (Platform.OS === PlatformType.IOS) {
			return;
		}
		startListener();
		return () => stopListener();
	}, []);

	useEffect(() => {
		if (authError) {
			setValue("pinCode", "");
			setError("pinCode", { type: "manual", message: authError });
		}
	}, [authError]);

	const LoginOtp = async () => {
		Keyboard.dismiss();
		const enteredOtp = getValues().pinCode;
		dispatch(
			authSlice.actions.verify({
				otp: enteredOtp,
				username: credential as string,
				regId,
			}),
		);
	};
	return (
		<ScreenWrapper style={otpStyles.container}>
			<View style={otpStyles.header}>
				<TouchableOpacity onPress={onGoBack} style={flex1}>
					<ArrowLeft color={text.dark} />
				</TouchableOpacity>
				<View style={otpStyles.logoView}>
					<UpGradTextLogo {...UPGRAD_ICON_LOGO} />
				</View>
				<View style={flex1} />
			</View>
			<View style={otpStyles.main}>
				<View style={otpStyles.otpContainer}>
					<RNText
						title={strings.OTP_VERIFICATION}
						style={otpStyles.verificationTxt}
					/>
					<RNText
						style={otpStyles.otpSentTxt}
						title={`${strings.OTP_SENT_TEXT}${"\n"}`}
					>
						<RNText
							title={`${
								loginType == "number" ? "+91-" : ""
							} ${credential}`}
							style={otpStyles.credentialTxt}
						/>
						<TouchableOpacity onPress={handleEditCredential}>
							<EditIcon
								{...ICON_TOP_DIMENSION}
								color={primary.red_05}
								style={otpStyles.editIconStyle}
							/>
						</TouchableOpacity>
					</RNText>
					<View style={otpStyles.otpView}>
						<Controller
							control={control}
							name="pinCode"
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<SmoothOtpInput
									value={value}
									onChangeText={(e) => {
										clearErrors("pinCode");
										onChange(e);
									}}
									onFulfill={(val) => {
										LoginOtp();
									}}
									codeLength={4}
									cellSize={48}
									restrictToNumbers
									cellSpacing={horizontalScale(35)}
									cellStyle={{
										borderBottomWidth: 2,
										borderColor: errors?.pinCode?.message
											? primary.red_05
											: border.color3,
										width: horizontalScale(50),
									}}
									onFocus={() => {
										clearErrors("pinCode");
									}}
									textStyle={otpStyles.otpTxtStyle}
									containerStyle={mt20}
									cellStyleFocused={{
										borderColor: text.dark,
									}}
									cellStyleFilled={{
										borderColor: text.dark,
									}}
									password={false}
									keyboardType="number-pad"
								/>
							)}
							rules={{
								required: {
									value: true,
									message: "",
								},
								minLength: {
									value: 4,
									message: "",
								},
							}}
						/>
					</View>

					<View
						style={[
							alignCenter,
							{ borderWidth: 2, borderColor: neutral.white },
						]}
					>
						{errors.pinCode?.message && (
							<AuthInputError message={errors.pinCode.message} />
						)}
					</View>

					<CommonButton
						title={strings.CONTINUE}
						onPress={LoginOtp}
						variant={IButtonVariant.Primary}
						isDisabled={!isValid}
						style={otpStyles.rnBtn}
						isLoading={apiType === "verify" && loading}
					/>

					<View style={otpStyles.resentView}>
						<RNText
							title={strings.OTP_RESEND_DESC}
							style={otpStyles.otpResent}
						/>

						{timer === 0 ? (
							<>
								{apiType == "resend" && loading ? (
									<ActivityIndicator
										size={"small"}
										color={primary.red_05}
										animating
									/>
								) : (
									<TouchableOpacity onPress={onResend}>
										<RNText
											title={strings.RESEND_OTP}
											style={otpStyles.resent}
										/>
									</TouchableOpacity>
								)}
							</>
						) : (
							<RNText
								style={otpStyles.resendIn}
								title={`${strings.RESEND_IN} ${timer} sec`}
							/>
						)}
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const OtpView = () => withAuthWrapper({ BodyComponent });

export default OtpView;
