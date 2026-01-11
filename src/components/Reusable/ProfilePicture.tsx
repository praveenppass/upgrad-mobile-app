import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";

import { horizontalScale } from "@utils/functions";

import { RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { regular, lg, sm } = commonStyles.text;

export enum IProfilePictureType {
	SMALL = "small",
	LARGE = "large",
}

interface IProfilePicture {
	type: IProfilePictureType;
}

const ProfilePicture = ({ type }: IProfilePicture) => {
	const { profilePicture, firstName, lastName } = useSelector(
		(state: RootState) => state.personalDetails.basicDetails,
	);

	const initial = firstName
		? firstName?.charAt(0)?.toUpperCase()
		: lastName
			? lastName?.charAt(0)?.toUpperCase()
			: "G";

	const isSmall = type === IProfilePictureType.SMALL;

	const imageStyle = isSmall ? styles.smallImage : styles.largeImage;
	const textStyle = isSmall ? styles.smallText : styles.largeText;

	const profileInitialsFallback = (
		<View style={[styles.initialsContainer, imageStyle]}>
			<RNText style={textStyle} title={initial} />
		</View>
	);

	return (
		<SafeImage
			source={{ uri: profilePicture || "" }}
			imageStyle={imageStyle}
			fallbackComponent={profileInitialsFallback}
		/>
	);
};

const styles = StyleSheet.create({
	initialsContainer: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(30),
		height: horizontalScale(50),
		justifyContent: "center",
		width: horizontalScale(50),
	},
	largeImage: {
		borderRadius: horizontalScale(26),
		height: horizontalScale(52),
		width: horizontalScale(52),
	},
	largeText: { ...regular, ...lg },
	smallImage: {
		borderRadius: horizontalScale(16),
		height: horizontalScale(32),
		width: horizontalScale(32),
	},
	smallText: { ...regular, ...sm },
});

export default ProfilePicture;
