import { type ModalOptions } from "react-native-modalfy/lib/typescript/src/types";
import { createModalStack } from "react-native-modalfy";
import measures from "@utils/measures";
import { C } from "@assets/constants";
import { StyleSheet } from "react-native";
import { strings } from "@assets/strings";
import { type IHalfBottomSheetType } from "@interface/app.interface";
import { moderateScale } from "@utils/functions";
import {
	ArtifactAttemptExpiredIcon,
	ArtifactLockedIcon,
	SuccessWithStartIcon,
	WarningIcon,
} from "@assets/icons";
import { ArtifactsIconSVG, AssetNotFoundSVG } from "./BottomSheetIcon";
import AppModalView from "./AppModal";

const {
	themes: { bg, text },
	commonStyles: {
		spacing: { p14, mt12, p16, mv16, mt36, mt32 },
		align: { flex1 },
	},
} = C;

const { SCREEN_WIDTH } = measures;

const defaultModalStyles = StyleSheet.create({
	containerStyle: {
		...flex1,
		width: SCREEN_WIDTH,
	},
	fullWidthTitle: { maxWidth: "100%" },
	iconViewStyle: { marginTop: moderateScale(26) },
	btnStyle: {
		backgroundColor: text.dark,
	},
});

const defaultModalOptions: ModalOptions = {
	backdropOpacity: 0.75,
	backdropColor: bg.dark,
	backBehavior: "pop",
	position: "center",
	containerStyle: defaultModalStyles.containerStyle,
};

const ICON_DIMENSION = {
	width: moderateScale(150),
	height: moderateScale(150),
};

const modalConfig = { AppModalView };

const modalStack = createModalStack(modalConfig, defaultModalOptions);

const learningArtifactsLockedOption: IHalfBottomSheetType = {
	icon: ArtifactsIconSVG({}),
	iconViewStyle: defaultModalStyles.iconViewStyle,
	buttonText: strings.BACK,
	backGroundColor: bg.lightOrange,
	title: strings.ARTIFACT_NOT_UNLOCKED_TITLE,
	subTitle: strings.ARTIFACT_LOCKED_DESC,
};

const learningArtifactsDesktopOption: IHalfBottomSheetType = {
	icon: AssetNotFoundSVG({ ...ICON_DIMENSION }),
	iconViewStyle: defaultModalStyles.iconViewStyle,
	buttonText: strings.BACK,
	backGroundColor: bg.lightOrange,
	title: strings.OOPS,
	subTitle: strings.ARTIFACT_ACCESS_DESKTOP_DESC,
};

const learningCourseDesktopOption: IHalfBottomSheetType = {
	icon: AssetNotFoundSVG({ ...ICON_DIMENSION }),
	iconViewStyle: defaultModalStyles.iconViewStyle,
	buttonText: strings.BACK,
	backGroundColor: bg.lightOrange,
	title: strings.OOPS,
	subTitle: strings.COURSE_ACCESS_DESKTOP_DESC,
};

const artifactLockedOption: IHalfBottomSheetType = {
	icon: ArtifactLockedIcon({}),
	title: strings.ARTIFACT_LOCKED,
	iconViewStyle: defaultModalStyles.iconViewStyle,
	subTitle: strings.ARTIFACT_LOCKED_DESC,
};

const artifactAttemptExpiredOption: IHalfBottomSheetType = {
	title: strings.UH_OH,
	iconViewStyle: defaultModalStyles.iconViewStyle,
	icon: ArtifactAttemptExpiredIcon({}),
	subTitle: strings.ARTIFACT_ATTEMPT_EXPIRED,
};

const artifactAttemptRemainingOption: IHalfBottomSheetType = {
	showBottomButton: true,
	isBottomBtnWhite: false,
	btnStyle: defaultModalStyles.btnStyle,
	buttonText: strings.UNLOCK_ASSET,
	titleStyle: defaultModalStyles.fullWidthTitle,
	iconViewStyle: defaultModalStyles.iconViewStyle,
	icon: ArtifactAttemptExpiredIcon({}),
	title: strings.ARTIFACT_UNLOCK_TITLE,
	subTitle: strings.ARTIFACT_UNLOCK_DESC,
};

const deleteAccountSheetOptions: IHalfBottomSheetType = {
	title: strings.YOUR_ACCOUNT_HAS_BEEN_DELETED,
	btnStyle: [p14, mt12],
	primaryBtnStyle: [p16, mv16],
	titleStyle: mt36,
	subTitle: strings.ACCOUNT_DELETE_SUCCESS_DES,
	icon: SuccessWithStartIcon({}),
	iconViewStyle: mt32,
	primaryButtonText: strings.DONE,
	backGroundColor: bg.lightGreen,
};

const confirmationModalOptions: IHalfBottomSheetType = {
	btnStyle: p14,
	iconViewStyle: mt32,
	primaryBtnStyle: p16,
	icon: WarningIcon({}),
	buttonText: strings.CANCEL,
	title: strings.LOG_OUT_DESC,
	primaryButtonText: strings.LOG_OUT,
	backGroundColor: bg.yellowBottomSheet,
};

export {
	modalStack,
	artifactLockedOption,
	artifactAttemptExpiredOption,
	learningArtifactsLockedOption,
	learningArtifactsDesktopOption,
	artifactAttemptRemainingOption,
	learningCourseDesktopOption,
	defaultModalOptions,
	defaultModalStyles,
	deleteAccountSheetOptions,
	confirmationModalOptions,
};
