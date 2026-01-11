import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import Skeleton from "@components/Skeleton/Skeleton";

import { verticalScale } from "@utils/functions";

interface IHtmlDescription {
	loading: boolean;
	htmlContent: string | null;
	style: StyleProp<ViewStyle>;
}

const HtmlDescription = ({ loading, htmlContent, style }: IHtmlDescription) => {
	if (loading)
		return (
			<View style={[styles.skeletonContainer, style]}>
				{new Array(8).fill(1).map((_, index) => (
					<Skeleton style={styles.skeleton} key={index} />
				))}
			</View>
		);

	if (!htmlContent) return <></>;

	return (
		<View style={style}>
			<RenderHtml content={htmlContent || ""} />
		</View>
	);
};

export default HtmlDescription;

const styles = StyleSheet.create({
	skeleton: {
		flex: 1,
		height: verticalScale(14),
	},
	skeletonContainer: {
		gap: verticalScale(8),
	},
});
