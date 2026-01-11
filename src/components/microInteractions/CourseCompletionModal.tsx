import LottieView from "lottie-react-native";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionImageModal from "@components/microInteractions/common/MicroInteractionImageModal";
import RNText from "@components/Reusable/RNText";
import ShareButton from "@components/Reusable/ShareButton";
import { IShareType } from "@components/Reusable/ShareButton/shareButton.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import courseCompletionAnimation from "@assets/animations/microInteractions/course-completion.json";
import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { md, regular, semiBold } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	DESCRIPTION: "common.microInteractions.courseCompletion.description",
	DESCRIPTION2: "common.microInteractions.courseCompletion.description2",
	LINKEDIN_SHARE_TEXT:
		"common.microInteractions.courseCompletion.linkedInShareText",
	X_SHARE_TEXT: "common.microInteractions.courseCompletion.xShareText",
});

interface ICourseCompletionModal {
	isVisible: boolean;
	onClose: () => void;
	certificateUrl: string;
	courseName: string;
}

const CourseCompletionModal = ({
	isVisible,
	onClose,
	courseName,
	certificateUrl,
}: ICourseCompletionModal) => {
	const linkedInReferText = useMemo(
		() =>
			getString(STRINGS.LINKEDIN_SHARE_TEXT, {
				courseName,
				certificateUrl,
			}),
		[courseName, certificateUrl],
	);
	const xShareText = useMemo(
		() => getString(STRINGS.X_SHARE_TEXT, { courseName, certificateUrl }),
		[courseName, certificateUrl],
	);

	return (
		<MicroInteractionImageModal
			isVisible={isVisible}
			onClose={onClose}
			imageUrl={IMAGE_URLS.COURSE_COMPLETION_BG}
			navigationBarBackgroundColor="#EBD38E" //TODO
		>
			<View style={styles.container}>
				<View style={styles.handleBar} />
				<View style={styles.contentWrapper}>
					<View style={styles.centerContent}>
						<Image
							source={{ uri: IMAGE_URLS.COURSE_COMPLETION_TEXT }}
							style={styles.headerImage}
							resizeMode="contain"
						/>
						<RNText style={styles.descriptionText}>
							{getString(STRINGS.DESCRIPTION)}
							<RNText style={styles.courseName}>
								{` "${courseName}"`}
							</RNText>
						</RNText>

						<RNText style={styles.descriptionText}>
							{getString(STRINGS.DESCRIPTION2)}
						</RNText>

						<View style={styles.shareButtonsContainer}>
							<ShareButton
								shareType={IShareType.LINKEDIN}
								shareText={linkedInReferText}
								style={styles.shareButton}
								certificateUrl={certificateUrl}
							/>
							<ShareButton
								shareType={IShareType.X}
								shareText={xShareText}
								style={styles.shareButton}
								certificateUrl={certificateUrl}
							/>
						</View>
					</View>

					<LottieView
						source={courseCompletionAnimation}
						autoPlay
						loop
						style={styles.lottieAnimation}
					/>
				</View>
			</View>
		</MicroInteractionImageModal>
	);
};

const styles = StyleSheet.create({
	button: {
		height: undefined,
		marginTop: verticalScale(24),
		paddingHorizontal: horizontalScale(30),
		paddingVertical: verticalScale(10),
	},
	centerContent: {
		alignItems: "center",
	},
	container: {
		alignItems: "center",
		flex: 1,
	},
	contentWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "space-between",
		marginTop: horizontalScale(30),
	},
	courseName: {
		...semiBold,
	},
	descriptionText: {
		color: neutral.black,
		letterSpacing: verticalScale(0.1),
		lineHeight: verticalScale(20),
		marginHorizontal: horizontalScale(24),
		marginTop: verticalScale(12),
		textAlign: "center",
		...regular,
		...md,
	},
	handleBar: {
		backgroundColor: `${neutral.black}22`,
		borderRadius: 100,
		height: verticalScale(4),
		marginTop: verticalScale(8),
		width: horizontalScale(64),
	},
	headerImage: {
		height: verticalScale(18),
		width: horizontalScale(300),
	},
	lottieAnimation: {
		bottom: verticalScale(25),
		height: verticalScale(175),
		left: -horizontalScale(75),
		width: horizontalScale(175),
		zIndex: 1,
	},
	shareButton: {
		width: horizontalScale(150),
	},
	shareButtonsContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		marginTop: verticalScale(12),
	},
});

export default CourseCompletionModal;
