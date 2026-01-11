import React, { memo } from "react";
import { C } from "@assets/constants";
import { AlertIcon } from "@assets/icons";
import { StyleSheet } from "react-native";
import RNText from "./RNText";
import * as Animatable from "react-native-animatable";
import { IEntranceAnimation } from "@interface/app.interface";
import { verticalScale } from "../../utils/functions";

const {
	themes: { primary },
	commonStyles: {
		spacing: { g4 },
		text: { sm, bold },
		align: { rowStart },
	},
} = C;

function AuthInputError({ message }: { message?: string }) {
	if (!message) {
		return null;
	}
	return (
		<Animatable.View
			style={[
				g4,
				rowStart,
				{
					alignSelf: "flex-start",
					marginLeft: verticalScale(6),
					marginTop: verticalScale(5),
				},
			]}
			duration={400}
			animation={IEntranceAnimation.FadeIn}
		>
			<AlertIcon />
			<RNText title={message} style={[sm, bold, styles.errTxt]} />
		</Animatable.View>
	);
}

export default memo(AuthInputError);

const styles = StyleSheet.create({
	errTxt: {
		color: primary.error,
	},
});
