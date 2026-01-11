import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";
import { formatWithTimeZone } from "@utils/timezoneHelper";

import { IHomeBannerSession } from "@interface/components/home/homeBanner.interface";

import { C } from "@assets/constants";
import { LiveLxp, MeetLxp } from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		align: { row, flexStart, alignCenter, justifyBetween, flex1 },
		spacing: { g8, g5 },
		text: { semiBold, md, med, medium, lg, lineHeight27 },
	},
	colors: { neutral, primary },
} = C;

const {
	BORDER: { b7 },
} = measures;

const HomeSessionBanner = ({
	endsAt,
	startsAt,
	title,
	zoomUrl,
	workshopSession,
	openZoomLink,
}: IHomeBannerSession) => {
	const timeText = `${formatWithTimeZone(`${startsAt}`)} - ${formatWithTimeZone(`${endsAt}`)}`;

	return (
		<View style={styles.container}>
			<View style={styles.liveContainer}>
				<View style={styles.liveNow}>
					<LiveLxp height={20} width={20} color={neutral.white} />
					<RNText title={strings.LIVE} style={styles.liveNowText} />
				</View>
				<RNText title={timeText} style={styles.time} />
			</View>

			<View style={styles.sessionContainer}>
				<View style={styles.session}>
					<RNText
						title={title}
						style={styles.sessionText}
						numberOfLines={2}
					/>
					<Pressable
						style={styles.sessionButton}
						onPress={() => openZoomLink(zoomUrl, workshopSession)}
					>
						<MeetLxp height={20} width={20} />

						<RNText
							title={strings.JOIN_NOW}
							style={styles.sessionButtonText}
						/>
					</Pressable>
				</View>
				<Image
					source={{ uri: IMAGE_URLS.CALENDER }}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>
		</View>
	);
};

export default HomeSessionBanner;

const styles = StyleSheet.create({
	container: {
		backgroundColor: primary.red_03,
		borderRadius: b7,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: horizontalScale(12),
		...g8,
		...flex1,
		height: verticalScale(160),
	},
	image: {
		bottom: -verticalScale(20),
		height: horizontalScale(100),
		right: -horizontalScale(14),
		width: horizontalScale(100),
	},
	liveContainer: {
		...row,
		...alignCenter,
		...g8,
	},
	liveNow: {
		...row,
		...alignCenter,
		gap: horizontalScale(4),
	},
	liveNowText: {
		...medium,
		...med,
		color: neutral.white,
	},
	session: {
		flexShrink: 1,
		...flexStart,
		...justifyBetween,
	},
	sessionButton: {
		...row,
		...alignCenter,
		...g5,
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		marginTop: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
	},
	sessionButtonText: {
		...semiBold,
		...md,
		color: neutral.white,
	},
	sessionContainer: {
		...row,
		...justifyBetween,
	},
	sessionText: {
		...semiBold,
		...lg,
		...lineHeight27,
		color: neutral.white,
		width: horizontalScale(200),
	},

	time: {
		...semiBold,
		...med,
		color: neutral.white,
	},
});
