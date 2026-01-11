import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";

import { IEventViewType } from "@components/academicPlanner/common/EventDateSelector/index.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { CalendarIcon, ListViewIcon } from "@assets/icons";

interface IEventViewSelector {
	eventViewType: IEventViewType;
	setEventViewType: (type: IEventViewType) => void;
}

const { neutral } = colors;

const eventViewTypes = [
	{
		type: IEventViewType.List,
		icon: (props: SvgProps) => (
			<ListViewIcon
				{...props}
				width={horizontalScale(13)}
				height={horizontalScale(13)}
			/>
		),
	},
	{
		type: IEventViewType.Calendar,
		icon: (props: SvgProps) => (
			<CalendarIcon
				{...props}
				width={horizontalScale(15)}
				height={horizontalScale(15)}
			/>
		),
	},
];

const EventViewSelector = ({
	eventViewType,
	setEventViewType,
}: IEventViewSelector) => (
	<View style={styles.viewContainer}>
		{eventViewTypes.map(({ type, icon: Icon }) => {
			const isActive = type === eventViewType;
			return (
				<Pressable
					key={type}
					onPress={() => !isActive && setEventViewType(type)}
					style={[styles.viewItem, isActive && styles.viewItemActive]}
					disabled={isActive}
				>
					<Icon color={isActive ? neutral.white : neutral.black} />
				</Pressable>
			);
		})}
	</View>
);

export default EventViewSelector;

const styles = StyleSheet.create({
	viewContainer: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_08,
		borderRadius: horizontalScale(30),
		borderWidth: horizontalScale(2),
		flexDirection: "row",
		height: verticalScale(24),
	},
	viewItem: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: horizontalScale(12),
		width: horizontalScale(36),
	},
	viewItemActive: {
		backgroundColor: neutral.grey_08,
		borderRadius: horizontalScale(30),
		marginBottom: -verticalScale(2),
		marginLeft: -verticalScale(2),
		marginTop: -verticalScale(2),
	},
});
