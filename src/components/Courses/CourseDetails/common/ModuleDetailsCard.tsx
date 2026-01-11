import moment from "moment-timezone";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IDeadlineExtensionMode } from "@components/asset/deadlineExtension/deadlineExtension.interface";
import ModuleExtension from "@components/moduleExtension";
import DueDateBanner from "@components/Penalty/DueDateBanner";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import { IAssetPenaltyConfigurationsQuery } from "@graphql/query/assetPenalty/getAssetPenaltyConfiguration";
import { IUserCourseNextAssetType } from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import { IStudyResumeAssetType } from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";
import { ExtensionRequest } from "@graphql/query/studyplanTemp/getStudyProgramListQuery";

import useAssetPenalty from "@hooks/assetPenalty/useAssetPenalty";
import useGetTimezone from "@hooks/useGetTimezone";

import {
	calculateDueDates,
	convertSecondsToHoursAndMinutes,
	horizontalScale,
	moderateScale,
	removeHtmlTags,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	ArrowRightModuleIcon,
	BulletIcon,
	CheckMarkGreenCircleIcon,
	CircleIcon,
	ModuleCardLockedIcon,
	RemainingTimerIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

import AssetItem from "./AssetItem";

const { neutral, highlight } = colors;
const {
	BORDER: { b8 },
} = measures;

const {
	themes: { primary, text },
	commonStyles: {
		spacing: { g4, m8, mh12, mt6, p4, mh10, mr10 },
		align: { flex1, row, selfCenter, justifyCenter, alignCenter },
		text: {
			md,
			mid,
			bold,
			txtStart,
			clrBlue,
			med,
			sm,
			clrDisabled,
			medium,
			xxSm,
			regular,
		},
	},
} = C;

const ARROW_DIMENSION = {
	width: horizontalScale(14),
	height: verticalScale(14),
};

interface IModuleInfoCardProps {
	label: string;
	milestoneName: string;
	description: string;
	progress: number;
	asset: boolean;
	WeekOnPress?: () => void;
	dueDate: string;
	checkDueDateCrossed?: boolean;
	assetTitle: string;
	startDate?: string;
	yetToStart?: boolean;
	assetStatus?: IAssetStatusEnum;
	onTopicItemPress?: () => void;
	assetType?: IAssetType | undefined;
	isSelected?: boolean;
	optional?: boolean;
	isLocked?: boolean | null;
	status?: string;
	weekStartDate?: string;
	assetCode?: string | number;
	extensionRequests?: ExtensionRequest[];
	isOptional?: boolean;
	dueDatePenalty?: string;
	availableFrom?: string;
	availableTill?: string;
	learningPathId?: string;
	level1?: string | null;
	level2?: string | null;
	level3?: string | null;
	level4?: string | null;
	totalSubmissions?: number | null;
	totalCompletedSubmissions?: number | null;
	pullDownToRefresh?: null;
	remainingTimer?: number | null;
	index: number;
	numberOfItems?: number;
	resumeAsset?: IStudyResumeAssetType | IUserCourseNextAssetType;
	enableLock: boolean;
	onLockedAssetPress?: (date: string) => void;
	isDueDateExtended: boolean;
	totalCompletedGradableAssets: number;
	totalGradableAssets: number;
	onRefetchModule: () => void;
	hardDeadlineDays: number;
	penaltyConfigurationData?: IAssetPenaltyConfigurationsQuery;
	dueDateExtensionMode: string;
}

const isCurrentDateBeforeGivenDate = ({
	givenDate,
	userTimezone,
}: {
	givenDate: string | null;
	userTimezone: string;
}): boolean => {
	if (!givenDate) return false;
	const currentDate = moment().tz(userTimezone);
	return currentDate.isBefore(moment(givenDate).tz(userTimezone));
};

const ModuleInfoCard = ({
	label,
	index,
	numberOfItems,
	milestoneName,
	progress,
	asset,
	WeekOnPress,
	checkDueDateCrossed,
	startDate,
	availableFrom,
	dueDate,
	yetToStart,
	assetTitle,
	assetStatus,
	assetType,
	onTopicItemPress,
	isSelected,
	extensionRequests,
	isLocked,
	status,
	assetCode,
	isOptional,
	availableTill,
	level4,
	level3,
	level2,
	remainingTimer,
	resumeAsset,
	onLockedAssetPress,
	totalCompletedGradableAssets,
	totalGradableAssets,
	learningPathId,
	level1,
	onRefetchModule,
	isDueDateExtended,
	hardDeadlineDays,
	penaltyConfigurationData,
	dueDateExtensionMode,
}: IModuleInfoCardProps) => {
	const isSubmitted = status === IAssetStatusEnum.completed;
	const { name: userTimezone } = useGetTimezone();

	const [extensionModalVisibilty, setExtensionModalVisibilty] =
		useState(false);

	const { extendedDueDate, originalDueDate } = calculateDueDates({
		dueDate,
		hardDeadlineDays,
		isDueDateExtended,
	});

	const isDeadlineExtensionUntilHardDeadline =
		dueDateExtensionMode ===
		IDeadlineExtensionMode.DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE;

	const isWithinExtensionPeriod = isDeadlineExtensionUntilHardDeadline
		? isCurrentDateBeforeGivenDate({
				givenDate: extendedDueDate,
				userTimezone,
			})
		: isCurrentDateBeforeGivenDate({
				givenDate: originalDueDate,
				userTimezone,
			});

	const { revertedPenalties } = useAssetPenalty({
		dueDate: originalDueDate,
		extendedDueDate: extendedDueDate,
		isDueDateExtended: isDueDateExtended,
		penaltyConfigurationData,
	});

	return (
		<>
			<View style={(styles.mainContainer, { elevation: asset ? 0 : 2 })}>
				{asset ? (
					<AssetItem
						isSelected={isSelected}
						onTopicItemPress={onTopicItemPress}
						disabled={isLocked}
						isScreenAsset={true}
						isContinue={assetStatus == IAssetStatusEnum.inProgress}
						isDueDateCrossed={checkDueDateCrossed}
						title={removeHtmlTags(assetTitle)}
						state={assetStatus}
						assetType={assetType}
						startDate={startDate}
						yetToStart={yetToStart}
						assetCode={assetCode}
						dueDate={dueDate}
						extensionRequests={extensionRequests}
						isOptional={isOptional}
						availableTill={availableTill}
						level4={level4}
						level3={level3}
						level2={level2}
						resumeAsset={resumeAsset}
						onLockedAssetPress={onLockedAssetPress}
					/>
				) : (
					<>
						<View>
							<Pressable
								style={[flex1, row]}
								onPress={WeekOnPress}
							>
								<View style={styles.iconView}>
									{isLocked ? (
										<ModuleCardLockedIcon
											width={horizontalScale(22)}
											height={verticalScale(22)}
										/>
									) : status ===
									  IAssetStatusEnum.completed ? (
										<CheckMarkGreenCircleIcon
											width={horizontalScale(22)}
											height={verticalScale(22)}
										/>
									) : status ===
									  IAssetStatusEnum.inProgress ? (
										<CircleIcon
											width={horizontalScale(22)}
											height={verticalScale(22)}
										/>
									) : (
										<CircleIcon
											width={horizontalScale(22)}
											height={verticalScale(22)}
										/>
									)}
								</View>

								<View style={[g4, mt6, p4, styles.sub, flex1]}>
									<View style={[row, alignCenter]}>
										<View style={[row, justifyCenter]}>
											<RNText
												title={`${label} `}
												style={styles.labelStyle}
											/>
											{isOptional ? (
												<View style={row}>
													<BulletIcon
														style={
															styles.labelStyle
														}
													/>
													<RNText
														title={` ${strings.OPTIONAL_TXT}`}
														style={
															styles.labelStyle
														}
													/>
												</View>
											) : null}
										</View>
									</View>

									<Pressable onPress={WeekOnPress}>
										<RNText
											numberOfLines={3}
											title={milestoneName}
											style={styles.milestoneNameStyle}
										>
											<ArrowRightModuleIcon
												{...ARROW_DIMENSION}
											/>
										</RNText>
									</Pressable>

									{isOptional ? null : (
										<ProgressBar
											progress={progress}
											leftTextTitle={
												remainingTimer &&
												remainingTimer > 0 &&
												progress !== 100
													? `${convertSecondsToHoursAndMinutes(
															remainingTimer,
														)} left`
													: ""
											}
											rightTextTitle={`${progress?.toFixed(
												0,
											)}%`}
											leftTextStyle={{
												color: colors.icon
													.default_black,
												...med,
											}}
											LeftIcon={() => (
												<RemainingTimerIcon
													width={horizontalScale(12)}
													height={horizontalScale(12)}
												/>
											)}
										/>
									)}

									{!isSubmitted ? (
										<DueDateBanner
											date={dueDate}
											extensionRequests={
												extensionRequests
											}
											isOptional={isOptional}
											disabled={isLocked}
											availableFrom={availableFrom}
											level2={level2}
											level4={level4}
											level3={level3}
										/>
									) : null}
								</View>
							</Pressable>

							<View style={styles.extensionButton}>
								{totalGradableAssets ? (
									<>
										<RNText
											title={`${strings.ASSESSMENTS}: ${totalCompletedGradableAssets} / ${totalGradableAssets}`}
											style={
												styles.gradableAssetCountText
											}
										/>

										<ModuleExtensionCta
											isDueDateExtended={
												isDueDateExtended
											}
											setVisible={
												setExtensionModalVisibilty
											}
											isCtaVisible={
												isWithinExtensionPeriod &&
												!isSubmitted
											}
										/>
									</>
								) : (
									<></>
								)}
							</View>

							{index + 1 === numberOfItems ? (
								<View style={styles.emptyDivider} />
							) : (
								<View style={styles.divider} />
							)}
						</View>
					</>
				)}
			</View>
			<ModuleExtension
				courseId={level1 ?? ""}
				learningPathId={learningPathId ?? ""}
				moduleId={level2 ?? ""}
				moduleName={milestoneName}
				totalCompletedGradableAssets={totalCompletedGradableAssets}
				totalGradableAssets={totalGradableAssets}
				isExtensionApplied={isDueDateExtended}
				penalties={revertedPenalties}
				initialDueDate={originalDueDate ?? ""}
				extendedDueDate={extendedDueDate ?? ""}
				isVisible={extensionModalVisibilty}
				setVisible={setExtensionModalVisibilty}
				onSubmit={onRefetchModule}
			/>
		</>
	);
};

interface IModuleExtensionCta {
	isDueDateExtended: boolean;
	isCtaVisible: boolean;
	setVisible: (value: boolean) => void;
}

const ModuleExtensionCta = ({
	isDueDateExtended,
	isCtaVisible,
	setVisible,
}: IModuleExtensionCta) => {
	const ctaText = isDueDateExtended
		? strings.CANCEL_EXTENSION
		: strings.DEADLINE;

	return isCtaVisible ? (
		<Pressable onPress={() => setVisible(true)}>
			<RNText title={ctaText} style={styles.moduleCardExtensionButton} />
		</Pressable>
	) : (
		<></>
	);
};
export default ModuleInfoCard;

const styles = StyleSheet.create({
	divider: {
		borderColor: colors.neutral.grey_05,
		borderWidth: 0.5,
		marginHorizontal: horizontalScale(10),
		marginVertical: verticalScale(10),
		width: "95%",
	},
	dueView: {
		...mr10,
	},
	emptyDivider: { marginTop: verticalScale(10) },
	extensionButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: horizontalScale(44),
		marginRight: horizontalScale(16),
		paddingTop: verticalScale(6),
	},
	gradableAssetCountText: {
		...xxSm,
		...regular,
		color: neutral.grey_08,
	},
	iconView: {
		alignSelf: "center",
		justifyContent: "center",
		marginHorizontal: horizontalScale(2),
		paddingLeft: horizontalScale(4),
	},
	labelStyle: {
		...med,
		alignSelf: "center",
		color: colors.neutral.grey_06,
	},
	mainContainer: {
		backgroundColor: colors.neutral.white,
		borderRadius: b8,
		elevation: 4,
	},
	milestoneNameStyle: {
		flex: 1,
		...bold,
		color: colors.neutral.grey_08,
		...mid,
		...txtStart,
	},
	moduleCardExtensionButton: {
		color: highlight.text_blue,
		textDecorationLine: "underline",
		...xxSm,
		...medium,
	},
	sub: {
		backgroundColor: primary.color2,
		borderRadius: horizontalScale(8),
		marginHorizontal: horizontalScale(10),
	},
	submissionStyle: { color: colors.content.text.body_grey_08, ...sm },
	textDesc: {
		...md,
		...clrBlue,
		...txtStart,
		lineHeight: moderateScale(21),
	},
	textDescDisabled: {
		...clrDisabled,
	},
	weekContainer: {
		...m8,
		...mh12,
		//...cardViewStyle,
		borderRadius: b8,
		elevation: 2,
	},
	weekStartStyle: {
		backgroundColor: text.steelBlue,
		...selfCenter,
		...mh10,
		height: verticalScale(17),
		width: horizontalScale(1),
	},
});
