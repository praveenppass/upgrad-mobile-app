import moment from "moment-timezone";

import {
	IGetDurationText,
	IGetStatusIcon,
} from "@screens/Home/StudyPlan/Container1/container1.interface";
import { IProgramDetails } from "@screens/Home/StudyPlan/Container1/container1.interface";

import { IRelatedUserProgram } from "@graphql/query/studyPlan/container1/getSpecializationProgram";

import { convertSecondsToHoursAndMinutes } from "@utils/functions";
import { getTimezoneFromStore } from "@utils/store.util";

export const getDurationText = ({ duration, progress }: IGetDurationText) => {
	if (duration < 0 || progress === 100) return "";

	return `${convertSecondsToHoursAndMinutes(duration)}`;
};

export const isDeadlineNotPassed = (startDate: string): boolean => {
	const { name: userTimezone } = getTimezoneFromStore();
	const start = moment(startDate).tz(userTimezone);
	const deadlineDate = start.add(0, "days");
	const now = moment().tz(userTimezone);

	return now.isBefore(deadlineDate);
};

export const getIsSpecializationLocked = ({ startedAt }: IGetStatusIcon) => {
	const { name: userTimezone } = getTimezoneFromStore();

	const start = moment(startedAt).tz(userTimezone);
	const now = moment().tz(userTimezone);

	const isLocked = now.isBefore(start);

	return isLocked;
};

export const getProgramDetails = (
	program: IRelatedUserProgram,
): IProgramDetails => {
	const {
		id,
		progress,
		totalLearningDuration,
		courseInfo,
		startedAt,
		program: programDetails,
		workshop,
	} = program ?? {};

	const name = courseInfo?.name ?? "";

	const progressText = `${progress?.toFixed(0)}%`;

	const durationText = getDurationText({
		duration: totalLearningDuration,
		progress,
	});

	const isLocked = getIsSpecializationLocked({ startedAt });

	const { id: workshopId, code: workshopCode } = workshop ?? {};

	const code = programDetails?.code ?? "";
	const userProgramId = programDetails?.id ?? "";

	return {
		id,
		name,
		progress,
		duration: totalLearningDuration ?? 0,
		progressText,
		durationText,
		startedAt: startedAt ?? "",
		isLocked,
		workshopId,
		code,
		workshopCode,
		userProgramId,
	};
};
