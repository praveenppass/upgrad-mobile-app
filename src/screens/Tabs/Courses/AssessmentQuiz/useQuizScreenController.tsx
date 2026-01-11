import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";
import QuizScreenModel from "@screens/Tabs/Courses/AssessmentQuiz/useQuizScreenModel";

import { storage } from "@config/mmkvStorage";

import { BottomButton } from "@interface/app.interface";
import {
	AssetModulepopup,
	QuestionStatusEnum,
} from "@interface/assessment.interface";
import {
	RootHomeStackList,
	RootHomeStackRouteProps,
} from "@interface/types/rootHomeStack.type";

import StorageKeys from "@constants/storage.constants";

import { strings } from "@assets/strings";

interface IAssesmentModalProps {
	questions: [];
	bookmarkArray: never[];
	modalType: string | null;
}
interface IAssesmentPageProps {
	quizQuestions: [];
	attempt: [];
	pageResponse: Record<string, any>;
	enableMoveOnlyForward: boolean;
	enableSkipping: boolean;
	assessmentDuration: number;
	quizDuration: number;
	assessmentExpiresAt: string;
	enableAssessmentLevelTimer: boolean;
	enableQuestionLevelTimer: boolean;
	attemptID: string;
}
const QuizController = () => {
	const route = useRoute<RootHomeStackRouteProps<"AssessmentQuizScreen">>();
	const navigation = useNavigation<RootHomeStackList>();
	const {
		assetCode,
		learningPathId,
		learningPathType,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		learningPathCode,
		trackGroup,
		track,
		electiveGroup,
		elective,
		comboCurriculumCode,
	} = route.params;

	const [assessmentPagedata, setassessmentPagedata] =
		useState<IAssesmentPageProps>({
			quizQuestions: [],
			attempt: [],
			enableMoveOnlyForward: false,
			enableSkipping: false,
			assessmentDuration: 0,
			quizDuration: 0,
			assessmentExpiresAt: "",
			enableAssessmentLevelTimer: false,
			enableQuestionLevelTimer: false,
			pageResponse: {},
			attemptID: "",
		});
	const [questionActiveIndex, setquestionAtiveIndex] = useState(0);
	const [visible, setIsVisible] = useState(false);
	const [isSkipModalVisible, setIsSkipModalVisible] = useState(false);
	const [selectedAnswer, setselectedAnswer] = useState<Record<string, any>>();
	const [bookMakerArray, setBookmarkedArr] = useState([]);
	const [questionTimer, setQuestionTimer] = useState(0);
	const [loading, setLoading] = useState(false);
	const [slowNetworkLoader, setSlowNetworkLoader] = useState(false);
	const {
		fetchpageData,
		handleSubmitCall,
		submitAssessment,
		serverTime,
		fetchServerTime,
	} = QuizScreenModel();
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const [assestModelData, setassestModel] = useState<Record<string, any>>({});
	const [assesmentModalData, setAssesmentModalData] =
		useState<IAssesmentModalProps>({
			questions: [],
			bookmarkArray: [],
			modalType: null,
		});

	const openAssessmentModalData = async (type: string) => {
		const { attemptId, assessmentID } = route.params;
		const response = await fetchpageData(attemptId, assessmentID);
		const questions = await response?.attempt?.questions;

		let assesmentModal: IAssesmentModalProps = {
			modalType: null,
			questions: [],
			bookmarkArray: [],
		};
		if (type) {
			assesmentModal = {
				modalType: type,
				questions: questions,
				bookmarkArray: bookMakerArray,
			};
		}
		setAssesmentModalData(assesmentModal);
	};
	useEffect(() => {
		setLoading(true);
		const { attemptId, assessmentID } = route.params;
		const __fetchpageData = async () => {
			const response = await fetchpageData(attemptId, assessmentID);
			const questions = response?.attempt?.questions;
			const { navigationSettings, generalSettings } = response?.settings;
			if (
				generalSettings.enableAssessmentLevelTimer ||
				generalSettings.enableQuestionLevelTimer
			) {
				await fetchServerTime();
			}
			const findIndex =
				(await questions?.findIndex(
					(i: { questionId: string }) =>
						i.questionId === response?.attempt?.currentQuestionId,
				)) || 0;
			const bookmarkedFilter = await questions
				?.filter((i: { isPinned: boolean }) => i.isPinned)
				.map((i: { questionId: string }) => i.questionId);
			await setBookmarkedArr(bookmarkedFilter);
			await setassessmentPagedata({
				...assessmentPagedata,
				pageResponse: response,
				quizQuestions: questions,
				enableMoveOnlyForward:
					navigationSettings?.enableMoveOnlyForward,
				enableSkipping: generalSettings?.enableSkipping,
				assessmentDuration:
					generalSettings.enableAssessmentLevelTimer &&
					generalSettings.duration,
				quizDuration:
					!generalSettings.enableAssessmentLevelTimer &&
					questions[questionActiveIndex]?.duration,
				assessmentExpiresAt: response?.attempt?.expiredAt,
				enableQuestionLevelTimer:
					generalSettings.enableQuestionLevelTimer,
				enableAssessmentLevelTimer:
					generalSettings?.enableAssessmentLevelTimer,
				attemptID: attemptId || "",
			});
			await setquestionAtiveIndex(findIndex > 0 ? findIndex : 0); // this for the index Active code.
			const answers = questions.reduce(
				(
					acc,
					i: {
						questionId: string;
						answer: never[];
						status: QuestionStatusEnum;
					},
				) => {
					if ([QuestionStatusEnum.ANSWERED].includes(i.status)) {
						acc[i.questionId] = {
							answer: i.answer,
							questionId: i.questionId,
						};
					}
					return acc;
				},
				{} as Record<string, { answer: never[]; questionId: string }>,
			);
			await setselectedAnswer({ ...answers });
			setLoading(false);
		};

		if (attemptId && assessmentID) {
			__fetchpageData();
		}
	}, [route.params]);

	const calculateAssessmentTimer = () => {
		if (assessmentPagedata.enableAssessmentLevelTimer) {
			if (assessmentPagedata.assessmentExpiresAt) {
				const time1 = new Date(serverTime);
				const time2 = new Date(assessmentPagedata.assessmentExpiresAt);
				const differenceInmilliSeconds =
					time2.getTime() - time1.getTime();
				const differenceInSeconds = Math.floor(
					differenceInmilliSeconds / 1000,
				);

				if (
					differenceInSeconds >
					assessmentPagedata.assessmentDuration * 60
				) {
					return assessmentPagedata.assessmentDuration;
				}

				return differenceInSeconds / 60;
			} else {
				return assessmentPagedata.assessmentDuration;
			}
		}
		return assessmentPagedata.assessmentDuration;
	};

	const handleQuestionTimer = () => {
		setQuestionTimer(0);
	};
	const newAssessmentTimer = calculateAssessmentTimer();

	useEffect(() => {
		handleQuestionTimer();
		const newQuestionTimer = calculateQuestionTimer();
		setQuestionTimer(newQuestionTimer);
	}, [questionActiveIndex, assessmentPagedata]);

	const calculateQuestionTimer = () => {
		const currentQuestion =
			assessmentPagedata?.quizQuestions?.[questionActiveIndex];
		if (
			currentQuestion?.expiredAt &&
			currentQuestion?.startedAt &&
			assessmentPagedata?.enableQuestionLevelTimer
		) {
			const expiredAt = new Date(currentQuestion.expiredAt).getTime();
			let startedAt = new Date(currentQuestion.startedAt).getTime();

			const currentTime = new Date().getTime();
			if (currentTime < expiredAt) {
				if (currentTime > startedAt) startedAt = currentTime;
			} else startedAt = expiredAt;

			const differenceInSeconds = Math.floor(
				(expiredAt - startedAt) / 1000,
			);
			return differenceInSeconds;

			// let elapsedTime = Math.floor((Date.now() - startedAt) / 1000);
			// console.log(elapsedTime, "Remaining Time: elapsedd");

			// if (elapsedTime >= currentQuestion.duration) {
			// 	elapsedTime = currentQuestion.duration;
			// }
			// const remainingTime = currentQuestion.duration - elapsedTime;
			// console.log(elapsedTime, "Remaining Time:", remainingTime);
			// console.log("differenceInSeconds", differenceInSeconds);
			// return remainingTime > 0 ? remainingTime : differenceInSeconds;
		}
		return 0;
	};

	const assestModel = (type: string) => {
		const { pageResponse, quizQuestions } = assessmentPagedata;
		let popup_data = {};
		if (type === AssetModulepopup?.ASSET_INFO) {
			const quiz = pageResponse?.assessment;
			popup_data = {
				heading: quiz?.name,
				pageData: [
					{
						heading: strings.DESCRIPTIONS_QUIZ,
						content: quiz?.description,
					},
					{
						heading: strings.INSTRUCTIONS,
						content: quiz?.instruction,
					},
				],
			};
		} else if (type === AssetModulepopup.ASSET_HINT) {
			const question: Record<string, any> =
				quizQuestions[questionActiveIndex] || {};
			popup_data = {
				heading: "Hint",
				pageData: [
					{ heading: null, content: question?.questionInfo?.hint },
				],
			};
		}
		setassestModel(popup_data);
	};

	useEffect(() => {
		if (isSkipModalVisible) setIsSkipModalVisible(false);
	}, [assessmentPagedata, questionActiveIndex]);

	const questionHandler = async (type: string) => {
		handleQuestionTimer();
		const { attemptId } = route.params;
		const question: Record<string, any> =
			assessmentPagedata?.quizQuestions[questionActiveIndex] || {};
		const findBookmarks = bookMakerArray?.find(
			(i: string) => i === question?.questionId,
		);
		if (type === BottomButton.PREV) {
			if (questionActiveIndex === 0) return;
			const previousQuestion: Record<string, any> =
				assessmentPagedata?.quizQuestions[questionActiveIndex - 1] ||
				null;
			const payload = {
				currentQuestionId:
					previousQuestion?.questionId || question?.questionId,
				question: {
					questionId: question?.questionId,
					answer:
						selectedAnswer?.[question?.questionId]?.answer || [],
					isPinned: findBookmarks ? true : false,
				},
			};
			await handleSubmitCall(attemptId, payload);
			setquestionAtiveIndex(questionActiveIndex - 1);
		} else if (type === BottomButton.NEXT) {
			const isLastQuestion: boolean =
				assessmentPagedata?.quizQuestions?.length - 1 ===
				questionActiveIndex;
			if (isLastQuestion) {
				questionHandler(BottomButton.FINISH);
				return false;
			}
			const nextQuestion: Record<string, any> =
				assessmentPagedata?.quizQuestions[questionActiveIndex + 1] ||
				null;
			const payload = {
				currentQuestionId:
					nextQuestion?.questionId || question?.questionId,
				question: {
					questionId: question?.questionId,
					answer:
						selectedAnswer?.[question?.questionId]?.answer || [],
					isPinned: findBookmarks ? true : false,
				},
			};
			if (assesmentModalData?.modalType) {
				openAssessmentModalData("");
			}
			await handleSubmitCall(attemptId, payload);
			setquestionAtiveIndex(questionActiveIndex + 1);
		} else if (type === BottomButton.SKIP) {
			openAssessmentModalData(AssetModulepopup.ASSET_SKIP);
		} else if (type === BottomButton.FINISH) {
			setSlowNetworkLoader(true);
			try {
				const payload = {
					currentQuestionId: question?.questionId,
					question: {
						questionId: question?.questionId,
						answer:
							selectedAnswer?.[question?.questionId]?.answer ||
							[],
						isPinned: findBookmarks ? true : false,
					},
				};
				await handleSubmitCall(attemptId, payload);
				await openAssessmentModalData(AssetModulepopup.ASSET_FINSH);
			} finally {
				setSlowNetworkLoader(false);
			}
		} else if (type === BottomButton.TIMES_UP) {
			openAssessmentModalData(AssetModulepopup.ASSET_TIMER_COMPLETED);
			await submitAssessment({
				attemptId: attemptId,
				source: "submitButton",
			});
		} else if (type === BottomButton.SUBMIT_ASSESMENT) {
			const getAttempt: any = await storage.getString(
				StorageKeys.ASSESSMENT_SKIP_ENABLED,
			);
			const parsedGetAttempt =
				getAttempt !== "undefined" ? getAttempt : "";

			let createArra: never[] =
				parsedGetAttempt && Array.isArray(JSON.parse(parsedGetAttempt))
					? JSON.parse(parsedGetAttempt)
					: [];

			createArra = createArra?.filter((i: string) => i !== attemptId);
			await submitAssessment({
				attemptId: attemptId,
				source: "submitButton",
			});
			await storage.set(
				StorageKeys.ASSESSMENT_SKIP_ENABLED,
				JSON.stringify(createArra),
			);
			await openAssessmentModalData("");
			navigation.pop(1);
			navigation.replace("Container6Screen", {
				...route?.params,
				ispostSubmission: true,
			});
		} else if (type === BottomButton.MODAL_OKAY_NAVIGATE) {
			navigation.pop(1);
			navigation.replace("Container6Screen", {
				...route?.params,
				ispostSubmission: true,
			});
		}
	};

	const handleBookmarks = async (data: any) => {
		if (data) {
			const bookFilter = bookMakerArray?.filter((i: any) => i !== data);
			setBookmarkedArr(bookFilter);
		} else {
			const question: Record<string, any> =
				assessmentPagedata?.quizQuestions[questionActiveIndex];
			const arr = [...bookMakerArray];
			if (question) {
				arr.push(question.questionId);
			}
			setBookmarkedArr(arr);
		}
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
		assessmentPagedata,
		questionActiveIndex,
		assestModelData,
		selectedAnswer,
		bookMakerArray,
		handleBookmarks,
		questionHandler,
		assestModel,
		setselectedAnswer,
		visible,
		setIsVisible,
		setIsSkipModalVisible,
		isSkipModalVisible,
		openAssessmentModalData,
		assesmentModalData,
		newAssessmentTimer,
		questionTimer,
		setquestionAtiveIndex,
		assetCode,
		learningPathId,
		learningPathType,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		loading,
		scrollEnabled,
		setScrollEnabled,
		buildPath,
		slowNetworkLoader,
	};
};
export default QuizController;
