import * as Clarity from "@microsoft/react-native-clarity";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, NativeModules, Platform } from "react-native";
import { useSelector } from "react-redux";

import useVideoAssetModel from "@components/Reusable/Video/useVideoModel";

import { IUpdateAssetSeekTimeVariablesForUserCourse } from "@graphql/mutation/asset/video/updateAssetSeekTimeCourse";
import { IUpdateAssetSeekTimeVariablesForUserProgram } from "@graphql/mutation/asset/video/updateAssetSeekTimeProgram";
import {
	IupdateSubAssetForUserCourseQueryVariables,
	IupdateSubAssetForUserProgramQueryVariables,
} from "@graphql/mutation/asset/video/updateSubAssetStatus";
import { IUpdateVideoProgressStatusQueryVariables } from "@graphql/mutation/asset/video/updateVideoProgressCourseStatus";
import { IUpdateVideoProgressProgramStatusQueryVariables } from "@graphql/mutation/asset/video/updateVideoProgressProgramStatus";

import useAppState from "@hooks/useAppState";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

interface IModalAssetOpen {
	input: {
		recallQuiz: string;
		meta: {
			asset: string;
			user: string;
			course?: string | null;
			userCourse?: string | null;
			program?: string | null;
			userProgram?: string | null;
			workshop: string | null;
			learnerCourse: string;
			deliveryType: string;
		};
	};
	question?: string | undefined;
	isScreenModel: boolean;
	assetType: string;
	learningPathType: string;
	parentAssetCode: string;
	assetName: string;
	status: string;
}

interface IVideoAssetControllerProps {
	seekTime: number;
	brightCoveId: string | undefined;
	status: string | undefined;
	moveToPortraitMode?: () => void;
	assetCode: string;
	learningPathId: string;
	superAssetCode?: string | undefined;
	isProgram: boolean;
	isOptional: boolean;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	closeVideoNewModal?: () => void;
}

interface StatusUpdate {
	asset: string;
	learningPathId: string;
	superAssetCode?: string; // Optional property
}

interface IMediaPlayerConfig {
	audioLanguage: string;
	playbackSpeed: number;
	volume: number;
	videoQuality: number;
}

const DEFAULT_MEDIA_CONFIG: IMediaPlayerConfig = {
	audioLanguage: "en",
	playbackSpeed: 1.0,
	volume: 0,
	videoQuality: 0,
};

const useVideoAssetController = ({
	status,
	seekTime,
	assetCode,
	learningPathId,
	superAssetCode,
	isProgram,
	courseId,
	moduleId,
	segmentId,
	sessionId,
	brightCoveId,
}: IVideoAssetControllerProps) => {
	const navigation = useNavigation<RootHomeStackList>();
	const userId =
		useSelector((state: RootState) => state.user?.user?.id) ?? "";
	const [statusUpdate, setStatusUpdate] = useState<StatusUpdate[]>([]);
	const [loadedSubAssets, setLoadedSubAssets] = useState<number[]>([]);
	const [mediaPlayerConfig, setMediaplayerConfig] =
		useState(DEFAULT_MEDIA_CONFIG);
	const { BrightcoveDataModule } = NativeModules;

	const [selectedBrightCoveId, setSelectedBrightCoveId] = useState<
		string | ""
	>();

	const [assetVideoProgressTime, setAssetVideoProgressTime] = useState(0);

	const [isVideoLandScape, setVideoLandscape] = useState(false);
	const playerRef = useRef(null);
	const [isMultilingualVisible, setMultilingualVisible] = useState(false);
	const [highLightIndex, setHighLightIndex] = useState(-1);
	const [assetVideoTranscriptSeekTime, setAssetVideoTranscriptSeekTime] =
		useState<number>();
	const [isTranscriptsVisible, setIsTranscriptsVisible] = useState(false);

	const [openModalData, setIsVideoAssetsModal] = useState<IModalAssetOpen>({
		input: {
			recallQuiz: "",
			meta: {
				asset: "",
				user: "",
				...(isProgram
					? {
							program: "",
							userProgram: "",
						}
					: { course: "", userCourse: "" }),
				workshop: "",
				learnerCourse: "",
				deliveryType: "",
			},
		},
		parentAssetCode: "",
		assetName: "",
		assetType: "",
		status: "",
		isScreenModel: false,
		learningPathType: isProgram
			? LearningPathType.PROGRAM
			: LearningPathType.COURSE,
	});

	const [isMultipleVideosModalVisible, setMultipleVideosModalVisible] =
		useState(false);

	const toggleVideosResponseModal = () => {
		setMultipleVideosModalVisible((prev) => !prev);
	};

	const {
		getuserMediaPrefrence,
		userVideoPrefrences,
		updateMediaPlayerConfig,
		updateSeekTimeProgram,
		updateSeekTimeCourse,
		updateVideoProgressProgramStatus,
		updateVideoCourseStatus,
		getVideoAssetsFromProgram,
		videoAssetsFromProgramData,
		updateSubAssetprogramCodeStatus,
		updateSubAssetcourseCodeStatus,
		getVideoAssetsFromCourse,
		videoAssetsFromCourseData,
		transcriptsData,
		getKeyMovementTranscriptDetails,
	} = useVideoAssetModel();

	useEffect(() => {
		setSelectedBrightCoveId(brightCoveId);
		fetchKeyMovementTranscriptsDetails(brightCoveId || "");
	}, [brightCoveId]);

	useEffect(() => {
		getuserMediaPrefrence({
			variables: {
				where: {
					user: userId,
					mediaProvider: "Brightcove",
				},
			},
		});
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	const backAction = () => {
		const { height, width: windowWidth } = Dimensions.get("window");
		const isLandscapeOrientation = windowWidth > height;
		if (isLandscapeOrientation) {
			navigateToBackScreen();
		} else {
			navigation.goBack();
		}
		return true;
	};

	useEffect(() => {
		const { playbackSpeed, volume, videoQuality, audioLanguage } =
			userVideoPrefrences?.userMediaPlayerPreference || {};
		setMediaplayerConfig({
			audioLanguage: audioLanguage || DEFAULT_MEDIA_CONFIG.audioLanguage,
			playbackSpeed: playbackSpeed || DEFAULT_MEDIA_CONFIG.playbackSpeed,
			volume: volume ?? DEFAULT_MEDIA_CONFIG.volume,
			videoQuality: videoQuality ?? DEFAULT_MEDIA_CONFIG.videoQuality,
		});
	}, [userVideoPrefrences]);
	const videoProgramData = isProgram
		? videoAssetsFromProgramData?.getAssetFromUserProgram
		: videoAssetsFromCourseData?.getAssetFromUserCourse;

	const subAssets = isProgram
		? videoAssetsFromProgramData?.getAssetFromUserProgram?.asset?.video
				?.subAssets || []
		: videoAssetsFromCourseData?.getAssetFromUserCourse?.asset?.video
				?.subAssets || [];

	const currentvideoStatus = statusUpdate?.find(
		(i) => i.asset === assetCode && i.learningPathId === learningPathId,
	);

	const _status = currentvideoStatus
		? IAssetStatusEnum.completed
		: status || "";

	const closeVideoNewModal = () => {
		setIsVideoAssetsModal((prev) => ({
			...prev,
			isScreenModel: false,
		}));
	};

	const handleModalBackPress = () => {
		closeVideoNewModal();
		navigateToBackScreen();
	};

	const navigateToBackScreen = () => {
		setVideoLandscape(true);
	};

	const triggerHighlightAlert = useCallback(
		(point: number, name: string, asset: any) => {
			const payload = {
				isScreenModel: true,
				...(asset?.classOpinion && {
					question: asset?.classOpinion?.question,
					minWordCount: asset?.classOpinion?.minWordCount,
					maxWordCount: asset?.classOpinion?.maxWordCount,
				}),
				assetType: asset.assetType.type,
				status: _status,
				learningPathType: isProgram
					? LearningPathType.PROGRAM
					: LearningPathType.COURSE,
				parentAssetCode: videoProgramData?.asset?.code,
				assetName: name || videoProgramData?.asset?.name,
				input: {
					...(IAssetType.RECALL_QUIZ === asset.assetType.type && {
						recallQuiz: asset.recallQuiz,
					}),
					meta: {
						user: videoProgramData?.userProgram?.user?.id,
						...(isProgram
							? {
									program: videoProgramData?.userProgram?.id,
									userProgram:
										videoProgramData?.userProgram?.program
											?.code,
									workshop:
										videoProgramData?.userProgram?.workshop
											?.id,
								}
							: { course: "", userCourse: "" }),
						learnerCourse: isProgram
							? videoProgramData?.userProgram?.id
							: videoProgramData?.userCourse?.id,
						deliveryType:
							videoProgramData?.userProgram?.deliveryType?.id,
						asset: asset.code,
					},
				},
			};

			setIsVideoAssetsModal(payload);
		},
		[videoProgramData, seekTime],
	);

	const handleInVideoAsset = (progress: number) => {
		const normalizeTime = (time: number) =>
			Platform.OS === "android" ? time * 1000 : time;

		subAssets.forEach(({ asset, loadAt }) => {
			if (!asset) return;
			const { name } = asset;
			const normalizedProgress = progress;
			const start = normalizeTime(loadAt - 1);
			const end = normalizeTime(loadAt + 3);

			if (normalizedProgress >= start && normalizedProgress < end) {
				triggerHighlightAlert(loadAt, name, asset);
			}
		});
	};

	useEffect(() => {
		if (subAssets && Array.isArray(subAssets)) {
			subAssets.forEach((subAsset: { loadAt: number }) => {
				setLoadedSubAssets((prev) => {
					return [...prev, subAsset.loadAt];
				});
			});
		}
	}, [subAssets]);

	const closeModal = async (response?: string) => {
		const variables = {
			data: {
				status: IAssetStatusEnum.completed,
				...(response && { response: response }),
			},
			where: {
				asset: openModalData?.parentAssetCode,
				subAsset: openModalData?.input?.meta?.asset,
				...(isProgram
					? {
							userProgram:
								openModalData?.input?.meta?.learnerCourse,
							...(superAssetCode && {
								superAssetCode: superAssetCode,
							}),
						}
					: {
							userCourse:
								openModalData?.input?.meta?.learnerCourse,
						}),
			},
		};
		isProgram
			? await updateSubAssetprogramCodeStatus({
					variables:
						variables as IupdateSubAssetForUserProgramQueryVariables,
				})
			: await updateSubAssetcourseCodeStatus({
					variables:
						variables as IupdateSubAssetForUserCourseQueryVariables,
				});

		setIsVideoAssetsModal({ ...openModalData, isScreenModel: false });
	};

	useEffect(() => {
		Clarity.pause();
		return () => {
			Clarity.resume();
			sendSeekTimeToServer();
		};
	}, []);

	const sendSeekTimeToServer = async () => {
		if (!learningPathId) return;

		try {
			if (_status === IAssetStatusEnum.completed) return;

			const _seekTime = await BrightcoveDataModule.getVideoProgress();
			const whereClause = {
				asset: assetCode,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
				...(superAssetCode && { superAssetCode }),
				...(courseId && { level1: courseId }),
				...(moduleId && { level2: moduleId }),
				...(sessionId && { level3: sessionId }),
				...(segmentId && { level4: segmentId }),
			};

			const variables = {
				data: { seekTime: _seekTime },
				where: whereClause,
			};

			if (isProgram) {
				await updateSeekTimeProgram({
					variables:
						variables as IUpdateAssetSeekTimeVariablesForUserProgram,
				});
			} else {
				await updateSeekTimeCourse({
					variables:
						variables as IUpdateAssetSeekTimeVariablesForUserCourse,
				});
			}
		} catch (error) {
			console.error("API Error:", error);
		}
	};

	const getVideoAssetDetails = async () => {
		if (!learningPathId) return;
		const whereVariables = {
			asset: assetCode ?? null,
			level1: courseId ?? null,
			level2: moduleId ?? null,
			...(isProgram && {
				level3: sessionId ?? null,
				level4: segmentId ?? null,
			}),
		};

		if (isProgram)
			await getVideoAssetsFromProgram({
				variables: {
					where: {
						...whereVariables,
						userProgram: learningPathId,
					},
				},
			});
		else
			await getVideoAssetsFromCourse({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
	};

	// Callback to run when app goes to background
	const handleBackground = () => {
		sendSeekTimeToServer();
	};

	useAppState({ handleBackground });

	useFocusEffect(
		useCallback(() => {
			const handleScreenFocus = async () => {
				await getVideoAssetDetails();
			};
			handleScreenFocus();
			return () => {
				// Cleanup function
			};
		}, [_status]),
	);

	const updateVideoCompleteStatus = async () => {
		if (!assetCode || !learningPathId) return;
		const variables = {
			where: {
				asset: assetCode,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
				...(superAssetCode && { superAssetCode: superAssetCode }),
				...(courseId && { level1: courseId }),
				...(moduleId && { level2: moduleId }),
				...(sessionId && { level3: sessionId }),
				...(segmentId && { level4: segmentId }),
			},
			data: {
				status: IAssetStatusEnum.completed,
			},
		};
		setStatusUpdate((prevStatus) => [
			...prevStatus,
			{
				asset: assetCode,
				learningPathId: learningPathId,
				...(superAssetCode && { superAssetCode }),
			},
		]);
		if (isProgram)
			updateVideoProgressProgramStatus({
				variables:
					variables as IUpdateVideoProgressProgramStatusQueryVariables,
			});
		else
			updateVideoCourseStatus({
				variables:
					variables as IUpdateVideoProgressStatusQueryVariables,
			});
	};
	const videoMediaConfigSetup = ({
		volume,
		playbackSpeed,
		audioLanguage,
	}: {
		volume?: number;
		playbackSpeed?: number;
		audioLanguage?: string;
	}) => {
		const updatedFields: Record<string, any> = {};
		const mediaplayerData = { ...mediaPlayerConfig };

		if (volume !== undefined) {
			mediaplayerData.volume = volume;
			updatedFields.volume = volume;
		}

		if (playbackSpeed !== undefined) {
			mediaplayerData.playbackSpeed = playbackSpeed;
			updatedFields.playbackSpeed = playbackSpeed;
		}

		if (audioLanguage !== undefined) {
			mediaplayerData.audioLanguage = audioLanguage;
			updatedFields.audioLanguage = audioLanguage;
		}
		if (Object.keys(updatedFields).length > 0) {
			updateMeidaPlayer(updatedFields);
			setMediaplayerConfig(mediaplayerData);
		}
	};

	// update volue media player api
	const updateMeidaPlayer = async (data: Record<string, any>) => {
		await updateMediaPlayerConfig({
			variables: {
				data: {
					mediaProvider: "Brightcove",
					...data,
				},
				where: {
					mediaProvider: "Brightcove",
					user: userId,
				},
			},
		});
	};

	const fetchKeyMovementTranscriptsDetails = useCallback(
		async (brightCoveIdParam: string) => {
			await getKeyMovementTranscriptDetails({
				variables: {
					where: {
						brightcove: brightCoveIdParam || "",
					},
				},
			});
		},
		[selectedBrightCoveId],
	);

	const handleSelectedMultilingualLang = useCallback(async (id: string) => {
		const _seekTime = await BrightcoveDataModule.getVideoProgress();
		setAssetVideoProgressTime(_seekTime);
		setSelectedBrightCoveId(id);
		fetchKeyMovementTranscriptsDetails(id || "");
		toggleMultilingualLang();
	}, []);

	const toggleMultilingualLang = useCallback(() => {
		setMultilingualVisible((prev) => !prev);
	}, []);

	const handleAssetVideoTranscriptItemHighlight = useCallback(
		(timeIndex: number) => {
			setHighLightIndex(timeIndex);
		},
		[],
	);

	const onTranscriptSeekTimeChange = useCallback((time: number) => {
		setAssetVideoTranscriptSeekTime(time);
	}, []);

	const toggleTranscriptsList = useCallback((b: boolean) => {
		setIsTranscriptsVisible(b);
	}, []);

	return {
		playerRef,
		statusUpdate,
		mediaPlayerConfig,
		_status,
		subAssets,
		videoProgramData,
		closeModal,
		openModalData,
		setIsVideoAssetsModal,
		closeVideoNewModal,
		toggleVideosResponseModal,
		isMultipleVideosModalVisible,
		loadedSubAssets,
		isVideoLandScape,
		handleInVideoAsset,
		videoMediaConfigSetup,
		updateVideoCompleteStatus,
		handleModalBackPress,
		navigateToBackScreen,
		sendSeekTimeToServer,
		handleSelectedMultilingualLang,
		selectedBrightCoveId,
		assetVideoProgressTime,
		isMultilingualVisible,
		toggleMultilingualLang,
		highLightIndex,
		handleAssetVideoTranscriptItemHighlight,
		transcriptsData,
		onTranscriptSeekTimeChange,
		assetVideoTranscriptSeekTime,
		isTranscriptsVisible,
		toggleTranscriptsList,
	};
};

export default useVideoAssetController;
