import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import ActionModal, {
	IActionModalKeyboardBehavior,
} from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";
import SurveyWebview from "@components/studyPlan/common/StudyPlanBlocker/SurveyBlocker/SurveyWebview";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { md, regular, semiBold, lg } = commonStyles.text;

interface ISurveyBlocker {
	isVisible: boolean;
	formId: string;
	onClose?: () => void;
	onSubmit: () => void;
	userProgramId: string;
}

const STRINGS = createStringConstants({
	title: "studyPlan.surveyBlocker.title",
	subtitle: "studyPlan.surveyBlocker.subtitle",
});

const SurveyBlocker = ({
	isVisible,
	formId,
	onSubmit,
	onClose,
	userProgramId,
}: ISurveyBlocker) => {
	const isPlatformIOS = Platform.OS === "ios";
	const keyboardBehavior = isPlatformIOS
		? IActionModalKeyboardBehavior.HEIGHT
		: IActionModalKeyboardBehavior.PADDING;
	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={onClose}
			onBackPress={onClose}
			disableCloseOnSwipeDown
			isWebView
			keyboardBehavior={keyboardBehavior}
		>
			<View style={styles.container}>
				<View style={styles.surveyGrayLine} />
				<RNText
					title={getString(STRINGS.title)}
					style={styles.surveyHeadline}
				/>
				<RNText
					title={getString(STRINGS.subtitle)}
					style={styles.surveySubHeading}
				/>

				<SurveyWebview
					formId={formId}
					onSubmit={onSubmit}
					userProgramId={userProgramId}
				/>
			</View>
		</ActionModal>
	);
};

export default memo(SurveyBlocker);

const styles = StyleSheet.create({
	container: {
		height: verticalScale(650),
	},
	surveyGrayLine: {
		alignSelf: "center",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(20),
		marginTop: verticalScale(8),
		width: horizontalScale(64),
	},
	surveyHeadline: {
		color: colors.neutral.black,
		textAlign: "center",
		...semiBold,
		...lg,
	},
	surveySubHeading: {
		alignItems: "center",
		color: colors.neutral.grey_07,
		textAlign: "center",
		...md,
		...regular,
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(14),
	},
});
