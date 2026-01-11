import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { getUserCourse } from "@graphql/query/drawerQuery/getCourseDetails";
import getMilestoneCourseListQuery from "@graphql/query/drawerQuery/getMilestoneCourseListQuery";
import { getMilestoneListQuery } from "@graphql/query/drawerQuery/getMilestoneListQuery";
import getUserCourseNextAsset from "@graphql/query/drawerQuery/getUserCourseNextAsset";
import { userProgramNextAsset } from "@graphql/query/drawerQuery/getUserProgramNextAsset";
import { getUserProgram } from "@graphql/query/drawerQuery/userProgram";

import { isProgram } from "@utils/courseDetailsUtils";

import { client } from "@config/apollo";

import {
	ICourseMilestoneType,
	IMilestoneType,
} from "@interface/milestonetype.interface";
import { IResumeAssetLxp } from "@interface/types/nextAssetlxp.interface";

interface ICourseVariables {
	where: { id?: string; level1?: string };
}

export const useCourseDetailsModuleController = (params: any) => {
	const [stateParams, setStateParams] = useState(params);

	// States
	const [renderActive, setRenderActiveData] = useState<unknown>({});
	const [renderLevel2, setrenderLevel2] = useState<unknown>([]);

	const [showNext, setShowNext] = useState<boolean>(true);
	const [showPrevious, setShowPrevious] = useState<boolean>(true);

	const isProgramType = isProgram(stateParams?.variant);

	useEffect(() => {
		if (stateParams?.selectedId) {
			getusercourse();
			getModuleDetail();
			getNextAssetDetails();
		}
	}, [stateParams]);

	const getLevel2Rendering = async () => {
		const variables = {
			where: {
				id: stateParams?.selectedId,
				level1: stateParams?.level1,
				...(isProgramType
					? {
							level2: stateParams?.level2,
							levelLimit: 1,
							elective: stateParams?.elective,
							electiveGroup: stateParams?.electiveGroup,
							track: stateParams?.track,
							trackGroup: stateParams?.trackGroup,
						}
					: {}),
			},
		};

		await getWeekModuleQuery({
			variables,
		});
	};

	const WEEK_MODULE_QUERY = isProgramType
		? getMilestoneListQuery
		: getMilestoneCourseListQuery;

	const [getWeekModuleQuery, { data: level2Data, loading: level2loading }] =
		useLazyQuery(WEEK_MODULE_QUERY, {
			client,
			fetchPolicy: "network-only",
		});

	useEffect(() => {
		const data = isProgramType
			? level2Data?.userProgramContainers
			: level2Data?.userCourseContainers;
		if (data?.length > 0) {
			if (isProgramType) {
				setrenderLevel2(data);
			} else {
				const filterModule = data.find(
					(item) => item.code === stateParams?.level2,
				);
				setrenderLevel2(filterModule?.children);
			}
		}
	}, [level2Data, stateParams]);

	async function getusercourse() {
		const variables = {
			where: {
				id: stateParams?.selectedId,
			},
		};
		await getData({
			variables,
		});
	}

	const QUERY = isProgramType ? getUserProgram : getUserCourse;
	const [getData, { data: coursesDetails, loading: coursesDetailsLoading }] =
		useLazyQuery(QUERY, {
			client,
			fetchPolicy: "no-cache",
		});

	async function getModuleDetail() {
		const variables: ICourseVariables = {
			where: {
				id: stateParams?.selectedId,
				level1: stateParams?.level1,
				...(isProgramType
					? {
							elective: stateParams?.elective,
							electiveGroup: stateParams?.electiveGroup,
							track: stateParams?.track,
							trackGroup: stateParams?.trackGroup,
						}
					: {}),
			},
		};
		await getModuleDetailsQuery({
			variables,
		});
	}

	// resume Next Asset Api
	async function getNextAssetDetails() {
		const variables = {
			where: {
				id: stateParams?.selectedId,
			},
		};
		await getNextAssetDetailsQuery({
			variables,
		});
	}
	// -------------------------

	const NEXT_ASSET_QUERY = isProgramType
		? userProgramNextAsset
		: getUserCourseNextAsset;
	const [
		getNextAssetDetailsQuery,
		{ data: resumeAsset, loading: resumeAssetLoading },
	] = useLazyQuery<IResumeAssetLxp>(NEXT_ASSET_QUERY, {
		client,
		fetchPolicy: "network-only",
	});

	const MODULE_QUERY = isProgramType
		? getMilestoneListQuery
		: getMilestoneCourseListQuery;
	const [getModuleDetailsQuery, { data: modulesDetails, loading: loading }] =
		useLazyQuery<IMilestoneType | ICourseMilestoneType>(MODULE_QUERY, {
			client,
			fetchPolicy: "network-only",
		});

	useEffect(() => {
		const modulesList = isProgramType
			? modulesDetails?.userProgramContainers
			: modulesDetails?.userCourseContainers;

		const totalModules = Array.isArray(modulesList)
			? modulesList.filter((i) => i?.activity)
			: [];
		const totalAssests = Array.isArray(modulesList)
			? modulesList.filter((i) => i?.asset)
			: [];
		const activeModuleCode = stateParams?.level2;

		if (totalModules.length > 0 && activeModuleCode) {
			const renderActiveData = totalModules.find(
				(item: { code: string }) => item.code === activeModuleCode,
			);
			const activeIndex = totalModules.findIndex(
				(item: { code: string }) => item.code === activeModuleCode,
			);

			if (renderActiveData) {
				setRenderActiveData({ ...renderActiveData, activeIndex });
				getLevel2Rendering();
			}
		} else if (totalAssests?.length > 0) {
			// this condition matched when only assest level  handled
			setrenderLevel2(totalAssests);
		}
	}, [modulesDetails, stateParams?.level2]);

	useEffect(() => {
		const modulesList = isProgramType
			? modulesDetails?.userProgramContainers
			: modulesDetails?.userCourseContainers;
		const totalModules = Array.isArray(modulesList)
			? modulesList.filter((i) => i?.activity)
			: [];
		setShowPrevious(renderActive?.activeIndex !== 0);
		setShowNext(renderActive?.activeIndex !== totalModules?.length - 1);
	}, [renderActive]);

	const previousFun = async () => {
		if (renderActive?.activeIndex === 0) return false;
		const modulesData = isProgramType
			? modulesDetails?.userProgramContainers
			: modulesDetails?.userCourseContainers;

		const filterModule = Array.isArray(modulesData)
			? modulesData.filter((i) => i?.activity)
			: [];

		const data = filterModule[renderActive?.activeIndex - 1];

		setRenderActiveData({
			...data,
			activeIndex: renderActive?.activeIndex - 1,
		});
		setStateParams({ ...stateParams, level2: data?.code });
		getLevel2Rendering();
	};

	const nextFun = async () => {
		const modulesData = isProgramType
			? modulesDetails?.userProgramContainers
			: modulesDetails?.userCourseContainers;

		const filterModule = Array.isArray(modulesData)
			? modulesData.filter((i) => i?.activity)
			: [];

		if (
			!filterModule ||
			renderActive?.activeIndex >= filterModule.length - 1
		)
			return false;

		const nextIndex = (renderActive?.activeIndex ?? -1) + 1;
		const nextData = filterModule[nextIndex];

		setRenderActiveData({
			...nextData,
			activeIndex: nextIndex,
		});

		setStateParams({ ...stateParams, level2: nextData?.code });
		getLevel2Rendering();
	};

	const [isLockedModalVisible, setIsLockedModalVisible] = useState(false);
	const [lockedUntil, setLockedUntil] = useState<string | null>(null);

	const handleLockedAssetPress = (date: string) => {
		setLockedUntil(date);
		setIsLockedModalVisible(true);
	};

	return {
		previousFun,
		nextFun,
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
	};
};

export default useCourseDetailsModuleController;
