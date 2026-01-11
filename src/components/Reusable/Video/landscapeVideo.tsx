import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	Modal,
	NativeModules,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";

import RNVideoPlayer from "@components/Reusable/Video";
import BottomSessionVideoList from "@components/Reusable/Video/Common/BottomSessionVideoList";
import ChatConversation from "@components/Reusable/Video/Common/ChatConversation";
import SessionVideoList from "@components/Reusable/Video/Common/SessionVideoList";
import TranscriptTabs from "@components/Reusable/Video/Common/TranscriptTabs";
import VideoHeading from "@components/Reusable/Video/Common/VideoHeading";
import useLandscapeVideoController from "@components/Reusable/Video/LandscapeController/useLandscapeVideoController";
import useVideoAssetModel from "@components/Reusable/Video/useVideoModel";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

type RootStackParamList = {
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
};
type VideoPlayerRouteProp = RouteProp<RootStackParamList, "VideoPlayerScreen">;
const LandscapePlayer = () => {
	const route = useRoute<VideoPlayerRouteProp>();
	const {
		brightCoveId,
		learningPathId,
		superAssetCode,
		assetCode,
		isProgram,
		courseId,
		segmentId,
		sessionId,
		moduleId,
	} = route.params ?? {};

	const {
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
	} = useLandscapeVideoController();

	const { getVideoDrmData } = useVideoAssetModel();
	const [videoData, setVideoData] = useState([]);

	useEffect(() => {
		if (!Array.isArray(brightCoveId)) return;

		const fetchVideoData = async () => {
			try {
				const newVideoData = await Promise.all(
					brightCoveId.map(async (video) => {
						const videoId = video.brightcoveId;
						const drmData = await getVideoDrmData(videoId);

						return {
							...video,
							poster: drmData.poster,
							uri: drmData.uri,
						};
					}),
				);

				setVideoData(newVideoData);
			} catch (error) {
				console.error("Error fetching video data:", error);
			}
		};

		fetchVideoData();
	}, [brightCoveId]);

	const transcriptTimeList =
		transcriptsData?.transcript?.transcription?.map((item) => item.start) ||
		[];

	const brightcoveIds =
		isBrightCoveIdArray &&
		brightCoveId?.map((f: any) => f?.brightcoveId).filter(Boolean);

	const [isFullscreen, setFullscreen] = useState(false);
	const [progressSeekTime, setProgressSeekTime] = useState<number>();
	const { BrightcoveDataModule } = NativeModules;

	const toggleScreen = async () => {
		const _seekTime = await BrightcoveDataModule.getVideoProgress();
		setProgressSeekTime(_seekTime);
		setFullscreen((prev) => !prev);
	};

	const { width, height } = useWindowDimensions();

	const videoHeight = useMemo(
		() => (width > height ? height : height * 0.25),
		[width, height],
	);

	const agenda =
		videoProgramDetails?.userEvent?.workshopSession?.agenda?.agenda ??
		videoProgramDetails?.userEvent?.session?.agenda?.agenda ??
		"";

	const renderVideoPlayer = useCallback(
		() => (
			<RNVideoPlayer
				isProgram={isProgram}
				isFullscreen={isFullscreen}
				isFromLandscape
				brightCoveId={selectedBrightCoveId}
				brightcoveIdArray={
					isBrightCoveIdArray ? brightcoveIds : [brightCoveId]
				}
				learningPathId={learningPathId}
				assetCode={assetCode}
				superAssetCode={superAssetCode}
				courseId={courseId}
				segmentId={segmentId}
				sessionId={sessionId}
				moduleId={moduleId}
				transcriptSeekTime={transcriptSeekTime}
				transcriptTimeList={transcriptTimeList}
				toggleVideosResponseModal={toggleVideosResponseModal}
				handleTranscriptItemHighlight={handleTranscriptItemHighlight}
				onIOSFullscreenChange={toggleScreen}
				progressSeekTime={progressSeekTime}
				onMultiVideoChange={onMultiVideoChange}
			/>
		),
		[
			isProgram,
			selectedBrightCoveId,
			isBrightCoveIdArray,
			brightcoveIds,
			brightCoveId,
			learningPathId,
			assetCode,
			superAssetCode,
			courseId,
			segmentId,
			sessionId,
			moduleId,
			transcriptSeekTime,
			transcriptTimeList,
		],
	);

	return (
		<ScrollView style={styles.container}>
			<VideoHeading
				data={videoProgramDetails}
				toggleChatVisibility={toggleChatVisibility}
			/>
			{isFullscreen ? (
				<Modal
					key={`fullscreen-modal-${selectedBrightCoveId}`}
					animationType="slide"
					visible
					transparent={false}
					statusBarTranslucent
					hardwareAccelerated
					presentationStyle="fullScreen"
					supportedOrientations={["portrait", "landscape"]}
				>
					<SafeAreaView style={styles.modalContainer}>
						{renderVideoPlayer()}
					</SafeAreaView>

					<BottomSessionVideoList
						videoData={videoData}
						isMultipleVideosModalVisible={
							isMultipleVideosModalVisible
						}
						toggleVideosResponseModal={toggleVideosResponseModal}
						selectedBrightCoveId={selectedBrightCoveId}
						handleSelectVideo={handleSelectVideo}
					/>
				</Modal>
			) : (
				<View style={[styles.video, { height: videoHeight }]}>
					{renderVideoPlayer()}
				</View>
			)}

			{isBrightCoveIdArray && brightcoveIds?.length > 1 && (
				<SessionVideoList
					videoData={videoData}
					selectedBrightCoveId={selectedBrightCoveId}
					handleSelectVideo={handleSelectVideo}
				/>
			)}

			<TranscriptTabs
				agenda={agenda}
				transcriptsData={transcriptsData}
				highLightIndex={highLightIndex}
				handleKeyMovementClick={onTranscriptSeekTimeChange}
			/>

			<ChatConversation
				onClose={toggleChatVisibility}
				isVisible={isChatVisible}
				currentUserId={authUser ?? ""}
				messages={chatMessages || []}
				handleLoadMoreMessages={handleLoadMoreMessages}
			/>
			{Platform.OS === "android" && (
				<BottomSessionVideoList
					videoData={videoData}
					isMultipleVideosModalVisible={isMultipleVideosModalVisible}
					toggleVideosResponseModal={toggleVideosResponseModal}
					selectedBrightCoveId={selectedBrightCoveId}
					handleSelectVideo={handleSelectVideo}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: verticalScale(20),
		paddingHorizontal: verticalScale(15),
	},
	modalContainer: {
		backgroundColor: neutral.black,
		flex: 1,
	},
	video: {
		borderRadius: horizontalScale(10),
		overflow: "hidden",
		width: "100%",
	},
});

export default LandscapePlayer;
