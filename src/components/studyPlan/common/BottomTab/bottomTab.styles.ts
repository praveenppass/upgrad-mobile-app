import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { regular, xxSm } = commonStyles.text;

const bottomTabStyles = StyleSheet.create({
	actionModalContainer: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},

	activeTabLabel: {
		color: neutral.black,
	},
	container: {
		backgroundColor: neutral.white,
		boxShadow:
			"0px -2px 4px 0px rgba(0, 0,0, 0.08), 0px -3px 6px 0px rgba(0,0,0, 0.03)",
		flexDirection: "row",
		height: verticalScale(62),
		justifyContent: "space-between",
		width: "100%",
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginTop: verticalScale(6),
		width: horizontalScale(64),
	},
	modalOverlay: {
		backgroundColor: neutral.black + "80",
		flex: 1,
		justifyContent: "flex-end",
	},
	moreMenuContainer: {
		alignItems: "flex-end",
		gap: verticalScale(16),
		paddingHorizontal: horizontalScale(19),
	},
	moreMenuItem: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(20),
		height: horizontalScale(40),
		justifyContent: "center",
		width: horizontalScale(40),
	},
	moreMenuPressable: {
		alignItems: "center",
		gap: verticalScale(4),
		width: horizontalScale(60),
	},
	moreTabLabel: {
		color: neutral.white,
	},
	skeletonContainer: {
		alignItems: "flex-end",
		paddingHorizontal: horizontalScale(16),
	},
	skeletonIcon: {
		height: horizontalScale(24),
		width: horizontalScale(24),
	},
	skeletonLabel: {
		height: horizontalScale(8),
		width: horizontalScale(60),
	},
	skeletonTab: {
		alignItems: "center",
		gap: horizontalScale(8),
	},
	tabContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(8),
		flex: 1,
		gap: verticalScale(5),
		justifyContent: "flex-end",
		paddingHorizontal: horizontalScale(4),
		position: "relative",
	},
	tabContainerPlus: {
		justifyContent: "center",
	},
	tabLabel: {
		color: neutral.grey_06,
		...xxSm,
		...regular,
	},
});

export default bottomTabStyles;
