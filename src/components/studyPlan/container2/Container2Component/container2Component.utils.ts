import moment from "moment-timezone";

import {
	ICalculateGPTAccessTimeLeft,
	ICourseItem,
	IFetchProductivityGptAccessData,
	IProductivityGPTResponse,
	ISelectionAvailabilityParams,
	ISelectionModalData,
} from "@components/studyPlan/container2/Container2Component/container2Component.interface";

import { IUserCourseContainer } from "@graphql/query/studyPlan/container2/getCourseListDataQuery";
import { IUserProgramContainer } from "@graphql/query/studyPlan/container2/getProgramListDataQuery";

import { convertSecondsToHoursAndMinutes } from "@utils/functions";
import { productivityGPTApiHttpClient } from "@utils/httpClientList";
import { getTimezoneFromStore } from "@utils/store.util";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IDateFormat } from "@interface/app.interface";

import { strings } from "@assets/strings";

const STRINGS = createStringConstants({
	TRACK_SELECTION_AVAILABLE:
		"studyPlan.container2.courseCard.trackSelection.isAvailable.description",
	TRACK_SELECTION_AVAILABLE_TITLE:
		"studyPlan.container2.courseCard.trackSelection.isAvailable.title",
	TRACK_SELECTION_NOT_AVAILABLE:
		"studyPlan.container2.courseCard.trackSelection.isNotAvailable.description",
	TRACK_SELECTION_NOT_AVAILABLE_TITLE:
		"studyPlan.container2.courseCard.trackSelection.isNotAvailable.title",

	ELECTIVE_SELECTION_AVAILABLE:
		"studyPlan.container2.courseCard.electiveSelection.isAvailable.description",
	ELECTIVE_SELECTION_AVAILABLE_TITLE:
		"studyPlan.container2.courseCard.electiveSelection.isAvailable.title",
	ELECTIVE_SELECTION_NOT_AVAILABLE:
		"studyPlan.container2.courseCard.electiveSelection.isNotAvailable.description",
	ELECTIVE_SELECTION_NOT_AVAILABLE_TITLE:
		"studyPlan.container2.courseCard.electiveSelection.isNotAvailable.title",
});

const MAX_GPT_ACCESS_DAYS = 180;

const mapProgramContainer = (item: IUserProgramContainer): ICourseItem => {
	const timeLeft = convertSecondsToHoursAndMinutes(
		item.activity.duration - item.activity.completedDuration,
	);

	const timeLeftString = timeLeft ? `${timeLeft} Left` : "";

	return {
		label: item.label,
		name: item.name,
		timeLeft: timeLeftString,
		progress: Math.round(item.activity.progress),
		totalCompletedGradableAssets:
			item.activity.totalCompletedGradableAssets || 0,
		totalGradableAssets: item.activity.totalGradableAssets || 0,
		isOptional: item.isOptional || false,
		isTrack: item.activity.isTrack || false,
		isTrackGroup: item.activity.isTrackGroup || false,
		isElective: item.activity.isElective || false,
		isElectiveGroup: item.activity.isElectiveGroup || false,
		courseCode: item.code,
		isLocked: item.activity.enableLock,
		currentCourseState: item.activity.currentCourseState,
		trackSelectionFrom: item.activity.trackSelectionFrom,
		trackAvailableTill: item.activity.trackAvailableTill,
		electiveSelectionFrom: item.activity.electiveSelectionFrom,
		electiveAvailableTill: item.activity.electiveAvailableTill,
		certificate: item.userMilestoneCertificate ?? null,
	};
};

const mapCourseContainer = (item: IUserCourseContainer): ICourseItem => {
	const timeLeft = convertSecondsToHoursAndMinutes(item.duration);
	const timeLeftString = timeLeft ? `${timeLeft} Left` : "";
	return {
		label: item.label,
		name: item.name,
		timeLeft: timeLeftString,
		progress: Math.round(item.activity.progress),
		courseCode: item.code,
		isLocked: item.activity.enableLock,
	};
};

export const mapProgramContainers = (
	items: IUserProgramContainer[],
): ICourseItem[] => {
	const filteredItems = items.flatMap((item) =>
		!item.children?.length
			? [mapProgramContainer(item)]
			: item.children.map((child) => {
					const isTrack = item.activity.isTrack;
					const isElective = item.activity.isElective;

					return {
						...mapProgramContainer(child),
						courseCode: item.code,
						...(isTrack && { trackCode: child.code }),
						...(isElective && { electiveCode: child.code }),
						...(child.trackGroup && {
							trackGroupCode: child.trackGroup,
						}),
						...(child.electiveGroup && {
							electiveGroupCode: child.electiveGroup,
						}),
						isTrack,
						isElective,
						isLocked: child.activity.enableLock,
					};
				}),
	);

	return filteredItems;
};

export const mapCourseContainers = (data: IUserCourseContainer[]) =>
	data.map((item) => mapCourseContainer(item));

//TODO change strings implementation

export const calculateGPTAccessTimeLeft = ({
	registeredAt,
}: ICalculateGPTAccessTimeLeft) => {
	if (!registeredAt) return { accessText: "", isExpired: true };

	const { name: userTimezone } = getTimezoneFromStore();

	const currentDate = moment().tz(userTimezone);
	const expiryDate = moment(registeredAt)
		.tz(userTimezone)
		.add(MAX_GPT_ACCESS_DAYS, "days");

	const isExpired = currentDate.isAfter(expiryDate);
	if (isExpired)
		return { accessText: strings.ACCESS_EXPIRED, isExpired: true };

	const duration = moment.duration(expiryDate.diff(currentDate));
	const days = Math.floor(duration.asDays());
	const hours = duration.hours();

	let accessText = "";

	if (days > 0 && hours > 0)
		accessText = strings.ACCESS_ENDS_IN_DAYS_HOURS(days, hours);
	else if (days > 0) accessText = strings.ACCESS_ENDS_IN_DAYS(days);
	else if (hours > 0) accessText = strings.ACCESS_ENDS_IN_HOURS(hours);

	return { accessText, isExpired: false };
};

/**
 * Determines the selection availability and returns appropriate modal data
 * @param params - Selection availability parameters
 * @returns Modal data for selection availability or null if not applicable
 */
export const getTrackAndElectiveSelectionModalData = (
	params: ISelectionAvailabilityParams,
): ISelectionModalData | null => {
	const {
		isTrackGroup,
		isElectiveGroup,
		trackSelectionFrom,
		trackAvailableTill,
		electiveSelectionFrom,
		electiveAvailableTill,
	} = params;

	if (!isTrackGroup && !isElectiveGroup) {
		return null;
	}

	const { name: userTimezone } = getTimezoneFromStore();

	const today = moment();

	const selectionFromDate = isTrackGroup
		? trackSelectionFrom
		: electiveSelectionFrom;
	const selectionTillDate = isTrackGroup
		? trackAvailableTill
		: electiveAvailableTill;

	const isSelectionAvailable =
		moment(today).isSameOrAfter(selectionFromDate) &&
		moment(today).isSameOrBefore(selectionTillDate);

	const selectionFromDateString = moment(selectionFromDate)
		.tz(userTimezone)
		.format(IDateFormat.date);

	if (isSelectionAvailable) {
		if (isTrackGroup) {
			return {
				description: getString(STRINGS.TRACK_SELECTION_AVAILABLE),
				title: getString(STRINGS.TRACK_SELECTION_AVAILABLE_TITLE),
			};
		} else {
			return {
				description: getString(STRINGS.ELECTIVE_SELECTION_AVAILABLE),
				title: getString(STRINGS.ELECTIVE_SELECTION_AVAILABLE_TITLE),
			};
		}
	} else {
		if (isTrackGroup) {
			return {
				description: getString(
					STRINGS.TRACK_SELECTION_NOT_AVAILABLE,
					selectionFromDateString,
				),
				title: getString(STRINGS.TRACK_SELECTION_NOT_AVAILABLE_TITLE),
			};
		} else {
			return {
				description: getString(
					STRINGS.ELECTIVE_SELECTION_NOT_AVAILABLE,
					selectionFromDateString,
				),
				title: getString(
					STRINGS.ELECTIVE_SELECTION_NOT_AVAILABLE_TITLE,
				),
			};
		}
	}
};

export const fetchGptAccessData = async ({
	learningPathId,
	userId,
}: IFetchProductivityGptAccessData) => {
	const response: IProductivityGPTResponse =
		await productivityGPTApiHttpClient.post(
			"/check_cost_limit_reached/invoke",
			{
				input: {
					user_id: userId,
					user_program_id: learningPathId,
				},
			},
		);

	return response.data.output;
};
