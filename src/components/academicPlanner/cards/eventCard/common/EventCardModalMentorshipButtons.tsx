import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, semiBold } = commonStyles.text;
const { neutral } = colors;

interface IEventCardModalMentorshipButtons {
	onCancel: () => void;
	onReschedule: () => void;
}

const EventCardModalMentorshipButtons = ({
	onCancel,
	onReschedule,
}: IEventCardModalMentorshipButtons) => (
	<View style={styles.container}>
		<Pressable style={styles.button} onPress={onCancel}>
			<RNText title={strings.CANCEL} style={styles.text} />
		</Pressable>
		<Pressable style={styles.button} onPress={onReschedule}>
			<RNText
				title={strings.RE_SCHEDULE_WITHOUT_SPACE}
				style={styles.text}
			/>
		</Pressable>
	</View>
);

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(4),
		borderWidth: horizontalScale(1),
		flex: 1,
		paddingVertical: verticalScale(12),
	},
	container: {
		columnGap: horizontalScale(12),
		flexDirection: "row",
		justifyContent: "space-between",
	},
	disabled: {
		backgroundColor: colors.neutral.grey_09,
		borderWidth: 0,
	},
	disabledText: {
		color: neutral.white,
	},
	text: {
		...md,
		...semiBold,
		color: neutral.black,
	},
});

export default EventCardModalMentorshipButtons;
