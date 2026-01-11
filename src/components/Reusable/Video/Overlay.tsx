import React from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import Seeker from "@components/Reusable/Video/Seeker";
import { IPlayTypeProps } from "@components/Reusable/Video/useVideoController";

import {
	getVideoDuration,
	horizontalScale,
	verticalScale,
} from "@utils/functions";

import { IAssetStatusEnum } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import {
	AudioIcon,
	BackwardIcon,
	ForwardIcon,
	FullScreenIcon,
	MuteIcon,
	NextVideoIcon,
	PauseIcon,
	PlayRoundIcon,
	PreviousVideoIcon,
	SettingDisplayIcon,
	VideoLlistIcon,
	WatchAgainIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, bg } = colors;

const { sm } = commonStyles.text;

interface OverlayProps {
	isFullscreen: boolean;
	playType: IPlayTypeProps;
	IPlayType: { play: string; pause: string; replay: string };
	setPlayType: React.Dispatch<React.SetStateAction<IPlayTypeProps>>;
	nextMovevideo: (direction: "prev" | "forward") => void;
	videoRef: React.RefObject<any>;
	videoProgress: number;
	duration: number;
	isLoading: boolean;
	handleSeek: (time: number) => void;
	isSeeking: boolean;
	subAssets: any[];
	landscapeFullscreen: () => void;
	toggleVideoConfigModal: (isOpen: boolean) => void;
	showToastMessage: (isVisible: boolean) => void;
	isOptional: boolean;
	_status: string;
	setMuted: React.Dispatch<React.SetStateAction<boolean>>;
	muted: boolean;
	isSingleVideo: boolean;
	setIsTouchableLayer: React.Dispatch<React.SetStateAction<boolean>>;
	toggleVideosResponseModal: () => void;
	playPrevious: () => void;
	playNext: () => void;
	previousVideoColor: string;
	nextVideoColor: string;
	previousVideoDisabled: boolean;
	nextVideoDisabled: boolean;
}
const iconDimensionsFullscreen = {
	small: horizontalScale(25),
	medium: horizontalScale(35),
	large: horizontalScale(40),
	extraLarge: horizontalScale(45),
};

const iconDimensionsNormal = {
	small: horizontalScale(20),
	medium: horizontalScale(20),
	large: horizontalScale(20),
	extraLarge: horizontalScale(25),
};

const Overlay: React.FC<OverlayProps> = ({
	isFullscreen,
	playType,
	IPlayType,
	setPlayType,
	nextMovevideo,
	videoRef,
	videoProgress,
	duration,
	handleSeek,
	subAssets,
	landscapeFullscreen,
	toggleVideoConfigModal,
	showToastMessage,
	isOptional,
	_status,
	setMuted,
	muted,
	setIsTouchableLayer,
	isSingleVideo,
	toggleVideosResponseModal,
	playPrevious,
	playNext,
	previousVideoColor,
	nextVideoColor,
	previousVideoDisabled,
	nextVideoDisabled,
}) => {
	const toggleMuted = () => setMuted((prev) => !prev);
	const video_status = isOptional || _status === IAssetStatusEnum.completed;

	const iconDimensions = isFullscreen
		? iconDimensionsFullscreen
		: iconDimensionsNormal;

	const AudioIconComponent = muted ? MuteIcon : AudioIcon;
	const PlayPauseIconComponent =
		playType.type === IPlayType.play ? PauseIcon : PlayRoundIcon;

	return (
		<SafeAreaView style={styles.overlay}>
			<Pressable
				style={styles.container}
				onPress={() => setIsTouchableLayer(false)}
			>
				<Pressable
					onPress={() => {
						toggleVideoConfigModal(true);
					}}
					style={[
						styles.gearSettingBase,
						isFullscreen
							? styles.gearSettingFullscreen
							: styles.gearSettingNormal,
					]}
				>
					<SettingDisplayIcon
						width={iconDimensions.small}
						height={iconDimensions.small}
						color={neutral.white}
					/>
				</Pressable>

				<View
					style={[
						styles.halfVideoActions,
						{
							top: isFullscreen ? "40%" : "35%",
						},
					]}
				>
					{playType.type !== IPlayType.replay && (
						<>
							<Pressable
								style={styles.videoMediaButton}
								onPress={() => {
									nextMovevideo("prev");
								}}
							>
								<BackwardIcon
									width={iconDimensions.medium}
									height={iconDimensions.medium}
									color={neutral.white}
								/>
							</Pressable>

							<Pressable
								style={styles.videoMediaButton}
								onPress={() => {
									const value =
										playType.type === IPlayType.play
											? IPlayType.pause
											: IPlayType.play;
									setPlayType({ type: value });
								}}
							>
								<PlayPauseIconComponent
									width={iconDimensions.extraLarge}
									height={iconDimensions.extraLarge}
									color={neutral.white}
								/>
							</Pressable>

							<Pressable
								style={styles.videoMediaButton}
								onPress={() => {
									if (!video_status) {
										showToastMessage(true);
										return;
									}
									nextMovevideo("forward");
								}}
							>
								<ForwardIcon
									width={iconDimensions.medium}
									height={iconDimensions.medium}
									color={neutral.white}
								/>
							</Pressable>
						</>
					)}

					{playType.type === IPlayType.replay && (
						<Pressable
							style={styles.videoMediaButton}
							onPress={() => {
								videoRef.current?.seek(0);
								setPlayType({
									type: IPlayType.play,
								});
							}}
						>
							<WatchAgainIcon
								width={iconDimensions.medium}
								height={iconDimensions.medium}
								color={neutral.white}
							/>
							<RNText
								style={{ color: neutral.white }}
								title={strings.WATCH_AGAIN}
							/>
						</Pressable>
					)}
				</View>

				<View style={styles.videoBottomsettings}>
					<Seeker
						currentTime={videoProgress}
						duration={duration}
						videoSeek={handleSeek}
						subAssets={subAssets}
						customSeekbarStyles={{
							width: isFullscreen ? "100%" : "95%",
						}}
					/>

					<View style={styles.bottomVideooptions}>
						<RNText style={styles.durationText}>
							{`${getVideoDuration(videoProgress)} / ${getVideoDuration(duration)}`}
						</RNText>
						<View style={styles.timerViewStyle}>
							<View>
								<Pressable onPress={toggleMuted}>
									<AudioIconComponent
										width={iconDimensions.small}
										height={iconDimensions.small}
										color={neutral.white}
									/>
								</Pressable>
							</View>

							<View
								style={[
									styles.bottomMediaControls,
									isFullscreen && {
										marginRight: horizontalScale(5),
									},
								]}
							>
								{isFullscreen ? (
									!isSingleVideo ? (
										<View
											style={
												styles.multipleVideoContainer
											}
										>
											<Pressable
												style={styles.landscapeView}
												onPress={playPrevious}
												disabled={previousVideoDisabled}
											>
												<PreviousVideoIcon
													width={
														iconDimensions.extraLarge
													}
													height={
														iconDimensions.extraLarge
													}
													color={previousVideoColor}
												/>
											</Pressable>
											<Pressable
												style={styles.landscapeView}
												onPress={playNext}
												disabled={nextVideoDisabled}
											>
												<NextVideoIcon
													width={
														iconDimensions.extraLarge
													}
													height={
														iconDimensions.extraLarge
													}
													color={nextVideoColor}
												/>
											</Pressable>
											<Pressable
												style={styles.landscapeView}
												onPress={
													toggleVideosResponseModal
												}
											>
												<VideoLlistIcon
													width={iconDimensions.large}
													height={
														iconDimensions.large
													}
												/>
											</Pressable>
										</View>
									) : null
								) : null}
								<Pressable
									style={[
										styles.landscapeView,
										{ marginRight: 0 },
									]}
									onPress={landscapeFullscreen}
								>
									<FullScreenIcon
										width={iconDimensions.small}
										height={iconDimensions.small}
									/>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	bottomMediaControls: {
		flexDirection: "row",
	},

	bottomVideooptions: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(7),
		paddingHorizontal: horizontalScale(8),
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},

	durationText: {
		color: neutral.white,
		...sm,
		lineHeight: verticalScale(24),
		marginRight: horizontalScale(10),
	},
	gearSettingBase: {
		position: "absolute",
	},
	gearSettingFullscreen: {
		right: horizontalScale(15),
		top: horizontalScale(20),
	},
	gearSettingNormal: {
		right: horizontalScale(10),
		top: horizontalScale(15),
	},
	gearsettingIcon: { position: "absolute", right: "3%", top: "5%" },
	halfVideoActions: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		left: 0,
		position: "absolute",
		top: "40%",
		width: "100%",
	},

	landscapeView: {
		alignItems: "center",
		height: verticalScale(25),
		justifyContent: "center",
		marginRight: horizontalScale(10),
		width: horizontalScale(25),
	},

	multipleVideoContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	overlay: {
		backgroundColor: bg.fill.video,
		borderRadius: verticalScale(10),
		height: "100%",
		justifyContent: "center",
		left: 0,
		position: "absolute",
		top: 0,
		width: "100%",
		zIndex: 1,
	},
	timerViewStyle: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
	},
	videoBottomsettings: {
		bottom: 0,
		left: 0,
		position: "absolute",
		width: "100%",
	},

	videoMediaButton: {
		alignItems: "center",
		margin: verticalScale(8),
		padding: verticalScale(5),
	},
});

export default Overlay;
