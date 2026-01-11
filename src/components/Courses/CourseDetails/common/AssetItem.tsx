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
import RNText from "@components/Reusable/RNText";

import { IUserCourseNextAssetType } from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import { IStudyResumeAssetType } from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";

import useGetTimezone from "@hooks/useGetTimezone";
import usePenalty from "@hooks/usePenalty";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import {
	formatDateByTime,
	getDateTwoDaysPriorFormatted,
} from "@utils/timezoneHelper";

import { RootState } from "@redux/store/root.reducer";

import { IDateFormat, IHalfBottomSheetType } from "@interface/app.interface";
import {
	AssetLevelStatus,
	IAssetStatusEnum,
	IAssetType,
} from "@interface/asset.interface";
import { ExtensionRequest } from "@interface/milestonetype.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

const {
	themes: { bg, text, border, primary },
	commonStyles: {
		spacing: { pl8, pr6, mh10 },
		align: { rowStart, flex1 },
		text: { clrBlue, xSm, med, md, bold, w400 },
	},
} = C;

interface IAssetItemTypes {
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
	availableTill?: string;
	isOptional?: boolean;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	pullDownToRefresh?: null;
	isContinue?: boolean;
	isNext?: boolean;
	onLockedAssetPress?: (date: string) => void;
	resumeAsset: IStudyResumeAssetType | IUserCourseNextAssetType;
}

const dueDatePassed = (
	graceDays: number,
	userTimezone: string,
	state?: IAssetStatusEnum,
	endDate?: string,
): boolean => {
	if (endDate && state !== IAssetStatusEnum.completed) {
		const currentDate = moment().tz(userTimezone);
		const inputDate = moment(endDate)
			.tz(userTimezone)
			.add(graceDays, "days");
		return currentDate.isAfter(inputDate);
	}
	return false;
};

const ARROW_DIMENSION = {
	width: horizontalScale(20),
	height: horizontalScale(20),
};

const AssetItem = ({
	disabled,
	title,
	state,
	extensionRequests,
	dueDate,
	yetToStart,
	startDate,
	onTopicItemPress,
	assetType,
	assetCode,
	isScreenAsset,
	isOptional,
	level4,
	availableTill,
	level3,
	level2,
	moduleCode,
	isContinue,
	pullDownToRefresh,
	resumeAsset,
	onLockedAssetPress,
}: IAssetItemTypes) => {
	const { onCancelExtensionHandler, onExtensionHandler } = usePenalty({
		assetCode,
		level2,
		level3,
		level4,
		moduleCode,
		pullDownToRefresh,
	});

	const { name: userTimezone } = useGetTimezone();

	const selectedCourseDetails = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseDetails,
	);

	const nextAsset =
		"userProgramNextAsset" in resumeAsset
			? resumeAsset.userProgramNextAsset
			: "userCourseNextAsset" in resumeAsset
				? resumeAsset.userCourseNextAsset
				: null;

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
		if (dueDate && !disabled) {
			const extensionInfoCheck =
				Array.isArray(extensionRequests) &&
				extensionRequests.length > 0;

			if (extensionRequests && extensionInfoCheck) {
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
		}
	}, [dueDate, disabled, extensionRequests]);

	const hideModalAction = () => {
		GlobeBottomSheetController.hideModal();
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
		if (disabled) {
			if (
				availableTill &&
				(!startsAt ||
					moment(startsAt)
						.tz(userTimezone)
						.isBefore(moment().tz(userTimezone)))
			)
				return onLockedAssetPress?.(availableTill);
			else return;
		}

		if (isDisabled()) return;

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
				// disabled={isDisabled()}
				onPress={handlePress}
				style={[
					style.rootViewStyle,
					//isSelected && style.sleetedStyle,
					//containerStyles,
					isScreenAsset && style.screenAssetStyle,
				]}
			>
				{assetType &&
					state &&
					createAssetIcon(
						assetType,
						state,
						disabled,
						yetToStart,
						ARROW_DIMENSION,
						// yetToStart & state != IAssetStatusEnum.completed &&
						// assetType !== IAssetType.ASSESSMENT,
					)}
				<View style={[flex1, pl8]}>
					<View>
						<RNText>
							{nextAsset?.asset?.code === assetCode &&
							nextAsset?.activity?.status !==
								IAssetStatusEnum.completed ? (
								<>
									<View style={style.chipContainer}>
										<RNText
											title={
												nextAsset?.activity?.status ===
												IAssetStatusEnum.inProgress
													? AssetLevelStatus.CONTINUE
													: AssetLevelStatus.NEXT_UP
											}
											style={style.assetStatusStyle}
										/>
									</View>
								</>
							) : null}
							<RNText
								title={title}
								numberOfLines={2}
								style={[
									{
										color: disabled
											? bg.disabled
											: colors.neutral.black,
									},
									style.titleStyle,
									isContinue ? bold : w400,
									pr6,
								]}
							/>
							{isOptional ? (
								<RNText
									title={strings.OPTIONAL}
									style={[
										style.dueDateStyle,
										{ color: colors.neutral.black },
									]}
								/>
							) : null}
						</RNText>
					</View>
					{((dueDate && state !== IAssetStatusEnum.completed) ||
						(startsAt &&
							yetToStart &&
							state !== IAssetStatusEnum.completed)) && (
						<>
							{!disabled ? (
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
												userTimezone,
												state,
												dueDate,
											) && {
												color: text.drkOrange,
											},
											yetToStart && {
												color: text.steelBlue,
											},
										]}
									/>
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
			{/* <BottomSheetWrapper
				isVisible={extensionModal}
				indicatorColor={border.indicator2}
			>
				<HalfBottomSheet />
			</BottomSheetWrapper> */}
		</>
	);
};

const style = StyleSheet.create({
	assetStatusStyle: {
		color: colors.state.success_green,
		lineHeight: verticalScale(14),
		marginRight: horizontalScale(3),
		...xSm,
	},
	chipContainer: {
		backgroundColor: colors.tag.light_green,
		borderColor: colors.state.success_green,
		borderRadius: 8,
		borderWidth: 0.5,
		paddingHorizontal: horizontalScale(4),
		paddingVertical: horizontalScale(3),
	},
	dueDateStyle: {
		...med,
	},
	rootViewStyle: {
		backgroundColor: bg.topicState,
		...mh10,
		...rowStart,
		marginVertical: verticalScale(12),
	},
	screenAssetStyle: {
		backgroundColor: primary.color2,
	},
	sleetedStyle: {
		backgroundColor: bg.lightBlue,
		borderColor: border.skyBlue,
		borderWidth: horizontalScale(1),
	},
	titleStyle: {
		lineHeight: moderateScale(20),
		...md,
	},
});

export default memo(AssetItem);
