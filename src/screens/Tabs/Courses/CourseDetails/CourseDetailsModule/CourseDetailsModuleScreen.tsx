import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";

import LockedAssetModal from "@components/Courses/CourseDetails/common/LockedAssetModal";
import ModuleItemsCardLxp from "@components/Courses/CourseDetails/common/ModuleItemsCardLxp";

import { withHeader } from "@hoc/withHeader";

import { RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";

import { courseDetailsStyles as styles } from "../CourseDetailsStyles";
import useCourseDetailsModuleController from "./useCourseDetailsModuleController";

const BodyComponent = ({ params }: any) => {
	const {
		nextFun,
		previousFun,
		loading,
		level2loading,
		renderLevel2,
		renderActive,
		showNext,
		showPrevious,
		isLockedModalVisible,
		setIsLockedModalVisible,
		lockedUntil,
		handleLockedAssetPress,
		coursesDetails,
		coursesDetailsLoading,
		resumeAsset,
		resumeAssetLoading,
		stateParams,
	} = useCourseDetailsModuleController(params);
	const skeltonLoader =
		loading || level2loading || coursesDetailsLoading || resumeAssetLoading;

	const calendarTimeZone = useSelector(
		(state: RootState) => state.calendar.calendarTimeZone,
	);

	StatusBar.setBarStyle("dark-content", true);
	Platform.OS === "android" &&
		StatusBar.setBackgroundColor(colors.neutral.white, true);

	return (
		<>
			<View style={styles.container}>
				<ModuleItemsCardLxp
					courseDetail={
						coursesDetails?.userProgram ??
						coursesDetails?.userCourse
					}
					resumeAsset={resumeAsset}
					renderLevel2={renderLevel2}
					renderActive={renderActive}
					selectedDrawer={stateParams}
					nextFun={nextFun}
					previousFun={previousFun}
					skeltonLoader={skeltonLoader}
					showNext={showNext}
					showPrevious={showPrevious}
					onLockedAssetPress={handleLockedAssetPress}
					openCurrentModule={stateParams?.openCurrentModule}
					elective={stateParams?.elective}
					electiveGroup={stateParams?.electiveGroup}
					track={stateParams?.track}
					trackGroup={stateParams?.trackGroup}
				/>

				<LockedAssetModal
					isLockedModalVisible={isLockedModalVisible}
					setIsLockedModalVisible={setIsLockedModalVisible}
					lockedUntil={lockedUntil}
					calendarTimeZone={calendarTimeZone}
				/>
			</View>
		</>
	);
};

const CourseDetailsModuleScreen = ({ state }: any) => {
	const stackRoute = state.routes[state.index];

	const activeRoute =
		stackRoute.state && stackRoute.state.routes.length > 0
			? stackRoute.state.routes[stackRoute.state.index]
			: stackRoute;
	return withHeader({
		BodyComponent: (props) => (
			<BodyComponent {...props} params={activeRoute?.params} />
		),
		HeaderComponent: () => <></>,
	});
};

export default CourseDetailsModuleScreen;
