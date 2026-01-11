import { useState } from "react";

import { assessmentHttpClient } from "@utils/httpClientList";

type Answer = string | string[] | Record<string, unknown>;

interface Payload {
	currentQuestionId: string;
	question: {
		questionId: string;
		answer: Answer;
		isPinned: boolean;
	};
}

const QuizScreenModel = () => {
	const [dataLoading, setDataLoading] = useState<boolean>(true);
	const [serverTime, setServerTime] = useState("");

	const fetchpageData = async (attemptId: string, assessmentID: string) => {
		try {
			const response = await assessmentHttpClient.get(
				`/api/assessment-attempt/${attemptId}?deliveryId=${assessmentID}`,
			);

			if (response.status !== 200) {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}

			const res = await response.data;
			return res?.data;
		} catch (error) {
			console.error("Error fetching data:", error);
			return null; // or return some default value if needed
		}
	};

	const fetchServerTime = async () => {
		try {
			const response = await assessmentHttpClient.get(
				`/api/assessment-attempt/server-time`,
			);
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch server time: ${response.statusText}`,
				);
			}
			const responseDate = response.headers.map.date;
			if (!responseDate) {
				throw new Error("No date header in response");
			}

			const date = new Date(responseDate);
			const formattedDate = date.toISOString();
			setServerTime(formattedDate);
		} catch (error) {
			console.error("Error fetching server time:", error);
		}
	};

	const handleSubmitCall = async (attemptId: string, payload: Payload) => {
		try {
			const response = await assessmentHttpClient.patch(
				`/api/assessment-attempt/${attemptId}/questions`,
				{ ...payload },
			);
			return response.data;
		} catch (error) {
			return null;
		}
	};

	const submitAssessment = async (payload: Payload) => {
		try {
			const response = await assessmentHttpClient.post(
				`/api/assessment-attempt/submit`,
				payload,
			);
			return response.data;
		} catch (error) {}
	};

	return {
		serverTime,
		dataLoading,
		fetchpageData,
		fetchServerTime,
		handleSubmitCall,
		submitAssessment,
	};
};

export default QuizScreenModel;
