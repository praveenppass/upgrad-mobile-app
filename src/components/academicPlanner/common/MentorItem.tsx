import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { IMentor } from "@graphql/query/academicPlanner/interfaces";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { UserLxpIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, regular } = commonStyles.text;
const { content, neutral } = colors;

const MODAL_ICON_DIMENSIONS = {
	width: horizontalScale(16),
	height: verticalScale(16),
};
interface IMentorItemProps {
	mentor: IMentor;
}
const MentorItem: React.FC<IMentorItemProps> = ({ mentor }) => {
	const fullName =
		`${mentor?.firstName?.trim() ?? ""} ${mentor?.lastName?.trim() ?? ""}`.trim();

	if (!fullName) return <></>;

	return (
		<View style={styles.row}>
			<UserLxpIcon
				color={colors.neutral.grey_07}
				{...MODAL_ICON_DIMENSIONS}
			/>
			<RNText title={fullName} style={styles.contentTextStyle} />
		</View>
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

export default MentorItem;
