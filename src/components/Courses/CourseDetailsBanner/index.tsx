import React, { memo } from "react";
import { C } from "@assets/constants";
import { StyleSheet, View } from "react-native";
import RNText from "@components/Reusable/RNText";
import { horizontalScale, verticalScale } from "@utils/functions";
import { TriangleIcon } from "@assets/icons";
import WeekItem from "../WeekItem";

const {
	themes: { bg, snackbar, text },
	commonStyles: {
		spacing: { pl10, mh6, mt10, ml16 },
		align: { rowStart, row },
		text: { bold, clrWhite, md, med, reg, txtCenter },
	},
} = C;

interface ICourseDetailsBannerType {
	mainText?: string;
	daysLeft?: number | string;
	freeTrial?: boolean;
	error?: boolean;
	icon?: JSX.Element;
	milestoneText?: string;
	weekText?: string;
}

function CourseDetailsBanner({
	mainText,
	daysLeft,
	freeTrial,
	error,
	icon,
	milestoneText,
	weekText,
}: ICourseDetailsBannerType) {
	return (
		<>
			{freeTrial || daysLeft ? (
				<View style={row}>
					<View
						style={[
							styles.main,
							{
								backgroundColor: error
									? text.drkOrange
									: snackbar.success,
							},
						]}
					>
						{freeTrial ? (
							<>
								<RNText
									title={mainText ?? ""}
									style={styles.mainTextStyle}
									numberOfLines={1}
								/>
								<View style={styles.iconStyle} />
								{icon}
							</>
						) : null}
						<RNText
							title={`${daysLeft ?? ""}`}
							style={styles.dayLeft}
						/>
					</View>
					<TriangleIcon
						color={error ? text.drkOrange : snackbar.success}
					/>
				</View>
			) : null}

			{milestoneText ? (
				<>
					<RNText
						title={milestoneText}
						style={[md, bold, clrWhite]}
					/>

					{weekText ? <WeekItem title={weekText ?? ""} /> : null}
				</>
			) : null}
		</>
	);
}

const styles = StyleSheet.create({
	main: {
		marginLeft: horizontalScale(-22),
		...rowStart,
		...pl10,
	},

	iconStyle: {
		width: horizontalScale(1.5),
		...mh6,
		backgroundColor: bg.divider,
		height: verticalScale(15),
	},
	dayLeft: {
		...clrWhite,
		...mh6,
		...med,
		...txtCenter,
		...bold,
	},
	mainTextStyle: {
		...clrWhite,
		...txtCenter,
		...bold,
		...mh6,
	},
	txtStyle: { ...clrWhite, ...txtCenter, ...bold, ...reg },
});

export default memo(CourseDetailsBanner);
