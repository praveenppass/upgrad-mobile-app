import moment from "moment-timezone";
import { StyleSheet } from "react-native";

import {
	IEventCardProps,
	IEventInfo,
} from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { getCTAType } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import { ISortType } from "@components/Reusable/SortModal";

import {
	ISessionDetails,
	ITimeSlot,
	IUserEvent,
	IUserProfileConfiguration,
} from "@graphql/query/academicPlanner/interfaces";

import { getTimezoneFromStore } from "@utils/store.util";

import { IDateFormat, LearningPathType } from "@interface/app.interface";
import {
	IEventAttendance,
	IEventButtonTypes,
	IEventStatusType,
	IEventType,
	IViewedStatus,
} from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import {
	AttendedIconLxp,
	NotAttendedIconLxp,
	RescheduleIconLxp,
	ViewIconProfileModal,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { primary } = colors;
const { medium } = commonStyles.text;

const formatDate = (dateString: string) => {
	const { name: userTimezone } = getTimezoneFromStore();

	if (!dateString) return "";

	const date = moment.tz(dateString, userTimezone);
	if (!date.isValid()) return "";

	return date.format(IDateFormat.dayAndDate);
};
const getProfileTitle = (profileConf: IUserProfileConfiguration) => {
	switch (profileConf) {
		case IUserProfileConfiguration.PERSONAL_DETAILS:
			return strings.PERSONAL_DETAILS;
		case IUserProfileConfiguration.WORK_EXPERIENCE:
			return strings.WORK_EXPERIENCE;
		case IUserProfileConfiguration.EDUCATION:
			return strings.EDUCATION;
		case IUserProfileConfiguration.ASPIRATION:
			return strings.ASPIRATION;
		case IUserProfileConfiguration.CONTACT_DETAILS:
			return strings.CONTACT_DETAILS;
	}

	return profileConf;
};
const formatDuration = (startsAt: string, endsAt: string) => {
	const { name: userTimezone } = getTimezoneFromStore();

	if (!startsAt || !endsAt) return "";

	const start = moment.tz(startsAt, userTimezone);
	const end = moment.tz(endsAt, userTimezone);

	return `${start.format(IDateFormat.time)} - ${end.format(
		IDateFormat.time,
	)}`;
};
const isBeforeEvent = (eventDate?: string): boolean => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!eventDate) return true;

	const now = moment().tz(userTimezone);
	const start = moment(eventDate).tz(userTimezone);

	return start.diff(now, "minutes") > 10;
};

const getEventTitle = ({
	eventType,
	profileConfiguration,
	sessionData,
}: {
	eventType: IEventType;
	profileConfiguration: IUserProfileConfiguration;
	sessionData: ISessionDetails | null;
}): string => {
	if (eventType === IEventType.PROFILE) {
		return getProfileTitle(profileConfiguration);
	}
	if (eventType === IEventType.CONTENT) {
		return sessionData?.aliasName || sessionData?.asset?.name || "";
	}
	return (
		sessionData?.name || `${strings.SESSION} ${sessionData?.order ?? ""}`
	);
};

const getAttendanceInfo = (
	attendance?: IEventAttendance,
): IEventInfo | undefined => {
	if (!attendance) return;

	const isAttended = attendance === IEventAttendance.ATTENDED;

	const isMissedOrNotAttended =
		attendance === IEventAttendance.MISSED ||
		attendance === IEventAttendance.NOT_ATTENDED;

	if (isAttended) {
		return {
			Icon: AttendedIconLxp,
			text: strings.ATTENDED,
		};
	}

	if (isMissedOrNotAttended) {
		return {
			Icon: NotAttendedIconLxp,
			text: strings.NOT_ATTENDED_WITHOUT,
		};
	}

	return;
};

const getViewedStatus = (
	sessionActivities?: Array<{
		id: string;
		maxWatchTime: number;
		totalWatchTime: number;
		brightcoveId: string;
	}>,
): IViewedStatus | undefined => {
	if (!sessionActivities || sessionActivities.length === 0) {
		return IViewedStatus.NOT_VIEWED;
	}

	if (sessionActivities.length > 0 && sessionActivities[0]?.id) {
		return IViewedStatus.VIEWED;
	}

	return IViewedStatus.NOT_VIEWED;
};
const shouldHideButton = ({
	eventType,
	eventStatus,
	ctaType,
}: {
	eventType: IEventType;
	eventStatus: IEventStatusType;
	ctaType: IEventButtonTypes;
}): boolean => {
	return (
		(eventType !== IEventType.MENTORSHIP &&
			eventStatus === IEventStatusType.CANCELLED) ||
		(eventType === IEventType.MENTORSHIP &&
			ctaType === IEventButtonTypes.RESUME) ||
		(eventType === IEventType.TA_CALL &&
			ctaType === IEventButtonTypes.WATCH_RECORDING)
	);
};

const extractEventCardData = (userEvents: IUserEvent[]): IEventCardProps[] => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!userEvents || userEvents.length === 0) return [];

	return userEvents.map((event) => {
		const {
			id,
			type: eventType,
			status: eventStatus,
			startsAt: eventStartsAt,
			endsAt: eventEndsAt,
			contentDetails,
			userCourse,
			userProgram,
			workshopSession,
			mentorLearner,
			mentoringSession,
			session,
			mentorWindow,
			sessionActivities,
		} = event;

		let startsAt = eventStartsAt;
		let endsAt = eventEndsAt;

		if ([IEventType.PROFILE, IEventType.CONTENT].includes(eventType))
			startsAt = moment(endsAt)
				.tz(userTimezone)
				.subtract(1, "hour")
				.toISOString();

		let sessionData: ISessionDetails | null = null;

		switch (eventType) {
			case IEventType.CONTENT:
				sessionData = contentDetails || null;
				break;
			case IEventType.LECTURE:
				sessionData = workshopSession || null;
				break;
			case IEventType.MENTORSHIP:
				sessionData =
					mentoringSession || session || mentorWindow || null;
				break;
			case IEventType.LIVE_SESSION:
			case IEventType.TA_CALL:
			case IEventType.OTHERS:
			case IEventType.BUDDY_SESSION:
			case IEventType.DAILY_DOUBT_RESOLUTION:
			case IEventType.DOUBT_RESOLUTION_SESSION:
			case IEventType.CAREER_COUNSELLING:
				sessionData = session || null;
				break;
			default:
				sessionData = session || null;
				break;
		}

		if (
			eventType === IEventType.MENTORSHIP &&
			sessionData?.startsAt &&
			sessionData?.endsAt
		) {
			startsAt = sessionData.startsAt;
			endsAt = sessionData.endsAt;
		}

		const dueDate = formatDate(endsAt);
		const eventDate = formatDate(startsAt);
		const duration = formatDuration(startsAt, endsAt);

		const headerTitle =
			userProgram?.courseInfo?.name ||
			userProgram?.program?.name ||
			userCourse?.course?.name ||
			"";
		const profileConfiguration: IUserProfileConfiguration =
			event?.userProfileSection;

		const eventTitle = getEventTitle({
			eventType,
			profileConfiguration,
			sessionData,
		});

		const agenda = sessionData?.agenda?.agenda || sessionData?.event;
		const mentors = Array.isArray(mentorLearner?.mentor)
			? mentorLearner.mentor
			: mentorLearner?.mentor
				? [mentorLearner.mentor]
				: [];
		const instructors = Array.isArray(sessionData?.instructors)
			? sessionData.instructors
			: [];

		const { virtualMeetingProvider, virtualMeeting, recordings } =
			sessionData ?? {};

		const uploadedFile = virtualMeeting?.uploadedFiles;
		const joinUrl =
			virtualMeetingProvider?.joinUrl ?? virtualMeeting?.joinUrl;

		const ctaType = getCTAType(eventType, eventStatus);
		const recordedVideourl =
			recordings?.[0]?.vimeo || recordings?.[0]?.brightcove;

		const brightCoveId = Array.isArray(uploadedFile)
			? uploadedFile.length === 1
				? uploadedFile[0]?.vimeoId ||
					uploadedFile[0]?.brightcoveId ||
					recordedVideourl
				: uploadedFile.length > 1
					? uploadedFile
					: recordedVideourl
			: recordedVideourl;

		const sessionResourcesCount = sessionData?.resources?.length ?? 0;
		const workshopSessionResourcesCount =
			workshopSession?.resources?.length ?? 0;

		const resourcesCount =
			sessionResourcesCount || workshopSessionResourcesCount;

		let isBtnDisabled = false;
		let btnDisabledReason = "";

		if (![IEventType.PROFILE, IEventType.CONTENT].includes(eventType)) {
			if (ctaType === IEventButtonTypes.WATCH_RECORDING) {
				isBtnDisabled = Array.isArray(brightCoveId)
					? brightCoveId.length === 0
					: !brightCoveId;

				if (isBtnDisabled)
					btnDisabledReason = strings.RECORDING_IS_NOT_AVAILABLE;
			} else {
				isBtnDisabled = isBeforeEvent(startsAt);
				if (isBtnDisabled) btnDisabledReason = strings.YOU_CAN_JOIN;
			}
		}

		const sessionId = sessionData?.id ?? "";
		const workshopId = event?.workshop?.id;
		const workshopCode = event?.workshop?.code;
		const userProgramId = userProgram?.program?.id;
		const sessionGroupId = event?.sessionGroup?.id;
		const isRescheduleRequested = sessionData?.requestedReschedule ?? false;
		const rescheduleRequestLimit =
			sessionData?.rescheduledLearnerCount ?? 0;

		let eventInfo: IEventInfo | undefined;
		let viewedInfo: IEventInfo | undefined;

		// For live-session events, show attendance and viewed status separately
		if (eventType === IEventType.LIVE_SESSION) {
			if (isRescheduleRequested) {
				eventInfo = {
					Icon: RescheduleIconLxp,
					text: strings.RESCHEDULE_REQUESTED,
					textStyle: styles.rescheduleRequestedText,
				};
			} else if (eventStatus === IEventStatusType.COMPLETED) {
				// Attendance info
				if (sessionData?.attendance?.status) {
					eventInfo = getAttendanceInfo(
						sessionData.attendance.status,
					);
				}

				// Viewed info
				const viewedStatus = getViewedStatus(sessionActivities);
				if (viewedStatus) {
					const viewedText =
						viewedStatus === IViewedStatus.VIEWED
							? "Viewed"
							: "Not Viewed";
					viewedInfo = {
						Icon: ViewIconProfileModal,
						text: viewedText,
					};
				}
			}
		} else {
			if (
				eventStatus === IEventStatusType.COMPLETED &&
				sessionData?.attendance?.status
			) {
				eventInfo = getAttendanceInfo(sessionData?.attendance?.status);
			} else if (isRescheduleRequested) {
				eventInfo = {
					Icon: RescheduleIconLxp,
					text: strings.RESCHEDULE_REQUESTED,
					textStyle: styles.rescheduleRequestedText,
				};
			}
		}

		const mentorWindowId = mentorWindow?.id ?? "";
		const bookByDate = mentorWindow?.endsAt ?? "";
		const mentorWindowEventId = mentorWindow?.event?.code ?? "";

		let rescheduleRequestDetails: ITimeSlot | undefined;

		if (isRescheduleRequested)
			rescheduleRequestDetails = sessionData?.requestedRescheduleTimeSlot;

		const learningPathId = userCourse?.id || userProgram?.id || "";
		const programCode =
			userCourse?.course?.code || userProgram?.program?.code || "";
		const learningPathType = userProgram
			? LearningPathType.PROGRAM
			: LearningPathType.COURSE;

		const { level1, level2, level3, level4, track, elective } =
			sessionData || {};

		const { code: assetCode, assetType } = sessionData?.asset || {};

		const learningPathName =
			userCourse?.course?.name || userProgram?.program?.name;
		let showButton = true;
		if (shouldHideButton({ eventType, eventStatus, ctaType })) {
			showButton = false;
		}

		const eventCard: IEventCardProps = {
			id,
			eventType,
			eventStatus,
			dueDate,
			eventDate,
			duration,
			headerTitle,
			eventTitle,
			agenda,
			mentors,
			instructors,
			isBtnDisabled,
			ctaType,
			joinUrl,
			brightCoveId,
			sessionId,
			workshopId,
			sessionGroupId,
			btnDisabledReason,
			eventInfo,
			viewedInfo,
			profileConfiguration,
			learningPathId,
			programCode,
			learningPathType,
			mentorWindow: {
				id: mentorWindowId,
				bookByDate,
				eventId: mentorWindowEventId,
			},
			asset: {
				assetCode,
				level1,
				level2,
				level3,
				level4,
				track: track?.name,
				elective: elective?.name,
				learningPathName,
				assetType: assetType?.type,
			},
			startsAt,
			endsAt,
			rescheduleRequestDetails,
			showButton,
			rescheduleRequestLimit,
			workshopCode,
			userProgramId,
			resourcesCount,
		};

		return eventCard;
	});
};

export const getSortOrderBasedOnType = (type: ISortType) => {
	switch (type) {
		case ISortType.OldFirst:
			return "asc";
		case ISortType.Default:
		default:
			return "desc";
	}
};

const styles = StyleSheet.create({
	rescheduleRequestedText: {
		color: primary.red_05,
		...medium,
	},
});

export default extractEventCardData;
