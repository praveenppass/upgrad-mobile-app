import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMyProgramsModel from "@screens/Home/HomeTab/MyPrograms/useMyProgramsModel";

import useGetTimezone from "@hooks/useGetTimezone";
import useGetUserType from "@hooks/useGetUserType";

import { canOpenURL } from "@utils/functions";

import { storage } from "@config/mmkvStorage";

import { updateLastLoginUserDetails as updateLastLoginUserDetailsStore } from "@redux/slices/personalDetails.slice";
import { RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import {
	IHomeBannerAsset,
	IHomeBannerItem,
	IHomeBannerSession,
	IHomeBannerType,
} from "@interface/components/home/homeBanner.interface";
import {
	IHomeLearnerSessionResult,
	IHomeReferAndEarn,
	IHomeReferAndEarnPosition,
	IHomeSession,
} from "@interface/myPrograms.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import StorageKeys from "@constants/storage.constants";

export const WOOLF = "woolf";
export const REJOIN_DAYS = 20;

const useMyProgramsController = () => {
	const navigation = useNavigation<RootHomeStackList>();
	const [asset, setAsset] = useState<IHomeBannerAsset | null>(null);
	const { hasLearnCourses, hasUgCourses } = useGetUserType();
	const dispatch = useDispatch();
	const {
		sessionsData,
		sessionsLoading,
		getRefetchSession,
		assetData,
		assetLoading,
		getHomeLastAsset,
		ongoingCourses,
		ongoingCourseLoading,
		fetchMoreOngoingCourses,
		getOngoingCourse,
		completedCourses,
		completedCoursesLoading,
		fetchMoreCompletedCourses,
		completedRefetchCourse,
		markAttendanceForWorkShopSession,
		updateLastLoginUserDetails,
	} = useMyProgramsModel();

	const { id } = useSelector((state: RootState) => state.user.user);
	const { name: userTimezone } = useGetTimezone();
	const [ongoingCoursesPage, setOngoingCoursesPage] = useState(1);
	const [completedCoursesPage, setCompletedCoursesPage] = useState(1);
	const [referAndEarn, setReferAndEarn] = useState<IHomeReferAndEarn>({
		position: IHomeReferAndEarnPosition.BOTTOM,
		index: 0,
	});
	useFocusEffect(
		useCallback(() => {
			getRefetchSession();
			getHomeLastAsset();
			getOngoingCourse();
			completedRefetchCourse();
		}, []),
	);
	let sessionData: IHomeSession | null;

	const getActiveSessions = (sessions: IHomeLearnerSessionResult[]) =>
		sessions.filter((item) => {
			const {
				sessionGroup,
				buddySession,
				workshopSession,
				mentoringSession,
				sessionGroupSession,
				session,
				endsAt,
				startsAt,
			} = item;

			sessionData =
				buddySession ||
				workshopSession ||
				mentoringSession ||
				sessionGroupSession ||
				sessionGroup ||
				session;

			const joinUrl =
				sessionData?.virtualMeetingProvider?.joinUrl ??
				sessionData?.virtualMeeting?.joinUrl ??
				sessionData?.virtualMeeting?.uploadedFiles?.[0]?.joinUrl;
			const endDate = endsAt ? moment(endsAt).tz(userTimezone) : null;
			const startDate = startsAt
				? moment(startsAt).tz(userTimezone)
				: null;
			const currDate = moment().tz(userTimezone);

			if (!endDate || !startDate) return;
			if (
				currDate.isBetween(startDate, endDate, "milliseconds", "[]") &&
				joinUrl
			)
				return item;
		});

	const mapSessionToHomeBannerSession = (
		sessions: IHomeLearnerSessionResult,
	): IHomeBannerSession => {
		const {
			sessionGroup,
			buddySession,
			workshopSession,
			mentoringSession,
			sessionGroupSession,
			userProgram,
			session,
			endsAt,
			startsAt,
		} = sessions;

		sessionData =
			buddySession ||
			workshopSession ||
			mentoringSession ||
			sessionGroupSession ||
			sessionGroup ||
			session;
		let title = "";

		if (buddySession?.buddy)
			title = `${buddySession?.buddy?.firstName} - ${buddySession?.buddy?.lastName}`;
		else if (sessionGroup?.title) title = sessionGroup.title;
		else if (mentoringSession?.mentorUser)
			title = `${mentoringSession?.mentorUser?.mentor.firstName} - ${mentoringSession?.mentorUser?.mentor.lastName}`;
		else title = sessionData?.name || userProgram?.program?.name || "";

		const joinUrl =
			sessionData?.virtualMeetingProvider?.joinUrl ??
			sessionData?.virtualMeeting?.joinUrl ??
			sessionData?.virtualMeeting?.uploadedFiles?.[0]?.joinUrl;

		return {
			type: IHomeBannerType.SESSION,
			title,
			startsAt: startsAt || "",
			endsAt: endsAt || "",
			zoomUrl: joinUrl || "",
			workshopSession: sessionData?.id || "",
			openZoomLink,
		};
	};

	const openZoomLink = (zoomUrl?: string, workshopSession?: string) => {
		if (zoomUrl) {
			canOpenURL(zoomUrl, true);
		}
		const workshop = sessionData?.workshop?.id || "";

		if (workshopSession && workshop && id)
			markAttendance(workshop, workshopSession);
	};

	const markAttendance = async (
		workshop: string,
		workshopSession: string,
	) => {
		try {
			await markAttendanceForWorkShopSession({
				variables: {
					data: {
						workshop: workshop,
						workshopSession: workshopSession,
						user: id,
						status: "attended",
					},
				},
			});
		} catch (error) {
			//
		}
	};

	const getReferAndEarnPosition = ({
		ongoingCoursesCount,
		completedCoursesCount,
	}: {
		ongoingCoursesCount: number;
		completedCoursesCount: number;
	}): IHomeReferAndEarn => {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		let referAndEarn: IHomeReferAndEarn | null = null;

		if (ongoingCoursesCount === 0 && completedCoursesCount === 0)
			referAndEarn = {
				position: IHomeReferAndEarnPosition.BOTTOM,
				index: 0,
			};
		else if (completedCoursesCount === 0)
			referAndEarn = {
				position: IHomeReferAndEarnPosition.ONGOING,
				index: ongoingCoursesCount > 3 ? 2 : ongoingCoursesCount - 1,
			};
		else if (ongoingCoursesCount === 0)
			referAndEarn = {
				position: IHomeReferAndEarnPosition.COMPLETED,
				index:
					completedCoursesCount > 3 ? 2 : completedCoursesCount - 1,
			};
		else if (ongoingCoursesCount >= 3)
			referAndEarn = {
				position: IHomeReferAndEarnPosition.ONGOING,
				index: 2,
			};
		else
			referAndEarn = {
				position: IHomeReferAndEarnPosition.COMPLETED,
				index:
					completedCoursesCount + ongoingCoursesCount >= 3
						? 2 - ongoingCoursesCount
						: 3 - ongoingCoursesCount - completedCoursesCount,
			};

		return referAndEarn;
	};

	const result = sessionsData?.userEvents?.result || [];
	const activeSessions = getActiveSessions(result);
	const sessions = activeSessions.map(mapSessionToHomeBannerSession);

	const bannerItems: IHomeBannerItem[] = [
		...sessions,
		...(asset ? [asset] : []),
	];

	useEffect(() => {
		if (!assetData?.lastAccessedAsset) return;

		const {
			lastAccessedAsset: {
				userProgram: {
					id: programId,
					program: {
						id: userProgramId,
						name,
						variant,
						universityPartner,
						code: programCode,
					},
					courseInfo: { name: courseName },
					progress,
					progressStatus,
					workshop,
				},
				asset: {
					name: assetName,
					assetType: { type },
					code,
					id: assetId,
				},
				activity,
			},
		} = assetData;

		const aliasName = activity?.aliasName ?? null;

		setAsset({
			type: IHomeBannerType.ASSET,
			courseName: courseName ? courseName : name,
			courseId: programId,
			progress,
			assetName: aliasName || assetName || "",
			assetType: type as IAssetType,
			assetId: assetId,
			assetCode: code,
			assetActivity: activity,
			courseVariant: variant as ICourseVariantEnum,
			progressStatus: progressStatus,
			universityPartnerName: universityPartner,
			workshopId: workshop?.id || "",
			programCode,
			workshopCode: workshop?.code || "",
			userProgramId,
		});
	}, [assetData]);

	useEffect(() => {
		if (!ongoingCourses || !completedCourses) return;

		const re = getReferAndEarnPosition({
			ongoingCoursesCount: ongoingCourses.learnerCourses.result.length,
			completedCoursesCount:
				completedCourses.learnerCourses.result.length,
		});

		setReferAndEarn(re);
	}, [ongoingCourses, completedCourses]);

	const handleFetchMoreOngoing = (
		// eslint-disable-next-line @typescript-eslint/no-shadow
		ongoingCoursesPage: number,
		// setOngoingCoursesPage: (page: number) => void,
		// eslint-disable-next-line @typescript-eslint/no-shadow
		fetchMoreOngoingCourses: (options: any) => void,
	) => {
		const newPage = ongoingCoursesPage + 1;
		setOngoingCoursesPage(newPage);

		fetchMoreOngoingCourses({
			variables: { skip: (newPage - 1) * 10 },
			updateQuery: (prev: any, { fetchMoreResult }: any) => {
				if (!fetchMoreResult.learnerCourses.result) return prev;

				const newData = { ...prev };
				newData.learnerCourses.result.push(
					...fetchMoreResult.learnerCourses.result,
				);
				return newData;
			},
		});
	};

	const handleFetchMoreCompleted = (
		currentPage: number,
		// setCompletedCoursesPage: (page: number) => void,
		fetchMoreCourses: (options: any) => void,
	) => {
		const newPage = currentPage + 1;
		setCompletedCoursesPage(newPage);

		fetchMoreCourses({
			variables: { skip: (newPage - 1) * 10 },
			updateQuery: (prev: any, { fetchMoreResult }: any) => {
				if (!fetchMoreResult.learnerCourses.result) return prev;

				const newData = { ...prev };
				newData.learnerCourses.result.push(
					...fetchMoreResult.learnerCourses.result,
				);
				return newData;
			},
		});
	};

	const { lastLogin, dateOfBirth, loaded } = useSelector(
		(state: RootState) => state.personalDetails.basicDetails,
	);

	const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

	const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);

	const updateMicroInteractionModals = useCallback(() => {
		if (!loaded) return;
		if (!lastLogin) return setIsIntroModalOpen(true);

		const daysSinceLastLogin = moment().diff(
			moment(lastLogin),
			"days",
			true,
		);

		if (daysSinceLastLogin && daysSinceLastLogin >= REJOIN_DAYS)
			return setIsRejoinModalOpen(true);

		const isBirthday =
			dateOfBirth &&
			moment(dateOfBirth).format("MM-DD") === moment().format("MM-DD");

		const birthdayModalShown = storage.getBoolean(
			StorageKeys.BIRTHDAY_MODAL_SHOWN,
		);

		if (isBirthday && !birthdayModalShown)
			return setIsBirthdayModalOpen(true);
	}, [lastLogin, dateOfBirth]);

	useEffect(() => {
		updateMicroInteractionModals();
	}, [lastLogin, dateOfBirth, updateMicroInteractionModals]);

	const [isRejoinModalOpen, setIsRejoinModalOpen] = useState(false);

	const handleUpdateLastLoginUserDetails = useCallback(async () => {
		if (!id) return;

		const lastLoginDate = new Date().toISOString();

		await updateLastLoginUserDetails({
			variables: {
				where: { id },
				data: { lastLogin: { createdAt: lastLoginDate } },
			},
		});

		dispatch(updateLastLoginUserDetailsStore(lastLoginDate));
	}, [id, updateLastLoginUserDetails, dispatch]);

	const onSearchPress = () => {
		navigation.navigate("SearchCourses");
	};

	const handleIntroModalClose = useCallback(() => {
		setIsIntroModalOpen(false);
		handleUpdateLastLoginUserDetails();
	}, [setIsIntroModalOpen, handleUpdateLastLoginUserDetails]);

	const handleRejoinModalClose = useCallback(() => {
		setIsRejoinModalOpen(false);
		handleUpdateLastLoginUserDetails();
	}, [setIsRejoinModalOpen, handleUpdateLastLoginUserDetails]);

	const handleBirthdayModalClose = useCallback(() => {
		setIsBirthdayModalOpen(false);
		storage.set(StorageKeys.BIRTHDAY_MODAL_SHOWN, true);
	}, [setIsBirthdayModalOpen]);

	return {
		onSearchPress,
		sessionsLoading,
		assetLoading,
		bannerItems,
		ongoingCourses,
		ongoingCourseLoading,
		fetchMoreOngoingCourses,
		completedCourses,
		completedCoursesLoading,
		fetchMoreCompletedCourses,
		referAndEarn,
		ongoingCoursesPage,
		completedCoursesPage,
		handleFetchMoreOngoing,
		handleFetchMoreCompleted,
		openZoomLink,
		hasLearnCourses,
		hasUgCourses,
		isIntroModalOpen,
		isBirthdayModalOpen,
		setIsIntroModalOpen,
		setIsBirthdayModalOpen,
		handleIntroModalClose,
		handleRejoinModalClose,
		handleBirthdayModalClose,
		isRejoinModalOpen,
	};
};

export default useMyProgramsController;
