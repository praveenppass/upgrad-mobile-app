import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { primary, neutral } = colors;
const { sm, bold } = commonStyles.text;

const TermsAndPrivacyComponent = () => {
	const navigation = useNavigation<RootHomeStackList>();

	const handlePrivacyPolicy = useCallback(() => {
		navigation.dispatch(
			StackActions.push("WebPageViewScreen", {
				path: "/privacy",
				name: strings.PRIVACY_POLICY,
				key: "WebPageViewScreen-privacy",
			}),
		);
	}, [navigation]);

	const handleTermsAndConditions = useCallback(() => {
		navigation.dispatch(
			StackActions.push("WebPageViewScreen", {
				path: "/terms",
				name: strings.TERMS_AND_CONDITION,
				key: "WebPageViewScreen-terms",
			}),
		);
	}, [navigation]);

	return (
		<RNText
			title={strings.BY_SIGNING_UP}
			style={styles.signInAndPrivacyPolicyStyle}
		>
			<RNText
				onPress={handleTermsAndConditions}
				title={strings.TERMS_AND_CONDITION}
				style={styles.termsAndConditionText}
			/>
			<RNText
				title={strings.AND}
				style={styles.signInAndPrivacyPolicyStyle}
			/>
			<RNText
				onPress={handlePrivacyPolicy}
				title={strings.PRIVACY_POLICY}
				style={styles.termsAndConditionText}
			/>
		</RNText>
	);
};

const styles = StyleSheet.create({
	signInAndPrivacyPolicyStyle: {
		color: neutral.grey_07,
		fontFamily: fontFamily.Regular,
		textAlign: "center",
		...sm,
		lineHeight: verticalScale(21),
	},
	termsAndConditionText: {
		...bold,
		...sm,
		color: primary.red_05,
	},
});

export default TermsAndPrivacyComponent;
