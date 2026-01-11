import {
	DrawerActions,
	NavigationProp,
	useNavigation,
} from "@react-navigation/native";
import React from "react";
import {
	FlatList,
	Image,
	Pressable,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { IDeadlineExtensionMode } from "@components/asset/deadlineExtension/deadlineExtension.interface";
import CourseDesc from "@components/Courses/CourseDetails/common/CourseDesc";
import CourseSelector from "@components/Courses/CourseDetails/common/CourseSelector";
import LockedAssetModal from "@components/Courses/CourseDetails/common/LockedAssetModal";
import ModuleDetailsCard from "@components/Courses/CourseDetails/common/ModuleDetailsCard";
import ComboProgramNotAvailable from "@components/Courses/CourseDetails/StudyPlan/common/ComboProgramNotAvailable";
import ProductivityGPT from "@components/Courses/CourseDetails/StudyPlan/common/ProductivityGPT";
import TrackEvent from "@components/Courses/CourseDetails/StudyPlan/common/TrackEvent";
import StudyPlanSkeleton from "@components/Courses/CourseDetails/StudyPlan/StudyPlanSkeleton";
import styles from "@components/Courses/CourseDetails/StudyPlan/studyPlanStyles";
import useStudyPlanController from "@components/Courses/CourseDetails/StudyPlan/useStudyPlanController";
import DRBot from "@components/DoubtResolutionBot/DRBot";
import RNText from "@components/Reusable/RNText";
import StudyPlanBlocker from "@components/studyPlan/common/StudyPlanBlocker";
import SpecializationModal from "@components/studyPlan/container2/SpecializationModal";

// import SpecializationModal from "@components/studyPlan/container1/Container1Modal";
// import StudyPlanBlocker from "@components/StudyPlanBlocker";
import { IStudyUserProgramContainer } from "@graphql/query/studyplanTemp/getStudyModulesListQuery";

import useScrollToIndex from "@hooks/useScrollToIndex";

import useAssetHandler from "@utils/asset.utils";
import { dueDatePassed } from "@utils/courseDetailsUtils";
import { getBorderRadius, verticalScale } from "@utils/functions";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { C } from "@assets/constants";
import { BrownBellIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	themes: { primary },
	commonStyles: {
		spacing: { pb120 },
		align: { flex1, absolute, selfCenter },
	},
} = C;

interface StudyPlanProps {
	userProgramCode: string;
	userProgramId: string;
	programName: string;
	workshopId: string;
	userProgramIdForProgram: string;
	hardDeadlineDays: number;
	dueDateExtensionMode: IDeadlineExtensionMode;
}

const StudyPlan = ({
	userProgramCode,
	userProgramId,
	programName,
	workshopId,
	userProgramIdForProgram,
	hardDeadlineDays,
	dueDateExtensionMode,
}: StudyPlanProps) => {
	const dispatch = useDispatch();
	const navigation = useNavigation<NavigationProp<any>>();
	const { flatListRef, scrollToIndexFailed } = useScrollToIndex();
	const { isAssetSupported } = useAssetHandler();
	const calendarTimeZone = useSelector(
		(state: RootState) => state.calendar.calendarTimeZone,
	);

	const {
		courseRender,
		onRefresh,
		assestPlayscreen,
		handleNumberSelect,
		modulesDetails,
		moduleListLoading,
		resumeAsset,
		isLockedModalVisible,
		setIsLockedModalVisible,
		lockedUntil,
		handleLockedAssetPress,
		selectedCourseID,
		courseVariant,
		courseName,
		isProgramType,
		handleProfileBlockerCompletion,
		isLoading,
		filterContainerData,
		toggleBotVisibility,
		isBotVisible,
		isDRBotEnabled,
		resumeCourseAsset,
		courseModulesList,
		specializationCount,
		isSpecialization,
		toggleSpecialization,
		getModuleRefresh,
		penaltyConfigurationData,
		enableComboCurriculum,
		pageUrlFromStudyPlan,
	} = useStudyPlanController({ userProgramCode });

	const courseData = Array.isArray(courseRender?.courseData)
		? courseRender?.courseData?.[0]
		: courseRender?.courseData;

	const assetData = isProgramType
		? resumeAsset?.userProgramNextAsset
		: resumeCourseAsset?.userCourseNextAsset;

	const assetAliasName = isProgramType
		? resumeAsset?.userProgramNextAsset?.aliasName
		: resumeCourseAsset?.userCourseNextAsset?.parent?.aliasName;

	const resumeAssetName = assetAliasName || assetData?.asset?.name;

	const { bottom } = useSafeAreaInsets();

	const renderItem = ({
		item,
		index,
	}: {
		item: IStudyUserProgramContainer;
		index: number;
	}) => {
		const numberOfItems = isProgramType
			? modulesDetails?.userProgramContainers?.length
			: courseModulesList?.userCourseContainers?.length;

		const SegmentOnPress = async () => {
			if (isAssetSupported(item.asset)) {
				//Legacy for old assets, will be removed once all assets are migrated
				await dispatch(
					studyPlanSlice.actions.selectAsset(item?.asset ?? null),
				);
				navigation.navigate("Container6Screen", {
					learningPathName: courseName,
					assetCode: item?.asset?.code || "",
					learningPathType: isProgramType
						? LearningPathType.PROGRAM
						: LearningPathType.COURSE,
					learningPathId: selectedCourseID,
					courseId: item?.asset?.activity?.level1 || null,
					moduleId: item?.asset?.activity?.level2 || null,
					sessionId: item?.asset?.activity?.level3 || null,
					segmentId: item?.asset?.activity?.level4 || null,
					elective: courseData?.elective,
					electiveGroup: courseData?.electiveGroup,
					track: courseData?.track,
					trackGroup: courseData?.trackGroup,
				});
			}
		};
		const activity = item?.activity ?? item.asset?.activity;

		const { totalCompletedGradableAssets = 0, totalGradableAssets = 0 } =
			isProgramType ? activity || {} : item || {};

		const isDueDateExtended = !!activity?.extensionRequests?.length;
		const dueDate = activity?.dueAt || "";

		const assetName = item?.aliasName || item?.asset?.name || "";

		return (
			<View
				style={[
					flex1,
					styles.sub,
					getBorderRadius(index, numberOfItems || 0),
				]}
			>
				<ModuleDetailsCard
					resumeAsset={
						isProgramType ? resumeAsset : resumeCourseAsset
					}
					onTopicItemPress={SegmentOnPress}
					index={index}
					numberOfItems={numberOfItems}
					WeekOnPress={async () => {
						navigation.setParams({
							variant: courseVariant,
							selectedId: selectedCourseID,
							level1: courseData?.code,
							level2: item?.code,
							elective: courseData?.elective,
							electiveGroup: courseData?.electiveGroup,
							track: courseData?.track,
							trackGroup: courseData?.trackGroup,
						});
						navigation.dispatch(DrawerActions.openDrawer());
					}}
					label={item?.label ?? ""}
					totalCompletedSubmissions={
						item?.activity?.totalCompletedSubmissions ?? 0
					}
					totalSubmissions={item?.activity?.totalSubmissions ?? 0}
					remainingTimer={item?.activity?.duration ?? 0}
					weekStartDate={item?.activity?.startsAt ?? ""}
					milestoneName={item?.name ?? ""}
					description={item?.description ?? ""}
					progress={activity?.progress ?? 0}
					assetType={item?.asset?.assetType?.type as IAssetType}
					asset={!!item?.asset}
					assetTitle={assetName}
					assetStatus={activity?.status as IAssetStatusEnum}
					extensionRequests={activity?.extensionRequests ?? ""}
					enableLock={!!activity?.enableLock}
					isOptional={!!item?.isOptional}
					availableFrom={activity?.availableFrom ?? ""}
					checkDueDateCrossed={dueDatePassed(item?.asset)}
					assetCode={item?.asset?.code ?? ""}
					status={activity?.status ?? ""}
					isLocked={!!activity?.enableLock}
					learningPathId={selectedCourseID}
					level1={courseData?.code ?? ""}
					level2={item?.code ?? ""}
					level3={null}
					level4={null}
					onLockedAssetPress={handleLockedAssetPress}
					availableTill={activity?.availableTill as string}
					dueDate={dueDate}
					totalCompletedGradableAssets={totalCompletedGradableAssets}
					totalGradableAssets={totalGradableAssets}
					isDueDateExtended={isDueDateExtended}
					hardDeadlineDays={hardDeadlineDays}
					isProgram={isProgramType}
					learningPathCode={userProgramCode}
					onRefetchModule={getModuleRefresh}
					penaltyConfigurationData={penaltyConfigurationData}
					dueDateExtensionMode={dueDateExtensionMode}
				/>
			</View>
		);
	};

	if (!isLoading() && enableComboCurriculum) {
		return <ComboProgramNotAvailable />;
	}
	return (
		<>
			{isLoading() ? (
				<StudyPlanSkeleton />
			) : (
				<>
					<ScrollView contentContainerStyle={styles.contentContainer}>
						{specializationCount > 0 ? (
							<View style={styles.specializationView}>
								<BrownBellIcon />
								<RNText
									title={`  ${specializationCount} ${strings.UPCOMING_SPECIALISATIONS}`}
									style={styles.specializationTxt}
								/>
								<Pressable
									onPress={toggleSpecialization}
									style={styles.specializationLine}
								>
									<RNText
										title={strings.SELECT_NOW}
										style={styles.specializationTxt}
									/>
								</Pressable>
							</View>
						) : (
							<></>
						)}

						<ProductivityGPT selectedCourseID={selectedCourseID} />

						<View style={styles.main}>
							<RNText
								title={strings.SELECT_COURSE}
								style={styles.titleStyle}
							/>
							<CourseSelector
								courseRender={courseRender}
								data={filterContainerData()}
								onSelect={handleNumberSelect}
							/>
						</View>
						<CourseDesc
							description={courseData?.description?.trim()}
							title={courseData?.name ?? ""}
							course={courseData?.label ?? ""}
						/>
						{courseData?.activity?.isTrackGroup ||
						courseData?.activity?.isElectiveGroup ? (
							<TrackEvent data={courseData} />
						) : (
							<View style={styles.moduleViewStyle}>
								<FlatList
									ref={flatListRef}
									refreshControl={
										<RefreshControl
											onRefresh={onRefresh}
											tintColor={primary.color3}
											refreshing={moduleListLoading}
										/>
									}
									onScrollToIndexFailed={scrollToIndexFailed}
									data={
										isProgramType
											? modulesDetails?.userProgramContainers
											: courseModulesList?.userCourseContainers
									}
									showsVerticalScrollIndicator={false}
									renderItem={renderItem}
									contentContainerStyle={[pb120]}
									keyExtractor={(item, index) =>
										`${item?.code}-${index}`
									}
								/>
							</View>
						)}
					</ScrollView>
					{/* //TODO */}
					{isDRBotEnabled ? (
						<TouchableOpacity
							style={[
								styles.botView,
								!resumeAsset?.userProgramNextAsset?.asset?.name
									? styles.botViewWithNextUp
									: styles.botViewWithoutNextUp,
							]}
							onPress={toggleBotVisibility}
						>
							<Image
								source={require("../../../../assets/icons/svg/dr-bot-animation.gif")}
								style={styles.animatedGif}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					) : (
						<></>
					)}
					<LinearGradient
						style={{
							...absolute,
							bottom: bottom + verticalScale(45),
							...selfCenter,
						}}
						colors={[
							"rgba(255, 255, 255, 0.7)", // Fully opaque white at the top
							"rgba(255, 255, 255, 0.5)", // Semi-transparent white in the middle
							"rgba(255, 255, 255, 0)", // Fully transparent white at the bottom
						]}
						start={{ x: 0.5, y: 0 }} // Start at the top middle
						end={{ x: 0.5, y: 0.5 }}
					/>
					<LockedAssetModal
						isLockedModalVisible={isLockedModalVisible}
						setIsLockedModalVisible={setIsLockedModalVisible}
						lockedUntil={lockedUntil}
						calendarTimeZone={calendarTimeZone}
					/>
				</>
			)}

			{/* <StudyPlanBlocker
				learningPathId={selectedCourseID}
				isProgramType={isProgramType}
				workshopCode={workshopId}
				programCodeInfo={userProgramCode}
				handleBlockerCompletion={handleProfileBlockerCompletion}
			/>

			<SpecializationModal
				isVisible={isSpecialization}
				onClose={toggleSpecialization}
				specializationCount={specializationCount}
			/> */}

			<DRBot
				visible={isBotVisible}
				onClose={toggleBotVisibility}
				userProgramIdForBot={userProgramId}
				userProgramCodeForBot={userProgramCode}
				programName={programName}
				workshopId={workshopId}
				userProgramIdForProgram={userProgramIdForProgram}
				programCode={userProgramCode}
				programId={userProgramIdForProgram}
				learningPathId={userProgramId}
				pageUrlFromStudyPlan={pageUrlFromStudyPlan}
			/>
		</>
	);
};

export default StudyPlan;
