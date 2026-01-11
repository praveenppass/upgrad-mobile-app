import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import RNText from "@components/Reusable/RNText";
import { C } from "@assets/constants";
import GlobeBottomSheetController from "@components/Modals/GlobeBottomSheetController";
import usePenaltyController from "@hooks/usePenaltyController";
import { ExtensionRequest } from "@interface/milestonetype.interface";
import { IHalfBottomSheetType } from "@interface/app.interface";
import { ArtifactAttemptExpiredIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { horizontalScale } from "@utils/functions";

const {
	themes: { text, bg },
	commonStyles: {
		spacing: { p14, mv4, mv2, mt32, p16 },
		align: {},
		text: { med, bold },
	},
} = C;

interface IExtensionProps {
	date?: string;
	deadlineReferredFrom?: string;
	extensionRequests?: ExtensionRequest[] | null;
	disabled?: boolean | null;
	assetCode?: string | number;
	availableFrom?: string;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	title?: string;
	pullDownToRefresh?: any;
}
const Extension = ({
	date,
	disabled,
	deadlineReferredFrom,
	extensionRequests,
	assetCode,
	availableFrom,
	level4,
	title,
	level3,
	level2,
	moduleCode,
	pullDownToRefresh,
}: IExtensionProps) => {
	const {
		extensionState,
		ExtensionOnConfirm,
		hideModalAction,
		primaryButtonText,
		subTitleTxt,
		extensionTitle,
		dueDateObject,
		currentDate,
		availableExtensions,
	} = usePenaltyController({
		date,
		disabled,
		extensionRequests,
		assetCode,
		availableFrom,
		deadlineReferredFrom,
		level4,
		level2,
		level3,
		title,
		moduleCode,
		pullDownToRefresh,
	});

	const extensionModalFn = () => {
		const bottomSheetOptions: IHalfBottomSheetType = {
			btnStyle: p14,
			showBottomButton: true,
			icon: <ArtifactAttemptExpiredIcon />,
			backGroundColor: bg.yellowBottomSheet,
			iconViewStyle: mt32,
			primaryBtnStyle: p16,
			buttonText: strings.BACK,
			title: extensionTitle,
			subTitle: subTitleTxt,
			primaryButtonPress: ExtensionOnConfirm,
			onButtonPress: hideModalAction,
			primaryButtonText,
		};
		GlobeBottomSheetController.showModal(bottomSheetOptions);
	};

	return (
		<>
			{!availableFrom &&
			dueDateObject < currentDate ? null : availableExtensions > 0 ||
			  extensionState == strings.CANCEL_EXTENSION ? (
				<TouchableOpacity onPress={extensionModalFn}>
					<RNText title={extensionState} style={styles.text} />
				</TouchableOpacity>
			) : null}
		</>
	);
};
export default Extension;

const styles = StyleSheet.create({
	text: {
		color: text.skyBlue,
		textDecorationLine: "underline",
		...med,
		...bold,
		...mv2,
	},
});
