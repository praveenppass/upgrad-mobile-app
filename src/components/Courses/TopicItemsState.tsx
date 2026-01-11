import moment from "moment-timezone";
import React, { memo, useEffect, useState } from "react";
import {
	type StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "react-native";
import { useSelector } from "react-redux";

import { createAssetIcon } from "@components/IconComponents/asseticon.utils";
import { ArtifactsIconSVG } from "@components/Modals/BottomSheetIcon";
import BottomSheetWrapper from "@components/Modals/BottomSheetWrapper";
import GlobeBottomSheetController from "@components/Modals/GlobeBottomSheetController";
import { HalfBottomSheet } from "@components/Modals/HalfBottomSheet";
import AssetExtension from "@components/Penalty/AssetExtension";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";
import usePenalty from "@hooks/usePenalty";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";
import {
	formatDateByTime,
	getDateTwoDaysPriorFormatted,
} from "@utils/timezoneHelper";

import { RootState } from "@redux/store/root.reducer";

import { IDateFormat, IHalfBottomSheetType } from "@interface/app.interface";
import {
	IAssetStatusEnum,
	IAssetType,
	IDueDateExtension,
} from "@interface/asset.interface";
import { ExtensionRequest } from "@interface/milestonetype.interface";

import { C } from "@assets/constants";
import { ArtifactAttemptExpiredIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	themes: { bg, text, border, primary },
	commonStyles: {
		spacing: { pl8, pt4, pr6, p8, mh10, mr16, p14, mt32, p16 },
		components: { cardViewStyle },
		align: { rowStart, flex1 },
		text: { clrBlue, sm, md, bold, w400 },
	},
} = C;

const {
	BORDER: { b4 },
} = measures;

interface ITopicItemsStateTypes {
	disabled?: boolean | null;
	title: string;
	state?: IAssetStatusEnum;
	isDueDateCrossed?: boolean;
	dueDate?: string;
	onTopicItemPress?: () => void;
	containerStyles?: StyleProp<ViewStyle>;
	assetType?: IAssetType;
	yetToStart?: boolean;
	startDate?: string;
	isSelected?: boolean;
	isScreenAsset?: boolean;
	extensionRequests?: ExtensionRequest[] | null;
	assetCode?: string | number;
	deadlineReferredFrom?: string;
	availableTill?: string;
	isOptional?: boolean;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	pullDownToRefresh?: any;
}

const dueDatePassed = (
	graceDays: number,
	userTimezone: string,
	state?: IAssetStatusEnum,
	endDate?: string,
): boolean => {
	if (endDate && state != IAssetStatusEnum.completed) {
		const currentDate = moment().tz(userTimezone);
		const inputDate = moment(endDate)
			.tz(userTimezone)
			.add(graceDays, "days");

		return currentDate.isAfter(inputDate);
	}
	return false;
};

const TopicItemsState = ({
	disabled,
	title,
	state,
	extensionRequests,
	isDueDateCrossed,
	dueDate,
	yetToStart,
	startDate,
	containerStyles,
	onTopicItemPress,
	assetType,
	isSelected,
	assetCode,
	isScreenAsset,
	deadlineReferredFrom,
	isOptional,
	level4,
	availableTill,
	level3,
	level2,
	moduleCode,
	pullDownToRefresh,
}: ITopicItemsStateTypes) => {
	const { name: userTimezone } = useGetTimezone();
	const { onCancelExtensionHandler, onExtensionHandler } = usePenalty({
		assetCode,
		level2,
		level3,
		level4,
		moduleCode,
		pullDownToRefresh,
	});

	const continueAsset = useSelector(
		(state: RootState) => state.studyPlan?.continueAsset,
	);
	const selectedCourseDetails = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseDetails,
	);

	const { extensionModal } = useSelector((state: RootState) => state.modal);
	const [dueDateColor, setDueDateColor] = useState("");
	const [dueDateState, setDueDateState] = useState<string | number | null>(
		"",
	);
	const [extensionState, setExtensionState] = useState<
		string | number | null
	>("");

	const graceDays =
		selectedCourseDetails?.userProgram?.program
			?.noOfDaysFromAssetPostDueDate ?? 0;

	const startsAt = startDate
		? moment(startDate).tz(userTimezone).format(IDateFormat.date)
		: null;

	const formattedDueDate = dueDate ? `${formatDateByTime(`${dueDate}`)}` : "";

	const dueDateObject = new Date(dueDate);
	const currentDate = new Date();
	const todayDate = moment().tz(userTimezone);

	const totalExtensionsAllowed =
		selectedCourseDetails?.userProgram?.program.totalExtensionsAllowed ?? 0;

	const totalExtensionsTaken =
		selectedCourseDetails?.userProgram?.totalExtensionsTaken ?? 0;

	const dueDateExtensionMode =
		selectedCourseDetails?.userProgram?.program.dueDateExtensionMode ?? "";

	const availableExtensions = totalExtensionsAllowed - totalExtensionsTaken;

	const cancel = dueDate
		? `${getDateTwoDaysPriorFormatted(
				`${dueDate}`,
				selectedCourseDetails?.userProgram?.program?.hardDeadlineDays,
			)}`
		: "";

	const availableFromDate = startDate
		? `${formatDateByTime(`${startDate}`)}`
		: "";

	const availableTillDate = availableTill
		? `${formatDateByTime(`${availableTill}`)}`
		: "";

	useEffect(() => {
		if (dueDate !== undefined && dueDate !== null && !disabled) {
			const extensionInfoCheck =
				Array.isArray(extensionRequests) && extensionRequests.length > 0
					? true
					: false;
			if (
				extensionRequests != null &&
				extensionRequests != undefined &&
				extensionInfoCheck
			) {
				setDueDateState(`${strings.NEW_DUE_DATE}: ${formattedDueDate}`);
			} else {
				setDueDateState(`${strings.DUE_DATE}: ${formattedDueDate}`);
			}
			const twoDaysFromNow = new Date();
			twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

			if (
				dueDateObject > currentDate &&
				dueDateObject <= twoDaysFromNow
			) {
				setDueDateColor(bg.reschedule);
			} else if (dueDateObject < currentDate) {
				setDueDateColor(text.drkOrange);
			} else {
				setDueDateColor(border.green);
			}

			if (
				availableExtensions > 0 &&
				dueDateExtensionMode == IDueDateExtension.DUE_DATE_EXTENSION &&
				!extensionInfoCheck
			) {
				setExtensionState(`${strings.NEED_EXTENSION}`);
			} else if (
				extensionRequests != null &&
				dueDateExtensionMode == IDueDateExtension.DUE_DATE_EXTENSION &&
				extensionInfoCheck
			) {
				setExtensionState(`${strings.CANCEL_EXTENSION}`);
			}
		}
	}, [dueDate, disabled, extensionRequests]);

	const hideModalAction = () => {
		GlobeBottomSheetController.hideModal();
	};

	const ExtensionOnConfirm = () => {
		if (extensionState === strings.CANCEL_EXTENSION) {
			const onCompleteCancel = () => {
				setExtensionState(strings.NEED_EXTENSION);
				setDueDateState(`${strings.DUE_DATE}: ${formattedDueDate}`);
			};
			onCancelExtensionHandler(onCompleteCancel);
		} else {
			const onChangeToCancel = () => {
				setExtensionState(strings.CANCEL_EXTENSION);
				setDueDateState(`${strings.NEW_DUE_DATE}: ${formattedDueDate}`);
			};
			onExtensionHandler(onChangeToCancel);
		}
	};
	const extensionTitle = `${
		extensionState === strings.CANCEL_EXTENSION
			? strings.CANCEL_EXTENSION_TXT
			: strings.EXTENSION_TXT
	} - ${title}`;

	const subTitleTxt =
		availableExtensions === 1
			? `${strings.NO_EXTENSION_LEFT}`
			: extensionState === strings.CANCEL_EXTENSION
				? `${strings.ON_CANCEL_ASSIGNMENT} ${cancel} ${strings.AVOID_PENALTY}`
				: `${strings.NO_MORE_EXTENSION} ${availableExtensions - 1} ${
						strings.LEFT_FOR_SUBMISSION
					}`;

	const primaryButtonText =
		extensionState === strings.CANCEL_EXTENSION
			? strings.CANCEL_EXTENSION
			: strings.GET_EXTENSION;

	const extensionModalFn = () => {
		const bottomSheetOptions: IHalfBottomSheetType = {
			btnStyle: p14,
			showBottomButton: true,
			icon: <ArtifactAttemptExpiredIcon />,
			backGroundColor: bg.yellowBottomSheet,
			backgroundColor: bg.yellowBottomSheet,
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

	const availableTillPopup = () => {
		const bottomSheetOptions: IHalfBottomSheetType = {
			showBottomButton: true,
			buttonText: strings.BACK,
			onButtonPress: hideModalAction,
			icon: <ArtifactsIconSVG />,
			backGroundColor: bg.lightOrange,
			title: strings.ARTIFACT_NOT_UNLOCKED_TITLE,
			subTitle: `${strings.ARTIFACTS_TITLE} ${availableTillDate}.${strings.ARTIFACTS_SUB_TITLE}`,
			subTitleStyle: clrBlue,
			bottomSheetVisible: false,
		};
		GlobeBottomSheetController.showModal(bottomSheetOptions);
	};

	const handlePress = () => {
		const isAvailableTillInFuture =
			availableTill &&
			moment(availableTill).tz(userTimezone).isBefore(todayDate);

		if (
			isAvailableTillInFuture ||
			(yetToStart &&
				state !== IAssetStatusEnum.completed &&
				assetType !== IAssetType.ASSESSMENT)
		) {
			availableTillPopup();
		} else {
			onTopicItemPress();
		}
	};
	const isStartDateBeforeCurrent =
		startDate !== undefined &&
		startDate !== null &&
		startDate &&
		moment(startDate).tz(userTimezone).isAfter(todayDate);

	const isDisabled = () => {
		if (!startDate) {
			return false;
		}
		if (disabled && !availableTill) {
			return true;
		}
		if (availableTill) {
			const isStartAfterCurrent = moment(startDate)
				.tz(userTimezone)
				.isAfter(todayDate);
			const isAvailableTillAfterCurrent = moment(availableTill)
				.tz(userTimezone)
				.isAfter(todayDate);

			return isStartAfterCurrent || isAvailableTillAfterCurrent;
		}
		return false;
	};

	return (
		<>
			<TouchableOpacity
				disabled={isDisabled()}
				onPress={handlePress}
				style={[
					style.rootViewStyle,
					isSelected && style.sleetedStyle,
					isScreenAsset && style.screenAssetStyle,
				]}
			>
				{assetType &&
					state &&
					createAssetIcon(
						assetType,
						state,
						disabled,
						// yetToStart &&
						// state != IAssetStatusEnum.completed &&
						// assetType !== IAssetType.ASSESSMENT,
					)}
				<View style={[pl8, flex1]}>
					<View style={{ flexDirection: "row" }}>
						{continueAsset?.userProgramNextAsset?.asset?.code ===
						assetCode ? (
							<RNText
								title="Continue"
								style={{
									color: "#3F9161",
									borderRadius: 8,
									borderWidth: 1,
									padding: 4,
									borderColor: "#3F9161",
									marginRight: 4,
								}}
							/>
						) : yetToStart ? (
							<RNText
								title="Next Up"
								style={{
									color: "#3F9161",
									borderRadius: 8,
									borderWidth: 1,
									padding: 4,
									borderColor: "#3F9161",
									marginRight: 4,
								}}
							/>
						) : null}

						<RNText
							title={title}
							numberOfLines={2}
							style={[
								{
									color: disabled ? bg.disabled : "#000000",
									marginLeft:
										continueAsset?.userProgramNextAsset
											?.asset?.code === assetCode
											? 10
											: 0,
								},
								style.titleStyle,
								continueAsset?.userProgramNextAsset?.asset
									?.code === assetCode
									? bold
									: w400,
								pr6,
							]}
						/>
						{isOptional ? (
							<RNText
								title={`(${strings.OPTIONAL_TXT})`}
								style={[style.dueDateStyle, clrBlue]}
							/>
						) : null}
					</View>
					{((dueDate && state !== IAssetStatusEnum.completed) ||
						(startsAt &&
							yetToStart &&
							state !== IAssetStatusEnum.completed)) && (
						<>
							{!deadlineReferredFrom && !disabled ? (
								<>
									<RNText
										title={
											dueDate
												? dueDateState
												: `${strings.START_AT}: ${startsAt}`
										}
										style={[
											style.dueDateStyle,
											{ color: dueDateColor },
											dueDatePassed(
												graceDays,
												state,
												dueDate,
												userTimezone,
											) && {
												color: text.drkOrange,
											},
											yetToStart && {
												color: text.steelBlue,
											},
										]}
									/>
									{!isOptional ? (
										<>
											{dueDateObject <
											currentDate ? null : availableExtensions >
													0 ||
											  extensionState ==
													strings.CANCEL_EXTENSION ? (
												<AssetExtension
													title={extensionState ?? ""}
													onExtensionOnPress={
														extensionModalFn
													}
												/>
											) : null}
										</>
									) : null}
								</>
							) : null}
						</>
					)}

					{disabled && isStartDateBeforeCurrent ? (
						<RNText
							title={
								startDate
									? `${strings.AVAILABLE_FROM}: ${availableFromDate}`
									: ""
							}
							style={[
								style.dueDateStyle,
								{ color: border.green },
							]}
						/>
					) : null}
				</View>
			</TouchableOpacity>
			<BottomSheetWrapper
				isVisible={extensionModal}
				indicatorColor={border.indicator2}
			>
				<HalfBottomSheet />
			</BottomSheetWrapper>
		</>
	);
};

const style = StyleSheet.create({
	dueDateStyle: {
		...sm,
	},
	rootViewStyle: {
		borderRadius: b4,
		...p8,
		...mh10,
		...rowStart,
	},
	screenAssetStyle: {
		backgroundColor: primary.color2,
		...cardViewStyle,
		elevation: 0.5,
	},
	sleetedStyle: {
		borderColor: border.skyBlue,
		borderWidth: 1,
	},
	titleStyle: {
		...md,
		lineHeight: moderateScale(19),
	},
});

export default memo(TopicItemsState);
