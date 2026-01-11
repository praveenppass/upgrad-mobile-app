import React, { useCallback, useEffect } from "react";
import { ListRenderItem } from "react-native";

import { IProgramDetails } from "@screens/Home/StudyPlan/Container1/container1.interface";
import { getProgramDetails } from "@screens/Home/StudyPlan/Container1/container1.utils";
import useContainer1Model from "@screens/Home/StudyPlan/Container1/useContainer1Model";

import Container1SpecializationCard from "@components/studyPlan/container1/SpecializationCard";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";
import useAppRoute from "@navigation/useAppRoute";

import { LearningPathType } from "@interface/app.interface";

const useContainer1Controller = () => {
	const {
		specializationList,
		specializationListLoading,
		getSpecializationProgram,
	} = useContainer1Model();

	const route = useAppRoute<typeof HOME_ROUTES.Container1Screen>();

	const { learningPathType, learningPathId, learningPathName } = route.params;

	const isProgram = learningPathType === LearningPathType.PROGRAM;
	const navigation = useAppNavigation();

	useEffect(() => {
		if (!isProgram) return;
		getSpecializationProgram({
			variables: { where: { id: learningPathId } },
		});
	}, [isProgram]);

	const navigateToStudyPlan = useCallback(
		({
			id,
			name,
			workshopId,
			code,
			workshopCode,
			userProgramId,
		}: IProgramDetails) => {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.Container2Screen,
				params: {
					learningPathId: id,
					learningPathType,
					learningPathName: name,
					workshopId,
					workshopCode,
					userProgramId,
					learningPathCode: code,
				},
			});
		},
		[navigation, learningPathType],
	);

	const relatedPrograms =
		specializationList?.userProgram?.relatedUserPrograms || [];

	const [baseProgram, ...specializationPrograms] = relatedPrograms;

	const programDetails = {
		baseProgram: getProgramDetails(baseProgram),
		specializationPrograms: specializationPrograms.map(getProgramDetails),
	};

	const renderSpecializationCard: ListRenderItem<IProgramDetails> =
		useCallback(
			({ item, index }) => (
				<Container1SpecializationCard
					navigate={() => navigateToStudyPlan(item)}
					courseName={item.name}
					progress={item.progress}
					progressText={item.progressText}
					totalLearningDuration={item.durationText}
					isLocked={item.isLocked}
					index={index}
				/>
			),
			[navigateToStudyPlan],
		);

	return {
		programDetails,
		specializationListLoading,
		navigateToStudyPlan,
		learningPathName,
		renderSpecializationCard,
	};
};

export default useContainer1Controller;
