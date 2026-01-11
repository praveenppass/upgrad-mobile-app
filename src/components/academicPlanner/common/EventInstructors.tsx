import React from "react";
import { StyleSheet } from "react-native";
import { TextStyle } from "react-native";

import MentorItem from "@components/academicPlanner/common/MentorItem";
import RNText from "@components/Reusable/RNText";

import { IMentor } from "@graphql/query/academicPlanner/interfaces";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, regular } = commonStyles.text;
const { content, neutral } = colors;

interface IEventMentorsProps {
	instructors?: IMentor[];
	style?: TextStyle;
}

const EventInstructors: React.FC<IEventMentorsProps> = ({
	instructors = [],
	style,
}) => {
	if (!instructors || instructors.length === 0) return null;

	return (
		<>
			<RNText
				title={strings.INSTRUCTORS}
				style={[style, styles.titleStyle]}
			/>
			{instructors.map((mentor, index) => (
				<MentorItem key={index} mentor={mentor} />
			))}
		</>
	);
};

const styles = StyleSheet.create({
	row: {
		alignItems: "center",
		columnGap: horizontalScale(4),
		flexDirection: "row",
		marginTop: verticalScale(6),
		rowGap: verticalScale(4),
	},
	titleStyle: {
		...sm,
		...regular,
		alignSelf: "flex-start",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(4),
		color: content.text.body_grey_07,
		lineHeight: verticalScale(15),
		marginBottom: verticalScale(6),
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(2),
	},
});

export default EventInstructors;
