import { Platform, StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, group, primary, state, bg } = colors;
const {
	text: { sm, reg, bold, regular, semiBold, medium, md },
} = commonStyles;

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		marginTop: verticalScale(12),
		height: "100%",
		width: "100%",
	},
	contentContainer: {
		marginBottom: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
	},
	divider: {
		marginTop: verticalScale(20),
		borderWidth: 1,
		borderColor: neutral.grey_03,
	},
	avatarStyle: {
		backgroundColor: "#EBD2FF", //Right now this color is not in collor pallete.
		height: verticalScale(28),
		width: horizontalScale(28),
		borderRadius: horizontalScale(14),
		alignItems: "center",
		justifyContent: "center",
	},
	btnStyle: {
		borderRadius: 8,
		height: verticalScale(40),
		marginBottom: verticalScale(8),
		marginTop: verticalScale(4),
	},
	button: {
		alignSelf: "stretch",
		backgroundColor: primary.red_05,
		borderRadius: 6,
		paddingVertical: verticalScale(10),
	},

	chipContainer: {
		marginTop: verticalScale(20),
	},
	chipStyle: {
		alignItems: "center",
		justifyContent: "center",
		marginLeft: horizontalScale(8),
	},
	chipText: {
		...sm,
		lineHeight: verticalScale(19),
		...regular,
		color: neutral.grey_06, // Till the time "#607290" was changed. Added this color.
	},
	commentStyle: {
		marginTop: verticalScale(8),
		...sm,
		color: neutral.black,
		...regular,
		lineHeight: verticalScale(20),
	},
	commentView: {
		alignItems: "flex-start",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_06,
		borderRadius: 8,
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		marginTop: verticalScale(14),
		padding: verticalScale(8),
		// Android-specific styling
		elevation: Platform.OS === "android" ? 1.5 : 0, // Elevation for Android only
		// iOS-specific styling (only apply shadow to iOS)
		...(Platform.OS === "ios" && {
			shadowColor: neutral.black,
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,
		}),
	},
	editView: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
	},
	emptyCardContainer: {
		padding: moderateScale(33),
	},
	errorStyle: {
		...sm,
		color: state.error_red,
		marginTop: verticalScale(10),
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
		marginTop: verticalScale(10),
	},
	hiddenImageContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: verticalScale(10),
	},
	hideBlurImage: {
		height: verticalScale(212),
		width: verticalScale(320),
	},
	iconContainer: {
		alignItems: "center",
		height: verticalScale(12),
		justifyContent: "flex-end",
		width: verticalScale(18),
	},
	inputStyle: {
		backgroundColor: neutral.white,
		borderRadius: moderateScale(8),
		height: verticalScale(70),
	},
	labelStyle: {
		...sm,
		...semiBold,
		color: neutral.white,
	},
	// ModalStyles
	modalStyle: {
		padding: verticalScale(8),
	},
	containerView: {
		alignItems: "center",
		justifyContent: "center",
	},
	centerSlider: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(5),
	},
	slider: {
		backgroundColor: neutral.grey_04,
		borderRadius: verticalScale(100),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	profileRowStyle: {
		flexDirection: "row",
		flex: 1,
		paddingVertical: verticalScale(4),
	},
	seeMoreLess: {
		marginTop: verticalScale(8),
		...sm,
		...regular,
		color: group.group_06,
		lineHeight: verticalScale(20),
		textDecorationLine: "underline",
	},
	seprator: {
		borderBottomWidth: verticalScale(1),
		borderColor: neutral.grey_05,
	},
	skeletonButton: {
		height: verticalScale(40),
	},
	skeletonIcon: {
		height: verticalScale(100),
		width: horizontalScale(80),
	},
	text: {
		...medium,
		...md,
		color: neutral.grey_08,
		flex: 1,
	},
	textNameStyle: {
		marginHorizontal: horizontalScale(8),
		...sm,
		lineHeight: verticalScale(20),
		color: neutral.black,
		...bold,
	},
	textTimeStyle: {
		marginHorizontal: horizontalScale(8),
		...sm,
		lineHeight: verticalScale(20),
		color: neutral.grey_06,
		...regular,
	},
	textInput: {
		backgroundColor: neutral.white,
		minHeight: verticalScale(60),
		textAlignVertical: "top",
	},
	title: {
		...reg,
		lineHeight: verticalScale(22),
		...semiBold,
		color: neutral.black,
	},
	verDividerStyle: {
		height: verticalScale(20),
		width: horizontalScale(1),
		borderWidth: 0.5,
		borderColor: neutral.grey_05,
	},
	wordLimitMessage: {
		...regular,
		...sm,
		color: neutral.grey_06,
		lineHeight: verticalScale(19),
		marginVertical: verticalScale(10),
	},
	commentSubView: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	avatarContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	modalTextInputStyle: {
		minHeight: verticalScale(180),
	},
	avatarImageStyle: {
		height: verticalScale(28),
		width: horizontalScale(28),
		borderRadius: horizontalScale(14),
	},
	textInputContainer: {
		borderColor: neutral.grey_04,
		borderRadius: moderateScale(4),
		borderWidth: 1,
		marginTop: verticalScale(10),
		padding: horizontalScale(15),
	},
	emptyCardTitleStyle: {
		...md,
		...regular,
		color: "#0A192B", // Not present in Color Pallate, till then keeping it static here.
	},
	btnDisabled: {
		borderRadius: 6,
		backgroundColor: bg.fill.bg_disable,
	},
	btnEnabled: {
		borderRadius: 6,
		backgroundColor: primary.red_05,
	},
	btnTitleStyle: {
		...regular,
		...semiBold,
		color: neutral.black,
	},
	disabledTitleStyle: {
		color: neutral.black,
		...semiBold,
	},
	enabledTitleStyle: {
		color: neutral.white,
		...semiBold,
	},
});
