/* eslint-disable func-style */

/**
 * @deprecated This hook is deprecated and may be removed in future releases.
 * Please use the updated hooks in the StudyPlan or related modules.
 */
import {
	useFocusEffect,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useStudyPlanModel } from "@components/Courses/CourseDetails/StudyPlan/useStudyPlanModel";

import { IStudyResumeActivity } from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";
import {
	IChildren,
	IStudyCourseUserProgramContainer,
} from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import { IUserCourseContainer } from "@graphql/query/studyplanTemp/getStudyUserCourseContainer";

import useAssetPenaltyModel from "@hooks/assetPenalty/useAssetPenaltyModel";
import { useRefresh } from "@hooks/useRefresh";

import { isProgram } from "@utils/courseDetailsUtils";

import { ENV } from "@config/env";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum, LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import {
	RootHomeStackList,
	RootHomeStackRouteProps,
} from "@interface/types/rootHomeStack.type";

interface StudyPlanControllerProps {
	userProgramCode: string;
}

const STUDY_PLAN_STATIC_URL = "lxp/learner/program-detail/";
const STUDY_PLAN_STATIC_URL_END = "/study-plan";

export const useStudyPlanController = ({
	userProgramCode,
}: StudyPlanControllerProps) => {
	const {
		user: { id: userId },
	} = useSelector((state: RootState) => state.user);

	const [courseRender, setCourseRender] = useState<{
		courseData: (IStudyCourseUserProgramContainer | IUserCourseContainer)[];
		activeIndex: number;
	}>({ courseData: [], activeIndex: -1 });
	const dispatch = useDispatch();
	const navigation = useNavigation<RootHomeStackList>();
	const route = useRoute<RootHomeStackRouteProps<"CourseDetailsScreen">>();

	const { courseID, courseVariant, courseName } = route.params;

	const {
		courseDetails,
		courseDetailsLoading,
		modulesDetails,
		moduleListLoading,
		resumeAssetLoading,
		resumeAsset,
		courseContainerLoading,
		courseModulesListLoading,
		resumeCourseAssetLoading,
		courseContainers,
		courseModulesList,
		resumeCourseAsset,
		specializationList,
		getModuleRefresh,
		getNextAssetDetailsQuery,
		getProgramCourseDetails,
		getModuleDetailsQuery,
		getCourseDetailsRefresh,
		fetchDoubtResolutionBotData,
		getCourseContainerDetails,
		getCourseModulesDetailsQuery,
		getCourseNextAssetQuery,
		getCourseContainerRefresh,
		getSpecializationProgram,
	} = useStudyPlanModel();

	const pullDownToRefresh = async () => {
		getModuleRefresh();
	};

	const { onRefresh } = useRefresh(pullDownToRefresh);

	const isProgramType = isProgram(courseVariant as ICourseVariantEnum)
		? true
		: false;

	const [isLockedModalVisible, setIsLockedModalVisible] = useState(false);
	const [profileBlockerStatus, setProfileBlockerStatus] = useState(false);
	const [isDRBotEnabled, setIsDRBotEnabled] = useState(false);
	const [isBotVisible, setIsBotVisible] = useState(false);
	const [isSpecialization, setIsSpecialization] = useState(false);
	const toggleBotVisibility = () => {
		setIsBotVisible(!isBotVisible);
	};

	const { userProgram } = specializationList ?? {};
	const { relatedUserPrograms = [], specializationsPurchasedCount = 0 } =
		userProgram ?? {};

	const specializationCount =
		specializationsPurchasedCount > 0
			? specializationsPurchasedCount - (relatedUserPrograms.length - 1)
			: 0;

	const enableComboCurriculum = userProgram?.program?.enableComboCurriculum;

	useFocusEffect(
		useCallback(() => {
			(async () => {
				if (profileBlockerStatus) {
					if (isProgramType) {
						await getProgramSelector();
						await getProgramNextAssetDetails();
					} else {
						getCourseSelector();
						getCourseNextAssetDetails();
					}
				}
				getSpecializationProgramDetails();
			})();
		}, [profileBlockerStatus]),
	);

	const getSpecializationProgramDetails = async () => {
		const variables = { where: { id: courseID } };
		getSpecializationProgram({ variables });
	};

	// effect used for render tab wise data
	useEffect(() => {
		const updateCourseRender = () => {
			const data: IStudyCourseUserProgramContainer[] =
				filterContainerData() ?? [];
			if (data.length > 0) {
				let activeCourseIndex = courseRender.activeIndex;
				if (
					activeCourseIndex === -1 ||
					activeCourseIndex === undefined
				) {
					activeCourseIndex = data.findIndex(
						(item) => item?.isCurrent,
					);
					if (activeCourseIndex === -1) {
						activeCourseIndex = 0;
					}
				}
				setCourseRender({
					courseData: [data[activeCourseIndex]],
					activeIndex: activeCourseIndex,
				});
				if (isProgramType) {
					getModuleDetail(data[activeCourseIndex]);
				} else {
					getCourseModuleDetail(data[activeCourseIndex].code);
				}
			}
		};
		updateCourseRender();
		getDoubtResolutionBotData();
	}, [courseDetails, courseContainers, isProgramType]);

	// Course Select or Handler
	const handleNumberSelect = (value: number) => {
		const courses: IStudyCourseUserProgramContainer[] | IChildren[] =
			filterContainerData() ?? [];
		const _data_arr = courses[value];
		setCourseRender({ courseData: [_data_arr], activeIndex: value });
		if (isProgramType) {
			getModuleDetail(_data_arr);
			getCourseDetailsRefresh();
		} else {
			getCourseModuleDetail(_data_arr?.code);
			getCourseContainerRefresh();
		}
	};

	const assestPlayscreen = () => {
		const data = isProgramType
			? resumeAsset?.userProgramNextAsset
			: resumeCourseAsset?.userCourseNextAsset;

		dispatch(
			studyPlanSlice.actions.selectAsset({
				id: data?.asset?.code,
				activity: data?.activity as IStudyResumeActivity,
				code: data?.asset?.code,
				name: data?.asset?.name,
				assetType: { type: data?.asset?.assetType?.type as IAssetType },
			}),
		);

		navigation.navigate("Container6Screen", {
			assetCode: data?.asset?.code || "",
			learningPathType: isProgramType
				? LearningPathType.PROGRAM
				: LearningPathType.COURSE,
			learningPathId: courseID,
			learningPathName: courseName,
			courseId: data?.activity?.level1 || null,
			moduleId: data?.activity?.level2 || null,
			sessionId: data?.activity?.level3 || null,
			segmentId: data?.activity?.level4 || null,
			ispostSubmission: false,
			elective: data?.activity?.elective || "",
			electiveGroup: data?.activity?.electiveGroup || "",
			track: data?.activity?.track || "",
			trackGroup: data?.activity?.trackGroup || "",
		});
	};

	const [lockedUntil, setLockedUntil] = useState<string | null>(null);

	const handleLockedAssetPress = (date: string) => {
		setLockedUntil(date);
		setIsLockedModalVisible(true);
	};

	// resume Next Asset Api
	function getProgramNextAssetDetails() {
		const variables = { where: { id: courseID } };
		getNextAssetDetailsQuery({ variables });
	}

	function getCourseNextAssetDetails() {
		const variables = { where: { id: courseID } };
		getCourseNextAssetQuery({ variables });
	}

	// program container Selector Api
	function getProgramSelector() {
		const variables = { where: { id: courseID } };
		getProgramCourseDetails({ variables });
	}

	//course container selector Api
	function getCourseSelector() {
		const variables = { where: { id: courseID } };
		getCourseContainerDetails({ variables });
	}

	function getModuleDetail(_data: IStudyCourseUserProgramContainer) {
		const variables = {
			where: {
				id: courseID,
				level1: _data.code,
				track: _data.track,
				trackGroup: _data.trackGroup,
				elective: _data.elective,
				electiveGroup: _data.electiveGroup,
			},
		};
		getModuleDetailsQuery({ variables });
	}

	function getCourseModuleDetail(code: string | undefined) {
		const variables = { where: { id: courseID, level1: code } };
		getCourseModulesDetailsQuery({ variables });
	}

	const handleProfileBlockerCompletion = () => {
		setProfileBlockerStatus(true);
	};

	const isLoading = (): boolean => {
		return isProgramType
			? resumeAssetLoading ||
					courseDetailsLoading ||
					moduleListLoading ||
					!profileBlockerStatus ||
					loadingAssetPenalty
			: courseContainerLoading ||
					courseModulesListLoading ||
					resumeCourseAssetLoading ||
					!profileBlockerStatus ||
					loadingAssetPenalty;
	};

	// this logic is for handle track and elective data container
	const filterContainerData = () => {
		const containerData = isProgramType
			? courseDetails?.userProgramContainers
			: courseContainers?.userCourseContainers;

		return (
			containerData?.reduce((acc, container) => {
				if (!container?.children?.length) {
					acc.push(container);
					return acc;
				}
				const filterChildren = (children, parentData = {}) => {
					return children.reduce((childAcc, child) => {
						if (child?.activity?.isElectiveGroup) {
							childAcc.push({
								...child,
								track: parentData.track ?? container.code,
								trackGroup:
									parentData.trackGroup ??
									container?.trackGroup,
								elective: parentData.elective ?? container.code,
								electiveGroup:
									parentData.electiveGroup ??
									container?.electiveGroup,
							});
						} else if (child.level === 1) {
							childAcc.push({
								...child,
								track: parentData.track ?? container.code,
								trackGroup:
									parentData.trackGroup ??
									container?.trackGroup,
								elective: parentData.elective ?? container.code,
								electiveGroup:
									parentData.electiveGroup ??
									container?.electiveGroup,
							});
						}
						if (child?.children?.length) {
							childAcc.push(
								...filterChildren(child.children, {
									track: container.code,
									trackGroup: container?.trackGroup,
									elective: child.code,
									electiveGroup:
										child.electiveGroup ??
										container?.electiveGroup,
								}),
							);
						}
						return childAcc;
					}, []);
				};

				acc.push(...filterChildren(container?.children));
				return acc;
			}, []) || []
		);
	};

	// Doubt Resollution Bot Api
	const getDoubtResolutionBotData = async () => {
		if (!userId || !userProgramCode || !isProgramType) return;

		try {
			const response = await fetchDoubtResolutionBotData(
				userId,
				userProgramCode,
			);
			setIsDRBotEnabled(response?.output?.enabled);
		} catch (err) {
			return;
		}
	};

	const toggleSpecialization = () => {
		setIsSpecialization(!isSpecialization);
	};

	const { penaltyConfigurationData, loadingAssetPenalty, getAssetPenalty } =
		useAssetPenaltyModel();

	useEffect(() => {
		if (!userProgramCode) return;

		getAssetPenalty({
			variables: {
				where: [
					{
						...(isProgramType
							? { program: userProgramCode }
							: { course: userProgramCode }),
					},
				],
			},
		});
	}, [userProgramCode]);

	const buildStudyPlanUrl = (id: string): string => {
		return `${ENV.PREFIXES_URL}${STUDY_PLAN_STATIC_URL}${id}${STUDY_PLAN_STATIC_URL_END}`;
	};

	const pageUrlFromStudyPlan = buildStudyPlanUrl(courseID);

	return {
		courseDetails,
		onRefresh,
		getModuleRefresh,
		assestPlayscreen,
		handleNumberSelect,
		courseRender,
		modulesDetails,
		moduleListLoading,
		resumeAsset,
		resumeAssetLoading,
		courseDetailsLoading,
		isLockedModalVisible,
		setIsLockedModalVisible,
		lockedUntil,
		handleLockedAssetPress,
		selectedCourseID: courseID,
		courseVariant,
		courseName,
		isProgramType,
		handleProfileBlockerCompletion,
		isLoading,
		filterContainerData,
		toggleBotVisibility,
		isBotVisible,
		isDRBotEnabled,
		resumeCourseAsset,
		courseContainers,
		courseModulesList,
		specializationCount,
		isSpecialization,
		toggleSpecialization,
		penaltyConfigurationData,
		enableComboCurriculum,
		pageUrlFromStudyPlan,
	};
};

export default useStudyPlanController;
