import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import { ExternalLinkIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { semiBold, sm, md, medium },
} = commonStyles;

const { neutral } = colors;

interface IReferenceLinks {
	links: {
		url: string;
		title: string;
	}[];
	style?: StyleProp<ViewStyle>;
	loading?: boolean;
}

const ReferenceLinks = ({ links, style, loading }: IReferenceLinks) => {
	const navigation = useNavigation<RootHomeStackList>();

	if (loading)
		return (
			<View style={style}>
				<Skeleton style={styles.skeletonHeading} />

				<View style={styles.linkContainer}>
					{[...Array(3)].map((_, index) => (
						<Skeleton key={index} style={styles.skeletonLink} />
					))}
				</View>
			</View>
		);

	if (!links.length) return <></>;

	return (
		<View style={style}>
			<RNText style={styles.heading}>{strings.REFERENCE_LINKS}</RNText>

			<View style={styles.linkContainer}>
				{links.map((item, index) => (
					<Pressable
						key={index}
						onPress={() =>
							navigation.navigate("WebViewModal", {
								name: item.title,
								url: item.url,
							})
						}
					>
						<View style={styles.link}>
							<RNText
								style={styles.linkTitle}
								title={item.title}
								numberOfLines={1}
							/>
							<ExternalLinkIcon
								height={verticalScale(14)}
								width={horizontalScale(14)}
								color={neutral.black}
							/>
						</View>
					</Pressable>
				))}
			</View>
		</View>
	);
};

export default ReferenceLinks;

const styles = StyleSheet.create({
	heading: {
		color: neutral.black,
		...semiBold,
		...md,
	},
	link: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_03,
		borderRadius: horizontalScale(4),
		borderWidth: 1,
		columnGap: verticalScale(10),
		elevation: 4,
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	linkContainer: {
		gap: verticalScale(10),
		marginVertical: verticalScale(10),
	},
	linkTitle: {
		color: neutral.black,
		flex: 1,
		...sm,
		...medium,
	},
	skeletonHeading: {
		height: verticalScale(14),
		width: horizontalScale(150),
	},
	skeletonLink: {
		flex: 1,
		height: verticalScale(36),
	},
});
