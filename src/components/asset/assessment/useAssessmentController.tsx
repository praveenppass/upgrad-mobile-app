import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";

import AssessmentModel from "@components/asset/assessment/useAssessmentModel";

import {
	ICourse,
	IGetAssessmentDetailsQueryForCoursesQueryVariables,
} from "@graphql/query/asset/assessment/assessmentDetailsForCourses";
import {
	IGetAssessmentDetailsQueryForProgramQueryVariables,
	IProgram,
} from "@graphql/query/asset/assessment/assessmentDetailsForProgram";

import { LearningPathType } from "@interface/app.interface";
import {
	AssestQuiz,
	IAssessmentControllerProps,
} from "@interface/assessment.interface";

const useAssessmentController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
	assessmentCode,
}: IAssessmentControllerProps) => {
	const {
		getAssessmentDetailsForCourses,
		assessmentCourseData,
		getAssessmentDetailsForProgram,
		assessmentProgramData,
		assessmentLoadingCourse,
		assessmentLoadingProgram,
		fetchData,
		createAssementProgram,
	} = AssessmentModel();
	const [assetShowModal, setShowAssetModal] = useState(false);
	const [pageData, setPagedata] = useState<Record<string, any>>({});
	const [loader, setLoader] = useState<boolean>(true);

	const isProgram = learningPathType === LearningPathType.PROGRAM;
	const assessmentData = isProgram
		? assessmentProgramData?.getAssetFromUserProgram
		: assessmentCourseData?.getAssetFromUserCourse;

	const assessmentProgramInfo = (
		assessmentData as { userProgram?: { program: IProgram } }
	)?.userProgram?.program
		? (assessmentData as { userProgram?: { program: IProgram } })
				?.userProgram?.program
		: (assessmentData as { userCourse?: { course: ICourse } })?.userCourse
				?.course;

	const attempt = pageData?.attempt;

	const attemptStatus = attempt?.status;
	const attemptNumber = attempt?.attemptNumber;
	const createdAt = attempt?.createdAt;

	const isFirstAttemptNotStartedOrInProgress =
		attemptNumber === 1 &&
		[AssestQuiz.NOT_STARTED, AssestQuiz.IN_PROGRESS].includes(
			attemptStatus,
		);

	const submittedDate = !isFirstAttemptNotStartedOrInProgress
		? createdAt
		: null;

	const learningPathCode = assessmentProgramInfo?.code || "";

	useEffect(() => {
		const assessmentAttemptUrl = assessmentData?.attempt?.url;
		if (assessmentAttemptUrl) {
			fetchDataAsync(assessmentAttemptUrl);
		} else if (assessmentData) {
			createAssesmentCall();
		}
	}, [assetCode, assessmentData]);

	const {
		totalExtensionsAllowed,
		dueDateExtensionMode,
		comboCurriculumCode,
	} = useMemo(() => {
		const { program, comboCurriculum } = assessmentData?.userProgram || {};

		const enableComboCurriculum = program?.enableComboCurriculum ?? false;

		if (enableComboCurriculum && comboCurriculum) {
			return {
				totalExtensionsAllowed: comboCurriculum.totalExtensionsAllowed,
				dueDateExtensionMode: comboCurriculum.dueDateExtensionMode,
				comboCurriculumCode: comboCurriculum.code,
			};
		}

		return {
			totalExtensionsAllowed: program?.totalExtensionsAllowed,
			dueDateExtensionMode: program?.dueDateExtensionMode,
			comboCurriculumCode: null,
		};
	}, [assessmentData?.userProgram]);

	const createAssesmentCall = async () => {
		await createAssementProgram({
			variables: {
				input: {
					assessment: assessmentCode,
					meta: {
						asset: assetCode,
						user: isProgram
							? assessmentData?.userProgram?.user?.id
							: assessmentData?.userCourse?.user?.id,
						level1: courseId,
						level2: moduleId,
						version: assessmentData?.asset?.version,

						...(isProgram
							? {
									program: learningPathCode,
									userProgram: learningPathId,
									level3: sessionId,
									level4: segmentId,
									workshop:
										assessmentData?.userProgram?.workshop
											?.id,
								}
							: {
									userCourse: learningPathId,
									courseCode: courseId,
								}),
						learnerCourse: learningPathId || "",
						deliveryType: isProgram
							? assessmentData?.userProgram?.deliveryType?.id
							: assessmentData?.userCourse?.deliveryType?.id,
					},
				},
			},

			onCompleted: (data) => {
				if (data?.createAssessmentAttempt?.url)
					fetchDataAsync(data?.createAssessmentAttempt?.url);
			},
		});
	};

	const fetchDataAsync = async (assessmentAttemptUrl: string) => {
		const url: string | undefined = assessmentAttemptUrl;
		const attemptMatch = url ? url.match(/[\?&]attempt=([^&]+)/) : null;
		const attemptValue = attemptMatch ? attemptMatch[1] : null;

		try {
			if (attemptValue && assessmentCode) {
				const response: any = await fetchData(
					attemptValue,
					assessmentCode,
				);

				setPagedata(response.data);
				setLoader(false);
			}
		} catch (err) {
			setPagedata({});
		}
	};

	useEffect(() => {
		getAssessmentBasicDetails();
	}, [
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathType,
		learningPathId,
	]);

	useFocusEffect(
		useCallback(() => {
			getAssessmentBasicDetails();
		}, []),
	);

	const showUnderStandModal = () => {
		setShowAssetModal(true);
	};

	const getAssessmentBasicDetails = async () => {
		if (!learningPathId) return;

		const variables = {
			where: {
				asset: assetCode,
				level1: courseId,
				level2: moduleId,
				...(isProgram
					? {
							userProgram: learningPathId,
							level3: sessionId,
							level4: segmentId,
						}
					: { userCourse: learningPathId }),
			},
		};

		if (isProgram)
			getAssessmentDetailsForProgram({
				variables:
					variables as IGetAssessmentDetailsQueryForProgramQueryVariables,
			});
		else
			getAssessmentDetailsForCourses({
				variables:
					variables as IGetAssessmentDetailsQueryForCoursesQueryVariables,
			});
	};

	return {
		getAssessmentBasicDetails,
		assessmentData,
		assessmentProgramInfo,
		// isSubmitted,
		isProgram,
		submittedDate,
		learningPathCode,
		assetShowModal,
		showUnderStandModal,
		setShowAssetModal,
		pageData,
		totalExtensionsAllowed,
		dueDateExtensionMode,
		comboCurriculumCode,
		pageLoader:
			loader || assessmentLoadingProgram || assessmentLoadingCourse,
	};
};

export default useAssessmentController;
