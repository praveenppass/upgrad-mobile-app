import LottieView from "lottie-react-native";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import MicroInteractionImageModal from "@components/microInteractions/common/MicroInteractionImageModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootState } from "@redux/store/root.reducer";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import LearnerRejoinsMascot from "@assets/animations/microInteractions/course-completion.json";
import OnboardingMascot from "@assets/animations/microInteractions/onboarding.json";
import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { xlg, extraBold, md, regular, xxSm } = commonStyles.text;

export enum IOnboardingMicroInteractionModalType {
	Onboarding,
	Rejoin,
}

interface IOnboardingModal {
	closeModal: () => void;
	isOpen: boolean;
	modalType: IOnboardingMicroInteractionModalType;
}

const COMMON_STRINGS = createStringConstants({
	Greeting: "studyPlan.onboardingModal.greeting",
	START_BUTTON: "studyPlan.onboardingModal.startButton",
});

const ONBOARDING_STRINGS = createStringConstants({
	BUBBLE_TEXT: "studyPlan.onboardingModal.onboarding.bubbleText",
	BODY_TEXT: "studyPlan.onboardingModal.onboarding.bodyText",
	DESCRIPTION_TEXT: "studyPlan.onboardingModal.onboarding.descriptionText",
});

const REJOIN_STRINGS = createStringConstants({
	BUBBLE_TEXT: "studyPlan.onboardingModal.rejoin.bubbleText",
	BODY_TEXT: "studyPlan.onboardingModal.rejoin.bodyText",
	DESCRIPTION_TEXT: "studyPlan.onboardingModal.rejoin.descriptionText",
});

const OnboardingModal = ({
	closeModal,
	isOpen,
	modalType,
}: IOnboardingModal) => {
	const isOnboarding = useMemo(
		() => modalType === IOnboardingMicroInteractionModalType.Onboarding,
		[modalType],
	);

	const animation = useMemo(
		() => (isOnboarding ? OnboardingMascot : LearnerRejoinsMascot),
		[isOnboarding],
	);

	const STRINGS = useMemo(
		() => (isOnboarding ? ONBOARDING_STRINGS : REJOIN_STRINGS),
		[isOnboarding],
	);

	const userName = useSelector(
		(state: RootState) => state.personalDetails.basicDetails.firstName,
	);

	return (
		<MicroInteractionImageModal
			isVisible={isOpen}
			onClose={closeModal}
			imageUrl={IMAGE_URLS.ONBOARDING_MODAL_BG}
			navigationBarBackgroundColor={colors.gamification.yellow.yellow_01}
		>
			<View style={styles.container}>
				<View style={styles.handle} />
				<LottieView
					source={animation}
					autoPlay
					loop
					style={styles.lottieView}
				/>
				<View style={styles.bubbleTextContainer}>
					<RNText
						title={getString(STRINGS.BUBBLE_TEXT)}
						style={[
							styles.bubbleText,
							!isOnboarding && styles.bubbleTextRejoin,
						]}
					/>
				</View>
				<RNText
					title={`${getString(COMMON_STRINGS.Greeting)} ${userName},`}
					style={styles.userNameText}
				/>
				<RNText
					title={getString(STRINGS.BODY_TEXT)}
					style={styles.bodyText}
				/>
				<RNText
					title={getString(STRINGS.DESCRIPTION_TEXT)}
					style={styles.descriptionText}
				/>
				<CommonButton
					title={getString(COMMON_STRINGS.START_BUTTON)}
					variant={IButtonVariant.Primary}
					onPress={closeModal}
					style={styles.button}
				/>
			</View>
		</MicroInteractionImageModal>
	);
};

export default OnboardingModal;

const styles = StyleSheet.create({
	bodyText: {
		...xlg,
		...extraBold,
		color: colors.neutral.black,
		textAlign: "center",
	},
	bubbleText: {
		...xxSm,
		...regular,
		color: colors.neutral.white,
	},
	bubbleTextContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(30),
		height: horizontalScale(60),
		justifyContent: "center",
		position: "absolute",
		right: horizontalScale(65),
		top: verticalScale(10),
		transform: [{ rotate: "-12deg" }],
		width: horizontalScale(60),
		zIndex: 2,
	},

	bubbleTextRejoin: {
		left: horizontalScale(5),
		textAlign: "left",
	},
	button: {
		height: verticalScale(40),
		width: horizontalScale(172),
	},
	container: {
		alignItems: "center",
		gap: verticalScale(10),
		height: verticalScale(400),
		paddingHorizontal: horizontalScale(36),
	},
	descriptionText: {
		...md,
		...regular,
		color: colors.neutral.black,
		lineHeight: horizontalScale(21),
		textAlign: "center",
	},
	handle: {
		alignSelf: "center",
		backgroundColor: colors.neutral.black,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		opacity: 0.2,
		top: verticalScale(8),
		width: horizontalScale(64),
	},
	lottieView: {
		height: verticalScale(200),
		position: "absolute",
		top: verticalScale(-16),
		width: horizontalScale(140),
		zIndex: 1,
	},
	userNameText: {
		...md,
		...regular,
		color: colors.neutral.black,
		marginTop: verticalScale(180),
	},
});
