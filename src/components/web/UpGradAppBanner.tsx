import React from "react";
import { Image, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { handleDownloadLegacyApp } from "@utils/app.utils";
import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, medium } = commonStyles.text;
const { neutral } = colors;

const upGradAppBanner = () => (
	<View style={styles.container}>
		<Image
			source={{ uri: IMAGE_URLS.UG_APP_BANNER }}
			style={styles.bannerImage}
			resizeMode="contain"
		/>

		<RNText
			title={strings.DOWNLOAD_APP_DESCRIPTION}
			style={styles.titleText}
		/>

		<CommonButton
			title={strings.DOWNLOAD_APP}
			onPress={handleDownloadLegacyApp}
			variant={IButtonVariant.Tertiary}
			style={styles.buttonStyle}
		/>
	</View>
);

export default React.memo(upGradAppBanner);

const styles = StyleSheet.create({
	bannerImage: {
		height: verticalScale(120),
		marginBottom: verticalScale(16),
		width: horizontalScale(200),
	},
	buttonStyle: {
		alignSelf: "center",
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		marginTop: verticalScale(16),
		width: horizontalScale(214),
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		maxWidth: horizontalScale(320),
	},
	titleText: {
		...md,
		...medium,
		color: neutral.black,
		textAlign: "center",
	},
});
