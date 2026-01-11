import {
	IContainer3Data,
	IModuleCardListItem,
} from "@components/studyPlan/container3/Container3Component/container3Component.interface";
import {
	ISessionCardItemType,
	ISessionList,
} from "@components/studyPlan/container3/SessionCard";

import { IUserCourseContainer } from "@graphql/query/studyPlan/container3/getContainer3CourseQuery";
import { IUserProgramCardListContainer } from "@graphql/query/studyPlan/container3/getContainer3ProgramCardListQuery";
import { IUserProgramContainer as IProgramContainer } from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";
import { IUserProgramContainer } from "@graphql/query/studyPlan/container3/getContainer3SessionQuery";
import { IUserProgramContainer as IContainer6ProgramContainer } from "@graphql/query/studyPlan/container6/getContainer6ProgramQuery";

import { convertSecondsToHoursAndMinutes } from "@utils/functions";

import { ENV } from "@config/env";

import getString from "@strings/getString";

export interface IContainer6ProgramItem {
	label: string;
	name: string;
	code: string;
}

/**
 * Interface for asset activity data used in mapping functions
 */
export interface IAssetActivityData {
	activity: {
		level1: string;
		level2: string;
		level3: string;
		level4: string;
		elective: string;
		electiveGroup: string;
		track: string;
		trackGroup: string;
	};
	code: string;
}

/**
 * Common mapper function for asset activity data
 * Maps asset activity properties to a standardized format
 */
const mapAssetActivityData = (asset: IAssetActivityData) => ({
	level1: asset?.activity?.level1 || "",
	level2: asset?.activity?.level2 || "",
	level3: asset?.activity?.level3 || "",
	level4: asset?.activity?.level4 || "",
	elective: asset?.activity?.elective || "",
	electiveGroup: asset?.activity?.electiveGroup || "",
	track: asset?.activity?.track || "",
	trackGroup: asset?.activity?.trackGroup || "",
	assetCode: asset?.code || "",
});

/**
 * Calculate the remaining duration based on progress percentage
 */
export const getDurationLeftText = (duration: number, progress: number) => {
	const incompletePercentageOfTime = 100 - progress;
	return convertSecondsToHoursAndMinutes(
		(duration * incompletePercentageOfTime) / 100,
	);
};

/**
 * Maps course container data to a standardized format
 */

export const mapContainer3CourseData = (
	data: IUserCourseContainer[],
): IContainer3Data[] =>
	data
		.filter((item) => !item.asset)
		.map(({ name, duration, activity, code, children, label }) => {
			const { progress = 0, enableLock = false, status } = activity || {};
			const timeLeft = getDurationLeftText(duration, progress);

			return {
				code,
				name,
				label,
				progress,
				timeLeft,
				children: children?.map(
					(child): IModuleCardListItem => ({
						name: child.asset?.name,
						isOptional: child.isOptional || false,
						code: child.code,
						progress: 0,
						status: child.asset.activity.status,
						type: child.asset.assetType.type,
						label: "",
						isLocked: child.asset.activity.enableLock,
						...mapAssetActivityData(child.asset),
					}),
				),
				totalGradableAssets: 0,
				totalCompletedGradableAssets: 0,
				dueAt: "",
				isExtended: false,
				isOptional: false,
				isLocked: enableLock,
				status: status || "",
			};
		});

export const mapContainer3ProgramData = (
	data: IProgramContainer[],
): IContainer3Data[] =>
	data
		.filter((item) => !item.asset)
		.map(({ type, name, isOptional, activity, code, label }) => {
			const {
				progress = 0,
				extensionRequests = [],
				totalCompletedGradableAssets,
				totalGradableAssets,
				dueAt,
				completedDuration = 0,
				duration = 0,
				enableLock,
				status,
			} = activity || {};
			const timeLeft = convertSecondsToHoursAndMinutes(
				duration - completedDuration,
			);
			const isExtended = !!extensionRequests?.length;

			return {
				code,
				type,
				name,
				label,
				progress,
				timeLeft,
				children: [],
				totalGradableAssets: totalGradableAssets || 0,
				totalCompletedGradableAssets: totalCompletedGradableAssets || 0,
				dueAt,
				isExtended,
				isOptional,
				isLocked: enableLock,
				status: status || "",
			};
		});

/**
 * Maps program card list data to a standardized format
 */
export const mapModuleCardListForProgram = (
	data: IUserProgramCardListContainer[],
): IModuleCardListItem[] =>
	data.map((item) => {
		return {
			status: item.asset?.activity.status || "",
			type: item.asset?.assetType?.type || "",
			name: item.aliasName || item.asset?.name || item.name,
			isOptional: item.isOptional || false,
			code: item.code,
			progress: item.activity?.progress || 0,
			label: item.label,
			isLocked:
				item.asset?.activity.enableLock || item.activity?.enableLock,

			...mapAssetActivityData(item.asset),
		};
	});

/**
 * Maps session data from API response to the format required by SessionCard component
 *
 * @param sessionData - Array of user program containers from API response
 * @returns Formatted session list data
 */
export const mapSessionListData = (
	sessionData: IUserProgramContainer[],
): ISessionList[] => {
	return sessionData.map((item) => {
		const cardType = item.asset
			? ISessionCardItemType.ASSET
			: ISessionCardItemType.TOPIC;
		const assetListForTopic = item.children?.map((child) => {
			return {
				assetType: child.asset?.assetType.type,
				status: child.asset?.activity.status,
				name: child?.aliasName || child.asset?.name,
				label: child.label,
				isOptional: child.isOptional,
				isLocked: child.asset?.activity.enableLock,
				...mapAssetActivityData(child.asset),
			};
		});

		return {
			progress: item.activity?.progress || 0,
			label: item.label,
			code: item.code,
			name: item.aliasName || item.asset?.name || item.name,
			cardType,
			isOptional: item.isOptional,
			assetListForTopic,
			assetType: item.asset?.assetType.type || "",
			status: item.asset?.activity.status || "",
			isLocked:
				item.asset?.activity.enableLock || item.activity?.enableLock,
			...mapAssetActivityData(item.asset),
		};
	});
};

/**
 * Maps module name list from program container data
 */
export const mapModuleNameList = (
	data: IContainer6ProgramContainer[],
): IContainer6ProgramItem[] =>
	data
		.filter((item) => !item.asset)
		.map((item) => ({
			label: item.label,
			name: item.name,
			code: item.code,
		}));

const STUDY_PLAN_STATIC_URL = "lxp/learner/program-detail/";
const STUDY_PLAN_STATIC_URL_END = "/study-plan";

const ASSET_LINK_STATIC_PATH = "lxp/learner/player/";
const USER_PROGRAM_ID = "/USER_PROGRAM_ID/";

interface IBuildPathUrlParams {
	courseCode?: string;
	moduleCode?: string;
	sessionCode?: string;
	segmentCode?: string;
	assetCode?: string;
	learningPathCode?: string;
	trackGroupCode?: string;
	trackCode?: string;
	electiveGroupCode?: string;
	electiveCode?: string;
	learningPathId?: string;
	comboCurriculumCode?: string;
}

export const buildStudyPlanUrl = ({
	courseCode,
	moduleCode,
	sessionCode,
	segmentCode,
	assetCode,
	learningPathCode,
	trackGroupCode,
	trackCode,
	electiveGroupCode,
	electiveCode,
	learningPathId,
	comboCurriculumCode,
}: IBuildPathUrlParams): string => {
	if (!assetCode && learningPathId)
		return `${ENV.PREFIXES_URL}${STUDY_PLAN_STATIC_URL}${learningPathId}${STUDY_PLAN_STATIC_URL_END}`;
	else if (assetCode) {
		const pathSegments = [
			courseCode,
			moduleCode,
			sessionCode,
			segmentCode,
			assetCode,
		].filter(Boolean);

		const level = `level${pathSegments.length}`;

		const params = new URLSearchParams({
			...(learningPathCode && { program: learningPathCode }),
			...(trackGroupCode && { trackgroup: trackGroupCode }),
			...(trackCode && { track: trackCode }),
			...(electiveGroupCode && { electiveGroup: electiveGroupCode }),
			...(electiveCode && { elective: electiveCode }),
			...(comboCurriculumCode && {
				comboCurriculum: comboCurriculumCode,
			}),
		});

		const baseUrl = `${ENV.PREFIXES_URL}${ASSET_LINK_STATIC_PATH}${level}${USER_PROGRAM_ID}${pathSegments.join("/")}`;

		return params.toString() ? `${baseUrl}?${params}` : baseUrl;
	}
	return "";
};

/**
 * Truncates title to accommodate ellipsis when needed for optional items
 * @param text - The text to potentially truncate
 * @param isOptional - Whether the item is optional
 * @param maxLength - Maximum length before truncation (default: 75)
 * @returns Truncated text with ellipsis if needed
 */
export const getTruncatedOptionalTitle = (
	text: string,
	isOptional: boolean,
	maxLength = 75,
): string => {
	// Only truncate if the item is optional
	if (!isOptional) return text;
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength - 3)}...(${getString("common.optional")})`;
};
