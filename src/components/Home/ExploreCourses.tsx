import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { EXPLORE_COURSES_URL } from "@utils/constants";
import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { C } from "@assets/constants";
import { SearchIcon } from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";

const {
	strings,
	themes: { primary },
	commonStyles: {
		align: { flexStart, overFlowHidden, row, absolute },
		spacing: { rg38, p20 },
		text: { semiBold, reg, lineHeight22, md },
		components: { cardViewStyle },
	},
	colors: { neutral, highlight, cta },
} = C;

const {
	BORDER: { b1 },
} = measures;

const ExploreCourses = () => {
	const navigation = useNavigation<RootHomeStackList>();
	const [loading] = useState(false);

	return (
		<>
			{loading ? (
				<Skeleton style={styles.skeleton} dark />
			) : (
				<Pressable
					style={styles.container}
					onPress={() => {
						navigation.navigate("WebViewModal", {
							name: strings.HOME_EXPLORE_COURSES_WEBVIEW,
							url: EXPLORE_COURSES_URL,
						});
					}}
				>
					<View style={styles.innerContainer}>
						<Image
							source={{ uri: IMAGE_URLS.SEARCH_COURSE }}
							style={styles.image}
							resizeMode="contain"
						/>
						<RNText
							title={strings.HOME_EXPLORE_COURSES}
							style={styles.heading}
						/>

						<View style={styles.button}>
							<SearchIcon
								color={primary.color3}
								width={moderateScale(18)}
								height={moderateScale(18)}
							/>
							<RNText
								title={strings.HOME_EXPLORE_COURSES_CTA}
								style={styles.buttonText}
							/>
						</View>
					</View>
				</Pressable>
			)}
		</>
	);
};

export default ExploreCourses;

export const styles = StyleSheet.create({
	button: {
		...row,
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: b1,
		columnGap: horizontalScale(5),
		height: verticalScale(40),
		paddingHorizontal: horizontalScale(20),
	},
	buttonText: {
		...semiBold,
		...md,
		color: neutral.black,
	},
	container: {
		...cardViewStyle,
	},
	heading: {
		...semiBold,
		...reg,
		...lineHeight22,
		color: neutral.black,
		width: horizontalScale(210),
	},
	image: {
		...absolute,
		bottom: -verticalScale(20),
		height: verticalScale(145),
		right: -horizontalScale(16),
		width: horizontalScale(140),
	},
	innerContainer: {
		...rg38,
		...p20,
		...flexStart,
		...overFlowHidden,
		backgroundColor: highlight.bg_brown,
		borderRadius: horizontalScale(8),
	},
	skeleton: {
		...rg38,
		...p20,
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(8),
		height: 170,
		marginBottom: verticalScale(10),
		width: "100%",
	},
});
