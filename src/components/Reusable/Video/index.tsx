import React, { useCallback, useMemo } from "react";
import {
	Platform,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import { requireNativeComponent } from "react-native";

import RNText from "@components/Reusable/RNText";
import Multilingual from "@components/Reusable/Video/Common/Multilingual";
import TranscriptList from "@components/Reusable/Video/Common/TranscriptList";
import useVideoAssetController from "@components/Reusable/Video/useVideoController";
import VideoAssetsModal from "@components/Reusable/Video/videoAssetsModal";
import WatchedVideoTag from "@components/Reusable/Video/WatchedVideoTag";

import { IMultilingualVideo } from "@graphql/query/asset/video/getMultilingualDataQuery";

import { horizontalScale, verticalScale } from "@utils/functions";

import { ENV } from "@config/env";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import {
	ArrowDownSmIcon,
	CloseIcon,
	LanguageIcon,
	TranscriptsIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { regular, sm } = commonStyles.text;

// Load native Brightcove player
const BrightcovePlayerView = requireNativeComponent(
	"BrightcovePlayerNativeDRM",
);

const STRINGS = createStringConstants({
	TRANSCRIPTS: "studyPlan.container6.transcript.transcripts",
});
interface RNVideoPlayerProps {
	seekTime: number;
	brightCoveId?: string;
	status?: string;
	isFullscreen?: boolean;
	assetCode: string;
	learningPathId: string;
	superAssetCode?: string;
	moveToPortraitMode?: () => void;
	isProgram: boolean;
	isOptional: boolean;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	toggleVideosResponseModal: () => void;
	playNext: () => void;
	playPrevious: () => void;
	previousVideoColor: string;
	nextVideoColor: string;
	previousVideoDisabled: boolean;
	nextVideoDisabled: boolean;
	brightcoveIdArray?: string[];
	transcriptTimeList?: string[];
	transcriptSeekTime?: number;
	handleTranscriptItemHighlight?: (timeIndex: number) => void;
	multilingualVideoData?: IMultilingualVideo[];
	onIOSFullscreenChange?: () => void;
	progressSeekTime: number | undefined;
	isFromLandscape?: boolean;
	onMultiVideoChange?: (selectedBrightCoveId: string) => void;
}

const RNVideoPlayer: React.FC<RNVideoPlayerProps> = ({
	seekTime,
	brightCoveId,
	status,
	isFullscreen,
	assetCode,
	learningPathId,
	superAssetCode,
	isProgram,
	isOptional,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	transcriptTimeList,
	transcriptSeekTime,
	moveToPortraitMode,
	toggleVideosResponseModal,
	brightcoveIdArray,
	handleTranscriptItemHighlight,
	multilingualVideoData,
	onIOSFullscreenChange,
	progressSeekTime,
	isFromLandscape,
	onMultiVideoChange,
}) => {
	const { width, height } = useWindowDimensions();

	const {
		_status,
		openModalData,
		closeModal,
		closeVideoNewModal,
		loadedSubAssets,
		handleInVideoAsset,
		mediaPlayerConfig,
		videoMediaConfigSetup,
		updateVideoCompleteStatus,
		isVideoLandScape,
		playerRef,
		handleModalBackPress,
		sendSeekTimeToServer,
		selectedBrightCoveId,
		handleSelectedMultilingualLang,
		assetVideoProgressTime,
		isMultilingualVisible,
		toggleMultilingualLang,
		handleAssetVideoTranscriptItemHighlight,
		highLightIndex,
		transcriptsData,
		onTranscriptSeekTimeChange,
		assetVideoTranscriptSeekTime,
		toggleTranscriptsList,
		isTranscriptsVisible,
		videoProgramData,
	} = useVideoAssetController({
		brightCoveId,
		seekTime,
		status,
		moveToPortraitMode,
		assetCode,
		learningPathId,
		superAssetCode,
		isProgram,
		isOptional,
		courseId,
		moduleId,
		sessionId,
		segmentId,
	});

	const handlePauseVideo = useCallback(
		(event: { nativeEvent: { pauseVideoTime: number } }) => {
			handleInVideoAsset(event.nativeEvent.pauseVideoTime);
		},
		[handleInVideoAsset],
	);

	const handleVolumeChange = useCallback(
		(event: { nativeEvent: { mute: number } }) => {
			const rawVolume = event.nativeEvent.mute;
			const normalizedVolume =
				Platform.OS === "android"
					? Math.round(Math.min(rawVolume / 15, 1) * 100)
					: Math.round(Math.min(rawVolume, 1) * 100);

			videoMediaConfigSetup({ volume: normalizedVolume });
		},
		[videoMediaConfigSetup],
	);

	const handleAudioTrackChange = useCallback(
		(event: { nativeEvent: { audioTrack: string } }) => {
			videoMediaConfigSetup({
				audioLanguage: event.nativeEvent.audioTrack,
			});
		},
		[videoMediaConfigSetup],
	);

	const handleSpeedRateChange = useCallback(
		(event: { nativeEvent: { playSpeedRate: string } }) => {
			const rawRate = event.nativeEvent.playSpeedRate;
			const numericRate = parseFloat(String(rawRate).replace(/x$/i, ""));
			videoMediaConfigSetup({ playbackSpeed: numericRate });
		},
		[videoMediaConfigSetup],
	);

	const videoHeight = useMemo(
		() => (width > height ? height : height * 0.25),
		[width, height],
	);

	const videoSeekTime = isFromLandscape
		? progressSeekTime
		: assetVideoProgressTime
			? assetVideoProgressTime
			: seekTime;

	const selectedLang = useMemo(() => {
		return multilingualVideoData?.find(
			(item) => item.brightcoveId === selectedBrightCoveId,
		)?.language?.name;
	}, [multilingualVideoData, selectedBrightCoveId]);

	const assetVideoTranscriptTimeList = useMemo(() => {
		return (
			transcriptsData?.transcript?.transcription?.map(
				(item) => item.start,
			) || []
		);
	}, [transcriptsData]);

	const handleTranscriptHighlight = (index: number) => {
		if (isFromLandscape) {
			handleTranscriptItemHighlight?.(index);
		} else {
			handleAssetVideoTranscriptItemHighlight(index);
		}
	};

	const hasMultipleLanguages = (multilingualVideoData?.length || 0) > 1;
	const hasTranscripts =
		(transcriptsData?.transcript?.transcription?.length || 0) > 0;

	const isTranscriptAndMultilingualAvailable =
		hasMultipleLanguages && hasTranscripts;
	const isLanguageAndTranscriptUnavailable =
		!hasMultipleLanguages && !hasTranscripts;
	const shouldShowTranscript =
		!isFromLandscape && !isLanguageAndTranscriptUnavailable;

	const displayLanguage = selectedLang || strings.LANGUAGE;

	const title = videoProgramData?.asset?.name || "";

	return (
		<View style={styles.container}>
			{/* Watched tag for completed videos (not in fullscreen) */}
			{!isFromLandscape && _status === IAssetStatusEnum.completed && (
				<WatchedVideoTag />
			)}

			{/* Main video container */}
			<View style={styles.container}>
				<View style={[styles.video, { height: videoHeight }]}>
					<BrightcovePlayerView
						ref={playerRef.current}
						style={styles.container}
						accountId={ENV.brightcoveAccountId}
						policyKey={ENV.brightcovePolicyKey}
						videoId={selectedBrightCoveId}
						brightcoveVideoIds={brightcoveIdArray}
						seekTime={videoSeekTime}
						transcriptSeekTime={
							isFromLandscape
								? transcriptSeekTime
								: assetVideoTranscriptSeekTime
						}
						isFullScreen={isFullscreen}
						isFromLandscape={isFromLandscape}
						moveToPortrait={isVideoLandScape}
						mute={mediaPlayerConfig?.volume}
						audioTrack={mediaPlayerConfig?.audioLanguage}
						playSpeedRate={`${mediaPlayerConfig?.playbackSpeed}x`}
						onMultiVideo={toggleVideosResponseModal}
						pauseVideoTimes={loadedSubAssets}
						onPauseVideo={handlePauseVideo}
						isVideoWatched={_status === IAssetStatusEnum.completed}
						handleVolumeChange={handleVolumeChange}
						handleAudioTrackChange={handleAudioTrackChange}
						handleSpeedRateChange={handleSpeedRateChange}
						transcriptTimeList={
							isFromLandscape
								? transcriptTimeList
								: assetVideoTranscriptTimeList
						}
						onVideoCompleted={updateVideoCompleteStatus}
						onTranscriptHighlight={(event) =>
							handleTranscriptHighlight(
								event.nativeEvent.highLightIndex,
							)
						}
						onVideoProgressChange={sendSeekTimeToServer}
						onIOSFullscreenChange={onIOSFullscreenChange}
						onMultiVideoChange={(event) =>
							onMultiVideoChange?.(
								event.nativeEvent.selectedBrightCoveId,
							)
						}
					/>
				</View>

				{shouldShowTranscript ? (
					<View
						style={[
							styles.languageContainer,
							isTranscriptAndMultilingualAvailable
								? styles.langWidth
								: null,
						]}
					>
						{hasMultipleLanguages ? (
							<Pressable
								onPress={toggleMultilingualLang}
								style={styles.button}
							>
								<LanguageIcon />
								<RNText
									title={displayLanguage}
									style={styles.languageText}
								/>
								<ArrowDownSmIcon color={neutral.black} />
							</Pressable>
						) : null}

						{hasTranscripts ? (
							<Pressable
								onPress={() => toggleTranscriptsList(true)}
								style={styles.button}
							>
								<TranscriptsIcon />
								<RNText
									title={getString(STRINGS.TRANSCRIPTS)}
									style={styles.languageText}
								/>
							</Pressable>
						) : null}
					</View>
				) : null}

				{hasTranscripts && isTranscriptsVisible ? (
					<View style={styles.transcriptContainer}>
						<Pressable
							onPress={() => toggleTranscriptsList(false)}
							style={styles.closeContainer}
						>
							<CloseIcon color={neutral.grey_06} />
						</Pressable>
						<TranscriptList
							isFromLandscape={isFromLandscape}
							title={title}
							highLightIndex={highLightIndex}
							transcriptsData={transcriptsData}
						/>
					</View>
				) : null}

				<Multilingual
					isVisible={isMultilingualVisible}
					data={multilingualVideoData}
					onSelectedMultilingualLang={handleSelectedMultilingualLang}
					selectedBrightCoveId={selectedBrightCoveId ?? ""}
					toggleMultilingualLang={toggleMultilingualLang}
				/>

				{openModalData?.isScreenModel ? (
					<VideoAssetsModal
						closeModal={closeModal}
						assetData={openModalData}
						closeVideoNewModal={closeVideoNewModal}
						isFullscreen={!!isFromLandscape}
						onBackPress={handleModalBackPress}
					/>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		columnGap: horizontalScale(5),
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(5),
	},
	closeContainer: {
		alignSelf: "flex-end",
		padding: horizontalScale(15),
	},
	container: {
		flex: 1,
	},
	langWidth: {
		width: "100%",
	},
	languageContainer: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(10),
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: verticalScale(10),
		padding: verticalScale(10),
	},
	languageText: {
		color: neutral.black,
		...regular,
		...sm,
		marginLeft: horizontalScale(5),
	},
	leftButton: {
		marginLeft: horizontalScale(20),
	},
	rightButton: {
		marginRight: horizontalScale(20),
	},
	transcriptContainer: {
		backgroundColor: highlight.bg_blue,
		borderRadius: horizontalScale(8),
		flex: 1,
		height: verticalScale(400),
		marginTop: verticalScale(10),
		overflow: "hidden",
	},
	video: {
		borderRadius: horizontalScale(10),
		flex: 1,
		overflow: "hidden",
		width: "100%",
	},
});

export default React.memo(RNVideoPlayer);
