import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { storage } from "@config/mmkvStorage";

import { BottomButton } from "@interface/app.interface";

import StorageKeys from "@constants/storage.constants";

import { colors } from "@assets/colors";
import { CheckboxIcon, TickboxIcon } from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img/index";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { reg, light, semiBold, xlg },
} = commonStyles;

const { state, neutral } = colors;

interface ISkipModal {
	isOpen: boolean;
	onClose: (data: string) => void;
	assessmentAttemptId?: string;
	questionHandler: (data: string) => void;
}
const SkipModal = ({
	isOpen,
	onClose,
	questionHandler,
	assessmentAttemptId,
}: ISkipModal) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const skipAnyWay = async (type: string) => {
		const getAttempt: any = await storage.getString(
			StorageKeys.ASSESSMENT_SKIP_ENABLED,
		);
		const parsedGetAttempt = getAttempt !== "undefined" ? getAttempt : "";
		let createArra: never[] =
			parsedGetAttempt && Array.isArray(JSON.parse(parsedGetAttempt))
				? JSON.parse(parsedGetAttempt)
				: [];

		createArra = createArra?.filter(
			(i: string) => i === assessmentAttemptId,
		);
		if (isChecked) {
			if (createArra?.length > 0) {
				createArra = createArra?.filter(
					(i: string) => i !== assessmentAttemptId,
				);
			} else {
				createArra.push(assessmentAttemptId);
			}
		}
		await storage.set(
			StorageKeys.ASSESSMENT_SKIP_ENABLED,
			JSON.stringify(createArra),
		);
		questionHandler(type);
	};
	const ICON_SIZE = {
		width: 25,
		height: 25,
	};
	return (
		<ConfirmationModal
			visible={isOpen}
			onClose={() => onClose("")}
			icon={IMAGE_URLS.SKIP_WARNING_SIGN}
			bgColor={state.warning_light_yellow}
		>
			<View style={styles.testStyle}>
				<RNText style={styles.unattemptedText}>
					{strings.CANNOTCOMEBACK}
				</RNText>
			</View>
			<TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
				<View style={styles.checkboxView}>
					{isChecked ? (
						<TickboxIcon {...ICON_SIZE} />
					) : (
						<CheckboxIcon {...ICON_SIZE} />
					)}

					<RNText style={styles.timeLeftText}>
						{strings.DONTSHOWAGAIN}
					</RNText>
				</View>
			</TouchableOpacity>

			<View style={styles.containerBoxes}>
				<TouchableOpacity
					style={styles.modalFullWidthButton}
					onPress={() => {
						skipAnyWay(BottomButton.NEXT);
					}}
				>
					<RNText style={styles.modalButtonText1}>
						{strings.SKIP_ANYWAY}
					</RNText>
				</TouchableOpacity>
			</View>
		</ConfirmationModal>
	);
};

export default SkipModal;

const styles = StyleSheet.create({
	checkboxView: {
		alignItems: "center",
		flexDirection: "row",
		gap: moderateScale(10),
		marginBottom: verticalScale(20),
	},
	containerBoxes: {
		alignItems: "center",
		gap: verticalScale(20),
		justifyContent: "flex-end",
		marginBottom: verticalScale(15),
		width: "100%",
	},
	modalButtonText1: {
		color: neutral.white,
		fontWeight: "bold",
	},
	modalFullWidthButton: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderRadius: 5,
		padding: horizontalScale(15),
		width: "100%",
	},
	testStyle: {
		marginBottom: verticalScale(24),
		maxWidth: "80%",
	},
	timeLeftText: {
		color: neutral.black,
		...reg,
		...light,
		textAlign: "center",
	},
	unattemptedText: {
		color: neutral.black,
		...semiBold,
		...xlg,
		marginBottom: verticalScale(10),
		textAlign: "center",
	},
});
