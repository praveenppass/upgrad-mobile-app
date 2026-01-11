import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const {
	text: { semiBold, md },
} = commonStyles;

const htmlContentStyles = StyleSheet.create({
	button: {
		alignSelf: "stretch",
		backgroundColor: colors.primary.red_05,
		borderRadius: horizontalScale(6),
		paddingVertical: verticalScale(10),
	},
	buttonText: {
		textAlign: "center",
		...semiBold,
		...md,
		color: colors.neutral.white,
	},
	component: {
		flex: 1,
		flexDirection: "column",
	},
	container: {
		alignItems: "center",
		marginHorizontal: horizontalScale(20),
		rowGap: verticalScale(20),
	},
	downloadBtn: {
		width: "100%",
	},
	img: {
		height: "auto",
		marginVertical: verticalScale(10),
		resizeMode: "contain",
		width: "100%",
	},
	main: {
		flex: 1,
	},
	p: {
		color: colors.neutral.grey_08,
		gap: 4,
	},
	skeletonButton: {
		height: verticalScale(40),
	},
	skeletonContainer: { paddingHorizontal: horizontalScale(20) },
	skeletonIcon: {
		height: verticalScale(100),
		width: horizontalScale(80),
	},
	zipIcon: {
		height: verticalScale(100),
		marginTop: verticalScale(10),
		width: horizontalScale(80),
	},
});

export default htmlContentStyles;
