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
	mentors?: IMentor[];
	style?: TextStyle;
}

const EventMentors: React.FC<IEventMentorsProps> = ({
	mentors = [],
	style,
}) => {
	if (!mentors || mentors.length === 0) return null;

	return (
		<>
			<RNText title={strings.MENTOR} style={[style, styles.titleStyle]} />
			{mentors.map((mentor, index) => (
				<MentorItem key={index} mentor={mentor} />
			))}
		</>
	);
};

const styles = StyleSheet.create({
	contentTextStyle: {
		...sm,
		...regular,
		color: content.text.body_grey_07,
		lineHeight: verticalScale(18),
	},

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

export default EventMentors;
