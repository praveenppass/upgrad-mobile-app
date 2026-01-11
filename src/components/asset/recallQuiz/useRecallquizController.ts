import {
	useFocusEffect,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useMemo } from "react";

import Recallquizmodel from "@components/asset/recallQuiz/useRecallquizModel";

import { LearningPathType } from "@interface/app.interface";
import { AssestQuiz } from "@interface/assessment.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

interface RecallquizController {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	isScreenModel?: boolean;
	setAttemptId?: (id: string) => void;
	setPreviewMode?: (mode: boolean | undefined) => void;
	recallQuizCode: string;
}
interface GetInterfacebasic {
	asset: string | null;
	level1: string | null;
	level2: string | null;
	level3?: string | null;
	level4?: string | null;
}
const useRecallquizController = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	input,
	isScreenModel,
	setAttemptId,
	setPreviewMode,
	recallQuizCode,
}: RecallquizController) => {
	const navigation = useNavigation();
	const route = useRoute<RootHomeStackRouteProps<"Container6Screen">>();
	const showPostRecallSubmissionScreen = route.params.isPostRecallSubmission;
	const {
		getRecallquizforcourse,
		getRecallquizforprogram,
		createRecallquizprogram,
		getAttemptRecallquiz,
		pageLoader,
		getattemptquizProgramData,
		recallquizCourseData,
		startRecallQuizmutation,

		recallquizProgramData,
	} = Recallquizmodel();

	const isProgramType = learningPathType === LearningPathType.PROGRAM;
	const previewMode =
		getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
			?.attemptLeft === 0;

	const comboCurriculumCode = useMemo(() => {
		return recallquizProgramData?.getAssetFromUserProgram.userProgram
			.comboCurriculum?.code;
	}, [recallquizProgramData]);

	useEffect(() => {
		const getAssetBasicDetails = async () => {
			const whereVariables = {
				asset: assetCode,
				level1: courseId,
				level2: moduleId,
				...(isProgramType && { level3: sessionId, level4: segmentId }),
			};

			if (isProgramType) {
				getRecallquizprogramEffect(whereVariables);
			} else {
				getRecallquizcourseEffect(whereVariables);
			}
		};
		if (isScreenModel) {
			createRecallQuizData({ input: input });
		} else {
			getAssetBasicDetails();
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			const getAssetBasicDetails = async () => {
				const whereVariables = {
					asset: assetCode,
					level1: courseId,
					level2: moduleId,
					...(isProgramType && {
						level3: sessionId,
						level4: segmentId,
					}),
				};

				if (isProgramType) {
					getRecallquizprogramEffect(whereVariables);
				} else {
					getRecallquizcourseEffect(whereVariables);
				}
			};
			if (isScreenModel) {
				createRecallQuizData({ input: input });
			} else {
				getAssetBasicDetails();
			}
		}, []),
	);

	const getRecallquizcourseEffect = async (
		whereVariables: GetInterfacebasic,
	) => {
		await getRecallquizforcourse({
			variables: {
				where: {
					...whereVariables,
					userCourse: learningPathId,
				},
			},

			onCompleted: async (data) => {
				const response = await data?.getAssetFromUserCourse;
				const variables = {
					///old working for staging
					// input: {
					// 	// recallQuiz: assetCode,
					// 	recallQuiz: "63522f1460b93f0953d06a5e",
					// 	meta: {
					// 		// asset: assetCode,
					// 		user: response?.userCourse?.user?.id ?? null,
					// 		course: response?.userCourse?.course?.code ?? null,
					// 		userCourse: response?.userCourse?.id ?? null,
					// 		workshop:
					// 			response?.userCourse?.workshop?.id ?? null,
					// 		learnerCourse: learningPathId ?? null,
					// 		deliveryType:
					// 			response?.userCourse?.deliveryType?.id ?? null,
					// 		...whereVariables,
					// 	},
					// },

					// new added for production
					input: {
						recallQuiz: recallQuizCode,
						meta: {
							user: response?.userCourse?.user?.id ?? null,
							course: response?.userCourse?.course?.id ?? null,
							courseCode:
								response?.userCourse?.course?.code ?? null,
							userCourse: response?.userCourse?.id ?? null,
							workshop:
								response?.userCourse?.workshop?.id ?? null,
							learnerCourse: learningPathId ?? null,
							deliveryType:
								response?.userCourse?.deliveryType?.id ?? null,
							...whereVariables,
						},
					},
				};

				createRecallQuizData(variables);
			},
		});
	};

	const getRecallquizprogramEffect = async (
		whereVariables: GetInterfacebasic,
	) => {
		await getRecallquizforprogram({
			variables: {
				where: {
					...whereVariables,
					userProgram: learningPathId,
				},
			},
			onCompleted: async (data) => {
				const response = await data?.getAssetFromUserProgram;
				const variables = {
					input: {
						recallQuiz: recallQuizCode,
						meta: {
							user: response?.userProgram?.user?.id ?? null,
							program:
								response?.userProgram?.program?.code ?? null,
							userProgram: response?.userProgram?.id ?? null,
							workshop:
								response?.userProgram?.workshop?.id ?? null,
							learnerCourse: learningPathId ?? null,
							deliveryType:
								response?.userProgram?.deliveryType?.id ?? null,
							...whereVariables,
						},
					},
				};

				createRecallQuizData(variables);
			},
		});
	};

	const startQuiz = async () => {
		const attemptID =
			getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
				?.code || null;

		const currentStatus =
			getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
				?.status;

		const attemptLeft =
			getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
				?.attemptLeft;

		try {
			if (currentStatus !== AssestQuiz.IN_PROGRESS && attemptLeft !== 0) {
				await startRecallQuizmutation({
					variables: {
						params: {
							code: attemptID,
						},
					},
				});
			}
		} catch {
			(error: any) => {
				console.log("Error :", error);
			};
		} finally {
			navigation.setParams({ isPostRecallSubmission: false });
			if (isScreenModel) {
				setAttemptId(attemptID);
				setPreviewMode(previewMode);
			} else {
				navigation.navigate("RecallQuizScreen", {
					...route?.params,
					attemptID: attemptID,
					recallQuizCode: recallQuizCode,
					previewMode,
					comboCurriculumCode,
				});
			}
		}
	};

	const createRecallQuizData = async (variables) => {
		try {
			const recallQuizAttemptData = await createRecallquizprogram({
				variables: variables,
			});

			let url: string =
				recallQuizAttemptData?.data?.createRecallQuizAttempt?.url || "";
			[, url] = url?.split("attempt=");
			const regex = /attempt=([^&]+)/;
			const attemptCode =
				recallQuizAttemptData?.data?.createRecallQuizAttempt?.url?.match(
					regex,
				) || [];
			const attemptId = attemptCode[1] ?? url;

			await getAttemptRecallquiz({
				variables: {
					params: {
						attempt: attemptId,
						code:
							recallQuizCode ||
							variables?.input.recallQuiz ||
							variables?.input.meta.asset,
					},
				},
			});
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return {
		pageLoader,
		getattemptquizProgramData,
		startQuiz,
		showPostRecallSubmissionScreen,
	};
};

export default useRecallquizController;
