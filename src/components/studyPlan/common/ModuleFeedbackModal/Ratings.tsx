import React from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	StarFillIcon,
	StarOutlineIcon,
} from "@assets/icons/svg/microInteractions";

const RATING_COLOR_THRESHOLD = 3;

const getRatingColor = (
	rating: number,
	threshold: number = RATING_COLOR_THRESHOLD,
) => {
	return rating > threshold ? colors.tag.green : colors.state.error_red;
};

interface IRatings {
	totalStars: number;
	containerStyle?: StyleProp<ViewStyle>;
	starStyle?: StyleProp<ViewStyle>;
	starSize?: number;
	selectedStar: number;
	setSelectedStar: (starNumber: number) => void;
}

interface IStar {
	starNumber: number;
	isFilled: boolean;
	onPress: (starNumber: number) => void;
	starStyle?: StyleProp<ViewStyle>;
	currentRating: number;
	starSize?: number;
}

const Ratings = ({
	totalStars,
	containerStyle,
	starStyle,
	starSize,
	selectedStar,
	setSelectedStar,
}: IRatings) => {
	const toggleRating = (starNumber: number) => {
		if (selectedStar === starNumber) setSelectedStar(0);
		else setSelectedStar(starNumber);
	};

	const arrayOfStars = React.useMemo(
		() => Array.from({ length: totalStars }, (_, index) => index + 1),
		[totalStars],
	);

	return (
		<View style={[styles.starsContainer, containerStyle]}>
			{arrayOfStars.map((starNumber) => (
				<Star
					key={starNumber}
					starNumber={starNumber}
					isFilled={starNumber <= selectedStar}
					onPress={() => toggleRating(starNumber)}
					starStyle={starStyle}
					currentRating={selectedStar}
					starSize={starSize}
				/>
			))}
		</View>
	);
};

const Star = ({
	starNumber,
	isFilled,
	onPress,
	starStyle,
	currentRating,
	starSize,
}: IStar) => {
	const filledColor = getRatingColor(currentRating);

	const starDimensions = {
		height: horizontalScale(starSize || 25),
		width: horizontalScale(starSize || 25),
	};

	return (
		<Pressable
			onPress={() => onPress(starNumber)}
			style={[styles.star, starStyle]}
		>
			{isFilled ? (
				<StarFillIcon color={filledColor} {...starDimensions} />
			) : (
				<StarOutlineIcon {...starDimensions} />
			)}
		</Pressable>
	);
};
export default Ratings;

const styles = StyleSheet.create({
	star: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(8),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(8),
	},
	starsContainer: {
		flexDirection: "row",
		gap: verticalScale(10),
	},
});
