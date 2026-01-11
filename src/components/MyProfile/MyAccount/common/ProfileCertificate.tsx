import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { ICertificate } from "@interface/myAccount.interface";

import { colors } from "@assets/colors";
import { DownloadIconProfile } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const {
	text: { regular, sm, bold },
} = commonStyles;
export const ProfileCertificate = ({
	imageUrl,
	subTitle,
	title,
	downloadCertificate,
	downloadUrl,
	certificateDownloadingId,
}: ICertificate) => {
	const isCertificateDownloading = certificateDownloadingId === downloadUrl;

	return (
		<>
			<View style={styles.certificateContainer}>
				<View style={styles.certificateBottomSection}>
					<Image
						style={styles.certificateImage}
						source={{
							uri: imageUrl,
						}}
					/>
					<View style={styles.certificateBottomRightSection}>
						<RNText numberOfLines={1} style={styles.name}>
							{title}
						</RNText>
						<RNText numberOfLines={1} style={styles.email}>
							{subTitle}
						</RNText>
						<Pressable
							onPress={downloadCertificate}
							style={styles.downloadButton}
						>
							{isCertificateDownloading ? (
								<Loading imageStyle={styles.loadingStyle} />
							) : (
								<DownloadIconProfile />
							)}
						</Pressable>
					</View>
				</View>
			</View>
		</>
	);
};

export default ProfileCertificate;

const styles = StyleSheet.create({
	certificateBottomRightSection: {
		flex: 3,
		gap: horizontalScale(12),
	},
	certificateBottomSection: {
		flexDirection: "row",
		gap: horizontalScale(15),
		paddingVertical: verticalScale(12),
	},
	certificateContainer: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(10),
		flex: 1,
		paddingHorizontal: verticalScale(16),
	},
	certificateImage: {
		borderRadius: verticalScale(10),
		height: verticalScale(75),
		width: horizontalScale(110),
	},
	downloadButton: {
		maxWidth: "15%",
		padding: horizontalScale(5),
	},
	email: {
		...sm,
		...regular,
		color: neutral.grey_07,
	},
	loadingStyle: {
		height: verticalScale(12),
		width: horizontalScale(12),
	},
	name: {
		color: neutral.black,
		...bold,
	},
});
