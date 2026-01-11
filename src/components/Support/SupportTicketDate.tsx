import React, { memo } from "react";
import { C } from "@assets/constants";
import { StyleSheet, View } from "react-native";
import RNText from "@components/Reusable/RNText";

const {
	themes: { border },
	commonStyles: {
		align: { rowBetween, flex1 },
		spacing: { g8, p4 },
		text: { md, clrLightBlue },
	},
} = C;

const SupportTicketDate = ({ date }: { date: string }) => (
	<View style={styles.dContainer}>
		<View style={styles.line} />
		<RNText style={styles.dateTxt} title={date} />
		<View style={styles.line} />
	</View>
);

export default memo(SupportTicketDate);

const styles = StyleSheet.create({
	dContainer: {
		...g8,
		...p4,
		...rowBetween,
		paddingHorizontal: 0,
	},
	line: {
		...flex1,
		height: 1,
		width: "100%",
		backgroundColor: border.color1,
	},
	dateTxt: {
		...md,
		...clrLightBlue,
	},
});
