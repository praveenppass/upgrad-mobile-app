import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Linking } from "react-native";
import { useSelector } from "react-redux";

import {
	IEventCardProps,
	IHandleAcceptRescheduleMentorshipSession,
	IHandleResourceItemClick,
} from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { ToastType, useToast } from "@components/Reusable/Toast";

import cancelMentorshipSessionQuery, {
	ICancelMentorshipSessionQuery,
	ICancelMentorshipSessionQueryVariables,
} from "@graphql/mutation/academicPlanner/mentorship/cancelMentorshipSession";
import rejectRescheduleMentorshipSessionQuery, {
	IRejectRescheduleMentorshipSessionQuery,
	IRejectRescheduleMentorshipSessionQueryVariables,
} from "@graphql/mutation/academicPlanner/mentorship/rejectRescheduleMentorshipSession";
import rescheduleMentorshipSessionQuery, {
	IRescheduleMentorshipSessionQuery,
	IRescheduleMentorshipSessionQueryVariables,
} from "@graphql/mutation/academicPlanner/mentorship/rescheduleMentorshipSession";
import joinSessionAttendanceQuery, {
	IJoinSessionAttendanceQuery,
	IJoinSessionVariables,
} from "@graphql/mutation/markAttendance/joinSessionAttendance";
// import joinSessionGroupMeetingQuery, {
// 	IJoinSessionGroupMeetingQuery,
// 	IJoinSessionGroupVariables,
// } from "@graphql/mutation/markAttendance/joinSessionGroupMeeting";
import joinWorkShopSessionQuery, {
	IJoinWorkShopSessionQuery,
	IJoinWorkshopSessionVariables,
} from "@graphql/mutation/markAttendance/joinWorkShopSession";
import { IUserProfileConfiguration } from "@graphql/query/academicPlanner/interfaces";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { createAutoLoginUrl } from "@utils/web.utils";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

import { IAssetType } from "@interface/asset.interface";
import {
	IEventAttendance,
	IEventButtonTypes,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IUseCTAHandlerHelper {
	onRefetchEvents: () => void;
}

export const useCTAHandlerHelper = ({
	onRefetchEvents,
}: IUseCTAHandlerHelper) => {
	const { showToast } = useToast();
	const { navigate } = useAppNavigation();

	const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isMentorshipReschedule, setMentorshipReschedule] = useState(false);

	const { id: userId } = useSelector((state: RootState) => state.user.user);
	const omsAuthToken = useSelector(
		(state: RootState) => state.user.omsAuthToken,
	);

	const handleProfileSection = (event: IEventCardProps) => {
		if (!event) return;

		const {
			workshopId,
			profileConfiguration,
			learningPathId,
			learningPathType,
			programCode,
		} = event;

		switch (profileConfiguration) {
			// TODO @praveen-singh
			case IUserProfileConfiguration.PERSONAL_DETAILS:
				navigate(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.ProfileMethods,
				});
				break;
			case IUserProfileConfiguration.WORK_EXPERIENCE:
				navigate(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.MyProfileWorkExperience,
					params: {
						workExperienceIndex: 0,
					},
				});
				break;
			case IUserProfileConfiguration.EDUCATION:
				navigate(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.MyProfileEducationDetails,
					params: {
						educationDetailsIndex: 0,
					},
				});
				break;
			case IUserProfileConfiguration.ASPIRATION:
				navigate(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.MyProfileAspirations,
					params: {
						learningPathId: learningPathId,
						learningPathType: learningPathType,
						learningPathCode: programCode,
						workshopId,
					},
				});
				break;
			case IUserProfileConfiguration.CONTACT_DETAILS:
				navigate(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.MyProfileContactDetails,
				});
				break;
		}
	};
	const [cancelMentorshipSession] = useMutation<
		ICancelMentorshipSessionQuery,
		ICancelMentorshipSessionQueryVariables
	>(cancelMentorshipSessionQuery, {
		client,
	});

	const [rescheduleMentorshipSession] = useMutation<
		IRescheduleMentorshipSessionQuery,
		IRescheduleMentorshipSessionQueryVariables
	>(rescheduleMentorshipSessionQuery, {
		client,
	});

	const [rejectRescheduleMentorshipSession] = useMutation<
		IRejectRescheduleMentorshipSessionQuery,
		IRejectRescheduleMentorshipSessionQueryVariables
	>(rejectRescheduleMentorshipSessionQuery, {
		client,
	});

	const [joinSession] = useMutation<
		IJoinSessionAttendanceQuery,
		IJoinSessionVariables
	>(joinSessionAttendanceQuery);

	const [joinWorkshopSession] = useMutation<
		IJoinWorkShopSessionQuery,
		IJoinWorkshopSessionVariables
	>(joinWorkShopSessionQuery);

	// const [joinSessionGroup] = useMutation<
	// 	IJoinSessionGroupMeetingQuery,
	// 	IJoinSessionGroupVariables
	// >(joinSessionGroupMeetingQuery);

	const markAttendance = async (event: IEventCardProps) => {
		const { sessionId, workshopId, eventType } = event;

		if (!sessionId || !userId) {
			return;
		}

		try {
			switch (eventType) {
				case IEventType.PROFILE:
				case IEventType.CONTENT:
					return;

				case IEventType.LECTURE:
					return joinWorkshopSession({
						variables: {
							data: {
								user: userId,
								status: IEventAttendance.ATTENDED,
								workshopSession: sessionId || "",
								workshop: workshopId ?? sessionId,
							},
						},
					});

				default:
					return joinSession({
						variables: {
							data: {
								session: sessionId,
								user: userId,
								status: IEventAttendance.ATTENDED,
							},
						},
					});
			}
		} catch (error) {
			/* error */
		}
	};

	const handleJoin = async (event: IEventCardProps) => {
		try {
			const { joinUrl } = event;

			if (!joinUrl)
				return showToast({
					message: strings.JOIN_URL_IS_NOT_AVAILABLE,
					type: ToastType.ERROR,
				});

			const autoLoginUrl = createAutoLoginUrl(joinUrl);
			markAttendance(event);

			Linking.openURL(autoLoginUrl);
		} catch (error) {
			showToast({
				message: strings.WENT_WRONG,
				type: ToastType.ERROR,
			});
		}
	};

	const watchRecordings = (event: IEventCardProps) => {
		const { brightCoveId, eventStatus, id } = event;

		if (!brightCoveId) {
			showToast({
				message: strings.RECORDING_IS_NOT_AVAILABLE,
				type: ToastType.ERROR,
			});
			return;
		}

		navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.PlayVideoLandscape,
			params: {
				transcriptDetailsId: id,
				brightCoveId,
				seekTime: 0,
				status: eventStatus,
				learningPathId: undefined,
				superAssetCode: undefined,
				assetCode: undefined,
				isProgram: false,
				isOptional: false,
			},
		});
	};

	const navigateToAssetConsumptionPage = (event: IEventCardProps) => {
		const {
			learningPathId,
			learningPathType,
			asset,
			workshopId,
			workshopCode,
			userProgramId,
			programCode,
		} = event;
		const {
			assetCode,
			level1,
			level2,
			level3,
			level4,
			elective,
			track,
			learningPathName,
			assetType,
		} = asset ?? {};

		if (isModalVisible) setModalVisible(false);

		navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.Container6Screen,
			params: {
				learningPathName: learningPathName || "",
				assetCode: assetCode || "",
				learningPathType,
				learningPathId,
				courseId: level1 ?? null,
				moduleId: level2 ?? null,
				sessionId: level3 ?? null,
				segmentId: level4 ?? null,
				elective: elective ?? "",
				electiveGroup: "",
				track: track || "",
				trackGroup: "",
				ispostSubmission: false,
				workshopId: workshopId || "",
				workshopCode: workshopCode || "",
				userProgramId,
				learningPathCode: programCode || "",
				assetType: assetType as IAssetType,
			},
		});
	};

	const handleEventCTAClick = (event: IEventCardProps) => {
		setModalVisible(false);
		if (!event) return;

		const { ctaType, btnDisabledReason, isBtnDisabled, eventType } = event;

		if (eventType === IEventType.PROFILE) {
			return handleProfileSection(event);
		}

		if (eventType === IEventType.CONTENT) {
			return navigateToAssetConsumptionPage(event);
		}

		if (isBtnDisabled) {
			showToast({
				message: btnDisabledReason || "",
				type: ToastType.WARNING,
			});
			return;
		}

		switch (ctaType) {
			case IEventButtonTypes.START:
			case IEventButtonTypes.RESUME:
			case IEventButtonTypes.JOIN_NOW:
				return handleJoin(event);

			case IEventButtonTypes.RE_SCHEDULE:
			case IEventButtonTypes.SCHEDULE:
				setModalVisible(false);
				return setTimeout(() => setScheduleModalVisible(true), 500);

			case IEventButtonTypes.WATCH_RECORDING:
				return watchRecordings(event);
			default:
				return;
		}
	};

	const handleCancelMentorshipSession = (sessionId: string) => {
		cancelMentorshipSession({
			variables: {
				data: { remarks: strings.CANCELLED },
				where: { id: sessionId },
			},
			onError: () =>
				showToast({
					message: strings.CANCEL_FAILED,
					type: ToastType.ERROR,
				}),
			onCompleted: () => {
				showToast({
					message: strings.CANCEL_SUCCESS,
					type: ToastType.SUCCESS,
				});

				onRefetchEvents();
			},
		});
	};

	const handleToggleModal = () => setModalVisible(!isModalVisible);

	const handleRescheduleMentorshipSession = () => {
		setMentorshipReschedule(true);
		setModalVisible(false);
		setTimeout(() => setScheduleModalVisible(true), 500);
	};

	const handleCloseScheduleModal = () => setScheduleModalVisible(false);

	const handleAcceptRescheduleMentorshipSession = ({
		mentorSlotId,
		mentorshipId,
	}: IHandleAcceptRescheduleMentorshipSession) => {
		rescheduleMentorshipSession({
			variables: {
				data: { mentorSlot: mentorSlotId },
				where: { id: mentorshipId },
			},
		});

		setModalVisible(false);
		setTimeout(() => onRefetchEvents(), 1000);
	};

	const handleRejectRescheduleMentorshipSession = (mentorshipId: string) => {
		rejectRescheduleMentorshipSession({
			variables: {
				where: { id: mentorshipId },
			},
		});

		setModalVisible(false);
		setTimeout(() => onRefetchEvents(), 1000);
	};

	const handleResourceItemClick = ({
		eventType,
		sessionId,
	}: IHandleResourceItemClick) => {
		setModalVisible(false);
		navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.ViewResourcesScreen,
			params: { sessionId, eventType },
		});
	};

	return {
		handleEventCTAClick,
		handleToggleModal,
		scheduleModalVisible,
		handleCloseScheduleModal,
		isModalVisible,
		setModalVisible,
		isMentorshipReschedule,
		handleCancelMentorshipSession,
		handleRescheduleMentorshipSession,
		handleAcceptRescheduleMentorshipSession,
		handleRejectRescheduleMentorshipSession,
		handleResourceItemClick,
	};
};
