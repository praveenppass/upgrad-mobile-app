import React from "react";
import { View } from "react-native";

import { courseDetailsStyles as styles } from "@screens/Tabs/Courses/CourseDetails/CourseDetailsStyles";

import AssistiveDrawer from "@components/Courses/CourseDetails/common/AssistiveDrawer";
import CourseDetailsBanner from "@components/Courses/CourseDetails/common/CourseDetailsBanner";
import CoursesKeyPoint, {
	IKeyPointsType,
} from "@components/Courses/CoursesKeyPoint/CoursesKeyPoint";
import Skeleton from "@components/Skeleton/Skeleton";

import { withHeader } from "@hoc/withHeader";

import CourseBottomTabNavigation from "@routes/tabs/CourseBottomTabNavigation";

import { C } from "@assets/constants";

import StudyPlanSkeleton from "../../../../components/Courses/CourseDetails/StudyPlan/StudyPlanSkeleton";
import useCourseDetailsController from "./CourseDetailsController";

const {
	themes: { primary },
	commonStyles: {
		align: { flex1 },
		spacing: { mt16 },
		text: { clrWhite, sm, md },
	},
} = C;

const BodyComponent = () => {
	const {
		pressactiveState,
		componentRender,
		activeTab,
		courseDetail,
		isDrawerOpend,
		coursesDetails,
		coursesDetailsLoading,
		moduleLoading,
		isSpecialization,
	} = useCourseDetailsController();

	if (moduleLoading) return <StudyPlanSkeleton />;

	return (
		<View style={flex1}>
			{coursesDetailsLoading ? (
				<View style={styles.containerSkeleton}>
					<Skeleton style={styles.courseTextSkeleton} />
					<Skeleton style={styles.courseTextSkeleton2} />
				</View>
			) : (
				<CourseDetailsBanner
					courseName={courseDetail?.name ?? ""}
					progress={coursesDetails?.userProgram?.progress ?? 0}
					courseDescription={courseDetail?.description ?? ""}
					isSpecialization={isSpecialization}
					footerComponent={
						<CoursesKeyPoint
							data={
								coursesDetails?.userProgram ||
								(coursesDetails?.userCourse as IKeyPointsType)
							}
							textStyle={[clrWhite, sm]}
							rootViewStyle={mt16}
						/>
					}
				/>
			)}

			{componentRender(activeTab)}
			{isDrawerOpend ? (
				<AssistiveDrawer pressactiveState={pressactiveState} />
			) : (
				""
			)}
			<CourseBottomTabNavigation
				activeTab={activeTab}
				pressactiveState={pressactiveState}
			/>
		</View>
	);
};
const CourseDetailsScreen = () => {
	const { coursesDetailsLoading } = useCourseDetailsController();

	return withHeader({
		BodyComponent,
		isGradientBackGround: false,
		headerOptions: {
			isBack: true,
			isBackColor: primary.color2,
			isBackLoading: coursesDetailsLoading,
			backButtonTextStyle: { ...md },
		},
	});
};

export default CourseDetailsScreen;
