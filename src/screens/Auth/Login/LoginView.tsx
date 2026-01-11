/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the Web Auth flow instead of this screen.
 */
import {
	useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import {
	TRUECALLER_ANDROID_CUSTOMIZATIONS,
	useTruecaller,
} from "@upgrad/react-native-truecaller";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Keyboard,
	Modal,
	Platform,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import GradientText from "@components/Reusable/GradientText/GradientText";
import RNText from "@components/Reusable/RNText";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";
import CustomInput from "@components/Reusable/TextInput/CustomInput";

import useKeyboard from "@hooks/useKeyboard";

import { DEFAULT_COUNTRY_CODE } from "@utils/constants";
import {
	isValidEmail,
	isValidMobNumber,
	privacyPolicyUrl,
	termsAndConditionsUrl,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { RootState } from "@redux/store/root.reducer";

import { AuthRouteProps } from "@interface/types/rootAuthStack.type";
import {
	RootHomeStackList,
	RootStackParamList,
} from "@interface/types/rootHomeStack.type";

import StorageKeys from "@constants/storage.constants";

import { C } from "@assets/constants";
import {
	ArrowDownIcon,
	DismissIcon,
	IndianFlag,
	LoginImg,
	UpGradTextLogo,
} from "@assets/icons";

import { useLoginController } from "./LoginController";
import { loginStyles as styles } from "./LoginStyles";

const {
	strings,
	themes: { bg, text },
	colors: { primary, neutral },
} = C;

type FormInputs = {
	credential: string;
};

const ICON_TOP_DIMENSION = {
	height: verticalScale(170),
	width: measures.SCREEN_WIDTH,
};

const UPGRAD_ICON_LOGO = {
	height: verticalScale(30),
	width: measures.SCREEN_WIDTH,
};

export const LoginView = () => {
	const dispatch = useDispatch();
	const { bottom } = useSafeAreaInsets();
	const { navigate } = useNavigation<RootHomeStackList>();
	const navigation = useNavigation<RootStackParamList>();

	const { loading, authError, isAuthFail } = useSelector(
		(state: RootState) => state.auth,
	);

	const { isKeyboardVisible, keyboardHeight } = useKeyboard();

	const isFocused = useIsFocused();

	const {
		control,
		getValues,
		clearErrors,
		setError,
		reset,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormInputs>({
		mode: "all",
	});
	const inputRef = useRef<TextInput>(null);
	const { initializeTruecaller, openTruecallerModal, user } = useTruecaller({
		iosAppKey: ENV.iosAppKey,
		iosAppLink: ENV.iosAppLink,
		androidButtonColor: primary.red_05,
		androidButtonStyle:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_STYLES.RECTANGLE,
		androidButtonText:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_TEXTS.CONTINUE,
		androidButtonTextColor: neutral.white,
		androidClientId: ENV.TRUECALLER_CLIENT_ID,
		androidConsentHeading:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.CONSENT_HEADING_TEXTS.LOG_IN_TO,
		androidFooterButtonText:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.FOOTER_BUTTON_TEXTS.MANUALLY,
	});

	const {
		extraValidation,
		isModelPopup,
		setModelPopup,
		handleFocus,
		onCountryClick,
		// onLoginView,
		componentType,
		setComponentType,
		// onTrackBackBtn,
	} = useLoginController();
	const route = useRoute<AuthRouteProps<"LoginView">>();

	useEffect(() => {
		if (route.params?.credential) {
			setValue("credential", route.params?.credential, {
				shouldValidate: true,
			});
		}
	}, []);
	useEffect(() => {
		clearErrors();
		if (isModelPopup) {
			setModelPopup(false);
		}
	}, [componentType]);

	useEffect(() => {
		if (authError && isAuthFail) {
			setError("credential", { type: "manual", message: authError });
		} else {
			clearErrors();
		}
	}, [authError, isAuthFail]);

	useEffect(() => {
		if (user?.mobileNumber) {
			const fullNumber = user?.mobileNumber;
			const userMobileNumber = fullNumber.slice(-10);
			setValue("credential", userMobileNumber, {
				shouldValidate: true,
			});
		}
	}, [user]);
	useEffect(() => {
		// onLoginView();
		initializeTruecaller();

		const timer = setTimeout(() => {
			if (route.params?.loginType == undefined) {
				openTruecallerModal();
			}
		}, 700);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		if (isFocused) dispatch(authSlice.actions.clearAuthState());
	}, [isFocused]);

	const onLoginHandler = async () => {
		Keyboard.dismiss();
		const checkValidEmail = isValidEmail(getValues()?.credential);
		const isValidPhoneNumber = isValidMobNumber(getValues()?.credential);
		if (componentType == 1 && !isValidPhoneNumber) {
			setError("credential", {
				type: "manual",
				message: strings.NOT_VALID_MOB,
			});
			return;
		}
		if (componentType == 2 && !checkValidEmail) {
			setError("credential", {
				type: "manual",
				message: strings.NOT_VALID_EMAIL,
			});
			return;
		}
		if (loading || !isValid) return false;
		dispatch(
			authSlice.actions.login({
				username: getValues()?.credential,
				loginType: componentType === 1 ? "number" : "email",
				type: "login",
			}),
		);
	};

	const onSkipLogin = () => {
		storage.set(StorageKeys.IS_GUEST, "true");
		navigation.replace("HomeStack");
	};

	// setBackButtonPressCallback(() => onTrackBackBtn());
	const renderLeft = () => (
		<TouchableOpacity onPress={onCountryClick}>
			<View style={styles.leftContainer}>
				<IndianFlag />
				<RNText style={styles.flagTxt} title={DEFAULT_COUNTRY_CODE} />
				<ArrowDownIcon color={neutral.grey_07} />
			</View>
		</TouchableOpacity>
	);

	return (
		<ScreenWrapper style={styles.topContainer}>
			<TouchableOpacity onPress={onSkipLogin}>
				<RNText style={styles.skipBtnText} title={strings.SKIP} />
			</TouchableOpacity>

			<KeyboardAwareScrollView
				enableOnAndroid
				enableAutomaticScroll
				contentContainerStyle={[
					styles.contentContainerStyle,
					{
						paddingBottom: Platform.select({
							ios: keyboardHeight,
							android: 0,
						}),
					},
				]}
				automaticallyAdjustContentInsets={false}
				keyboardShouldPersistTaps="handled"
				scrollEnabled={false}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					accessible={false}
				>
					<View style={styles.childView}>
						{!isKeyboardVisible && (
							<>
								<View style={styles.upGradIconLogo}>
									<UpGradTextLogo {...UPGRAD_ICON_LOGO} />
								</View>
								<View style={styles.topImg}>
									<LoginImg {...ICON_TOP_DIMENSION} />
								</View>
								<>
									<GradientText
										text={strings.LOGIN_TEXT_HEADING}
										colors={[
											primary.red_05,
											text.carrotPink,
											text.purplePink,
										]}
									/>
								</>
								<View style={styles.subHeadingView}>
									<RNText
										title={strings.LOGIN_TEXT_SUBHEADING}
										style={[
											styles.subHeading,
											{
												marginBottom: isKeyboardVisible
													? verticalScale(10)
													: verticalScale(30),
											},
										]}
									/>
								</View>
							</>
						)}

						<View
							style={[
								styles.inputView,
								isKeyboardVisible &&
									styles.inputViewAvoidKeyboard,
							]}
						>
							<Controller
								control={control}
								name="credential"
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<CustomInput
										ref={inputRef}
										autoFocus={false}
										isMob={componentType == 1}
										leftIcon={
											componentType == 1 && renderLeft()
										}
										onFocus={handleFocus}
										value={value}
										borderColor={bg.disabled}
										placeholder={
											componentType === 1
												? strings.PHONE_NUMBER
												: strings.EMAIL
										}
										errorMsg={errors.credential?.message}
										returnKeyType={"done"}
										placeholderTextColor={bg.disabled}
										viewStyle={{
											padding:
												componentType == 1
													? 0
													: verticalScale(14),
										}}
										keyboard={
											componentType == 1
												? "phone-pad"
												: "email-address"
										}
										onChangeText={onChange}
										isError={
											errors?.credential?.message
												? true
												: false
										}
									/>
								)}
								// `${strings.PLEASE_ENTER_THE} ${componentType == 1
								// 	? strings.MOBILE_NUMBER
								// 	: strings.EMAIL
								// 	}`
								rules={{
									required: {
										value: true,
										message: "",
									},
									...extraValidation(),
								}}
							/>
							<CommonButton
								title={strings.CONTINUE}
								onPress={onLoginHandler}
								variant={IButtonVariant.Primary}
								isDisabled={!isValid}
								style={styles.rnBtn}
								isLoading={loading}
							/>
						</View>

						<View style={styles.componentSwitchView}>
							<RNText style={styles.signInOptionHeading}>
								{strings.SIGN_IN_EMAIL}{" "}
								<RNText
									style={styles.signInOptionSubHeading}
									onPress={() => {
										Keyboard.dismiss();
										reset({});
										setComponentType(
											componentType == 1 ? 2 : 1,
										);
									}}
								>
									{componentType == 1
										? strings.EMAIL_TXT
										: strings.PHONE_NUMBER}
								</RNText>
							</RNText>
						</View>
						{/* Footer section */}
						<View
							style={[
								styles.tC_PPView,
								{
									marginBottom: Platform.select({
										ios: bottom,
										android: bottom + 10,
									}),
								},
							]}
						>
							<RNText
								title={strings.BY_SIGNING_UP}
								style={styles.signInPrivacy}
							>
								<RNText
									onPress={() => {
										navigate("WebViewModal", {
											name: strings.TERMS_AND_CONDITION,
											url: termsAndConditionsUrl,
										});
									}}
									title={strings.TERMS_AND_CONDITION}
									style={styles.termsAndCondition}
								/>
								<RNText
									title={strings.AND}
									style={styles.signInPrivacy}
								/>
								<RNText
									onPress={() => {
										navigate("WebViewModal", {
											name: strings.PRIVACY_POLICY,
											url: privacyPolicyUrl,
										});
									}}
									title={strings.PRIVACY_POLICY}
									style={styles.termsAndCondition}
								/>
							</RNText>
						</View>
					</View>
				</TouchableWithoutFeedback>

				{isModelPopup && (
					<Modal
						visible={isModelPopup}
						animationType="none"
						transparent={true}
						onRequestClose={() => setModelPopup(false)}
					>
						<TouchableWithoutFeedback
							onPress={() => setModelPopup(false)}
						>
							<View style={styles.modalOverlay}>
								<TouchableWithoutFeedback onPress={() => {}}>
									<View style={styles.modalContainer}>
										<TouchableOpacity
											style={styles.closeIcon}
											onPress={() => setModelPopup(false)}
										>
											<DismissIcon
												color={text.lightGrey}
											/>
										</TouchableOpacity>

										<View style={styles.centerItems}>
											<RNText
												title={strings.NOT_FROM_INDIA}
												style={styles.modalHeading1}
											/>
										</View>
										<View>
											<RNText
												title={
													strings.USERS_FROM_OUTSIDE
												}
												style={styles.modalHeading2}
											/>
										</View>
										<TouchableOpacity
											onPress={() => {
												setComponentType(2);
												reset({});
											}}
											style={styles.centerItems}
										>
											<RNText
												title={
													strings.SIGNIN_WITH_EMAIL
												}
												style={styles.modalHeading3}
											/>
										</TouchableOpacity>
									</View>
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				)}
			</KeyboardAwareScrollView>
		</ScreenWrapper>
	);
};

export default LoginView;
