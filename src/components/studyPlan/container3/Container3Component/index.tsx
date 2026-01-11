import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ScrollToTop, { useScrollToTop } from "@components/Reusable/ScrollToTop";
import Container3Skeleton from "@components/studyPlan/common/Container3Skeleton";
import ResumeAssetSticky from "@components/studyPlan/common/ResumeAssetSticky";
import StudyPlanBlocker from "@components/studyPlan/common/StudyPlanBlocker";
import StudyPlanSkeleton from "@components/studyPlan/common/StudyPlanSkeleton";
import { IContainer3Component } from "@components/studyPlan/container3/Container3Component/container3Component.interface";
import useContainer3ComponentController from "@components/studyPlan/container3/Container3Component/useContainer3ComponentController";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { reg, semiBold, sm, regular } = commonStyles.text;

const RESUME_ASSET_STICKY_BOTTOM_POSITION = verticalScale(10);

const Container3Component = (props: IContainer3Component) => {
	const { showButton, onScroll } = useScrollToTop();

	const {
		learningPathType,
		learningPathId,
		learningPathName,
		learningPathCode,
		workshopId,
		courseCode,
	} = props;

	const {
		container3DataLoading,
		moduleCardList,
		MemoisedContainer3Header,
		handleRenderContainer3Item,
		container3ProgramCardListDataLoading,
		userProgramNextAsset,
		userProgramNextAssetLoading,
		userCourseNextAsset,
		userCourseNextAssetLoading,
		flatListRef,
		feedbackData,
	} = useContainer3ComponentController(props);

	if (container3DataLoading) return <StudyPlanSkeleton />;

	return (
		<View style={styles.container}>
			<FlatList
				data={moduleCardList}
				renderItem={handleRenderContainer3Item}
				keyExtractor={(_, index) => `container3-${index}`}
				contentContainerStyle={styles.contentContainer}
				ListHeaderComponent={MemoisedContainer3Header}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				onScroll={onScroll}
				ref={flatListRef}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Container3Skeleton
						loading={container3ProgramCardListDataLoading}
					/>
				)}
				initialNumToRender={moduleCardList?.length}
			/>
			<ResumeAssetSticky
				learningPathName={learningPathName}
				learningPathId={learningPathId}
				learningPathType={learningPathType}
				cardStyle={styles.resumeAssetSticky}
				learningPathCode={learningPathCode}
				programData={userProgramNextAsset}
				courseData={userCourseNextAsset}
				loading={
					userProgramNextAssetLoading || userCourseNextAssetLoading
				}
				testID="container3_resume_asset_sticky"
			/>
			<ScrollToTop
				flatListRef={flatListRef}
				showButton={showButton}
				style={styles.scrollToTopContainer}
				testID="container3_scroll_to_top"
			/>

			<StudyPlanBlocker
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathCode={learningPathCode}
				workshopId={workshopId ?? ""}
				feedbackData={feedbackData}
				courseId={courseCode ?? ""}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: verticalScale(80),
		paddingHorizontal: horizontalScale(14),
		paddingTop: verticalScale(20),
	},
	courseName: {
		...reg,
		...semiBold,
		lineHeight: verticalScale(22),
	},
	resumeAssetSticky: {
		bottom: RESUME_ASSET_STICKY_BOTTOM_POSITION,
		left: horizontalScale(5),
		position: "absolute",
		right: horizontalScale(5),
	},
	scrollToTopContainer: {
		bottom: verticalScale(70),
		position: "absolute",
		zIndex: 100,
	},
	separator: {
		height: verticalScale(16),
	},
	title: {
		...sm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(19),
	},
	titleContainer: {
		gap: verticalScale(4),
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
	},
});

export default Container3Component;
