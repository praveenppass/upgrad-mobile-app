import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import ModuleItem from "@components/Courses/CourseDetails/common/ModuleItem";
import ModuleScreenLoader from "@components/Courses/CourseDetails/common/ModuleScreenLoader";
import DueDateBanner from "@components/Penalty/DueDateBanner";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import { isProgram } from "@utils/courseDetailsUtils";
import {
	convertSecondsToHoursAndMinutes,
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	ArrowHeadLeftLxp,
	ArrowHeadRightLxp,
	ArrowSwapLxp,
	RemainingTimerIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

import { ModuleItemL3 } from "./ModuleItemL3";

const {
	themes: { primary, progressBar },
	commonStyles: {
		align: { row, flex1, alignCenter },
		spacing: { mt4, mt0 },
		text: { w400, w600, w500, sm, reg, lg, md },
	},
} = C;

type RootDrawerParamList = {
	Drawer: undefined;
};

const ModuleScreen: React.FC<{
	previousFun: () => void;
	nextFun: () => void;
	selectedDrawer: any;
	skeltonLoader: boolean;
	renderActive: any;
	renderLevel2: any;
	showNext?: boolean;
	showPrevious?: boolean;
	resumeAsset: unknown;
	courseDetail: {};
	openCurrentModule: boolean;
	elective?: string;
	electiveGroup?: string;
	track?: string;
	trackGroup?: string;

	onLockedAssetPress?: (date: string) => void;
}> = ({
	previousFun,
	nextFun,
	selectedDrawer,
	skeltonLoader,
	renderActive,
	renderLevel2,
	showNext,
	showPrevious,
	onLockedAssetPress,
	resumeAsset,
	courseDetail,
	elective,
	electiveGroup,
	track,
	trackGroup,
	openCurrentModule,
}) => {
	const navigation =
		useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

	const course = courseDetail?.program || courseDetail?.course;

	const courseName = courseDetail?.courseInfo
		? courseDetail?.courseInfo?.name
		: course?.name || "";

	const courseId = courseDetail?.id || "";

	const isProgramType = isProgram(courseDetail?.variant);

	const learningPathType = isProgramType
		? LearningPathType.PROGRAM
		: LearningPathType.COURSE;

	const { totalCompletedGradableAssets = 0, totalGradableAssets = 0 } =
		isProgramType ? renderActive?.activity || {} : renderActive || {};

	const renderItem = (data: any) => {
		if (data?.item?.asset) {
			return (
				<ModuleItemL3
					resumeAsset={resumeAsset}
					assessmentItem={data?.item}
					onLockedAssetPress={onLockedAssetPress}
					learningPathType={learningPathType}
					learningPathId={courseId}
					learningPathName={courseName}
					elective={elective}
					electiveGroup={electiveGroup}
					track={track}
					trackGroup={trackGroup}
				/>
			);
		} else if (data?.item?.activity) {
			return (
				<View style={styles.moduleView}>
					<ModuleItem
						moduleItem={data?.item}
						resumeAsset={resumeAsset}
						assessmentItem={data?.item}
						onLockedAssetPress={onLockedAssetPress}
						learningPathType={learningPathType}
						learningPathId={courseId}
						learningPathName={courseName}
						openCurrentModule={openCurrentModule}
						selectedDrawer={selectedDrawer}
						elective={elective}
						electiveGroup={electiveGroup}
						track={track}
						trackGroup={trackGroup}
					/>
				</View>
			);
		}
	};
	const ItemSeparator = () => <View style={styles.separator} />;

	const _closeDrawer = async () => {
		navigation.setParams({
			variant: "",
			selectedId: "",
			level1: "",
			level2: "",
			level3: "",
			level4: "",
		});
		navigation.navigate("CourseDetailsScreen", {
			courseID: courseId,
			courseVariant: courseDetail?.variant,
			courseName: courseName,
		});
		navigation.dispatch(DrawerActions.closeDrawer());
	};

	const remainingDuration =
		renderActive?.activity?.completedDuration > 0
			? renderActive?.activity?.duration -
				renderActive?.activity?.completedDuration
			: renderActive?.activity?.duration;

	const leftData =
		renderActive?.activity?.duration > 0 &&
		renderActive?.activity?.progress !== 100
			? `${convertSecondsToHoursAndMinutes(remainingDuration)} left`
			: "";

	const isModules = Object?.keys(renderActive)?.length > 0;
	const isCompleted =
		renderActive?.activity?.status === IAssetStatusEnum.completed;
	return (
		<View style={styles.container}>
			{skeltonLoader ? (
				<ModuleScreenLoader />
			) : (
				<View style={styles.drawerContent}>
					<View
						style={
							!isModules && {
								backgroundColor: colors.cta.fill.disable,
							}
						}
					>
						<View style={styles.titleOne}>
							<RNText
								numberOfLines={1}
								title={`${courseName}`}
								style={[styles.headerText, w400]}
							/>

							<Pressable onPress={_closeDrawer} style={row}>
								<View
									style={{
										width: horizontalScale(1),
										height: verticalScale(16),
										marginRight: horizontalScale(8),
										backgroundColor: colors.neutral.grey_05,
									}}
								/>
								<ArrowSwapLxp style={styles.alignEnd} />
							</Pressable>
						</View>
					</View>
					{isModules ? (
						<View style={styles.titleContainer}>
							<View style={styles.rowContainer}>
								{showPrevious ? (
									<Pressable onPress={previousFun}>
										<ArrowHeadLeftLxp
											style={styles.alignLeft}
										/>
									</Pressable>
								) : (
									<></>
								)}

								<View style={styles.columContainer}>
									<RNText
										title={renderActive?.label}
										style={styles.titleText}
									>
										{renderActive?.isOptional ? (
											<RNText
												title={
													strings.OPTIONAL_BULLET_TAG
												}
												style={styles.titleText1}
											/>
										) : null}
									</RNText>

									<RNText
										title={renderActive?.name}
										style={styles.subtitleText}
									/>
								</View>
								{showNext ? (
									<Pressable onPress={nextFun}>
										<ArrowHeadRightLxp
											style={styles.alignRight}
										/>
									</Pressable>
								) : (
									<></>
								)}
							</View>
						</View>
					) : (
						""
					)}
					{!isModules || renderActive?.isOptional ? null : (
						<View
							style={[styles.midTitleContainer, row, alignCenter]}
						>
							<ProgressBar
								progress={renderActive?.activity?.progress ?? 0}
								rightTextTitle={`${renderActive?.activity?.progress?.toFixed(
									0,
								)}%`}
								leftTextTitle={leftData}
								LeftIcon={() => (
									<RemainingTimerIcon
										width={horizontalScale(12)}
										height={horizontalScale(12)}
									/>
								)}
							/>
						</View>
					)}
					{isModules && (
						<View
							style={{
								marginHorizontal: horizontalScale(10),
								marginBottom: horizontalScale(10),
							}}
						>
							{!isCompleted ? (
								<DueDateBanner
									date={renderActive?.activity?.dueAt}
									extensionRequests={
										renderActive?.activity
											?.extensionRequests
									}
									isOptional={renderActive?.isOptional}
									disabled={
										renderActive?.activity?.enableLock
									}
									availableFrom={
										renderActive?.activity?.availableFrom
									}
									level2={null}
									level4={null}
									level3={null}
								/>
							) : null}

							{totalCompletedGradableAssets &&
							totalGradableAssets ? (
								<View
									style={
										renderActive?.activity?.dueAt
											? mt4
											: mt0
									}
								>
									<RNText
										title={`${strings.ASSESSMENTS}: ${totalCompletedGradableAssets} / ${totalGradableAssets}`}
									/>
								</View>
							) : (
								<></>
							)}
						</View>
					)}
					<FlatList
						data={renderLevel2}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(_, index) => index.toString()}
						ItemSeparatorComponent={ItemSeparator}
						style={{
							marginHorizontal: horizontalScale(10),
							backgroundColor: colors.transparent,
						}}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	alignEnd: { flex: 1, marginLeft: "auto", padding: 5 },
	alignLeft: {
		...flex1,
		marginLeft: "auto",
		textAlign: "left",
	},
	alignRight: {
		flex: 1,
		marginRight: "auto",
		textAlign: "right",
	},
	// closeButtonText: {
	// 	fontSize: 16,
	// },
	columContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "space-between",
	},
	container: {
		backgroundColor: colors.neutral.white,
		flex: 1,
	},
	drawerContent: {
		flex: 1,
	},
	durationText: {
		...w400,
		color: colors.content.text.default_black,
		...sm,
		lineHeight: moderateScale(19),
		marginLeft: verticalScale(4),
	},
	headerText: {
		color: colors.content.text.body_grey_07,
		...reg,
		...w600,
		flex: 9,
		lineHeight: moderateScale(21),
		paddingBottom: 10,
	},

	iconLeft: {
		marginLeft: "auto",
	},
	iconRight: {
		marginRight: "auto",
	},

	midTitleContainer: {
		paddingHorizontal: verticalScale(10),
		paddingVertical: verticalScale(10),
	},
	moduleView: {
		backgroundColor: colors.neutral.white,
	},
	perText: {
		alignItems: "flex-end",
		flex: 1,
		marginTop: verticalScale(3),
		textAlign: "right",
		...w500,
		color: colors.content.text.body_grey_07,
		...sm,
		lineHeight: moderateScale(19),
	},
	progressBarStyle: {
		borderRadius: 3,
		elevation: 5,
		height: moderateScale(4),
		innerBackgroundColor: progressBar.inner,
		outerBackgroundColor: progressBar.outer,
		shadowColor: primary.color3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	row: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowContainer: {
		...row,
		alignItems: "center",
		justifyContent: "space-between",
	},
	separator: {
		marginBottom: verticalScale(10),
		// backgroundColor:'white'
	},
	subtitleText: {
		color: colors.content.text.white,
		...lg,
		...w600,
		lineHeight: moderateScale(25),
	},
	titleContainer: {
		backgroundColor: colors.neutral.black,
		justifyContent: "center",
		paddingHorizontal: verticalScale(16),
		paddingVertical: verticalScale(8),
	},
	titleOne: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		// marginVertical: verticalScale(12),
		marginBottom: verticalScale(5),
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(10),
	},
	titleText: {
		color: colors.content.text.white,
		...md,
		...w600,
		lineHeight: moderateScale(21),
	},
	titleText1: {
		color: colors.content.text.white,
		...md,
		...w600,
		lineHeight: moderateScale(21),
		marginLeft: 10,
	},
});

export default ModuleScreen;
