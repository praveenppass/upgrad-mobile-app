import { StyleSheet } from "react-native";

import { horizontalScale, moderateScale, verticalScale } from "@utils/functions";

import { themes } from "@assets/themes";

const components = StyleSheet.create({
	bottomShadow: {
		shadowColor: themes.primary.color3,
		shadowOffset: {
			width: 1,
			height: 5,
		},
		shadowOpacity: 0.06,
		// backgroundColor: themes.primary.color2,
	},
	reportView:{
		marginHorizontal: horizontalScale(10), marginBottom: verticalScale(10)
	},
	cardViewStyle: {
		flex: 1,
		shadowColor: themes.primary.color3,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	loadingModalStyle: {
		height: moderateScale(160),
	},
	shadow: {
		borderRadius: moderateScale(8),
		elevation: 3,
		shadowColor: themes.primary.color3,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
});

export default components;
