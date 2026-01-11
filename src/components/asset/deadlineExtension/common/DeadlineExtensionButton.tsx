import React from "react";
import { StyleSheet } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";

import { verticalScale } from "@utils/functions";

interface IDeadlineExtensionButton {
	ctaText: string;
	ctaPress: () => void;
	ctaDisabled: boolean;
}

const DeadlineExtensionButton = ({
	ctaText,
	ctaPress,
	ctaDisabled,
}: IDeadlineExtensionButton) => {
	if (!ctaText) return <></>;

	return (
		<CommonButton
			isDisabled={ctaDisabled}
			title={ctaText}
			onPress={() => ctaPress?.()}
			variant={IButtonVariant.Tertiary}
			style={styles.extendBtn}
		/>
	);
};

export default DeadlineExtensionButton;

const styles = StyleSheet.create({
	extendBtn: {
		marginVertical: verticalScale(14),
	},
});
