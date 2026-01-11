import React, { memo } from "react";
import { C } from "@assets/constants";
import { Pressable } from "react-native";
import { openUrl } from "@utils/functions";
import { StyleSheet, View } from "react-native";
import { SUPPORT_EMAIL } from "@utils/constants";
import RNText from "@components/Reusable/RNText";

const {
	strings,
	commonStyles: {
		align: { itemsCenter },
		text: { md, clrGray, txtCenter, bold, clrDarkBlack },
	},
} = C;

const AssessmentLockMessage = ({
	title,
	desc,
}: {
	title: string;
	desc?: string;
}) => {
	const onLinkPress = () => {
		openUrl(`mailto:${SUPPORT_EMAIL}`);
	};
	return (
		<View style={[itemsCenter, styles.errDescContainer]}>
			<RNText numberOfLines={2} style={styles.errTxt} title={title} />
			{desc ? (
				<RNText
					title={desc}
					numberOfLines={2}
					ellipsizeMode="tail"
					style={[styles.errTxt, styles.txtDark]}
				/>
			) : null}
			<Pressable>
				<RNText style={styles.errTxt} title={strings.CONTACT}>
					<RNText
						onPress={onLinkPress}
						style={[styles.errTxt, styles.txtDark]}
						title={SUPPORT_EMAIL}
					/>
				</RNText>
			</Pressable>
			<RNText style={styles.errTxt} title={strings.CONTACT_DESC} />
		</View>
	);
};

export default memo(AssessmentLockMessage);

const styles = StyleSheet.create({
	errDescContainer: { width: "85%" },
	errTxt: {
		...md,
		...clrGray,
		...txtCenter,
		maxWidth: "90%",
	},
	txtDark: {
		...bold,
		...clrDarkBlack,
	},
});
