import React from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { colors } from "@assets/colors";
import { LockedIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { lg, medium, bold },
} = commonStyles;

const { state, neutral } = colors;

interface ILockedAssetModal {
	isLockedModalVisible: boolean;
	setIsLockedModalVisible: (val: boolean) => void;
	lockedUntil: string | null;
	calendarTimeZone: string;
}

const LockedAssetModal = ({
	isLockedModalVisible,
	setIsLockedModalVisible,
	lockedUntil,
	calendarTimeZone,
}: ILockedAssetModal) => (
	<ActionModal
		isOpen={isLockedModalVisible}
		closeModal={() => setIsLockedModalVisible(false)}
		style={styles.modal}
	>
		<View style={styles.overlay} />
		<View style={styles.container}>
			<LockedIcon
				height={verticalScale(160)}
				width={horizontalScale(160)}
			/>

			<RNText title={strings.CONTENT_EXPIRED} style={styles.heading} />

			<RNText
				title={strings.ASSET_AVAIL_UNTIL}
				style={styles.description}
			>
				<RNText
					style={styles.descriptionHighlight}
					title={
						lockedUntil ? ` ${formatDateByTime(lockedUntil)}` : ""
					}
				/>
				<RNText title={strings.NO_LONGER_AVAIL} />
			</RNText>

			<CommonButton
				title={strings.DISMISS}
				onPress={() => setIsLockedModalVisible(false)}
				variant={IButtonVariant.Primary}
				style={styles.button}
			/>
		</View>
	</ActionModal>
);

export default LockedAssetModal;

const styles = StyleSheet.create({
	button: {
		marginTop: verticalScale(24),
	},
	container: {
		alignItems: "center",
		paddingBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
	},
	description: {
		color: neutral.grey_06,
		...medium,
		lineHeight: verticalScale(20),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	descriptionHighlight: {
		color: neutral.black,
	},
	heading: {
		color: neutral.black,
		...bold,
		...lg,
	},
	modal: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	overlay: {
		backgroundColor: state.warning_light_yellow,
		borderTopLeftRadius: horizontalScale(8),
		borderTopRightRadius: horizontalScale(8),
		height: verticalScale(80),
		position: "absolute",
		width: "100%",
	},
});
