import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IEventCardViewProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventButton from "@components/academicPlanner/common/EventButton";
import EventDetails from "@components/academicPlanner/common/EventDetails";
import EventInfo from "@components/academicPlanner/common/EventInfo";
import EventStatus from "@components/academicPlanner/common/EventStatus";
import EventTitle from "@components/academicPlanner/common/EventTitle";
import EventType from "@components/academicPlanner/common/EventType";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { xxSm, sm, regular, semiBold } = commonStyles.text;
const { content } = colors;

const EventCardView: React.FC<IEventCardViewProps> = ({
	eventType,
	eventStatus,
	eventTitle,
	eventData,
	eventInfo,
	viewedInfo,
	ctaType,
	onCTAClick,
	onViewModal,
	isBtnDisabled,
	style,
	showButton,
}) => {
	const arebothInformationPresent = viewedInfo && eventInfo;
	return (
		<Pressable onPress={onViewModal} style={[styles.cardContainer, style]}>
			<View style={styles.row}>
				<EventType eventType={eventType} />
				<EventStatus eventStatus={eventStatus} />
			</View>
			<EventTitle title={eventTitle} style={styles.titleTextStyle} />
			<EventDetails
				eventData={eventData}
				textStyle={styles.contentTextStyle}
			/>
			<View style={styles.infoStyle}>
				<View style={styles.eventInfoContainer}>
					<EventInfo eventInfo={eventInfo} />
					{arebothInformationPresent && <RNText title="|" />}
					<EventInfo eventInfo={viewedInfo} />
				</View>

				{showButton && (
					<EventButton
						ctaType={ctaType}
						onCTAClick={onCTAClick}
						style={styles.ctaStyle}
						isBtnDisabled={isBtnDisabled}
					/>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	attendanceIconStyle: {
		height: verticalScale(12),
		width: horizontalScale(12),
	},
	cardContainer: {
		backgroundColor: colors.bg.fill.bg_default,
		borderColor: colors.neutral.grey_04,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		padding: horizontalScale(8),
	},
	contentTextStyle: {
		...xxSm,
		...regular,
		color: colors.content.text.body_grey_07,
		lineHeight: verticalScale(15),
	},
	ctaStyle: { alignSelf: "flex-end" },
	eventInfoContainer: {
		flexDirection: "row",
		gap: verticalScale(5),
	},
	infoStyle: {
		alignItems: "flex-end",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	row: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleTextStyle: {
		...sm,
		...semiBold,
		color: content.text.default_black,
		lineHeight: verticalScale(15),
		marginVertical: verticalScale(10),
	},
});

export default EventCardView;
