import ReadMore from "@fawazahmed/react-native-read-more";
import React, { memo } from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";
import { fontFamily } from "@assets/fonts";
import { strings } from "@assets/strings";

const { SCREEN_WIDTH } = measures;

const {
	themes: { text, bg },
	commonStyles: {
		align: { row },
		text: { bold, reg, clrBlack, med },
		spacing: { mh10, mb10, mv6, mt10 },
	},
} = C;

interface IReadMoreLessComponentProps {
	description?: string;
	title?: string;
	course?: string;
	readMoreTrack?: () => void;
	seeMorePosition?: "inline" | "bottom";
	containerStyle?: StyleProp<TextStyle>;
}

const CourseDesc = ({
	description,
	title,
	course,
	readMoreTrack,
	seeMorePosition = "bottom",
	containerStyle,
}: IReadMoreLessComponentProps) => {
	return (
		<>
			<View style={styles.mainTitle}>
				{course ? (
					<RNText
						title={course}
						style={{ color: text.steelBlue, ...med }}
					/>
				) : null}
				{title ? (
					<RNText title={title} style={styles.titleStyle} />
				) : null}
				{description ? (
					<ReadMore
						numberOfLines={2}
						wrapperStyle={styles.wrapperStyle}
						onExpand={readMoreTrack}
						style={[styles.readMoreTxt, containerStyle]}
						seeMoreText={strings.READ_MORE}
						seeLessText={strings.READ_LESS}
						seeMoreStyle={styles.clrNavyBlue}
						seeLessStyle={styles.clrNavyBlue}
						seeMoreContainerStyleSecondary={
							seeMorePosition === "bottom"
								? styles.seeMoreSecondaryContainerStyle
								: undefined
						}
					>
						{description}
					</ReadMore>
				) : null}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	clrNavyBlue: {
		...bold,
		color: text.black,
	},
	hlfWidth: { width: SCREEN_WIDTH / 1.2 },
	iconContainerStyle: {
		backgroundColor: bg.lightBlue,
	},
	mainTitle: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(10),
		paddingLeft: horizontalScale(8),
	},
	readMoreTxt: {
		color: text.darkBlue,
		fontFamily: fontFamily.Regular,
		lineHeight: horizontalScale(19),
	},
	seeMoreSecondaryContainerStyle: { position: "relative" },
	titleStyle: { ...bold, ...reg, ...mv6, ...clrBlack },
	wrapperStyle: {
		alignItems: "stretch",
		width: "100%",
	},
});

export default memo(CourseDesc);
