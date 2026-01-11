import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import CustomButton from "@components/Reusable/Buttons/CustomButton";
import RNText from "@components/Reusable/RNText";

import { C } from "@assets/constants";
import { CheckMarkGreenCircleIcon } from "@assets/icons";

const {
	strings,
	themes: { primary },
	commonStyles: {
		spacing: { g6, p12 },
		text: { clrBlue, bold, reg },
		align: { rowBetween, flex1, rowStart },
	},
} = C;

const TicketClosedFooter = ({
	onFooterHandler,
}: {
	onFooterHandler: () => void;
}) => (
	<View style={styles.closedFooterCard}>
		<View style={styles.childView}>
			<CheckMarkGreenCircleIcon />
			<RNText
				style={styles.reopenTxt}
				title={strings.TICKET_CLOSE_DESC}
			/>
		</View>
		<CustomButton
			isTransparent
			title={strings.REOPEN}
			titleStyle={styles.underLine}
			onBtnHandler={onFooterHandler}
		/>
	</View>
);

export default memo(TicketClosedFooter);

const styles = StyleSheet.create({
	childView: {
		...g6,
		...flex1,
		...rowStart,
	},
	closedFooterCard: {
		...g6,
		...p12,
		...rowBetween,
		backgroundColor: primary.color1,
		boxShadow: "0px -4px 0px rgba(0, 0, 0, 0.05)",
	},
	reopenTxt: {
		...reg,
		...bold,
		...clrBlue,
		maxWidth: "75%",
	},
	underLine: { textDecorationLine: "underline" },
});
