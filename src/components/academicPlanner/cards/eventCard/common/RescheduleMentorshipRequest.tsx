import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { getMentorRescheduleRequestText } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import RNText from "@components/Reusable/RNText";

import { IMentor } from "@graphql/query/academicPlanner/interfaces";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { RescheduleIconLxp } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { regular, xSm, medium } = commonStyles.text;
const { neutral, primary, state } = colors;

interface IRescheduleMentorshipRequest {
	endsAt: string;
	startsAt: string;
	mentor?: IMentor;
	onAcceptReschedule: () => void;
	onRejectReschedule: () => void;
}

const RescheduleMentorshipRequest = ({
	endsAt,
	startsAt,
	mentor,
	onAcceptReschedule,
	onRejectReschedule,
}: IRescheduleMentorshipRequest) => {
	const { name: userTimezone } = useGetTimezone();
	const rescheduleRequestText = getMentorRescheduleRequestText({
		endsAt,
		startsAt,
		mentor,
		userTimezone,
	});

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<RescheduleIconLxp
					color={colors.neutral.grey_07}
					height={verticalScale(10)}
					width={horizontalScale(10)}
				/>
				<RNText
					title={strings.RESCHEDULE_REQUESTED}
					style={styles.rescheduleText}
				/>
			</View>

			<RNText style={styles.infoText}>{rescheduleRequestText}</RNText>

			<View style={styles.buttonContainer}>
				<Pressable onPress={onAcceptReschedule} style={styles.button}>
					<RNText style={styles.buttonText}>{strings.ACCEPT}</RNText>
				</Pressable>
				<Pressable
					onPress={onRejectReschedule}
					style={[styles.button, styles.rejectButton]}
				>
					<RNText
						style={[styles.buttonText, styles.rejectButtonText]}
					>
						{strings.DECLINE}
					</RNText>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderColor: state.success_green,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		color: neutral.white,
		paddingVertical: verticalScale(6),
		width: horizontalScale(80),
	},
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(16),
		marginTop: verticalScale(12),
	},
	buttonText: {
		color: state.success_green,
		...medium,
	},
	container: {
		borderColor: neutral.grey_03,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		marginTop: verticalScale(16),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(8),
	},
	headingContainer: {
		alignItems: "center",
		columnGap: horizontalScale(4),
		flexDirection: "row",
	},
	infoText: {
		...regular,
		...xSm,
		color: neutral.grey_07,
		marginTop: verticalScale(4),
	},
	rejectButton: {
		borderColor: primary.red_06,
	},
	rejectButtonText: {
		color: primary.red_06,
	},
	rescheduleText: {
		...medium,
		...xSm,
		color: primary.red_05,
	},
});

export default RescheduleMentorshipRequest;
