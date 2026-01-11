import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useLandscapeVideoModal from "@components/Reusable/Video/LandscapeController/useLandscapeVideoModal";

import { RootState } from "@redux/store/root.reducer";

type MessageItem = {
	key: {
		fromUser: number;
		createdAt: number;
	};
	message: string;
	senderName: string;
	messageId: string;
};

interface RootStackParamList {
	VideoPlayerScreen: {
		brightCoveId: string | string[];
		seekTime?: number;
		status?: string;
		assetCode: string;
		learningPathId: string;
		superAssetCode?: string | undefined;
		isProgram: boolean;
		isOptional: boolean;
		courseId: string | null;
		moduleId: string | null;
		sessionId: string | null;
		segmentId: string | null;
		transcriptDetailsId?: string;
	};
}

type VideoPlayerRouteProp = RouteProp<RootStackParamList, "VideoPlayerScreen">;

const CHAT_LIST_BASE_URL =
	"https://staging-bl.upgrad.dev/event/rich/chat/public/paged";

const useLandscapeVideoController = () => {
	const {
		videoProgramDetails,
		transcriptsData,
		getVideoProgramDetails,
		getKeyMovementTranscriptDetails,
	} = useLandscapeVideoModal();

	const omsAuthToken =
		useSelector((state: RootState) => state.user?.omsAuthToken) ?? "";

	const route = useRoute<VideoPlayerRouteProp>();
	const { transcriptDetailsId, brightCoveId } = route.params ?? {};

	const [isChatVisible, setIsChatVisible] = useState(false);
	const [chatMessages, setChatMessages] = useState<MessageItem[]>([]);
	const [highLightIndex, setHighLightIndex] = useState(-1);
	const [loadedPageCount, setLoadedPageCount] = useState(0);

	const [transcriptSeekTime, setTranscriptSeekTime] = useState<number>();
	const isBrightCoveIdArray = Array.isArray(brightCoveId);

	const [selectedBrightCoveId, setSelectedBrightCoveId] = useState(
		isBrightCoveIdArray ? brightCoveId[0]?.brightcoveId : brightCoveId,
	);
	const [isMultipleVideosModalVisible, setMultipleVideosModalVisible] =
		useState(false);

	const [authUser, setAuthUser] = useState(null);

	const handleSelectVideo = (brightcoveId: string) => {
		setSelectedBrightCoveId(brightcoveId);
		setMultipleVideosModalVisible(false);
	};

	const toggleVideosResponseModal = useCallback(() => {
		setMultipleVideosModalVisible((prev) => !prev);
	}, []);

	const toggleChatVisibility = () => {
		setIsChatVisible((prev) => !prev);
	};

	const handleTranscriptItemHighlight = (timeIndex: number) => {
		setHighLightIndex(timeIndex);
	};
	useEffect(() => {
		fetchVideoProgramDetails();
		fetchKeyMovementTranscriptsDetails();
	}, []);

	const fetchVideoProgramDetails = async () => {
		try {
			const { data } = await getVideoProgramDetails({
				variables: {
					where: {
						id: transcriptDetailsId || "",
					},
				},
			});

			const sessionDetails =
				data?.userEvent?.workshopSession?.virtualMeeting ??
				data?.userEvent?.session?.virtualMeeting;

			if (!sessionDetails) return;

			loadChats(
				sessionDetails?.code ?? "",
				sessionDetails?.uuid ?? "",
				10,
			);
		} catch (error) {
			console.error("Error fetching video program details:", error);
		}
	};

	const fetchKeyMovementTranscriptsDetails = async () => {
		await getKeyMovementTranscriptDetails({
			variables: {
				where: {
					brightcove: selectedBrightCoveId || "",
				},
			},
		});
	};

	const loadChats = async (
		sessionID: string,
		vendorSessionId: string,
		page: number,
	) => {
		try {
			const headers = {
				"Content-Type": "application/json",
				"auth-token": omsAuthToken,
				sessionID: sessionID,
				vendorSessionId: vendorSessionId,
			};

			const url = `${CHAT_LIST_BASE_URL}?page=0&size=${page}`;
			const response = await axios.get(url, { headers });

			// Example usage:
			const userInfo = decodeJWT(omsAuthToken);
			setAuthUser(userInfo.sub);
			if (response.data?.contents) {
				setLoadedPageCount(page);
				setChatMessages(response.data.contents);
			}
		} catch (error) {
			console.error("Error fetching chat list:", error);
		}
	};

	const decodeJWT = (token: string) => {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(
					(c) =>
						`%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`,
				)
				.join(""),
		);
		return JSON.parse(jsonPayload);
	};

	const onTranscriptSeekTimeChange = (time: number) => {
		setTranscriptSeekTime(time);
	};

	const handleLoadMoreMessages = () => {
		const sessionDetails =
			videoProgramDetails?.userEvent?.workshopSession?.virtualMeeting;
		loadChats(
			sessionDetails?.code ?? "",
			sessionDetails?.uuid ?? "",
			loadedPageCount + 10,
		);
	};

	const onMultiVideoChange = (newBrightCoveId: string) => {
		setSelectedBrightCoveId(newBrightCoveId);
	};

	return {
		isChatVisible,
		videoProgramDetails,
		transcriptsData,
		chatMessages,
		selectedBrightCoveId,
		isMultipleVideosModalVisible,
		isBrightCoveIdArray,
		highLightIndex,
		transcriptSeekTime,
		authUser,
		toggleChatVisibility,
		handleSelectVideo,
		toggleVideosResponseModal,
		handleTranscriptItemHighlight,
		onTranscriptSeekTimeChange,
		handleLoadMoreMessages,
		onMultiVideoChange,
	};
};

export default useLandscapeVideoController;
