import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import { getSafeAreaInsets } from "@utils/inset.utils";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { BORDER } = measures;

const {
	text: { semiBold, regular, medium, bold, sm, lg },
} = commonStyles;

const bottomInset = getSafeAreaInsets().bottom;

const styles = StyleSheet.create({
	certificateBottomRightSection: { flex: 3, gap: horizontalScale(12) },
	certificateBottomSection: {
		flexDirection: "row",
		gap: horizontalScale(15),
		paddingVertical: verticalScale(12),
	},
	certificateContainerViewScreen: {
		borderRadius: BORDER.b10,
		flex: 1,
		paddingHorizontal: verticalScale(16),
	},

	certificateImage: {
		borderRadius: BORDER.b10,
		height: verticalScale(75),
		width: horizontalScale(110),
	},
	containerView: {
		alignItems: "flex-start",
		backgroundColor: neutral.white,
		borderRadius: BORDER.b10,
		flex: 1,
		marginBottom: verticalScale(15),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: horizontalScale(13),
	},

	contentContainerStyle: { marginTop: verticalScale(20) },

	detailsView: {
		flex: 1,
		gap: horizontalScale(4),
	},
	downloadButton: {
		maxWidth: "10%",
		padding: horizontalScale(5),
	},
	email: {
		...sm,
		...regular,
		color: neutral.grey_07,
	},
	iconContainerImage: {
		position: "relative",
	},
	initials: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: verticalScale(30),
		height: horizontalScale(50),
		justifyContent: "center",
		width: horizontalScale(50),
	},
	initialsText: { ...regular, ...lg },
	itemDescription: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	itemDescriptionworkEx: {
		...regular,
		color: neutral.grey_07,
		marginTop: verticalScale(3),
		...sm,
	},

	itemPersonalKey: {
		...medium,
		color: neutral.black,
		...sm,
		lineHeight: verticalScale(18),
	},

	itemPersonalValue: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	itemRowPersonal: {
		justifyContent: "space-between",
	},

	listItemPersonalView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(13),
	},

	loadingStyle: {
		height: verticalScale(12),
		width: horizontalScale(12),
	},
	longText: {
		width: horizontalScale(300),
	},
	name: {
		color: neutral.black,
		...bold,
	},
	profileDetails: {
		flexDirection: "row",
		gap: horizontalScale(15),
		marginBottom: verticalScale(7),
	},
	profileEditIcon: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: verticalScale(8),
		bottom: 0,
		elevation: 10,
		height: verticalScale(16),
		justifyContent: "center",
		position: "absolute",
		right: 0,
		width: horizontalScale(16),
	},
	profilePic: {
		borderRadius: BORDER.b31,
		height: horizontalScale(50),
		width: horizontalScale(50),
	},
	resumeUploadText: {
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(21),
	},
	screenEditIcon: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: horizontalScale(20),
	},

	scrollView: {
		backgroundColor: neutral.grey_02,
		flex: 1,
		paddingHorizontal: horizontalScale(20),
	},

	scrollViewPadding: {
		marginTop: verticalScale(20),
		paddingBottom: bottomInset,
	},

	separator: {
		backgroundColor: neutral.grey_04,
		height: verticalScale(1),
	},
	uploadResume: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: BORDER.b10,
		borderWidth: 1,
		flexDirection: "row",
		gap: horizontalScale(8),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(8),
	},
});

export default styles;
