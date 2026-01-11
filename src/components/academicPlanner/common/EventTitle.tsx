import React from "react";
import { ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";

interface IEventTitleProps {
	title: string;
	style?: ViewStyle;
	isModal?: boolean;
}

const EventTitle: React.FC<IEventTitleProps> = ({
	style,
	title,
	isModal = false,
}) => {
	return (
		<RNText
			numberOfLines={isModal ? 0 : 2}
			ellipsizeMode="tail"
			style={style}
			title={title}
		/>
	);
};

export default EventTitle;
