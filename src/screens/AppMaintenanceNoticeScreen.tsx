import { StackActions } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { navigator } from "@routes/rootNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { MaintenanceIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		text: { bold, semiBold, medium, reg },
	},
} = C;

const MAINTENANCE_SCHEDULE = {
	startDate: "2025-03-11",
	endDate: "2025-03-12",
	startHour: 22,
	endHour: 4,
};

const BodyComponent = () => {
	const [showMaintenance, setShowMaintenance] = useState(false);
	const onGetLocalData = (type: string) => storage.getString(type);

	useEffect(() => {
		const now = new Date();
		const currentDate = now.toISOString().split("T")[0];
		const currentHour = now.getHours();
		const { startDate, endDate, startHour, endHour } = MAINTENANCE_SCHEDULE;

		setShowMaintenance(
			(currentDate === startDate && currentHour >= startHour) ||
				(currentDate === endDate && currentHour < endHour) ||
				(currentDate > startDate && currentDate < endDate),
		);
	}, []);

	const redirectToAppStart = () => {
		const userToken: string = onGetLocalData(StorageKeys.USER_TOKEN) || "";
		if (userToken) {
			navigator.reset({
				index: 0,
				routes: [{ name: "HomeStack" }],
			});
		} else {
			navigator.dispatch(StackActions.replace("AuthStack"));
		}
	};

	return (
		<View style={styles.container}>
			<MaintenanceIcon />
			<RNText
				title={
					showMaintenance
						? strings.MAINTENANCE_IN_PROGRESS
						: strings.SCHEDULED_MAINTENANCE
				}
				style={[styles.title, semiBold]}
			/>
			<RNText
				title={
					showMaintenance
						? strings.THI_LEARNING_PORTAL_IS_CURRENTLY
						: strings.THE_LEARNING_PORTAL_WILL_UNAVAILABLE
				}
				style={[styles.text, medium]}
			/>
			<RNText
				title={
					showMaintenance
						? strings.UNDERGOING_SCHEDULED_MAINTENANCE
						: strings.MARCH_11
				}
				style={[styles.boldText, bold]}
			/>
			{showMaintenance ? (
				<RNText>
					<RNText
						title={strings.AND_WILL_BE_BACK_ONLINE}
						style={[styles.text, medium]}
					/>
					<RNText
						title={"4:00 AM (IST)."}
						style={[styles.text, bold]}
					/>
				</RNText>
			) : (
				<>
					<RNText
						title={strings.DUE_TO_MAINTENANCE_ACTIVITY}
						style={[styles.text, medium]}
					/>
					<Pressable
						style={styles.button}
						onPress={redirectToAppStart}
					>
						<RNText
							title={strings.GOT_IT}
							style={styles.buttonText}
						/>
					</Pressable>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	boldText: { color: colors.neutral.grey_07, ...reg },
	button: {
		alignItems: "center",
		backgroundColor: colors.icon.default_red,
		borderRadius: horizontalScale(4),
		height: verticalScale(50),
		justifyContent: "center",
		marginTop: verticalScale(17),
		width: "80%",
	},
	buttonText: { color: colors.neutral.white, ...reg, ...medium },
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginTop: verticalScale(20),
	},
	text: { color: colors.neutral.grey_07, ...reg },
	title: {
		color: colors.primary.red_05,
		marginBottom: horizontalScale(12),
		marginTop: verticalScale(30),
		...reg,
	},
});

const MemoizedBodyComponent = memo(BodyComponent);

const AppMaintenanceNoticeScreen = () => (
	<WithHeaderLxp BodyComponent={MemoizedBodyComponent} />
);

export default memo(AppMaintenanceNoticeScreen);
