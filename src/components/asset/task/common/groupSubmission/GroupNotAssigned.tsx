import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { GroupIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { cta } = colors;

const {
	text: { regular, xxSm, bold },
} = commonStyles;

interface IGroupNotAssigned {
	style?: StyleProp<ViewStyle>;
}

const GroupNotAssigned = ({ style }: IGroupNotAssigned) => (
	<View style={[styles.container, style]}>
		<View style={styles.circleStyle}>
			<GroupIcon />
		</View>
		<View style={styles.textContainer}>
			<RNText
				style={styles.nameText}
				title={strings.GROUP_NOT_ASSIGNED}
			/>
			<RNText
				style={styles.descriptionText}
				title={strings.PLEASE_CONTACT_YOUR}
			/>
		</View>
	</View>
);

const styles = StyleSheet.create({
	circleStyle: {
		alignItems: "center",
		backgroundColor: colors.state.success_light_green,
		borderRadius: horizontalScale(15),
		height: verticalScale(30),
		justifyContent: "center",
		width: horizontalScale(30), //TODO
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
	},
	descriptionText: {
		color: cta.text.default_secondary,
		...xxSm,
		...regular,
		lineHeight: verticalScale(15),
	},
	nameText: {
		color: cta.text.default_secondary,
		...xxSm,
		...bold,
		lineHeight: verticalScale(15),
	},
	textContainer: {
		flex: 1,
		marginLeft: horizontalScale(5),
		marginTop: verticalScale(1),
	},
});

export default GroupNotAssigned;
