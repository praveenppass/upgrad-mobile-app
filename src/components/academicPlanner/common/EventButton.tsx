import React from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { getEventButtonText } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import type { IEventButtonTypes } from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta } = colors;
const { sm, md, semiBold } = commonStyles.text;

interface IEventButtonProps {
	ctaType: IEventButtonTypes;
	isBtnDisabled: boolean;
	onCTAClick: () => void;
	style?: ViewStyle;
	isModal?: boolean;
}

const EventButton: React.FC<IEventButtonProps> = ({
	ctaType,
	onCTAClick,
	style,
	isModal = false,
	isBtnDisabled = false,
}) => {
	const { title, ctaColor } = getEventButtonText(ctaType);
	const disabledColors = [cta.fill.disable, cta.fill.disable];
	const buttonStyles = isModal ? styles.largeButton : styles.button;
	const gradientStyles = isModal
		? styles.largeLinearGradientStyle
		: styles.linearGradientStyle;
	const textStyles = isModal ? styles.largeCtaText : styles.ctaText;
	const contentStyles = isModal
		? styles.modalButtonContent
		: styles.defaultButtonContent;

	return (
		<Pressable style={[buttonStyles, style]} onPress={() => onCTAClick()}>
			<LinearGradient
				colors={isBtnDisabled ? disabledColors : ctaColor}
				style={gradientStyles}
			>
				<View style={contentStyles}>
					<RNText style={textStyles} title={title} />
				</View>
			</LinearGradient>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: { alignSelf: "flex-end" },
	ctaText: {
		color: cta.text.default_primary,
		...sm,
		...semiBold,
		lineHeight: verticalScale(18),
	},
	defaultButtonContent: {
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(6),
	},
	largeButton: {
		alignItems: "center",
		borderRadius: horizontalScale(4),
		justifyContent: "center",
		marginTop: verticalScale(40),
		paddingVertical: verticalScale(14),
		width: "100%",
	},
	largeCtaText: {
		color: cta.text.default_primary,
		...md,
		...semiBold,
		lineHeight: verticalScale(21),
		textAlign: "center",
	},

	largeLinearGradientStyle: {
		alignItems: "center",
		borderRadius: horizontalScale(4),
		justifyContent: "center",
		width: "100%",
	},
	linearGradientStyle: {
		alignItems: "center",
		alignSelf: "flex-start",
		borderRadius: horizontalScale(6),
		justifyContent: "center",
		minWidth: horizontalScale(84),
	},
	modalButtonContent: {
		paddingVertical: verticalScale(14),
	},
});

export default EventButton;
