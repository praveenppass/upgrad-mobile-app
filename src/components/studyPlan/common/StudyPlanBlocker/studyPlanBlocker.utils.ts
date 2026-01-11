import moment from "moment-timezone";

import {
	ICalculateProfileConfigList,
	IGetDeadlineConfiguration,
	IProfileBlockerConfigurationEntry,
	IProfileConfigItem,
	IUserProfileConfiguration,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { getTimezoneFromStore } from "@utils/store.util";

import { storage } from "@config/mmkvStorage";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IDateFormat } from "@interface/app.interface";

import StorageKeys from "@constants/storage.constants";

import {
	ApplicationOutlineIcon,
	CapOutlineIcon,
	PhoneOutlineIcon,
	UserOutlineIcon,
	WorkOutlineIcon,
} from "@assets/icons/svg/studyPlan";

const STRINGS = createStringConstants({
	PERSONAL_DETAILS:
		"studyPlan.profileBlocker.profileSections.personalDetails",
	WORK_EXPERIENCE: "studyPlan.profileBlocker.profileSections.workExperience",
	EDUCATION: "studyPlan.profileBlocker.profileSections.education",
	ASPIRATION: "studyPlan.profileBlocker.profileSections.aspiration",
	CONTACT_DETAILS: "studyPlan.profileBlocker.profileSections.contactDetails",
});

export const getProfileDataBasedOnType = (type: IUserProfileConfiguration) => {
	switch (type) {
		case IUserProfileConfiguration.PERSONAL_DETAILS:
			return {
				icon: UserOutlineIcon,
				title: getString(STRINGS.PERSONAL_DETAILS),
			};
		case IUserProfileConfiguration.WORK_EXPERIENCE:
			return {
				icon: WorkOutlineIcon,
				title: getString(STRINGS.WORK_EXPERIENCE),
			};
		case IUserProfileConfiguration.EDUCATION:
			return {
				icon: CapOutlineIcon,
				title: getString(STRINGS.EDUCATION),
			};
		case IUserProfileConfiguration.ASPIRATION:
			return {
				icon: ApplicationOutlineIcon,
				title: getString(STRINGS.ASPIRATION),
			};
		case IUserProfileConfiguration.CONTACT_DETAILS:
			return {
				icon: PhoneOutlineIcon,
				title: getString(STRINGS.CONTACT_DETAILS),
			};
	}
};

export const getStoredLearningPaths = () => {
	const storedLearningPathsString = storage.getString(
		StorageKeys.PROFILE_BLOCKER_LEARNING_PATHS,
	);
	return storedLearningPathsString?.split(",") || [];
};

export const setStoredLearningPaths = (learningPathId: string) => {
	const storedLearningPaths = getStoredLearningPaths();
	storage.set(
		StorageKeys.PROFILE_BLOCKER_LEARNING_PATHS,
		[...storedLearningPaths, learningPathId].join(","),
	);
};

export const checkIfLearningPathIsInStorage = (learningPathId: string) => {
	const storedLearningPaths = getStoredLearningPaths();
	return storedLearningPaths.includes(learningPathId);
};

export const getDeadlineConfiguration = ({
	dueByDays,
	learningPathStartDate,
}: IGetDeadlineConfiguration) => {
	const { name: userTimezone } = getTimezoneFromStore();
	const today = moment();
	const start = moment(learningPathStartDate);
	const deadlineDate = start.clone().add(dueByDays, "days");

	const isDeadlinePassed = deadlineDate.isBefore(today, "day");
	const deadlineDateFormatted = deadlineDate
		.tz(userTimezone)
		.format(IDateFormat.date);

	return {
		deadlineDate: deadlineDateFormatted,
		isDeadlinePassed,
	};
};

export const calculateProfileConfigList = ({
	profileBlockerData,
	learningPathStartDate,
}: ICalculateProfileConfigList) => {
	if (!profileBlockerData) return [];

	const {
		profileSectionsCompletionStatus,
		profileBlockerConfiguration,
		profileResponses,
	} = profileBlockerData;

	if (
		!profileBlockerConfiguration ||
		!profileSectionsCompletionStatus ||
		!profileResponses
	)
		return [];

	const isAspirationSectionCompleted =
		profileResponses?.[0]?.isCompleted || false;

	const profileConfigurations: IProfileBlockerConfigurationEntry[] =
		Object.entries(profileBlockerConfiguration);

	const profileConfigList = profileConfigurations.reduce<
		IProfileConfigItem[]
	>((acc, [key, config]) => {
		if (!config.hasDeadline) return acc;

		const type = key as IUserProfileConfiguration;

		const { isDeadlinePassed, deadlineDate } = getDeadlineConfiguration({
			dueByDays: config.dueByDays,
			learningPathStartDate,
		});
		if (type === IUserProfileConfiguration.ASPIRATION)
			return [
				...acc,
				{
					type,
					isDeadlinePassed,
					deadlineDate,
					isCompleted: isAspirationSectionCompleted,
				},
			];

		const isCompleted = profileSectionsCompletionStatus[type];

		// if (isCompleted) return acc;

		return [...acc, { type, isDeadlinePassed, deadlineDate, isCompleted }];
	}, []);

	return profileConfigList;
};
