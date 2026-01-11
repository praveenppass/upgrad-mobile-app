import React, { memo } from "react";

import useContainer3Controller from "@screens/Home/StudyPlan/Container3/useContainer3Controller";

import BottomTab from "@components/studyPlan/common/BottomTab";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

const Container3WithBottomTab = () => {
	const {
		activeTab,
		setActiveTab,
		learningPathCode,
		tabs,
		learningPathId,
		learningPathName,
		workshopId,
		courseCode,
		trackGroupCode,
		trackCode,
		electiveCode,
		electiveGroupCode,
		learningPathType,
	} = useContainer3Controller();

	return (
		<BottomTab
			learningPathCode={learningPathCode}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			tabs={tabs}
			learningPathId={learningPathId}
			learningPathName={learningPathName}
			workshopId={workshopId}
			courseCode={courseCode}
			trackGroupCode={trackGroupCode}
			trackCode={trackCode}
			electiveCode={electiveCode}
			electiveGroupCode={electiveGroupCode}
			learningPathType={learningPathType}
		/>
	);
};

const MemoizedContainer3WithBottomTab = memo(Container3WithBottomTab);

const Container3 = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container3Screen>();
	const { learningPathName } = route.params;
	return (
		<WithHeaderLxp
			BodyComponent={MemoizedContainer3WithBottomTab}
			showBack
			showDismiss
			showHome
			showBottomShadow
			title={learningPathName}
		/>
	);
};

export default Container3;
