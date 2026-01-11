import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useCallback, useMemo, useState } from "react";

import { ToastType, useToast } from "@components/Reusable/Toast";
import { IUseContainer6Component } from "@components/studyPlan/container6/Container6Component/container6Component.interface";
import useContainer6ComponentModel from "@components/studyPlan/container6/Container6Component/useContainer6ComponentModel";

import useGetTimezone from "@hooks/useGetTimezone";

import { IHomeStackNativeNavigationProp } from "@navigation/navigators/homeNavigator/homeNavigator.interface";
import { ROOT_ROUTES } from "@navigation/routes";
import HOME_ROUTES from "@navigation/routes/home.routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { AssetLockType, LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

import { strings } from "@assets/strings";

type IHandlePrevNextAssetPressAsset = {
	asset: string;
	level1: string | null;
	level2: string | null;
	level3: string | null;
	level4: string | null;
	elective?: string;
	electiveGroup?: string;
	track?: string;
	trackGroup?: string;
	assetDoc: {
		code: string;
		name: string;
		assetType: {
			type: IAssetType;
		};
	};
} | null;

const useContainer6ComponentController = ({
	assetCode,
	learningPathType,
	learningPathCode,
	learningPathId,
	learningPathName,
	assetBasicDetails,
	refetchAssetBasicDetails,
	workshopId,
	courseId,
	moduleId,
	segmentId,
	sessionId,
	workshopCode,
	userProgramId,
	learningPathDetails,
	translationData,
	languageSwitcher,
}: IUseContainer6Component) => {
	const {
		createBookmark,
		deleteBookmark,
		updateProgramAssetSpendTime,
		updateCourseAssetSpendTime,
	} = useContainer6ComponentModel();

	const { name: userTimezone } = useGetTimezone();
	const navigation = useAppNavigation();
	const homeNavigation = useNavigation<IHomeStackNativeNavigationProp>();

	const { showToast } = useToast();

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const [bookmarkLoading, setBookmarkLoading] = useState(false);
	const [
		isLastAssetCompletionModalVisible,
		setIsLastAssetCompletionModalVisible,
	] = useState(false);
	const [assetStartTime, setAssetStartTime] = useState(
		moment().tz(userTimezone).toISOString(),
	);

	const totalTimeSpent = assetBasicDetails?.timeSpent;

	const updateAssetTime = useCallback(() => {
		if (totalTimeSpent === undefined) return;

		const endTime = moment().tz(userTimezone);
		const start = moment(assetStartTime).tz(userTimezone);

		const timeSpentInSeconds = endTime.diff(start, "seconds");

		const data = { timeSpent: timeSpentInSeconds + totalTimeSpent };

		const baseWhere = {
			asset: assetCode,

			...(courseId && { level1: courseId }),
			...(moduleId && { level2: moduleId }),
			...(sessionId && { level3: sessionId }),
			...(segmentId && { level4: segmentId }),
		};
		if (isProgram) {
			updateProgramAssetSpendTime({
				variables: {
					data,
					where: { ...baseWhere, userProgram: learningPathId },
				},
			});
		} else {
			updateCourseAssetSpendTime({
				variables: {
					data,
					where: { ...baseWhere, userCourse: learningPathId },
				},
			});
		}

		setAssetStartTime(moment().tz(userTimezone).toISOString());
	}, [
		totalTimeSpent,
		assetStartTime,
		isProgram,
		updateProgramAssetSpendTime,
		updateCourseAssetSpendTime,
		assetCode,
		learningPathId,
		setAssetStartTime,
		courseId,
		moduleId,
		sessionId,
		segmentId,
	]);

	const isBookmarked = useMemo(
		() => assetBasicDetails?.isBookMarked,
		[assetBasicDetails?.isBookMarked],
	);

	const assetTitle = useMemo(
		() => assetBasicDetails?.aliasName || assetBasicDetails?.asset?.name,
		[assetBasicDetails?.aliasName, assetBasicDetails?.asset?.name],
	);

	const nextAsset = useMemo(
		() => assetBasicDetails?.nextAsset,
		[assetBasicDetails?.nextAsset],
	);

	const prevAsset = useMemo(
		() => assetBasicDetails?.previousAsset,
		[assetBasicDetails?.previousAsset],
	);

	const assetType = useMemo(
		() => assetBasicDetails?.asset?.assetType?.type as IAssetType,
		[assetBasicDetails?.asset?.assetType?.type],
	);

	const recallQuizCode = useMemo(
		() => assetBasicDetails?.asset?.recallQuiz,
		[assetBasicDetails?.asset?.recallQuiz],
	);

	const assessmentCode = useMemo(
		() => assetBasicDetails?.asset?.assessment,
		[assetBasicDetails?.asset?.assessment],
	);

	const isOptional = useMemo(
		() =>
			isProgram
				? assetBasicDetails?.isOptional
				: learningPathDetails?.isOptional,
		[
			isProgram,
			assetBasicDetails?.isOptional,
			learningPathDetails?.isOptional,
		],
	);

	const assetLocked = useMemo(
		() => assetBasicDetails?.enableLock,
		[assetBasicDetails?.enableLock],
	);

	const assetAvailableTill = useMemo(
		() => assetBasicDetails?.availableTill,
		[assetBasicDetails?.availableTill],
	);

	const availableFrom = useMemo(
		() => assetBasicDetails?.startsAt,
		[assetBasicDetails?.startsAt],
	);

	const workshop = useMemo(
		() => learningPathDetails?.workshop,
		[learningPathDetails?.workshop],
	);

	const learningPathStartDate = useMemo(
		() => workshop?.contentStartsAt || workshop?.startsAt || "",
		[workshop?.contentStartsAt, workshop?.startsAt],
	);

	const assetLockedType = useMemo(() => {
		if (!assetAvailableTill && !availableFrom)
			return AssetLockType.PREVIOUS_INCOMPLETE_ASSET;
		else
			return assetAvailableTill
				? AssetLockType.PAST_DEADLINE_ASSET
				: AssetLockType.YET_TO_START_ASSET;
	}, [assetAvailableTill, availableFrom]);

	const assetLockedDate = useMemo(
		() => assetAvailableTill || availableFrom,
		[assetAvailableTill, availableFrom],
	);

	const handleBookmarkPress = () => {
		if (bookmarkLoading) return;

		setBookmarkLoading(true);
		const where = {
			asset: assetCode,
			...(isProgram
				? { userProgram: learningPathId }
				: { userCourse: learningPathId }),
		};

		const handleBookmarkCompleted = async (createdBookmark: boolean) => {
			await refetchAssetBasicDetails();
			setBookmarkLoading(false);

			showToast({
				message: createdBookmark
					? strings.BOOKMARK_ADDED
					: strings.BOOKMARK_DELETED,
				type: ToastType.SUCCESS,
			});
		};

		if (isBookmarked)
			deleteBookmark({
				variables: { where },
				onCompleted: () => handleBookmarkCompleted(false),
			});
		else
			createBookmark({
				variables: { where },
				onCompleted: () => handleBookmarkCompleted(true),
			});
	};

	const handlePrevNextAssetPress = (
		asset: IHandlePrevNextAssetPressAsset,
	) => {
		if (!asset) return;

		updateAssetTime();

		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.Container6Screen,
			params: {
				learningPathName,
				learningPathType,
				learningPathId,
				learningPathCode,
				assetCode: asset.assetDoc?.code || asset.asset,
				courseId: asset.level1 || null,
				moduleId: asset.level2 || null,
				sessionId: asset.level3 || null,
				segmentId: asset.level4 || null,
				ispostSubmission: false,
				elective: asset.elective || "",
				electiveGroup: asset.electiveGroup || "",
				track: asset.track || "",
				trackGroup: asset.trackGroup || "",
				workshopId,
				workshopCode,
				userProgramId,
				assetType:
					asset.assetDoc?.assetType?.type || IAssetType.ASSESSMENT,
			},
		});
	};

	const handleNextAssetPress = () => {
		if (!nextAsset) setIsLastAssetCompletionModalVisible(true);
		handlePrevNextAssetPress(nextAsset);
	};

	const handlePrevAssetPress = () => {
		if (!prevAsset) return;

		handlePrevNextAssetPress(prevAsset);
	};

	const handleLastAssetCompletionModalClose = useCallback(
		() => setIsLastAssetCompletionModalVisible(false),
		[],
	);

	const handleNavigateToStudyPlan = useCallback(() => {
		homeNavigation.popTo(HOME_ROUTES.Container2Screen, {
			learningPathType,
			learningPathId,
			learningPathName,
			learningPathCode,
			workshopId,
			workshopCode,
		});
	}, [navigation]);

	// const loading = courseAssetLoading || programAssetLoading || isLoading;

	const hideNextAsset = useMemo(() => !nextAsset, [nextAsset]);
	const hidePrevAsset = useMemo(() => !prevAsset, [prevAsset]);

	return {
		recallQuizCode,
		assessmentCode,
		assetLocked,
		assetLockedDate,
		assetLockedType,
		isBookmarked,
		handleBookmarkPress,
		assetTitle,
		// loading: assetBasicDetailsLoading,
		isOptional,
		assetType,
		handleNextAssetPress,
		handlePrevAssetPress,
		hideNextAsset,
		hidePrevAsset,
		learningPathStartDate,
		isLastAssetCompletionModalVisible,
		handleLastAssetCompletionModalClose,
		handleNavigateToStudyPlan,
		translationData,
		languageSwitcher,
	};
};

export default useContainer6ComponentController;
