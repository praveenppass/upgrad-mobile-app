import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { medium, md } = commonStyles.text;
const { neutral } = colors;

const searchCoursesStyles = StyleSheet.create({
	box: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: verticalScale(60),
	},
	centerContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	courseListContentStyle: {
		gap: verticalScale(18),
		padding: horizontalScale(20),
		paddingTop: verticalScale(10),
	},
	flexContainer: {
		flex: 1,
		marginTop: verticalScale(20),
	},
	footerComponentStyle: {
		paddingTop: verticalScale(12),
	},
	inputContainer: {
		borderRadius: verticalScale(4),
		elevation: 3,
		shadowColor: neutral.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	lightBgGrey: {
		backgroundColor: neutral.grey_02,
	},
	noResultText: {
		...md,
		alignItems: "center",
		color: neutral.grey_06,
		justifyContent: "center",
		lineHeight: verticalScale(21),
	},
	right: {
		alignSelf: "flex-end",
		padding: horizontalScale(10),
	},
	searchHistoryListStyle: {
		marginLeft: horizontalScale(20),
		marginRight: horizontalScale(20),
	},
	searchInputContainer: {
		gap: verticalScale(10),
		padding: horizontalScale(20),
		paddingBottom: verticalScale(10),
	},
	searchText: {
		...md,
		color: neutral.grey_06,
		lineHeight: verticalScale(21),
	},
	searchTextStyle: {
		...medium,
		...md,
		color: neutral.grey_06,
		lineHeight: verticalScale(21),
		marginBottom: verticalScale(16),
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(24),
	},
	separator: {
		gap: horizontalScale(16),
	},
});

export default searchCoursesStyles;
