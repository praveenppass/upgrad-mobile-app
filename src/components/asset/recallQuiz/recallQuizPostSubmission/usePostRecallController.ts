import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import usePostRecallModel from "@components/asset/recallQuiz/recallQuizPostSubmission/usePostRecallModel";

import {
	RootHomeStackList,
	RootHomeStackRouteProps,
} from "@interface/types/rootHomeStack.type";

interface IPostRecallControllerProps {
	attemptID: string;
	recallQuizCode: string;
}

const usePostRecallController = ({
	attemptID,
	recallQuizCode,
}: IPostRecallControllerProps) => {
	const navigation = useNavigation<RootHomeStackList>();
	const route = useRoute<RootHomeStackRouteProps<"Container6Screen">>();
	const [isFullMarksRecallQuizModalOpen, setIsFullMarksRecallQuizModalOpen] =
		useState(false);

	const { recallQuizAttemptData, getRecallQuizResults } =
		usePostRecallModel();

	const fetchRecallQuizAttempt = async () => {
		try {
			const result = await getRecallQuizResults({
				variables: variables,
			});
		} catch (e) {}
	};

	useEffect(() => {
		if (attemptID) {
			fetchRecallQuizAttempt();
		}
	}, [attemptID]);

	const variables = {
		params: {
			code: recallQuizCode,
			attempt: attemptID,
		},
	};

	const onRetakeQuiz = () => {
		navigation.pop(1);
		navigation.navigate("Container6Screen", {
			...route?.params,
			isPostRecallSubmission: false,
		});
	};

	const { extraData, attemptQuiz } =
		recallQuizAttemptData?.getRecallQuizAttempt || {};

	const totalQuestions = extraData?.totalQuestions || 0;
	const questions = attemptQuiz?.questions || [];

	const correctAnswers = questions.reduce((count, question) => {
		if (question.isCorrect) return count + 1;
		return count;
	}, 0);

	const percentage =
		totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

	const title = `${correctAnswers}/${totalQuestions}`;

	useEffect(() => {
		if (percentage === 100) setIsFullMarksRecallQuizModalOpen(true);
	}, [percentage]);

	return {
		recallQuizAttemptData,
		percentage,
		title,
		onRetakeQuiz,
		isFullMarksRecallQuizModalOpen,
		setIsFullMarksRecallQuizModalOpen,
	};
};

export default usePostRecallController;
