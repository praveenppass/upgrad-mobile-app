import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { cta } = colors;

const {
	text: { semiBold, md },
} = commonStyles;

interface IAssetInstructions {
	html?: string;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
}

interface IAssetInstructionsSkeleton {
	style?: StyleProp<ViewStyle>;
}

const AssetInstructionsSkeleton = ({ style }: IAssetInstructionsSkeleton) => {
	return (
		<View style={[styles.skeletonContainer, style]}>
			<Skeleton style={styles.skeleton1} />
			<Skeleton style={styles.skeleton2} />
			<Skeleton style={styles.skeleton3} />
			<Skeleton style={styles.skeleton4} />
			<Skeleton style={styles.skeleton5} />
			<Skeleton style={styles.skeleton6} />
		</View>
	);
};

const AssetInstructions = ({ html, loading, style }: IAssetInstructions) => {
	return (
		<>
			{loading ? (
				<AssetInstructionsSkeleton style={style} />
			) : html ? (
				<View style={[styles.conatiner, style]}>
					<RNText
						style={styles.subTitle}
						title={`${strings.INSTRUCTIONS}: `}
					/>

					<RenderHtml content={html ?? ""} />
				</View>
			) : (
				<></>
			)}
		</>
	);
};
const styles = StyleSheet.create({
	conatiner: { marginTop: verticalScale(15) },
	skeleton1: {
		borderRadius: horizontalScale(17),
		height: verticalScale(12),
		width: horizontalScale(43),
	},

	skeleton2: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(17),
		width: horizontalScale(224),
	},
	skeleton3: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(7),
		width: horizontalScale(259),
	},
	skeleton4: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(5),
		width: horizontalScale(173),
	},
	skeleton5: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(10),
		width: horizontalScale(162),
	},
	skeleton6: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		marginTop: verticalScale(5),
		width: horizontalScale(234),
	},
	skeletonContainer: {
		paddingBottom: verticalScale(35),
		paddingHorizontal: horizontalScale(10),
	},
	subTitle: {
		color: cta.text.default_secondary,
		...md,
		...semiBold,
		marginBottom: verticalScale(8),
	},
});

export default AssetInstructions;
