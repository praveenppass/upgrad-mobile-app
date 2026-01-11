import React, { memo } from "react";

import useContainer2WithTabsController from "@screens/Home/StudyPlan/Container2/useContainer2Controller";

import BottomTab from "@components/studyPlan/common/BottomTab";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { HOME_ROUTES } from "@navigation/routes";
import { useAppRoute } from "@navigation/useAppRoute";

import { colors } from "@assets/colors";

const { neutral } = colors;

const Container2WithBottomTab = () => {
	const {
		activeTab,
		setActiveTab,
		learningPathCode,
		tabs,
		learningPathId,
		learningPathName,
		workshopId,
		learningPathType,
	} = useContainer2WithTabsController();

	return (
		<BottomTab
			learningPathCode={learningPathCode}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			tabs={tabs}
			learningPathId={learningPathId}
			learningPathName={learningPathName}
			workshopId={workshopId}
			learningPathType={learningPathType}
		/>
	);
};

const MemoisedContainer2WithBottomTab = memo(Container2WithBottomTab);

const Container2Screen = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container2Screen>();
	const { learningPathName } = route.params;
	return (
		<WithHeaderLxp
			BodyComponent={MemoisedContainer2WithBottomTab}
			title={learningPathName}
			showProfile={false}
			backgroundColor={neutral.white}
			showBack
			showHome
			showBottomShadow
		/>
	);
};

export default Container2Screen;
