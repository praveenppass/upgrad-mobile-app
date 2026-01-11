import React, { memo } from "react";

import useContainer6Controller from "@screens/Home/StudyPlan/Container6/useContainer6Controller";

import BottomTab from "@components/studyPlan/common/BottomTab";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

const Container6WithBottomTab = () => {
	const {
		activeTab,
		setActiveTab,
		learningPathCode,
		tabs,
		Container6,
		assetCode,
		assetType,
		courseId,
		elective,
		electiveGroup,
		learningPathId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		track,
		trackGroup,
		workshopId,
		learningPathType,
	} = useContainer6Controller();

	return (
		<BottomTab
			learningPathCode={learningPathCode}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			tabs={tabs}
			DefaultComponent={Container6}
			assetCode={assetCode}
			assetType={assetType}
			courseCode={courseId || ""}
			electiveCode={elective}
			electiveGroupCode={electiveGroup}
			learningPathId={learningPathId}
			learningPathName={learningPathName}
			moduleCode={moduleId || ""}
			segmentCode={segmentId || ""}
			sessionCode={sessionId || ""}
			trackCode={track}
			trackGroupCode={trackGroup}
			workshopId={workshopId}
			learningPathType={learningPathType}
		/>
	);
};

const MemoizedContainer6WithBottomTab = memo(Container6WithBottomTab);

const Container6 = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container6Screen>();
	const { learningPathName } = route.params;
	return (
		<WithHeaderLxp
			BodyComponent={MemoizedContainer6WithBottomTab}
			showBack
			showDismiss
			showHome
			showBottomShadow
			title={learningPathName}
		/>
	);
};

export default Container6;
