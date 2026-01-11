import Clipboard from "@react-native-clipboard/clipboard";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { Linking, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useSelector } from "react-redux";

import {
	CoachModeCodes,
	CoachModeTriggerCodes,
	DoubtResolutionBotControllerProps,
	Message,
	PAGE_SIZE,
	userType,
	voteType,
	WELCOME_MESSAGE_ID,
} from "@components/DoubtResolutionBot/doubtResolutionBot.interface";
import useDRBotModel from "@components/DoubtResolutionBot/useDRBotModel";

import useGetTimezone from "@hooks/useGetTimezone";
import useKeyboard from "@hooks/useKeyboard";

import { RootState } from "@redux/store/root.reducer";

import { IDateFormat } from "@interface/app.interface";

import { strings } from "@assets/strings";

const useDRBotController = ({
	assetCode,
	learningPathId,
	programName,
	workshopId,
	workshopCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	flatListRef,
	assetType,
	programCode,
	programId,
	buildPath,
	pageUrlFromStudyPlan,
}: DoubtResolutionBotControllerProps) => {
	const {
		submitFeedbackRequest,
		getChatHistory,
		sendResponseFeedback,
		getBotResponse,
		initiateChat,
	} = useDRBotModel();

	const { name: userTimezone } = useGetTimezone();

	const selectedResponseIdRef = useRef<string | null>(null);

	const [messages, setMessages] = useState<Message[]>([]);
	const [threadId, setThreadId] = useState<string | null>(null);
	const [addWelcomeMessage, setWelcomeMessage] = useState(false);
	const [welcome, setWelcome] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [coachMode, setCoachMode] = useState<string>("");
	const [input, setInput] = useState<string | null>("");
	const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
	const [isCoachModeEnabled, setIsCoachModeEnabled] =
		useState<boolean>(false);

	// states for modal
	const [startNew, setStartNew] = useState<boolean>(false);
	const [openNegativeFeedbackModal, setOpenNegativeFeedbackModal] =
		useState<boolean>(false);
	const [responseFeedbackVisible, setResponseFeedbackVisible] =
		useState<boolean>(false);
	const [openExitCoachModeModal, setOpenExitCoachModeModal] =
		useState<boolean>(false);
	const [enableInputField, setEnableInputField] = useState(false);
	const [isMicTextEmpty, setMicTextEmpty] = useState(false);
	const [isSpeech, setIsSpeech] = useState(false);

	const timestamp = moment()
		.tz(userTimezone)
		.format(IDateFormat.dateWithTime);
	const messageList = Array.isArray(messages) ? messages : [];

	const {
		user: { id, firstName, lastName },
	} = useSelector((state: RootState) => state.user);

	const messageLengthIsEqualToOne = messages?.length === 1;

	const { isKeyboardVisible } = useKeyboard();

	useEffect(() => {
		const fetchChatHistory = async () => {
			const payload = {
				input: {
					user_id: id ?? "",
					user_program_id: learningPathId ?? "",
					page_size: PAGE_SIZE,
					page_number: pageNumber,
				},
			};
			try {
				const response = await getChatHistory(payload);

				if (!response) return;

				const data = response.data;
				const historyMessages = data.output.questions_and_answers;
				if (
					data.output.coach_mode === CoachModeCodes.REVISE_COACH ||
					data.output.coach_mode ===
						CoachModeCodes.GRADED_QUESTION_COACH
				) {
					setIsCoachModeEnabled(true);
					setCoachMode(data.output.coach_mode);
				}
				if (historyMessages.length > 0) setWelcome(false);
				const shouldShowWelcomeMessage =
					data.output?.total_count >= 0 &&
					(!historyMessages.length || data.output?.total_count < 5) &&
					!addWelcomeMessage;

				setMessages((prev) => [
					...historyMessages
						.flatMap((item: any) => {
							const {
								response: botResponse,
								question,
								vote,
								question_id,
							} = item || {};

							const botMessage = {
								text: botResponse,
								sender: userType.BOT,
								isCompleted: true,
								questionId: question_id,
								vote:
									vote === 1
										? voteType.UP
										: vote === -1
											? voteType.DOWN
											: undefined,
								displayBotActions: false,
								showPrompt: false,
							};

							const userMessage = {
								text: question,
								sender: userType.USER,
							};

							return [botMessage, userMessage];
						})
						.reverse(),
					...prev,
				]);

				setThreadId(data.output.thread_id || null);

				if (shouldShowWelcomeMessage) setWelcomeMessage(true);
			} catch (e) {}
		};

		fetchChatHistory();
	}, [pageNumber]);

	useEffect(() => {
		const messageList = Array.isArray(messages) ? messages : [];

		if (!messageList.length || pageNumber > 1) return;

		const { sender, text } = messageList[messageList.length - 1] || {};

		if (sender === userType.BOT && !text) {
			if (flatListRef?.current)
				flatListRef.current.scrollToEnd({ animated: true });
		}
	}, [messages?.length, pageNumber]);

	useEffect(() => {
		if (addWelcomeMessage) triggerWelcomeMessage();
	}, [addWelcomeMessage]);

	const startnewChat = () => {
		setMessages([]);
		setThreadId(null);
		triggerWelcomeMessage();
		setWelcome(true);
	};

	const onMicSave = (text: string) => {
		setIsSpeech(false);
		if (text !== "") {
			setEnableInputField(true);
			handleInputChange(text);
			setMicTextEmpty(false);
		} else {
			setMicTextEmpty(true);
		}
	};

	const toggleSpeech = () => {
		if (!isSpeech) {
			setEnableInputField(false);
		}
		setIsSpeech(!isSpeech);
	};
	const handleValidationClose = () => {
		setMicTextEmpty(false);
	};
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffsetY = event.nativeEvent.contentOffset.y;
		if (contentOffsetY <= 0) setPageNumber((prevValue) => prevValue + 1);
	};

	const triggerWelcomeMessage = async () => {
		const payload = {
			input: {
				username: `${firstName} ${lastName}`,
				asset_type: assetType ? [assetType] : [],
			},
		};

		const response = await initiateChat(payload);

		if (!response) return;

		const data = response.data;
		const { smart_prompts, welcome_message } = data.output;

		setMessages((prev: Message[]) => {
			return [
				{
					id: WELCOME_MESSAGE_ID,
					sender: userType.BOT,
					text: welcome_message.replace(/<br\s*\/?>/gi, "\n"),
					displayBotActions: false,
					prompts: smart_prompts.map((p: any) => p.label),
					showPrompt: true,
				},
				...prev,
			];
		});
	};

	const handleSend = async (
		customInput: string | null = null,
		code?: string,
		value?: string,
	) => {
		if (!input?.trim() && !customInput) return;
		setWelcome(false);
		setEnableInputField(false);
		const userMessage = {
			text: input?.trim() || customInput || "",
			sender: userType.USER,
		};
		setMessages((prev) => {
			const updatedMessages = prev.map((message: Message) => {
				if (message.id === WELCOME_MESSAGE_ID) {
					return {
						...message,
						showPrompt: false,
						isCompleted: true,
					};
				} else {
					return {
						...message,
						showPrompt: false,
						displayBotActions: false,
					};
				}
			});

			return [
				...updatedMessages,
				userMessage,
				{ text: "", sender: userType.BOT, displayBotActions: false },
			];
		});

		setIsBotTyping(true);
		setInput("");

		const enableCoachMode =
			code?.startsWith(CoachModeTriggerCodes.REVISION_L2_) ||
			code?.startsWith(CoachModeTriggerCodes.REVISION_ALL_);

		const startCoachMode =
			(customInput || code)?.toLowerCase() === strings.REVISE_COACH_INPUT;

		const isGradedQuestionCoachMode =
			value === CoachModeTriggerCodes.GRADED_QUESTION_COACH_MODE;

		const nextCoachMode = isGradedQuestionCoachMode
			? CoachModeCodes.GRADED_QUESTION_COACH
			: enableCoachMode || startCoachMode
				? CoachModeCodes.REVISE_COACH
				: null;

		if (nextCoachMode) {
			setCoachMode(nextCoachMode);
			setIsCoachModeEnabled(true);
		}

		try {
			const meta_data = {
				program_id: programId,
				program_code: programCode,
				user_program_id: learningPathId,
				program_name: programName,
				user_name: `${firstName} ${lastName}`,
				timezone: userTimezone,
				workshop_id: workshopId,
				workshop_code: workshopCode,
				is_smart_prompt: false,
				level1: courseId,
				level2: moduleId,
				level3: sessionId,
				level4: segmentId,
				asset: assetCode,
				asset_type: assetType !== undefined ? [assetType] : [],
				is_mobile: true,
				code: code || "",
				page_url: pageUrlFromStudyPlan || buildPath,
				coach_code: enableCoachMode ? code : "",
			};

			const payload = {
				question: input || customInput || "",
				user_id: id || null,
				thread_id: threadId,
				meta_data: meta_data,
				coach_mode: nextCoachMode || coachMode,
				hide_message: startCoachMode ? "user" : null,
			};

			const response = await getBotResponse(payload);

			if (!response) return;

			const responseText = await response.data;

			let botMessage = "";
			let questionId = "";
			let customPrompts = null;

			//to process streaming data
			const jsonObjects = responseText
				.split("\n")
				.filter((line) => line.trim().startsWith("data: {"))
				.map((line) => {
					try {
						return JSON.parse(line.replace("data: ", "").trim());
					} catch (error) {
						return null;
					}
				})
				.filter((obj) => obj !== null);

			for (const {
				thread_id,
				question_id,
				answer,
				custom_response,
			} of jsonObjects) {
				if (thread_id) {
					setThreadId(thread_id);
					questionId = question_id ?? "";
					botMessage += answer ?? "";
					if (custom_response?.prompts) {
						customPrompts = custom_response.prompts;
					}
					if (custom_response?.exit_coach) {
						setIsCoachModeEnabled(false);
						setCoachMode("");
					}
				}
			}

			const botResponse = {
				text: botMessage,
				sender: userType.BOT,
				questionId: questionId,
				displayBotActions: true,
				customPrompts: customPrompts,
			};

			setMessages((prev) =>
				prev
					.filter(
						(msg: Message) =>
							!(msg.sender === userType.BOT && msg.text === ""),
					)
					.concat(botResponse),
			);
		} catch (e) {
		} finally {
			setInput("");
			selectedResponseIdRef.current = null;
			setIsBotTyping(false);
		}
	};

	const sendFeedback = async (
		questionId: string,
		rating: number,
		feedbackText: string,
	) => {
		const feedbackData = {
			input: {
				question_id: questionId,
				rating: rating,
				feedback: rating === 1 ? "" : feedbackText,
				thread_id: threadId || "",
			},
		};

		try {
			const response = await sendResponseFeedback(feedbackData);

			if (response.status === 200) {
				setMessages((prev) =>
					prev.map((msg) =>
						msg.questionId === questionId
							? {
									...msg,
									vote:
										rating === 1
											? voteType.UP
											: rating === -1
												? voteType.DOWN
												: null,
								}
							: msg,
					),
				);
			}
		} catch (error) {}
	};

	const handlePositiveFeedbackForResponse = (item: Message) => {
		sendFeedback(
			item.questionId ?? "",
			item.vote === voteType.UP ? 0 : 1,
			"",
		);
	};

	const handleInputChange = (text: string) => setInput(text);

	const handleCopy = (text: string) => Clipboard.setString(text);

	const handleEmailPress = (email?: string) => {
		if (!email) return;
		Linking.openURL(`mailto:${email}`);
	};

	const extractEmails = (text: string) => {
		//using this regex as the one already in project is not working for this case
		const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
		return text.match(emailRegex);
	};

	const handleSelectQuestion = (item: Message) => {
		if (item.id === 12345) return;
		const isSelected = selectedResponseIdRef.current === item.questionId;
		selectedResponseIdRef.current = item.questionId || null;

		if (isSelected) setResponseFeedbackVisible((prev) => !prev);
	};

	const scrollToLatestMessage = () => {
		if (!Array.isArray(messages) || !messages.length) return;

		const lastMessageId = messages[messages.length - 1]?.questionId;

		if (
			!selectedResponseIdRef.current ||
			selectedResponseIdRef.current === lastMessageId
		)
			flatListRef?.current?.scrollToEnd({ animated: true });
	};

	const handleNegativeFeedbackForResponse = (item: Message) => {
		selectedResponseIdRef.current = item.questionId || "";
		if (item.vote === voteType.DOWN) {
			sendFeedback(item.questionId ?? "", 0, "");
			return;
		}
		setOpenNegativeFeedbackModal(true);
	};

	const shouldShowBotResponseActions = (item: Message) => {
		return (
			(selectedResponseIdRef.current === item.questionId &&
				item.id !== 12345 &&
				responseFeedbackVisible) ||
			item.displayBotActions === true
		);
	};

	const handleConfirmFeedback = (answer: string) => {
		sendFeedback(selectedResponseIdRef.current || "", -1, answer);
	};

	const hasVisibleCustomPrompts = messageList.some(
		(item) =>
			item.customPrompts &&
			Array.isArray(item.customPrompts) &&
			item.customPrompts.length > 0 &&
			item.showPrompt !== false,
	);

	const handleExitCoachMode = () => {
		handleSend(strings.COACH_MODE_EXIT_INPUT);
		setOpenExitCoachModeModal(false);
		setCoachMode("");
		setIsCoachModeEnabled(false);
	};

	return {
		submitFeedbackRequest,
		isKeyboardVisible,
		timestamp,
		handleSelectQuestion,
		shouldShowBotResponseActions,
		selectedResponseIdRef,
		handlePositiveFeedbackForResponse,
		messages,
		handleNegativeFeedbackForResponse,
		sendFeedback,
		threadId,
		welcome,
		handleScroll,
		startnewChat,
		isBotTyping,
		input,
		handleSend,
		scrollToLatestMessage,
		handleInputChange,
		handleCopy,
		handleEmailPress,
		openNegativeFeedbackModal,
		startNew,
		extractEmails,
		setStartNew,
		setOpenNegativeFeedbackModal,
		messageLengthIsEqualToOne,
		messageList,
		handleConfirmFeedback,
		WELCOME_MESSAGE_ID,
		hasVisibleCustomPrompts,
		openExitCoachModeModal,
		setOpenExitCoachModeModal,
		isCoachModeEnabled,
		handleExitCoachMode,
		setIsCoachModeEnabled,
		enableInputField,
		isMicTextEmpty,
		isSpeech,
		toggleSpeech,
		onMicSave,
		handleValidationClose,
	};
};

export default useDRBotController;
