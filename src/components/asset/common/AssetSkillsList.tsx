import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta, highlight } = colors;

const {
	text: { sm, md, medium, semiBold },
} = commonStyles;

interface IAssetSkillsList {
	data: {
		id: string;
		name: string;
	}[];
	title: string;
	loading: boolean;
	style?: ViewStyle;
}

interface IAssetSkillListSkeleton {
	style?: StyleProp<ViewStyle>;
}

const AssetSkillListSkeleton = ({ style }: IAssetSkillListSkeleton) => {
	return (
		<View style={[styles.skeletonContainer, style]}>
			<Skeleton style={styles.skeleton1} />
			<View style={styles.row}>
				<View style={styles.view1}>
					<Skeleton style={styles.skeleton2} />
				</View>
				<View style={styles.view2}>
					<Skeleton style={styles.skeleton3} />
				</View>
			</View>
		</View>
	);
};

const AssetSkillsList: React.FC<IAssetSkillsList> = ({
	data,
	title,
	loading,
	style,
}) => (
	<>
		{loading ? (
			<AssetSkillListSkeleton style={style} />
		) : data?.length ? (
			<View style={[styles.container, style]}>
				<RNText style={styles.title} title={title} />
				<View style={styles.chipContainer}>
					{data?.map((item) => (
						<View key={item?.id} style={styles.itemContainer}>
							<RNText
								style={styles.itemText}
								title={item?.name}
							/>
						</View>
					))}
				</View>
			</View>
		) : null}
	</>
);

const styles = StyleSheet.create({
	chipContainer: {
		columnGap: horizontalScale(8),
		flexDirection: "row",
		flexWrap: "wrap",
		rowGap: verticalScale(8),
	},
	container: {},
	itemContainer: {
		backgroundColor: highlight.bg_blue,
		borderColor: highlight.text_blue,
		borderRadius: horizontalScale(31),
		borderWidth: horizontalScale(1),
		overflow: "hidden",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(4),
	},

	itemText: {
		...sm,
		...medium,
		color: highlight.text_blue,
		lineHeight: horizontalScale(20),
	},
	row: {
		flexDirection: "row",
		marginTop: verticalScale(16),
	},

	skeleton1: {
		borderRadius: horizontalScale(15),
		height: verticalScale(13),
		width: horizontalScale(22),
	},
	skeleton2: {
		alignSelf: "center",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(2),
		width: horizontalScale(37),
	},
	skeleton3: {
		alignSelf: "center",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(2),
		width: horizontalScale(51),
	},
	skeletonContainer: {
		paddingHorizontal: horizontalScale(10),
	},
	title: {
		color: cta.text.default_secondary,
		...md,
		...semiBold,
		marginBottom: verticalScale(8),
	},
	view1: {
		backgroundColor: colors.highlight.bg_blue,
		borderRadius: horizontalScale(15),
		height: verticalScale(24),
		width: horizontalScale(85),
	},
	view2: {
		backgroundColor: colors.highlight.bg_blue,
		borderRadius: horizontalScale(31),
		height: verticalScale(24),
		marginLeft: horizontalScale(8),
		width: horizontalScale(77),
	},
});

export default AssetSkillsList;
