import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { handleDownloadLegacyApp } from "@utils/app.utils";
import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;

const { medium, md } = commonStyles.text;

const HomeUGAppDownload = () => (
	<View style={styles.container}>
		<RNText
			title={strings.DOWNLOAD_APP_DESCRIPTION}
			style={styles.titleText}
		/>
		<View style={styles.buttonContainer}>
			<CommonButton
				title={strings.DOWNLOAD_APP}
				onPress={handleDownloadLegacyApp}
				variant={IButtonVariant.Tertiary}
				style={styles.button}
			/>

			<View style={styles.imageContainer}>
				<Image
					source={{ uri: IMAGE_URLS.UG_APP_BANNER }}
					style={styles.bannerImage}
					resizeMode="contain"
				/>
			</View>
		</View>
	</View>
);

export default HomeUGAppDownload;

const styles = StyleSheet.create({
	bannerImage: {
		alignSelf: "center",
		height: verticalScale(70),
		width: horizontalScale(110),
	},
	button: {
		height: verticalScale(40),
		width: horizontalScale(140),
	},
	buttonContainer: {
		alignItems: "flex-end",
		flexDirection: "row",
		gap: horizontalScale(28),
	},
	container: {
		backgroundColor: highlight.bg_brown,
		borderRadius: horizontalScale(10),
		gap: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(24),
	},
	imageContainer: {
		alignItems: "center",
		flex: 1,
	},
	titleText: {
		color: neutral.black,
		...md,
		...medium,
	},
});
