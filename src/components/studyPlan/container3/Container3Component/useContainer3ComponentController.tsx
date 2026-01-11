import { useFocusEffect } from "@react-navigation/native";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { FlatList, ListRenderItem } from "react-native";

import {
	mapContainer3CourseData,
	mapContainer3ProgramData,
	mapModuleCardListForProgram,
	mapSessionListData,
} from "@screens/Home/StudyPlan/common/studyPlan.utils";

import CommonAssetCard from "@components/studyPlan/common/CommonAssetCard";
import {
	IContainer3Component,
	IModuleCardListItem,
} from "@components/studyPlan/container3/Container3Component/container3Component.interface";
import useContainer3ComponentModel from "@components/studyPlan/container3/Container3Component/useContainer3ComponentModel";
import Container3ListHeader from "@components/studyPlan/container3/Container3ListHeader";
import SessionCard, {
	ISessionList,
} from "@components/studyPlan/container3/SessionCard";

import { LearningPathType } from "@interface/app.interface";

interface IBaseWhereVariables {
	id: string;
	electiveGroup?: string;
	trackGroup?: string;
	level1: string;
	track?: string;
	elective?: string;
}

const useContainer3ComponentController = ({
	learningPathType,
	learningPathId,
	learningPathName,
	courseCode,
	trackGroupCode,
	trackCode,
	electiveCode,
	electiveGroupCode,
	learningPathCode,
	workshopId,
	workshopCode,
	userProgramId,
}: IContainer3Component) => {
	const {
		getContainer3CourseQueryData,
		container3CourseData,
		getContainer3ProgramQueryData,
		container3ProgramData,
		getContainer3ProgramCardListData,
		container3ProgramCardListData,
		container3ProgramCardListDataLoading,
		getContainer3SessionData,
		container3SessionData,
		container3CourseDataLoading,
		container3ProgramDataLoading,
		container3SessionDataLoading,
		refetchContainer3CourseQueryData,
		refetchContainer3ProgramQueryData,
		getUserProgramNextAsset,
		userProgramNextAsset,
		userProgramNextAssetLoading,
		getUserCourseNextAsset,
		userCourseNextAsset,
		userCourseNextAssetLoading,
	} = useContainer3ComponentModel();
	const [expandedIndex, setExpandedIndex] = useState(-1);
	const [selectedModuleIndex, setSelectedModuleIndex] = useState(-1);

	const container3DataLoading =
		container3CourseDataLoading || container3ProgramDataLoading;

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const container3ProgramCardData =
		container3ProgramData?.userProgramContainers;
	const container3CourseCardData = container3CourseData?.userCourseContainers;

	const penaltyConfigurationData =
		container3ProgramData?.assetPenaltyConfigurations;
	const userProgramData = container3ProgramData?.userProgram;

	const nextAsset = isProgram
		? userProgramNextAsset?.userProgramNextAsset
		: userCourseNextAsset?.userCourseNextAsset;

	const baseWhereVariables: IBaseWhereVariables = useMemo(() => {
		let commonWhereVariables: IBaseWhereVariables = {
			id: learningPathId,
			electiveGroup: electiveGroupCode,
			trackGroup: trackGroupCode,
			level1: courseCode,
		};

		if (trackCode) {
			commonWhereVariables = {
				...commonWhereVariables,
				level1: trackCode,
				track: courseCode,
			};
		}

		if (electiveCode) {
			commonWhereVariables = {
				...commonWhereVariables,
				level1: electiveCode,
				elective: courseCode,
			};
		}

		return commonWhereVariables;
	}, [
		learningPathId,
		electiveGroupCode,
		trackGroupCode,
		courseCode,
		trackCode,
		electiveCode,
	]);

	const userContainersWhere = useMemo(
		() => ({ id: learningPathId }),
		[learningPathId],
	);

	const getAsset = isProgram
		? getUserProgramNextAsset
		: getUserCourseNextAsset;

	useFocusEffect(
		useCallback(() => {
			setExpandedIndex(-1);
			if (isProgram)
				getContainer3ProgramQueryData({
					variables: {
						where: baseWhereVariables,
						userProgramContainerWhere: baseWhereVariables,
						assetPenaltyWhere: { program: learningPathCode },
						userProgramWhere: { id: learningPathId },
						pendingFeedbackWhere: {
							feedbackFrom: "learner",
							level1: courseCode,
							type: "module-completion",
							userProgram: learningPathId,
						},
					},
				});
			else
				getContainer3CourseQueryData({
					variables: {
						where: baseWhereVariables,
						userCourseContainerWhere: userContainersWhere,
					},
				});

			getAsset({
				variables: {
					where: { id: learningPathId },
					userProgramWhere: { id: learningPathId },
					userCourseWhere: { id: learningPathId },
				},
			});
		}, [learningPathId, courseCode]),
	);

	const container3ModuleCardListForProgram =
		container3ProgramCardListData?.userProgramContainers || [];

	const moduleTabsDataForProgram = useMemo(
		() => mapContainer3ProgramData(container3ProgramCardData || []),
		[container3ProgramCardData],
	);

	const moduleTabsDataForCourse = useMemo(
		() => mapContainer3CourseData(container3CourseCardData || []),
		[container3CourseCardData],
	);

	const moduleTabsData = isProgram
		? moduleTabsDataForProgram
		: moduleTabsDataForCourse;

	const moduleCardList = useMemo(
		() =>
			isProgram
				? mapModuleCardListForProgram(
						container3ModuleCardListForProgram,
					)
				: moduleTabsDataForCourse[selectedModuleIndex]?.children || [],

		[
			container3ModuleCardListForProgram,
			container3CourseCardData,
			selectedModuleIndex,
		],
	);

	const selectedModule = moduleTabsData[selectedModuleIndex];

	const { totalExtensionsAllowed, dueDateExtensionMode } = useMemo(() => {
		const { program, comboCurriculum } = userProgramData || {};

		const enableComboCurriculum = program?.enableComboCurriculum ?? false;

		if (enableComboCurriculum && comboCurriculum) {
			return {
				totalExtensionsAllowed: comboCurriculum.totalExtensionsAllowed,
				dueDateExtensionMode: comboCurriculum.dueDateExtensionMode,
			};
		}

		return {
			totalExtensionsAllowed: program?.totalExtensionsAllowed,
			dueDateExtensionMode: program?.dueDateExtensionMode,
		};
	}, [userProgramData]);

	const { program, totalExtensionsTaken } = userProgramData || {};

	const hardDeadlineDays = program?.hardDeadlineDays || 0;

	const {
		level2: currentLevel2,
		level3: currentLevel3,
		level4: currentLevel4,
	} = nextAsset?.activity || {};

	const onSessionPress = useCallback(
		(index: number) => {
			if (!(moduleCardList && moduleCardList[index])) return;

			if (expandedIndex === index) return setExpandedIndex(-1);

			setExpandedIndex(index);

			const sessionVariables = {
				where: {
					...baseWhereVariables,
					level2: selectedModule?.code,
					level3: moduleCardList[index].code,
				},
			};

			getContainer3SessionData({ variables: sessionVariables });
		},

		[
			container3ProgramCardListData,
			baseWhereVariables,
			selectedModule?.code,
			expandedIndex,
		],
	);

	const currentModuleIndex = useMemo(() => {
		if (!moduleTabsData?.length || !nextAsset) return -1;
		return Math.max(
			moduleTabsData.findIndex((module) => module.code === currentLevel2),
			0,
		);
	}, [container3ProgramCardData, container3CourseCardData, currentLevel2]);

	const currentSessionIndex = useMemo(
		() =>
			moduleCardList.findIndex((module) => module.code === currentLevel3),
		[
			container3ProgramCardListData,
			container3CourseCardData,
			currentLevel3,
		],
	);

	//TODO: archer: add scroll to index

	// const handleScrollToIndex = useCallback(
	// 	(index: number) => {
	// 		if (index < moduleCardList.length)
	// 			flatListRef.current?.scrollToIndex({
	// 				index,
	// 				animated: true,
	// 				viewPosition: 0.5,
	// 			});
	// 	},
	// 	[moduleCardList.length],
	// );

	useFocusEffect(
		useCallback(
			() => onSessionPress(currentSessionIndex),
			[
				container3ProgramCardListData,
				container3CourseCardData,
				currentSessionIndex,
			],
		),
	);

	const refetchContainer3Data = isProgram
		? refetchContainer3ProgramQueryData
		: refetchContainer3CourseQueryData;

	const onModuleChange = useCallback(
		(index: number) => {
			const module = moduleTabsData[index];

			if (isProgram)
				getContainer3ProgramCardListData({
					variables: {
						where: {
							...baseWhereVariables,
							level2: module.code,
							levelLimit: 1,
						},
					},
				});
		},
		[
			moduleTabsData,
			isProgram,
			getContainer3ProgramCardListData,
			baseWhereVariables,
		],
	);

	const onModuleCtaPress = useCallback(
		(index: number) => {
			setSelectedModuleIndex(index);
			onModuleChange(index);
			setExpandedIndex(-1);
		},
		[onModuleChange],
	);

	const handleModuleCtaPress = useCallback(() => {
		if (
			(!container3ProgramCardData?.length &&
				!container3CourseCardData?.length) ||
			(currentModuleIndex === selectedModuleIndex &&
				currentModuleIndex !== -1)
		)
			return;

		if (selectedModuleIndex === -1) onModuleCtaPress(currentModuleIndex);
		else onModuleCtaPress(selectedModuleIndex);

		setExpandedIndex(-1);
	}, [
		selectedModuleIndex,
		currentModuleIndex,
		container3ProgramCardData,
		container3CourseCardData,
		onModuleCtaPress,
	]);

	useFocusEffect(useCallback(handleModuleCtaPress, []));

	useEffect(handleModuleCtaPress, [currentModuleIndex]);

	const sessionList: ISessionList[] = useMemo(
		() =>
			mapSessionListData(
				container3SessionData?.userProgramContainers || [],
			),
		[container3SessionData?.userProgramContainers],
	);

	const currentTopicIndex = useMemo(
		() =>
			sessionList.findIndex((session) => session.code === currentLevel4),
		[container3SessionData, currentLevel4],
	);

	const userProgramContainer = container3ProgramData?.userProgramContainer;
	const userCourseContainer = container3CourseData?.userCourse;

	const userCourse = userCourseContainer?.filter(
		(item) => item.code === courseCode,
	);

	const { isOptional, elective, track } = userProgramContainer || {};

	const courseName = isProgram
		? userProgramContainer?.name || ""
		: userCourse?.[0]?.name || "";

	const MemoisedContainer3Header = useMemo(
		() => (
			<Container3ListHeader
				moduleTabsData={moduleTabsData}
				selectedModuleIndex={selectedModuleIndex}
				onModuleCtaPress={onModuleCtaPress}
				learningPathType={learningPathType}
				hardDeadlineDays={hardDeadlineDays || 0}
				dueDateExtensionMode={dueDateExtensionMode}
				learningPathId={learningPathId}
				courseCode={courseCode}
				penaltyConfigurationData={penaltyConfigurationData}
				refetchContainer3Data={refetchContainer3Data}
				isOptional={isOptional}
				elective={elective}
				track={track}
				courseName={courseName}
				totalExtensionsTaken={totalExtensionsTaken || 0}
				totalExtensionsAllowed={totalExtensionsAllowed || 0}
			/>
		),
		[
			moduleTabsData,
			selectedModuleIndex,
			onModuleCtaPress,
			isOptional,
			elective,
			track,
			courseName,
			learningPathType,
			hardDeadlineDays,
			dueDateExtensionMode,
			learningPathId,
			courseCode,
			penaltyConfigurationData,
			refetchContainer3Data,
			totalExtensionsTaken,
			totalExtensionsAllowed,
		],
	);
	const flatListRef = useRef<FlatList<IModuleCardListItem>>(null);

	//TODO: archer: add scroll to index and scroll to index failed

	// const handleScrollToIndexFailed = useCallback(
	// 	({ index }: { index: number }) => {
	// 		flatListRef.current?.scrollToOffset({
	// 			offset: index * verticalScale(66),
	// 			animated: true,
	// 		});
	// 	},
	// 	[],
	// );

	// useEffect(() => {
	// 	if (currentSessionIndex > 0) handleScrollToIndex(10);
	// }, [currentSessionIndex, moduleCardList, handleScrollToIndex]);

	const handleRenderContainer3Item: ListRenderItem<IModuleCardListItem> =
		useCallback(
			({ item, index }) => {
				if (item.type)
					return (
						<CommonAssetCard
							isOptional={item.isOptional}
							title={item.name}
							status={item.status}
							assetType={item.type}
							isLocked={item.isLocked}
							assetCode={item.assetCode}
							level1={item.level1}
							level2={item.level2}
							level3={item.level3}
							level4={item.level4}
							elective={item.elective}
							electiveGroup={item.electiveGroup}
							track={item.track}
							trackGroup={item.trackGroup}
							learningPathName={learningPathName}
							learningPathId={learningPathId}
							learningPathType={learningPathType}
							learningPathCode={learningPathCode}
							workshopId={workshopId}
							workshopCode={workshopCode}
							userProgramId={userProgramId}
							testID={`container3_item_card_${index}`}
							labelTestID={`container3_commonassetcard_label_${index}`}
						/>
					);

				return (
					<SessionCard
						sessionList={sessionList}
						status={item.status}
						sessionLabel={item?.label}
						sessionTitle={item?.name}
						progressPercentage={item?.progress || 0}
						isOptional={item?.isOptional || false}
						onPress={() => onSessionPress(index)}
						loading={container3SessionDataLoading}
						isLocked={item.isLocked}
						learningPathName={learningPathName}
						learningPathId={learningPathId}
						learningPathType={learningPathType}
						learningPathCode={learningPathCode}
						workshopId={workshopId}
						workshopCode={workshopCode}
						userProgramId={userProgramId}
						testID={`container3_item_card_${index}`}
						expandedIndex={expandedIndex === index}
						currentTopicIndex={currentTopicIndex}
						parentIndex={index}
					/>
				);
			},
			[
				sessionList,
				container3SessionDataLoading,
				onSessionPress,
				learningPathName,
				learningPathId,
				learningPathType,
				learningPathCode,
				currentTopicIndex,
				workshopId,
				workshopCode,
				userProgramId,
			],
		);

	const feedbackData = useMemo(() => {
		const pendingFeedback = container3ProgramData?.pendingFeedback;

		if (!pendingFeedback) return null;

		return {
			hasPendingFeedback: true,
			feedbackId: pendingFeedback?.id,
		};
	}, [container3ProgramData]);

	return {
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
	};
};

export default useContainer3ComponentController;
