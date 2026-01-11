import { useEffect, useMemo, useState } from "react";

import {
	mapContainer3CourseData,
	mapModuleCardListForProgram,
	mapModuleNameList,
	mapSessionListData,
} from "@screens/Home/StudyPlan/common/studyPlan.utils";

import { ISessionList } from "@components/studyPlan/container3/SessionCard";
import useContainer6Model from "@components/studyPlan/container6/Container6Modal/useContainer6ModalModel";

interface IContainer6Controller {
	userProgramOrCourseCode: string;
	learningPathId: string;
	isProgram: boolean;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	level2: string | null;
	level3: string | null;
	level4: string | null;
}

interface IBaseWhereVariables {
	id: string;
	electiveGroup?: string;
	trackGroup?: string;
	level1: string;
	track?: string;
	elective?: string;
}

const useContainer6ModalController = ({
	userProgramOrCourseCode,
	learningPathId,
	isProgram,
	elective,
	electiveGroup,
	track,
	trackGroup,
	level2,
	level3,
	level4,
}: IContainer6Controller) => {
	const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
	const [expandedSessionIndex, setExpandedSessionIndex] = useState(-1);

	const {
		getContainer3CourseQueryData,
		container3CourseData,
		getContainer3ProgramCardListData,
		container3ProgramCardListData,
		getContainer3SessionData,
		container3SessionData,
		container3SessionDataLoading,
		getContainer6ProgramQueryData,
		container6ProgramData,
		container6ProgramDataLoading,
	} = useContainer6Model();

	const baseWhereVariables = useMemo(
		(): IBaseWhereVariables => ({
			id: learningPathId,
			level1: userProgramOrCourseCode,
			...(electiveGroup && { electiveGroup }),
			...(trackGroup && { trackGroup }),
			...(track && { track }),
			...(elective && { elective }),
		}),
		[
			learningPathId,
			userProgramOrCourseCode,
			electiveGroup,
			trackGroup,
			track,
			elective,
		],
	);

	const userContainersWhere = {
		id: learningPathId,
	};

	const moduleNameListForProgram = useMemo(
		() =>
			mapModuleNameList(
				container6ProgramData?.userProgramContainers || [],
			),
		[container6ProgramData],
	);

	const moduleTabsDataForCourse = useMemo(
		() =>
			mapContainer3CourseData(
				container3CourseData?.userCourseContainers || [],
			),
		[container3CourseData],
	);

	const moduleTabsData = isProgram
		? moduleNameListForProgram
		: moduleTabsDataForCourse;

	const selectedModule = moduleTabsData[selectedModuleIndex];

	const moduleListLength = moduleTabsData.length;

	const disabledNext = selectedModuleIndex === moduleListLength - 1;
	const disabledPrevious = selectedModuleIndex === 0;

	const userCourse = container3CourseData?.userCourse?.filter(
		(item) => item.code === userProgramOrCourseCode,
	);

	const courseName = isProgram
		? container6ProgramData?.userProgramContainer?.name || ""
		: userCourse?.[0]?.name || "";

	const courseLabel = isProgram
		? container6ProgramData?.userProgramContainer?.label || ""
		: userCourse?.[0]?.label || "";

	const moduleCardList = useMemo(
		() =>
			isProgram
				? mapModuleCardListForProgram(
						container3ProgramCardListData?.userProgramContainers ||
							[],
					)
				: moduleTabsDataForCourse[selectedModuleIndex]?.children,
		[
			container3ProgramCardListData,
			moduleTabsDataForCourse,
			selectedModuleIndex,
		],
	);

	const sessionList: ISessionList[] = useMemo(
		() =>
			mapSessionListData(
				container3SessionData?.userProgramContainers || [],
			),
		[container3SessionData?.userProgramContainers],
	);
	const currentModuleIndex = useMemo(() => {
		if (!moduleTabsData?.length) return -1;
		return Math.max(
			moduleTabsData?.findIndex((module) => module?.code === level2),
			0,
		);
	}, [container6ProgramData, container3CourseData, level2]);

	const currentSessionIndex = useMemo(
		() => moduleCardList?.findIndex((module) => module?.code === level3),
		[container3ProgramCardListData, container3CourseData, level3],
	);
	const currentTopicIndex = useMemo(
		() => sessionList?.findIndex((session) => session?.code === level4),
		[container3SessionData, level4],
	);

	const handlePreviousModule = () => {
		setSelectedModuleIndex(Math.max(0, selectedModuleIndex - 1));
		setExpandedSessionIndex(-1);
	};

	const handleNextModule = () => {
		setSelectedModuleIndex(
			Math.min(moduleListLength - 1, selectedModuleIndex + 1),
		);
		setExpandedSessionIndex(-1);
	};

	const onSessionPress = (index: number) => {
		if (!moduleCardList || !moduleCardList[index]) return;
		if (expandedSessionIndex === index) return setExpandedSessionIndex(-1);
		setExpandedSessionIndex(index);

		const sessionVariables = {
			where: {
				id: learningPathId,
				level1: userProgramOrCourseCode,
				level2: selectedModule.code,
				level3: moduleCardList[index].code,
			},
		};
		getContainer3SessionData({ variables: sessionVariables });
	};

	useEffect(() => {
		setExpandedSessionIndex(-1);
		if (isProgram) {
			getContainer6ProgramQueryData({
				variables: {
					where: baseWhereVariables,
					userProgramContainerWhere: baseWhereVariables,
				},
			});
		} else {
			getContainer3CourseQueryData({
				variables: {
					where: baseWhereVariables,
					userCourseContainerWhere: userContainersWhere,
				},
			});
		}
		setSelectedModuleIndex(currentModuleIndex);
		setExpandedSessionIndex(-1);
	}, [
		currentModuleIndex,
		baseWhereVariables,
		learningPathId,
		currentModuleIndex,
	]);

	useEffect(() => {
		onSessionPress(currentSessionIndex);
	}, [currentSessionIndex]);

	useEffect(() => {
		if (!selectedModule) return;

		if (isProgram) {
			getContainer3ProgramCardListData({
				variables: {
					where: {
						...baseWhereVariables,
						level2: selectedModule?.code,
						levelLimit: 1,
					},
				},
			});
		}
	}, [selectedModule]);

	return {
		container6ProgramDataLoading,
		container3SessionDataLoading,
		courseName,
		courseLabel,
		moduleNameListForProgram,
		selectedModule,
		handlePreviousModule,
		handleNextModule,
		disabledNext,
		disabledPrevious,
		moduleCardList,
		sessionList,
		onSessionPress,
		expandedSessionIndex,
		currentTopicIndex,
	};
};

export default useContainer6ModalController;
