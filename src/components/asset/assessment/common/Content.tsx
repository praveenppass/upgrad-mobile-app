import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { moderateScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { themes } from "@assets/themes";

const {
	commonStyles: {
		spacing: { p10 },
		text: { md, bold, semiBold, w400, med, reg },
	},
	colors: { neutral, primary },
} = C;
interface IContent {
	heading: string;
	descriptions: string;
}
const Content = ({ heading, descriptions }: IContent) => {
	return (
		<View style={styles.container}>
			<RNText title={heading} style={styles.heading} />
			<RenderHtml
				content={descriptions}
				tagsStyles={{ p: styles.p, li: styles.li }}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	heading: {
		...bold,
		...md,
		color: themes.text.dark,
	},
	li: {
		alignItems: "center",
		flexDirection: "row",
		...reg,
		fontWeight: "600",
		marginBottom: verticalScale(12),
	},
	p: {
		color: neutral.black,
		...reg,
		lineHeight: moderateScale(22),
		//  fontWeight: "bold",
		marginBottom: verticalScale(12),
		marginVertical: 0,
		maxWidth: "100%",
	},
});
export default memo(Content);
