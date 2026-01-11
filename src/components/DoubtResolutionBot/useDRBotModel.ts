import {
	ChatHistoryPayload,
	FeedbackInput,
	FeedbackPayload,
	InitiateChatPayload,
	SubmitInputRequest,
} from "@components/DoubtResolutionBot/doubtResolutionBot.interface";

import { sathiHttpClient } from "@utils/httpClientList";

const useDRBotModel = () => {
	const submitFeedbackRequest = async (payload: {
		input: FeedbackPayload;
	}): Promise<Response | null> => {
		const url = `/feedback/invoke`;

		try {
			const response = await sathiHttpClient.post(url, payload);

			return response;
		} catch (error) {
			return null;
		}
	};

	const getChatHistory = async (payload: { input: ChatHistoryPayload }) => {
		const url = `/chat_history/invoke`;

		try {
			const response = await sathiHttpClient.post(url, payload);

			return response;
		} catch (error) {
			return null;
		}
	};

	const initiateChat = async (payload: { input: InitiateChatPayload }) => {
		const url = `/initiate_chat/invoke`;

		try {
			const response = await sathiHttpClient.post(url, payload);

			return response;
		} catch (error) {
			return null;
		}
	};

	const sendResponseFeedback = async (payload: { input: FeedbackInput }) => {
		const url = `/feedback/invoke`;

		try {
			const response = await sathiHttpClient.post(url, payload);

			return response;
		} catch (error) {
			return null;
		}
	};

	const getBotResponse = async (input: SubmitInputRequest) => {
		const url = `/chat/stream`;
		try {
			const response = await sathiHttpClient.post(url, { input });

			return response;
		} catch (error) {
			return null;
		}
	};

	return {
		submitFeedbackRequest,
		getChatHistory,
		sendResponseFeedback,
		getBotResponse,
		initiateChat,
	};
};
export default useDRBotModel;
