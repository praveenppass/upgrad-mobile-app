import { Platform, StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { bold, reg, semiBold, md, medium, regular, sm, xxSm, tiny } =
	commonStyles.text;

const { neutral, highlight, icon, cta, content } = colors;

const botStyles = StyleSheet.create({
	actionModal: {
		borderBottomLeftRadius: horizontalScale(16),
		borderBottomRightRadius: horizontalScale(16),
		marginHorizontal: horizontalScale(13),
		paddingHorizontal: horizontalScale(0),
		paddingVertical: verticalScale(0),
	},
	activeIconColor: {
		color: neutral.black,
	},
	botIconView: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: 12,
		elevation: 5,
		height: verticalScale(24),
		justifyContent: "center",
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		width: horizontalScale(24),
	},
	botNameContainer: {
		flexDirection: "row",
	},
	botResponseContainer: {
		flexDirection: "row",
		gap: horizontalScale(5),
	},
	botResponseFeedbackIconsContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		height: verticalScale(24),
		justifyContent: "flex-end",
		left: horizontalScale(30),
		position: "relative",
		width: horizontalScale(280),
	},
	botResponseText: {
		color: neutral.black, // Ensures text is black for chat response
		...regular,
		...sm,
		maxWidth: horizontalScale(280),
	},
	botResponseView: {
		backgroundColor: neutral.white, // Ensures background is white for best contrast
		borderRadius: 12,
		paddingLeft: horizontalScale(14),
		paddingRight: horizontalScale(10),
		paddingVertical: verticalScale(12),
	},
	botThinkingTextStyle: {
		...semiBold,
		...md,
		alignContent: "center",
		lineHeight: verticalScale(15),
		paddingLeft: verticalScale(5),
		paddingTop: verticalScale(5),
	},
	buttonPadding: {
		padding: horizontalScale(5),
	},
	chatContainerMaxHeight: {
		height: verticalScale(720),
		marginBottom: Platform.OS === "ios" ? verticalScale(-35) : 0,
	},
	chatContainerMinHeight: {
		height: verticalScale(455),
		marginBottom: Platform.OS === "ios" ? verticalScale(-35) : 0,
	},
	coachModeText: {
		color: content.text.coach_mode,
	},
	container: {
		alignItems: "center",
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		flexDirection: "row",
		gap: horizontalScale(50),
		height: verticalScale(56),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(12),
		width: "100%",
	},
	disabledIconColor: {
		color: icon.disable,
	},
	divider: {
		backgroundColor: neutral.grey_03,
		flex: 1,
		height: verticalScale(1),
	},
	dividerContainer: {
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		paddingBottom: verticalScale(5),
		paddingHorizontal: horizontalScale(10),
		paddingTop: verticalScale(16),
	},
	emailText: {
		color: highlight.text_blue,
		textDecorationLine: "underline",
	},
	exitCoachModeButton: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: cta.fill.bot_coach_mode,
		borderRadius: horizontalScale(16),
		elevation: 5,
		flexDirection: "row",
		gap: horizontalScale(5),
		height: verticalScale(30),
		justifyContent: "center",
		marginBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(8),
		width: horizontalScale(108),
	},
	exitCoachModeButtonText: {
		color: neutral.white,
		...medium,
		...tiny,
	},
	footerContainer: {
		backgroundColor: neutral.grey_07,
		borderBottomLeftRadius: horizontalScale(16),
		borderBottomRightRadius: horizontalScale(16),
		gap: verticalScale(17),
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(16),
		width: horizontalScale(350),
	},
	greyBackground: {
		backgroundColor: neutral.grey_06,
	},
	iconContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(15),
	},
	iconPadding: {
		padding: horizontalScale(4),
	},
	imageStyle: {
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
	},
	inputContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_05,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		paddingHorizontal: horizontalScale(10),
	},
	linkText: {
		color: neutral.white,
		lineHeight: verticalScale(15),
		...regular,
		...xxSm,
		marginBottom: verticalScale(5),
		paddingHorizontal: horizontalScale(50),
		textAlign: "center",
	},
	maiAskText: {
		color: neutral.grey_04,
		marginTop: verticalScale(2),
		...semiBold,
		...md,
	},
	micButton: {
		alignItems: "center",
		alignSelf: "center",
		height: verticalScale(24),
		justifyContent: "center",
		marginRight: horizontalScale(5),
		width: horizontalScale(24),
	},
	micButtons: {
		alignItems: "center",
		flexDirection: "row",
		padding: horizontalScale(5),
	},
	micContainer: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
	},
	micWaveContainer: {
		alignItems: "center",
		flex: 1,
		height: horizontalScale(40),
		justifyContent: "center",
	},
	overlay: {
		height: verticalScale(420),
	},
	privacyPolicy: {
		color: neutral.white,
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	promptTextStyle: {
		color: neutral.black,
	},

	radioPressable: {
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: highlight.bg_blue,
		borderColor: highlight.text_blue,
		borderRadius: horizontalScale(4),
		borderWidth: 1,
		justifyContent: "center",
		marginLeft: horizontalScale(30),
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(8),
	},
	radioTextStyles: { ...regular, ...sm },
	scrollView: {
		backgroundColor: neutral.white,
		paddingBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingTop: verticalScale(15),
	},

	sendButton: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: neutral.grey_03,
		borderRadius: 16,
		height: verticalScale(24),
		justifyContent: "center",
		width: horizontalScale(24),
	},
	sendButtonWhenKeyboardVisible: {
		alignSelf: "flex-end",
		marginBottom: verticalScale(9),
	},
	superscript: {
		color: neutral.white,
		lineHeight: verticalScale(16),
		verticalAlign: "top",
	},
	textInput: {
		backgroundColor: neutral.white,
		color: neutral.black,
		flex: 1,
		height: verticalScale(42),
		textAlignVertical: "center",
		width: horizontalScale(308),
	},
	textInputWhenBotThinking: {
		backgroundColor: icon.disable,
	},
	textInputWithKeyboardOpen: {
		height: verticalScale(87),
		textAlignVertical: "top",
	},
	timestamp: {
		color: neutral.grey_05,
		...regular,
		...sm,
		lineHeight: verticalScale(18),
		marginHorizontal: 10,
	},
	upGradText: {
		color: neutral.white,
		...medium,
		width: horizontalScale(63),
		...bold,
		...reg,
	},
	userQuestion: {
		alignSelf: "flex-end",
		backgroundColor: neutral.black,
		borderRadius: 12,
		height: "auto",
		marginVertical: verticalScale(22),
		maxWidth: horizontalScale(250),
		paddingBottom: verticalScale(8),
		paddingHorizontal: horizontalScale(12),
		paddingTop: verticalScale(5),
	},
	userText: { color: neutral.white },
	waveStyle: {
		height: horizontalScale(40),
	},
	whiteBackground: {
		backgroundColor: neutral.white,
	},
});

export default botStyles;
