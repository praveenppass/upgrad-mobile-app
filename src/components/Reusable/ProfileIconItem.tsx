import React from "react";
import {
	Image,
	ImageStyle,
	StyleProp,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

import RNText from "./RNText";

interface IProfileIconItemProps {
	title: string;
	image?: string;
	textStyle: StyleProp<TextStyle>;
	imageStyle: StyleProp<ImageStyle>;
	containerStyle: StyleProp<ViewStyle>;
}

const ProfileIconItem = ({
	image,
	title,
	textStyle,
	imageStyle,
	containerStyle,
}: IProfileIconItemProps) => {
	return (
		<View style={containerStyle}>
			{image ? (
				<Image
					resizeMode="cover"
					style={imageStyle}
					source={{
						uri: image,
					}}
				/>
			) : (
				<RNText style={textStyle} title={title} />
			)}
		</View>
	);
};

export default ProfileIconItem;
