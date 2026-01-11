import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";
import RecallquizModel from "@screens/Tabs/Courses/Recallquiz/useRecallQuizModel";

import {
	BottomButton,
	LearningPathType,
	QuizAnswerStatus,
} from "@interface/app.interface";
import {
	AssetModulepopup,
	EQuestionType,
	QuestionStatusEnum,
} from "@interface/assessment.interface";
import { IUpdateAssetVariables } from "@interface/asset.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";
import { RootNavParamsList } from "@interface/types/rootStack.type";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

interface IRecallQuizScreenController {
	pageData?: {
		assetCode: string;
		attemptID: string;
		learningPathId: string;
		learningPathType: LearningPathType;
		parentAssetCode: string;
		previewModeKey: boolean | undefined;
	};
	isModelpopupOpen?: boolean;
	closeModal: (response?: string) => void;
}

const { neutral } = colors;

interface PollOption {
	id: string;
	samplePercentage: number;
}

interface IOption {
	id: string;
	text: string;
	feedback: string;
}

interface PollData {
	options?: PollOption[];
}

interface QuestionInfo {
	questionType?: string;
	poll?: PollData;
}

export enum IAnswerOption {
	CORRECT,
	INCORRECT,
}

const RecallquizController = ({
	pageData,
	isModelpopupOpen,
	closeModal,
}: IRecallQuizScreenController) => {
	const { navigate, pop } = useNavigation<RootNavParamsList>();
	const route = useRoute<RootHomeStackRouteProps<"RecallQuizScreen">>();

	const {
		assetCode = pageData?.assetCode || "",
		learningPathId = pageData?.learningPathId || "",
		learningPathType = pageData?.learningPathType ||
			LearningPathType.PROGRAM,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		previewMode: routePreviewMode,
		learningPathCode,

		trackGroup,
		track,
		electiveGroup,
		elective,
		comboCurriculumCode,
	} = route.params || {};

	const previewMode = pageData?.previewModeKey ?? routePreviewMode ?? false;

	const isProgram = learningPathType === LearningPathType.PROGRAM;
	const {
		getAttemptRecallquiz,
		getattemptquizProgramData,
		getattemptquizProgramLoader,
		updateRecallQuizAttempt,
		submitQuizAttempt,
		getPollQuestionCount,
		pollQuestionCount,
		onUpdateAssetAfterRecallQuizCompletion,
		onUpdateCourseAssetAfterRecallQuizCompletion,
	} = RecallquizModel();

	const [questionIndex, selectquestionIndex] = useState<number>(0);
	const [feedbackModal, setFeedbackModal] = useState<boolean>(false);
	const [selectedAnswer, setselectedAnswer] = useState<Record<string, any>>();
	const [assestModelData, setassestModel] = useState<Record<string, any>>({});
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const [answerResponse, setanswerResponse] = useState<string>(
		QuizAnswerStatus.NO_RESPONSE,
	);

	const [loading, setLoading] = useState<boolean>(false);
	const [feedbackData, setFeedbackData] = useState<{
		heading?: string | null;
		icon?: string;
		pageData?: Array<{
			icon?: boolean;
			heading?: string | null;
			content?: string | null;
			backgroundColor?: string;
		}>;
	}>({});

	// Define Question interface for type safety
	interface Question {
		questionId: string;
		answer: any[];
		status: QuestionStatusEnum;
		questionInfo?: QuestionInfo & {
			[key: string]: any;
		};
		[key: string]: any;
	}

	const questions: Question[] =
		getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
			?.questions || [];
	const currentQuestion: Question | undefined = questions[questionIndex];
	const questionType: string | undefined =
		currentQuestion?.questionInfo?.questionType?.toLowerCase();
	const pollTypeQuestionCheck = questionType === EQuestionType.POLL;
	const questionId = currentQuestion?.questionId || "";
	const recallquizCode =
		getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
			?.recallQuizCode;

	const currentAnswer: string[] =
		selectedAnswer?.[currentQuestion?.questionId]?.answer || [];

	useEffect(() => {
		setLoading(true);
		if (getattemptquizProgramLoader) return;
		if (previewMode) {
			const _question =
				getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
					?.questions;

			const answer = (_question as Question[])?.reduce(
				(acc, i) => {
					if ([QuestionStatusEnum.ANSWERED].includes(i.status)) {
						let extraFields: Record<string, any> = {};
						if (questionType === EQuestionType.POLL) {
							const samplePercentage: Record<string, number> =
								i?.questionInfo?.poll?.options?.reduce(
									(
										accOpt: Record<string, number>,
										option: PollOption,
									) => {
										accOpt[option.id] =
											option.samplePercentage;
										return accOpt;
									},
									{} as Record<string, number>,
								) || {};
							extraFields = { samplePercentage };
						}
						acc[i.questionId] = {
							answer: i.answer,
							questionId: i.questionId,
							...extraFields,
						};
					}
					return acc;
				},
				{} as Record<
					string,
					{
						answer: any[];
						questionId: string;
						samplePercentage?: Record<string, number>;
					}
				>,
			);
			setselectedAnswer(answer);
			//	questionHandler(BottomButton.VERIFY); no need to use;
		} else {
			const question =
				getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
					?.questions || [];
			const findIndex = question?.findIndex(
				(i: any) =>
					i.questionId ===
					getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
						?.currentQuestionId,
			);
			selectquestionIndex(findIndex > -1 ? findIndex : 0);
		}
		setLoading(false);
	}, [
		getattemptquizProgramData?.getRecallQuizAttempt,
		getattemptquizProgramLoader,
	]);
	useEffect(() => {
		const getQuizdataLoad = async () => {
			const { attemptID, recallQuizCode } = route?.params;
			await getAttemptRecallquiz({
				variables: {
					params: {
						attempt: pageData?.attemptID || attemptID,
						code:
							recallQuizCode || pageData?.assetCode || assetCode,
					},
				},
			});
		};
		getQuizdataLoad();
	}, [route?.params, pageData]);

	useEffect(() => {
		if (previewMode) questionHandler(BottomButton.VERIFY);
		else setanswerResponse(QuizAnswerStatus.NO_RESPONSE);
	}, [questionIndex]);

	useEffect(() => {
		if (!pollTypeQuestionCheck) return;
		const variables = {
			params: {
				questionId: questionId,
				recallQuizCode: recallquizCode,
				version: 1,
			},
		};
		getPollQuestionCount({ variables });
	}, [questionId]);

	useEffect(() => {
		if (!previewMode && !pollTypeQuestionCheck) return;
		const perOptionCount =
			pollQuestionCount?.getPollQuestionAttemptCount?.attemptCount
				?.options || [];
		const options =
			currentQuestion?.questionInfo?.[EQuestionType.POLL]?.options || [];
		if (!options?.length || !perOptionCount) return;

		const totalOptionCounts = options.reduce((acc, option) => {
			const optionCount =
				perOptionCount.find((item) => item.option === option.id)
					?.optionCount || 0;
			return acc + option.samplePercentage + optionCount;
		}, 0);

		const newOptionPercentages = options.reduce(
			(acc, option) => {
				const optionCount =
					perOptionCount.find((item) => item.option === option.id)
						?.optionCount || 0;
				let answerselectedID =
					selectedAnswer?.[questionId]?.answer || null;
				answerselectedID = answerselectedID && String(answerselectedID);
				const adjustedOptionCount =
					option.id === answerselectedID
						? optionCount + 1
						: optionCount;

				const percentage = totalOptionCounts
					? ((option.samplePercentage + adjustedOptionCount) /
							(totalOptionCounts + 1)) *
						100
					: 0;

				return { ...acc, [option.id]: Math.round(percentage) };
			},
			{} as Record<string, number>,
		);

		const modifiedSelectedAnswer = {
			...selectedAnswer,
			...(selectedAnswer?.[questionId] && {
				[questionId]: {
					...selectedAnswer[questionId],
					samplePercentage: newOptionPercentages,
				},
			}),
		};

		setselectedAnswer(modifiedSelectedAnswer);
	}, [pollQuestionCount]);

	const setFeedbackDataForSelectedOption = (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => {
		const options =
			questionType &&
			currentQuestion?.questionInfo?.[questionType]?.options
				? currentQuestion.questionInfo[questionType].options
				: [];

		const selectedOptionId = selectedOptionIds?.[0];

		const isOptionQuestion =
			questionType !== undefined &&
			[
				EQuestionType.MCQ,
				EQuestionType.MSQ,
				EQuestionType.SEQUENCING,
			].includes(questionType as EQuestionType);

		const selectedOptionData =
			isOptionQuestion && selectedOptionId
				? options.find((opt: IOption) => opt.id === selectedOptionId)
				: null;

		const fallbackOption = selectedOptionData ?? options?.[0] ?? {};
		const currentQuestionFeedback = fallbackOption.feedback || "";
		const currentQuestionText = fallbackOption.text || "";

		setFeedbackData({
			heading: isCorrect
				? strings.THIS_IS_CORRECT
				: strings.THIS_IS_INCORRECT,
			icon: isCorrect ? IAnswerOption.CORRECT : IAnswerOption.INCORRECT,
			pageData: [
				{
					heading:
						strings.OPTION.charAt(0) +
						strings.OPTION.slice(1).toLowerCase(),
					backgroundColor: neutral.grey_02,
					content: currentQuestionText,
				},
				{
					icon: true,
					heading: strings.EXPLANATION,
					backgroundColor: neutral.white,
					content: currentQuestionFeedback,
				},
			],
		});
	};

	const questionHandler = async (type: string) => {
		const attemptID = pageData?.attemptID || route?.params?.attemptID;
		if (type === BottomButton.NEXT) {
			if (questionType === EQuestionType.OPEN_RESPONSE && !previewMode) {
				try {
					await updateRecallQuizAttempt({
						variables: {
							params: {
								currentQuestionId: currentQuestion?.questionId,
								code: attemptID,
								question: {
									questionId: currentQuestion?.questionId,
									answer: currentAnswer,
								},
							},
						},
					});
				} catch (error) {}
			}
			selectquestionIndex(questionIndex + 1);
		} else if (type === BottomButton.FINISH) {
			if (questionType === EQuestionType.OPEN_RESPONSE && !previewMode) {
				try {
					await updateRecallQuizAttempt({
						variables: {
							params: {
								currentQuestionId: currentQuestion?.questionId,
								code: attemptID,
								question: {
									questionId: currentQuestion?.questionId,
									answer: currentAnswer,
								},
							},
						},
					});
				} catch (error) {}
			}

			try {
				submitQuizAttempt({
					variables: {
						params: {
							code: attemptID,
						},
					},
				});
				const variables: IUpdateAssetVariables = {
					data: { status: "completed" },
					where: {
						asset: assetCode,
						...(isProgram
							? { userProgram: learningPathId }
							: { userCourse: learningPathId }),
						...(courseId && { level1: courseId }),
						...(moduleId && { level2: moduleId }),
						...(sessionId && { level3: sessionId }),
						...(segmentId && { level4: segmentId }),
					},
				};
				if (!isModelpopupOpen) {
					const updateFunction = isProgram
						? onUpdateAssetAfterRecallQuizCompletion
						: onUpdateCourseAssetAfterRecallQuizCompletion;

					updateFunction({ variables });
				}
			} finally {
				if (isModelpopupOpen) {
					closeModal();
				} else {
					pop(1);
					navigate("Container6Screen", {
						...route.params,
						isPostRecallSubmission: previewMode ? false : true,
						attemptID,
					});
				}
			}
		} else if (type === BottomButton.CLOSE) {
			if (isModelpopupOpen) {
				closeModal();
			} else {
				pop(1);
				navigate("Container6Screen", {
					...route.params,
					isPostRecallSubmission: previewMode ? false : true,
					attemptID,
				});
			}
		} else if (type === BottomButton.VERIFY) {
			const question: Record<string, any> =
				getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
					?.questions[questionIndex] || {};
			const currentAnswer: any[] =
				selectedAnswer?.[question?.questionId]?.answer || [];
			const correctAnswer: any[] =
				(questionType &&
					question?.questionInfo?.[questionType]?.correctAnswer) ||
				[];
			const answerCheck =
				correctAnswer.length === currentAnswer.length &&
				questionType === EQuestionType.MSQ
					? [...correctAnswer]
							.sort()
							.every(
								(value, index) =>
									value === [...currentAnswer].sort()[index],
							)
					: questionType === EQuestionType.NUMERICAL
						? correctAnswer.every((value) =>
								currentAnswer.includes(String(value)),
							)
						: correctAnswer.every(
								(value, index) =>
									value === currentAnswer[index],
							);
			try {
				if (previewMode) return;
				updateRecallQuizAttempt({
					variables: {
						params: {
							currentQuestionId: currentQuestion?.questionId,
							code: attemptID,
							question: {
								questionId: currentQuestion?.questionId,
								answer: currentAnswer,
							},
						},
					},
				});
			} finally {
				setanswerResponse(
					answerCheck
						? QuizAnswerStatus.CORRECT
						: QuizAnswerStatus.INCORRECT,
				);
			}
		}
	};

	const assestModel = (type: string) => {
		let popup_data = {};
		if (type === AssetModulepopup?.ASSET_INFO) {
			const quiz = getattemptquizProgramData?.getRecallQuizAttempt?.quiz;
			popup_data = {
				heading: quiz?.name,
				pageData: [
					{
						heading: strings.INSTRUCTIONS,
						content: quiz?.instruction,
					},
				],
			};
		} else if (type === AssetModulepopup.ASSET_HINT) {
			const question: Record<string, any> =
				getattemptquizProgramData?.getRecallQuizAttempt?.attemptQuiz
					?.questions[questionIndex] || {};
			popup_data = {
				heading: "Hint",
				pageData: [
					{ heading: null, content: question?.questionInfo?.hint },
				],
			};
		}
		setassestModel(popup_data);
	};

	const buildPath = buildStudyPlanUrl({
		courseCode: courseId || undefined,
		moduleCode: moduleId || undefined,
		sessionCode: sessionId || undefined,
		segmentCode: segmentId || undefined,
		assetCode,
		learningPathCode,
		learningPathId,

		trackGroupCode: trackGroup,
		trackCode: track,
		electiveGroupCode: electiveGroup,
		electiveCode: elective,
		comboCurriculumCode,
	});
	return {
		getattemptquizProgramData,
		getattemptquizProgramLoader,
		questionIndex,
		selectedAnswer,
		setselectedAnswer,
		questionHandler,
		assestModel,
		assestModelData,
		answerResponse,
		pollQuestionCount,
		assetCode,
		learningPathId,
		learningPathType,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		previewMode,
		loading,
		feedbackModal,
		setFeedbackModal,
		feedbackData,
		setFeedbackDataForSelectedOption,
		setScrollEnabled,
		scrollEnabled,
		buildPath,
	};
};

export default RecallquizController;
