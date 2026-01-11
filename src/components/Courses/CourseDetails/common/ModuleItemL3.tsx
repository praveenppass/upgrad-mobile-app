import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NavigationState } from "@react-navigation/native";
import moment from "moment-timezone";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import { createAssetIcon } from "@components/IconComponents/asseticon.utils";
import DueDateBanner from "@components/Penalty/DueDateBanner";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import { getCurrentRouteName } from "@utils/functions";
import measures from "@utils/measures";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";

import { LearningPathType } from "@interface/app.interface";
import {
	AssetLevelStatus,
	IAssetStatusEnum,
	IAssetType,
} from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		align: { row, flex1, alignCenter, alignContentCenter },
		text: { w400, xSm, sm, med, bold },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const ASSET_SCREEN = "Container6Screen";

const GRADABLE_ASSET_TYPES = [
	IAssetType.ASSESSMENT,
	IAssetType.PROJECT,
	IAssetType.ASSIGNMENT,
];
const ModuleItemL3: React.FC<{
	assessmentItem: any;
	resumeAsset: any;
	onLockedAssetPress?: (date: string) => void;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	elective?: string;
	electiveGroup?: string;
	track?: string;
	trackGroup?: string;
}> = ({
	assessmentItem,
	resumeAsset,
	onLockedAssetPress,
	learningPathId,
	learningPathType,
	learningPathName,
	elective,
	electiveGroup,
	track,
	trackGroup,
}) => {
	const { name: userTimezone } = useGetTimezone();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const ARROW_DIMENSION = {
		width: horizontalScale(16),
		height: horizontalScale(16),
	};
	const assetStatus =
		resumeAsset &&
		assessmentItem?.asset?.code ===
			resumeAsset?.userProgramNextAsset?.asset?.code &&
		resumeAsset?.userProgramNextAsset?.activity?.status !==
			IAssetStatusEnum.completed
			? resumeAsset?.userProgramNextAsset?.activity?.status
			: null;

	const assetName =
		assessmentItem?.aliasName ||
		assessmentItem?.asset?.name ||
		assessmentItem.name;

	const isTrackAndElective = () => {
		if (elective || track) {
			return true;
		}
		return false;
	};

	const currentScreen = getCurrentRouteName(
		navigation.getState() as NavigationState,
	);

	const navigationVariables = {
		assetCode: assessmentItem?.asset?.code || "",
		learningPathType,
		learningPathId,
		learningPathName,
		courseId: assessmentItem?.asset?.activity?.level1 || null,
		moduleId: assessmentItem?.asset?.activity?.level2 || null,
		sessionId: assessmentItem?.asset?.activity?.level3 || null,
		segmentId: assessmentItem?.asset?.activity?.level4 || null,
		elective: elective,
		electiveGroup: electiveGroup,
		track: track,
		trackGroup: trackGroup,
	};
	const assetType = assessmentItem?.asset?.assetType?.type;
	const isGradableAsset = GRADABLE_ASSET_TYPES.includes(assetType);
	return (
		<View>
			<View style={styles.margins}>
				<TouchableOpacity
					onPress={async () => {
						if (assessmentItem.asset.activity.enableLock) {
							const startsAt =
								assessmentItem?.asset?.activity?.startsAt;
							const availableTill =
								assessmentItem?.asset?.activity?.availableTill;

							if (
								availableTill &&
								(!startsAt ||
									moment(startsAt)
										.tz(userTimezone)
										.isBefore(moment().tz(userTimezone)))
							)
								return onLockedAssetPress?.(
									assessmentItem?.asset?.activity
										?.availableTill,
								);

							return;
						}

						// Legacy for old assets, will be removed once all assets are migrated
						await dispatch(
							studyPlanSlice.actions.selectAsset(
								assessmentItem?.asset,
							),
						);
						navigation.dispatch(DrawerActions.closeDrawer());
						//@ts-ignore
						if (currentScreen === ASSET_SCREEN) {
							navigation.replace(
								ASSET_SCREEN,
								navigationVariables,
							);
						} else {
							navigation.navigate(
								ASSET_SCREEN,
								navigationVariables,
							);
						}
					}}
				>
					<View style={styles.rowCenter}>
						{assessmentItem?.asset?.assetType &&
							assessmentItem?.asset?.activity?.status &&
							createAssetIcon(
								assessmentItem?.asset?.assetType,
								assessmentItem?.asset?.activity?.status,
								assessmentItem.asset.activity.enableLock,
								false,
								ARROW_DIMENSION,
							)}
						<View style={styles.textContainer}>
							<View style={styles.innerTextRow}>
								<RNText
									numberOfLines={3}
									ellipsizeMode="tail"
									style={styles.textRow}
								>
									{assetStatus && (
										<>
											<View style={styles.chipContainer}>
												<RNText
													title={
														assetStatus ===
														IAssetStatusEnum.notStarted
															? AssetLevelStatus.NEXT_UP
															: AssetLevelStatus.CONTINUE
													}
													style={styles.chipText}
												/>
											</View>
										</>
									)}
									<RNText
										title={assetName}
										style={[
											styles.desc,
											{
												marginHorizontal: assetStatus
													? horizontalScale(8)
													: horizontalScale(0),
											},
											assetStatus ===
											IAssetStatusEnum.inProgress
												? bold
												: w400,
										]}
									/>
									<RNText style={styles.desc}>
										{assessmentItem?.isOptional &&
											assessmentItem?.name?.length <=
												20 && (
												<RNText
													title={strings.OPTIONAL}
													style={styles.optionalTag}
												/>
											)}
									</RNText>
								</RNText>
							</View>
							{assessmentItem?.isOptional &&
								assessmentItem?.name?.length > 20 && (
									<RNText
										title={strings.OPTIONAL}
										style={[
											styles.optionalTag,
											styles.newLine,
										]}
									/>
								)}

							{isGradableAsset ? (
								<DueDateBanner
									date={
										assessmentItem?.asset?.activity?.endsAt
									}
									assetStatus={
										assessmentItem?.asset?.activity
											?.status ===
										IAssetStatusEnum.completed
									}
									extensionRequests={
										assessmentItem?.asset?.activity
											?.extensionRequests
									}
									isOptional={
										assessmentItem?.asset?.isOptional
									}
									disabled={
										isTrackAndElective()
											? false
											: assessmentItem?.asset?.activity
													?.enableLock
									}
									availableFrom={
										assessmentItem?.asset?.activity
											?.startsAt
									}
									level1={
										assessmentItem?.asset?.activity?.level1
									}
									level2={
										assessmentItem?.asset?.activity?.level2
									}
									level3={
										assessmentItem?.asset?.activity?.level1
									}
									level4={
										assessmentItem?.asset?.activity?.level4
									}
								/>
							) : (
								<></>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export { ModuleItemL3 };

const styles = StyleSheet.create({
	chipContainer: {
		backgroundColor: colors.tag.light_green,
		borderColor: colors.state.success_green,
		borderRadius: b8,
		borderWidth: 0.5,

		paddingHorizontal: horizontalScale(4),
		paddingVertical: horizontalScale(2),
	},

	chipText: {
		color: colors.state.success_green,
		...xSm,
		lineHeight: verticalScale(14),
	},
	desc: {
		...w400,
		color: colors.neutral.black,
		...med,
		lineHeight: moderateScale(19),
	},
	dueDateText: {
		...w400,
		color: colors.primary.red_06,
		...xSm,
		lineHeight: moderateScale(16),
	},
	innerTextRow: {
		...row,
	},
	margins: {
		paddingHorizontal: verticalScale(6),
		paddingVertical: verticalScale(2),
	},
	newLine: {
		marginLeft: 0,
		marginTop: horizontalScale(2),
	},
	optionalTag: {
		...w400,
		...xSm,
		color: colors.neutral.grey_07,
		lineHeight: moderateScale(19),
		marginLeft: horizontalScale(4),
	},
	rowCenter: {
		...alignContentCenter,
		...alignCenter,
		...row,
	},
	sessionText: {
		...w400,
		color: colors.neutral.grey_06,
		...sm,
		lineHeight: moderateScale(19),
		marginLeft: verticalScale(8),
	},
	textContainer: {
		...flex1,
		margin: verticalScale(8),
	},
	textRow: {
		...row,
	},
});
