import moment from "moment-timezone";

import { getTimezoneFromStore } from "@utils/store.util";

import { ICourseVariantEnum } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";
import {
	Asset,
	IMilestoneType,
	IUserProgramContainer,
} from "@interface/milestonetype.interface";

const STUDY_PLAN_ENUM = {
	STUDY_PLAN: "Study Plan",
	SESSION: "Session",
	NOTES: "Notes",
	BOOKMARKS: "Bookmarks",
	SKILLS: "Skills",
};

const isProgram = (variant?: ICourseVariantEnum) => {
	return variant === ICourseVariantEnum.MILESTONE ||
		variant === ICourseVariantEnum.BUNDLE
		? true
		: false;
};

const isMileStone = (variant?: ICourseVariantEnum) => {
	return variant === ICourseVariantEnum.MILESTONE ? true : false;
};

const isSimplKH = (variant?: ICourseVariantEnum) => {
	return variant === ICourseVariantEnum.SIMPLE_KH ? true : false;
};

const isOutComeDriven = (variant?: ICourseVariantEnum) => {
	return variant === ICourseVariantEnum.OUTCOME_DRIVEN ? true : false;
};

const isComplimentaryCourse = (variant?: ICourseVariantEnum) => {
	return variant === ICourseVariantEnum.FREE ? true : false;
};

const getUpdatedMileStone = (
	mileStoneData: IMilestoneType,
	selectedMilestone: IUserProgramContainer,
) => {
	const data = mileStoneData.userProgramContainers?.filter((items) => {
		if (items?.code == selectedMilestone?.code) {
			return items?.code;
		}
	});
	if (data && data?.length) {
		return data[0];
	} else {
		return null;
	}
};

const currentMileStone = (data: IMilestoneType) => {
	const selectedMilestone = data.userProgramContainers?.filter((items) => {
		if (items?.isCurrent) {
			return items?.code;
		}
	});
	if (selectedMilestone?.length) {
		return selectedMilestone[0];
	} else {
		return data?.userProgramContainers?.length
			? data?.userProgramContainers[0]
			: null;
	}
};

const currentMileStoneIndex = (
	data: IUserProgramContainer[] | undefined,
	selectedMilestone: IUserProgramContainer | null | undefined,
) => {
	const index = data?.findIndex((item) => {
		return item?.code === selectedMilestone?.code;
	});
	return index !== null || index !== undefined ? index! + 1 : 1;
};

const reloadSelectedWeek = (
	weekList: IUserProgramContainer[],
	selectedWeek: IUserProgramContainer,
) => {
	const data = weekList?.filter((item) => {
		if (item?.code === selectedWeek?.code) {
			return item;
		}
	});
	if (data?.length) {
		return data[0];
	}
	return null;
};

const findCurrentMileStoneWeek = (weekList: IUserProgramContainer[]) => {
	const data = weekList?.filter((item) => {
		if (item?.isCurrent) {
			return item;
		}
	});
	if (data?.length) {
		return data[0];
	}
	return null;
};

const dueDatePassed = (data?: Asset): boolean => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (
		data?.activity?.endsAt &&
		data?.activity?.status !== IAssetStatusEnum.completed
	) {
		const currentDate = moment().tz(userTimezone);
		const inputDate = moment(data?.activity?.endsAt).tz(userTimezone);
		return currentDate.isAfter(inputDate);
	}
	return false;
};

const yetToStart = (data?: Asset): boolean => {
	if (
		data?.activity?.endsAt &&
		data?.activity?.status !== IAssetStatusEnum.completed
	) {
		const { name: userTimezone } = getTimezoneFromStore();
		const currentDate = moment().tz(userTimezone);
		const inputDate = moment(data?.activity?.startsAt).tz(userTimezone);
		return currentDate.isBefore(inputDate);
	}
	return false;
};

const passedCurrentDate = (date?: string): boolean => {
	if (date) {
		const { name: userTimezone } = getTimezoneFromStore();
		const currentDate = moment().tz(userTimezone);
		const inputDate = moment(date).tz(userTimezone);
		return currentDate.isAfter(inputDate);
	}
	return false;
};

export {
	isMileStone,
	currentMileStone,
	currentMileStoneIndex,
	isSimplKH,
	isOutComeDriven,
	isProgram,
	reloadSelectedWeek,
	findCurrentMileStoneWeek,
	dueDatePassed,
	yetToStart,
	passedCurrentDate,
	isComplimentaryCourse,
	getUpdatedMileStone,
	STUDY_PLAN_ENUM,
};
