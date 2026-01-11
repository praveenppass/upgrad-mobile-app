import { ImageStyle, StyleProp, TextStyle } from "react-native";

export interface IProfileIconItemProps {
	title: string;
	image?: string;
	textStyle: StyleProp<TextStyle>;
	imageStyle: StyleProp<ImageStyle>;
}

export interface IProfilePicProps {
	loading?: boolean;
}
