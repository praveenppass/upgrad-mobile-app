import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { WOOLF } from "@screens/Home/HomeTab/MyPrograms/useMyProgramsController";

import { createAssetIcon } from "@components/IconComponents/asseticon.utils";
import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import RNText from "@components/Reusable/RNText";
import ViewOnDesktopModal from "@components/Reusable/ViewOnDesktopModal";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { isProgram } from "@utils/courseDetailsUtils";
import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";
import { IHomeBannerAsset } from "@interface/components/home/homeBanner.interface";
import { IHomeLearnerAssetProgressStatusType } from "@interface/myPrograms.interface";

import { C } from "@assets/constants";
import { HatIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		align: { row, flexStart, alignCenter, alignEnd, justifyBetween, flex1 },
		spacing: { g8, g5, g4 },
		text: { semiBold, md, med, lg },
	},
	colors: { state, neutral, primary },
} = C;

const {
	BORDER: { b7 },
} = measures;

const HomeAssetBanner = ({
	courseName,
	courseId,
	assetName,
	progress,
	assetType,
	assetCode,
	assetId,
	assetActivity,
	courseVariant,
	universityPartnerName,
	workshopId,
	programCode,
	workshopCode,
	userProgramId,
}: IHomeBannerAsset) => {
	const [showModal, setShowModal] = useState(false);
	const navigation = useAppNavigation();
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<View style={styles.courseContainer}>
					<HatIcon height={20} width={20} color={neutral.white} />
					<RNText
						title={courseName}
						style={styles.courseText}
						numberOfLines={1}
					/>
				</View>
			</View>

			<View style={styles.assetContainer}>
				<View style={styles.assetInnerContainer}>
					<RNText
						title={assetName}
						style={styles.assetText}
						numberOfLines={2}
					/>
					<Pressable
						style={styles.button}
						onPress={() => {
							if (universityPartnerName === WOOLF)
								return setShowModal(true);

							dispatch(studyPlanSlice.actions.restStudyState());
							dispatch(
								studyPlanSlice.actions.selectedCourseDetailsAction(
									{
										selectedCourseID: courseId,
										selectedCourseDetails: {
											userProgram: {
												id: courseId,
												program: {
													name: courseName,
												},
											},
										},
										courseVariant: courseVariant,
									},
								),
							);

							// Legacy for old assets, will be removed once all assets are migrated
							dispatch(
								studyPlanSlice.actions.selectAsset({
									id: assetId,
									activity: assetActivity,
									code: assetCode,
									name: assetName,
									assetType: {
										type: assetType,
									},
								}),
							);
							navigation.navigate(ROOT_ROUTES.HomeStack, {
								screen: HOME_ROUTES.Container6Screen,
								params: {
									learningPathName: courseName,
									assetCode: assetCode,
									learningPathType: isProgram(courseVariant)
										? LearningPathType.PROGRAM
										: LearningPathType.COURSE,
									learningPathId: courseId,
									courseId: assetActivity?.level1 || null,
									moduleId: assetActivity?.level2 || null,
									sessionId: assetActivity?.level3 || null,
									segmentId: assetActivity?.level4 || null,
									ispostSubmission: false,
									track: assetActivity?.track || "",
									trackGroup: assetActivity?.trackGroup || "",
									elective: assetActivity?.elective || "",
									electiveGroup:
										assetActivity?.electiveGroup || "",
									workshopId,
									learningPathCode: programCode,
									assetType,
									workshopCode,
									userProgramId,
								},
							});
						}}
					>
						{createAssetIcon(
							assetType as IAssetType,
							IAssetStatusEnum.resumeAsset,
							false,
							false,
							undefined,
							neutral.white,
						)}
						<RNText
							title={
								assetActivity.status ===
								IHomeLearnerAssetProgressStatusType.IN_PROGRESS
									? strings.RESUME
									: strings.NEXT_UP
							}
							style={styles.buttonText}
						/>
					</Pressable>
				</View>
				<View style={styles.progressContainer}>
					<CircleProgressBar
						progress={progress}
						radius={horizontalScale(32)}
						strokeWidth={horizontalScale(6)}
						progressBarColors={{
							active: state.success_green,
						}}
						textStyle={styles.progressText}
					/>
				</View>
			</View>
			<ViewOnDesktopModal
				description={strings.UNIVESITY_PARTNER_DESC}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</View>
	);
};

export default HomeAssetBanner;

const styles = StyleSheet.create({
	assetContainer: {
		...row,
		...justifyBetween,
		...flex1,
	},

	assetInnerContainer: {
		flexShrink: 1,
		...flexStart,
		...justifyBetween,
	},

	assetText: {
		...semiBold,
		...lg,
		color: neutral.white,
		lineHeight: verticalScale(24),
		width: horizontalScale(200),
	},

	button: {
		...row,
		...alignCenter,
		...g5,
		backgroundColor: primary.red_05,
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		marginTop: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
	},

	buttonText: {
		...semiBold,
		...md,
		color: neutral.white,
	},
	container: {
		backgroundColor: neutral.black,
		borderRadius: b7,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: horizontalScale(12),
		...g8,
		...flex1,
		height: verticalScale(160),
	},

	courseContainer: {
		...row,
		...alignCenter,
		...g4,
	},

	courseText: {
		...semiBold,
		...med,
		color: neutral.grey_03,
		...flex1,
	},

	innerContainer: {
		...row,
		...alignCenter,
		...g8,
	},

	progressContainer: {
		...row,
		...alignEnd,
	},

	progressText: {
		...semiBold,
		...md,
		color: neutral.white,
	},
});
