import LottieView from "lottie-react-native";
import React, { memo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";
import ShareButton from "@components/Reusable/ShareButton";
import { IShareType } from "@components/Reusable/ShareButton/shareButton.interface";
import { ICertificatesComponent } from "@components/studyPlan/common/Certificates/certificates.interface";
import useCertificatesController from "@components/studyPlan/common/Certificates/useCertificatesController";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import certificateLoader from "@assets/animations/certificates-loader.json";
import DownloadCertificate from "@assets/animations/microInteractions/download-certificate.json";
import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm } = commonStyles.text;

const STRINGS = createStringConstants({
	downloadCertificate: "studyPlan.certificates.downloadCertificate",
	showEveryone: "studyPlan.certificates.showEveryone",
});

const Certificates = ({
	learningPathId,
	learningPathType,
}: ICertificatesComponent) => {
	const {
		certificate,
		loading,
		certificateDimensions,
		handleCertificateDownload,
	} = useCertificatesController({
		learningPathId,
		learningPathType,
	});

	const { certificateUrl, linkedInShareText, xShareText } = certificate || {};

	if (loading || !certificateDimensions)
		return (
			<View style={styles.loaderContainer}>
				<LottieView
					source={certificateLoader}
					autoPlay
					loop
					style={styles.loaderAnimation}
				/>
			</View>
		);

	const { width, height } = certificateDimensions;

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.contentContainer}
		>
			<SafeImage
				source={{ uri: certificateUrl }}
				imageStyle={{ width, height }}
			/>

			<View style={styles.card}>
				<RNText style={styles.messageText}>
					{getString(STRINGS.showEveryone)}
				</RNText>

				<View style={styles.shareButtonsContainer}>
					<ShareButton
						shareType={IShareType.LINKEDIN}
						certificateUrl={certificateUrl || ""}
						shareText={linkedInShareText || ""}
					/>
					<ShareButton
						shareType={IShareType.X}
						certificateUrl={certificateUrl || ""}
						shareText={xShareText || ""}
					/>
				</View>

				<LottieView
					source={DownloadCertificate}
					autoPlay
					loop
					style={styles.lottieAnimation}
				/>

				<CommonButton
					title={getString(STRINGS.downloadCertificate)}
					onPress={handleCertificateDownload}
					variant={IButtonVariant.Secondary}
					style={styles.downloadButton}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	card: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(16),
		gap: verticalScale(10),
		paddingHorizontal: horizontalScale(24),
		paddingVertical: verticalScale(28),
	},
	contentContainer: {
		gap: verticalScale(30),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(30),
	},
	downloadButton: {
		width: "100%",
	},
	loaderAnimation: {
		height: verticalScale(150),
		width: horizontalScale(150),
	},
	loaderContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	lottieAnimation: {
		height: verticalScale(150),
		width: horizontalScale(150),
	},
	messageText: {
		...sm,
		color: neutral.black,
		textAlign: "center",
	},
	scrollView: {
		backgroundColor: neutral.grey_03,
	},
	shareButtonsContainer: {
		flexDirection: "row",
		gap: verticalScale(16),
	},
});

export default memo(Certificates);
