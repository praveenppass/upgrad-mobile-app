import { useEffect } from "react";

import useModuleFeedbackModalModel from "@components/studyPlan/common/ModuleFeedbackModal/useModuleFeedbackModalModel";

import { IFeedbackResponseItem } from "@graphql/mutation/microInteractions/createFeedbackResponse";
import {
	IPendingFeedbackChildCategoryQuestions,
	IPendingFeedbackType,
} from "@graphql/query/microInteractions/pendingFeedbackQuery";

import { LearningPathType } from "@interface/app.interface";

interface IModuleFeedbackModalController {
	level1: string;
	level2?: string;
	learningPathId: string;
	learningPathType: LearningPathType;

	closeModal: () => void;
}

interface IMappedPendingFeedback {
	id: string;
	question: string;
	type: IPendingFeedbackType;
	children?: string[];
	options?: string[];
}

const mapPendingFeedback = (
	data: IPendingFeedbackChildCategoryQuestions[],
): IMappedPendingFeedback[] =>
	data.map((item) => {
		const { id, question, type, childrenQuestions, options } = item;
		const baseItem = { id, question, type };

		switch (item.type) {
			case IPendingFeedbackType.RATING:
				return { ...baseItem, children: childrenQuestions };
			case IPendingFeedbackType.OPTIONS: {
				const optionsList =
					options?.map((option) => option.option) ?? [];
				return { ...baseItem, options: optionsList };
			}
			case IPendingFeedbackType.TEXT:
			default:
				return baseItem;
		}
	});

const useModuleFeedbackModalController = ({
	level1,
	level2,
	learningPathId,
	learningPathType,
	closeModal,
}: IModuleFeedbackModalController) => {
	const {
		getPendingFeedback,
		pendingFeedbackData,
		createFeedbackResponseMutation,
		getModuleNameForProgram,
		moduleNameForProgramData,
	} = useModuleFeedbackModalModel();

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	useEffect(() => {
		getPendingFeedback({
			variables: {
				where: {
					feedbackFrom: "learner",
					level1,
					...(level2 && { level2 }),
					type: "module-completion",
					userProgram: learningPathId,
				},
			},
		});
	}, [level1, learningPathId]);

	useEffect(() => {
		if (!isProgram) return;
		getModuleNameForProgram({
			variables: {
				where: {
					id: learningPathId,
					level1,
					level2: pendingFeedbackData?.pendingFeedback?.level2 || "",
				},
			},
		});
	}, [pendingFeedbackData]);

	const mappedPendingFeedback = mapPendingFeedback(
		pendingFeedbackData?.pendingFeedback?.feedback?.children?.[0]?.category
			?.questions || [],
	);

	const getQuestionsByType = (type: IPendingFeedbackType) =>
		mappedPendingFeedback.filter((item) => item.type === type);

	const questionMap = {
		[IPendingFeedbackType.RATING]: getQuestionsByType(
			IPendingFeedbackType.RATING,
		),
		[IPendingFeedbackType.OPTIONS]: getQuestionsByType(
			IPendingFeedbackType.OPTIONS,
		),
		[IPendingFeedbackType.TEXT]: getQuestionsByType(
			IPendingFeedbackType.TEXT,
		),
	};

	const moduleName = moduleNameForProgramData?.userProgramContainer?.name;

	const handleSubmitFeedback = (
		selectedStar: number,
		optionSelected?: string,
		textFeedback?: string,
	) => {
		const ratingQuestionId =
			questionMap[IPendingFeedbackType.RATING]?.[0]?.id;
		const optionQuestionId =
			questionMap[IPendingFeedbackType.OPTIONS]?.[selectedStar - 1]?.id;
		const textQuestionId = questionMap[IPendingFeedbackType.TEXT]?.[0]?.id;

		const response: { question: string; answer: string }[] = [];

		if (ratingQuestionId)
			response.push({
				question: ratingQuestionId,
				answer: selectedStar.toString(),
			});

		if (optionSelected && optionQuestionId)
			response.push({
				question: optionQuestionId,
				answer: optionSelected,
			});

		if (textFeedback && textQuestionId)
			response.push({
				question: textQuestionId,
				answer: textFeedback,
			});

		handleFeedbackResponse({
			feedbackId:
				pendingFeedbackData?.pendingFeedback?.feedback?.id || "",
			response,
		});

		closeModal();
	};

	interface IHandleFeedbackResponse {
		feedbackId: string;
		response: IFeedbackResponseItem[];
	}

	const handleFeedbackResponse = ({
		feedbackId,
		response,
	}: IHandleFeedbackResponse) => {
		createFeedbackResponseMutation({
			variables: {
				data: {
					userProgram: learningPathId,
					feedback: feedbackId,
					response,
					feedbackFrom: "learner",
					level1,
					...(level2 && { level2 }),
				},
			},
		});
	};

	return {
		questionMap,
		moduleName,
		handleSubmitFeedback,
	};
};

export default useModuleFeedbackModalController;
