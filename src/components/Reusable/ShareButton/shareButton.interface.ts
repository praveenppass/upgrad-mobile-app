import { StyleProp, ViewStyle } from "react-native";

export enum IShareType {
	LINKEDIN,
	X,
}

export interface IShareButton {
	shareType: IShareType;
	certificateUrl?: string;
	shareText: string;
	style?: StyleProp<ViewStyle>;
}

export interface IGetShareIcon {
	shareType: IShareType;
	width: number;
	height: number;
	color: string;
}
