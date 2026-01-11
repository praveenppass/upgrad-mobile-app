import React from "react";
import { TouchableOpacity, View } from "react-native";

import useWelcomeScreenController from "@screens/Auth/WelcomeScreen/useWelcomeScreenController";
import {
	ICON_TOP_DIMENSION,
	UPGRAD_ICON_LOGO,
} from "@screens/Auth/WelcomeScreen/welcomeScreen.constants";
import styles from "@screens/Auth/WelcomeScreen/welcomeScreen.styles";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import GradientText from "@components/Reusable/GradientText/GradientText";
import RNText from "@components/Reusable/RNText";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";
import TermsAndPrivacyComponent from "@components/Reusable/TermsAndPrivacyComponent";

import { colors } from "@assets/colors";
import { LoginScreenImg, UpGradLogo } from "@assets/icons";
import { strings } from "@assets/strings";
import { themes } from "@assets/themes";

const { text } = themes; //TODO
const { primary } = colors;

export const WelcomeScreen = () => {
	const { handleSkipLogin, handleLogin } = useWelcomeScreenController();

	return (
		<ScreenWrapper style={styles.topContainer}>
			<TouchableOpacity
				onPress={handleSkipLogin}
				style={styles.skipBtnContainer}
			>
				<RNText style={styles.skipBtnText} title={strings.SKIP} />
			</TouchableOpacity>

			<View style={styles.containerView}>
				<UpGradLogo
					color={primary.red_05}
					style={styles.upGradLogoStyle}
					{...UPGRAD_ICON_LOGO}
				/>

				<LoginScreenImg
					style={styles.imageStyle}
					{...ICON_TOP_DIMENSION}
				/>

				<GradientText
					text={strings.LOGIN_TEXT_HEADING}
					colors={[primary.red_05, text.carrotPink, text.purplePink]}
				/>
				<RNText
					title={strings.LOGIN_TEXT_SUBHEADING}
					style={styles.subHeading}
				/>

				<CommonButton
					title={strings.LOGIN_OR_SIGNUP_TEXT}
					onPress={handleLogin}
					variant={IButtonVariant.Primary}
					style={styles.logInButtonStyle}
				/>

				<View style={styles.footerTextView}>
					<TermsAndPrivacyComponent />
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default WelcomeScreen;
