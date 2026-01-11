import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ScrollToTop, { useScrollToTop } from "@components/Reusable/ScrollToTop";
import ViewOnDesktopModal from "@components/Reusable/ViewOnDesktopModal";
import ResumeAssetSticky from "@components/studyPlan/common/ResumeAssetSticky";
import StudyPlanBlocker from "@components/studyPlan/common/StudyPlanBlocker";
import StudyPlanSkeleton from "@components/studyPlan/common/StudyPlanSkeleton";
import {
	IContainer2Component,
	ICourseItem,
} from "@components/studyPlan/container2/Container2Component/container2Component.interface";
import useContainer2Controller from "@components/studyPlan/container2/Container2Component/useContainer2ComponentController";
import SpecializationModal from "@components/studyPlan/container2/SpecializationModal";

import { horizontalScale, verticalScale } from "@utils/functions";

/** Bottom position for the resume asset sticky component */
const RESUME_ASSET_STICKY_BOTTOM_POSITION = verticalScale(10);

/**
 * Container2 component displays a study plan screen with course information,
 * notifications carousel (for programs), course descriptions, and a course list.
 *
 *
 * @returns {JSX.Element} The Container2 component
 */

const Container2Component = ({
	learningPathType,
	learningPathName,
	learningPathId,
	workshopId,
	workshopCode,
	userProgramId,
	learningPathCode,
}: IContainer2Component) => {
	const flatListRef = useRef<FlatList<ICourseItem>>(null);
	const {
		isSpecializationModalVisible,
		toggleSpecializationModal,
		isViewOnDesktopModalVisible,
		toggleViewOnDesktopModal,
		handleRenderCourseItem,
		handleRenderListHeader,
		loading,
		courseList,
		specializationCount,
		learningPathStartDate,
		surveyBlockerData,
		profileBlockerData,
		refetchLearningPathData,
		isLearningPathUpgraded,
		viewOnDesktopModalDescription,
		certificates,
		showOnboardingModal,
	} = useContainer2Controller({
		workshopId,
		workshopCode,
		userProgramId,
		learningPathId,
		learningPathType,
		learningPathName,
		learningPathCode,
	});

	const { showButton, onScroll } = useScrollToTop();

	if (loading) return <StudyPlanSkeleton />;
	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.scrollViewContentContainer}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={handleRenderListHeader}
				data={courseList}
				renderItem={handleRenderCourseItem}
				keyExtractor={(_, index) => `CourseCard-${index}`}
				ref={flatListRef}
				onScroll={onScroll}
			/>
			<ScrollToTop
				flatListRef={flatListRef}
				showButton={showButton}
				style={styles.scrollToTopContainer}
				testID="container2_scroll_to_top"
			/>
			<ResumeAssetSticky
				learningPathName={learningPathName}
				learningPathId={learningPathId}
				learningPathType={learningPathType}
				cardStyle={styles.resumeAssetSticky}
				learningPathCode={learningPathCode}
				testID="container2_resume_asset_sticky"
				loading={loading}
			/>
			<SpecializationModal
				isVisible={isSpecializationModalVisible}
				onClose={toggleSpecializationModal}
				specializationCount={specializationCount}
			/>
			<StudyPlanBlocker
				learningPathStartDate={learningPathStartDate}
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathCode={learningPathCode}
				workshopId={workshopId}
				surveyBlockerData={surveyBlockerData}
				profileBlockerData={profileBlockerData}
				refetchLearningPathData={refetchLearningPathData}
				isLearningPathUpgraded={isLearningPathUpgraded}
				certificatesData={certificates ?? []}
				shouldShowOnboardingModal={showOnboardingModal}
			/>
			<ViewOnDesktopModal
				showModal={isViewOnDesktopModalVisible}
				setShowModal={toggleViewOnDesktopModal}
				testID="container2_view_on_desktop_modal"
				description={viewOnDesktopModalDescription}
			/>
		</View>
	);
};

export default memo(Container2Component);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		marginHorizontal: horizontalScale(20),
	},
	resumeAssetSticky: {
		bottom: RESUME_ASSET_STICKY_BOTTOM_POSITION,
		left: horizontalScale(5),
		position: "absolute",
		right: horizontalScale(5),
	},
	scrollToTopContainer: {
		bottom: verticalScale(60),
		position: "absolute",
		zIndex: 100,
	},
	scrollViewContentContainer: {
		gap: verticalScale(20),
		paddingBottom: verticalScale(80),
	},
});
