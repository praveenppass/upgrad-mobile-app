import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { REFER_AND_EARN_URL } from "@utils/constants";
import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { C } from "@assets/constants";
import { IMAGE_URLS } from "@assets/icons/img";

const {
	strings,
	commonStyles: {
		components: { cardViewStyle },
		align: { itemsEnd, row },
		spacing: { p12, p16 },
		text: { regular, semiBold, md, xSm },
	},
	colors: { neutral, highlight, cta },
} = C;

const {
	BORDER: { b4, b10 },
} = measures;

export const ReferAndEarnSkeleton = () => (
	<View style={styles.containerSkeleton}>
		<View style={styles.contentContainer}>
			<Skeleton style={styles.headingSkeleton} />
			{new Array(3)
				.fill(1)
				?.map((_item, i: number) => (
					<Skeleton key={i} style={styles.descriptionSkeleton} />
				))}
		</View>
		<Skeleton style={styles.imageSkeleton} />
	</View>
);

const ReferAndEarn = () => {
	const navigation = useNavigation<RootHomeStackList>();

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				navigation.navigate("WebViewModal", {
					name: strings.HOME_REFER_AND_EARN,
					url: REFER_AND_EARN_URL,
				});
			}}
		>
			<View style={styles.contentContainer}>
				<RNText
					title={strings.HOME_REFER_AND_EARN}
					style={styles.heading}
					numberOfLines={1}
					adjustsFontSizeToFit={true}
				/>
				<RNText
					title={strings.HOME_REFER_AND_EARN_DESC}
					style={styles.description}
				/>
			</View>
			<Image
				source={{ uri: IMAGE_URLS.GIFT_IMAGE }}
				style={styles.image}
			/>
		</Pressable>
	);
};

export default ReferAndEarn;

const styles = StyleSheet.create({
	container: {
		...cardViewStyle,
		...p16,
		...row,
		...itemsEnd,
		backgroundColor: highlight.bg_blue,
		borderRadius: b4,
		gap: horizontalScale(28),
		height: verticalScale(105),
		paddingBottom: "3%",
		paddingTop: "3%",
	},
	containerSkeleton: {
		...cardViewStyle,
		...p12,
		backgroundColor: cta.fill.disable,
		borderRadius: b4,
	},

	contentContainer: {
		flexShrink: 1,
		rowGap: verticalScale(4),
	},

	description: {
		...regular,
		color: neutral.black,
		...xSm,
		lineHeight: verticalScale(16),
	},
	descriptionSkeleton: {
		borderRadius: b10,
		height: verticalScale(16),
		width: horizontalScale(140),
	},
	heading: {
		...semiBold,
		...md,
		color: neutral.black,
	},
	headingSkeleton: {
		borderRadius: b10,
		height: verticalScale(15),
		marginBottom: verticalScale(12),
		width: horizontalScale(200),
	},
	image: {
		height: horizontalScale(56),
		width: horizontalScale(56),
	},
	imageSkeleton: {
		borderRadius: b4,
		height: horizontalScale(56),
		position: "absolute",
		right: horizontalScale(20),
		top: verticalScale(45),
		width: horizontalScale(56),
	},
});
