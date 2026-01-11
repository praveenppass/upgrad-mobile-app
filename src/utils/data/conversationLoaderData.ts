import { C } from "@assets/constants";
import measures from "@utils/measures";
import { ViewStyle } from "react-native";
import { ITicketLoaderData } from "@interface/app.interface";

const {
	commonStyles: {
		align: { row, rowReverse },
	},
} = C;

const { SCREEN_WIDTH } = measures;

const dReverse: ViewStyle = {
	...rowReverse,
	alignSelf: "flex-start",
};

const dNormal: ViewStyle = {
	...row,
	alignSelf: "flex-end",
};

const cardSm = {
	height: 60,
	width: "30%",
};

const cardSmMd = {
	height: 60,
	width: "50%",
};

const cardMd = {
	height: 120,
	width: SCREEN_WIDTH - 80,
};

const cardMdSm = {
	height: 60,
	width: SCREEN_WIDTH - 80,
};

export const conversationLoaderData: ITicketLoaderData[] = [
	{
		id: "1",
		cardStyle: cardMd,
		directionStyle: dNormal,
	},
	{
		id: "2",
		cardStyle: cardMdSm,
		directionStyle: dNormal,
	},
	{
		id: "3",
		cardStyle: cardSmMd,
		directionStyle: dReverse,
	},
	{
		id: "4",
		cardStyle: cardMdSm,
		directionStyle: dReverse,
	},
	{
		id: "5",
		cardStyle: cardMd,
		directionStyle: dNormal,
	},
	{
		id: "6",
		cardStyle: cardSm,
		directionStyle: dNormal,
	},
	{
		id: "7",
		cardStyle: cardSm,
		directionStyle: dNormal,
	},
];
