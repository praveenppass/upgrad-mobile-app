import { StyleProp, ViewStyle } from "react-native";

import { IExtensionRequest } from "@graphql/query/asset/task/getTaskCourseDetails";

import { IAssetPenaltyItem } from "@hooks/assetPenalty/assetPenalty.interface";

export enum IDeadlineExtensionMode {
	DUE_DATE_EXTENSION = "DUE_DATE_EXTENSION",
	DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE = "DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE",
}
interface IDeadlineExtensionBase {
	originalDueDate: string | null;
	extendedDueDate: string | null;
	extensionRequests: IExtensionRequest[] | null;
	totalExtensionsAllowed: number | null;
	totalExtensionsTaken: number | null;
	dueDateExtensionMode: string | null;
	submittedDate: string | null;
	isExtensionRegained: boolean;
}
export interface IDeadlineExtension extends IDeadlineExtensionBase {
	courseId: string | null;
	moduleId: string | null;
	learningPathId: string | null;
	loading?: boolean;
	onSubmit: () => void;
	style?: StyleProp<ViewStyle>;
	penalties: IAssetPenaltyItem[];
}

export type IDeadlineExtensionController = IDeadlineExtensionBase;

export interface IGetDeadlineExtensionConfig {
	isExtensionApplied: boolean;
	isExtensionsEnabled: boolean;
	submittedDate: string | null;
	isExtensionsAvailable: boolean;
	isExtensionsEnabledUntilHardDeadline: boolean;
	originalDeadlineDate: moment.Moment;
	hardDeadlineDate: moment.Moment;
	setModuleExtensionModalVisibility: (value: boolean) => void;
	isExtensionRegained: boolean;
	userTimezone: string;
}

export interface IGetDeadlineExtensionFormattedDate {
	date: moment.Moment;
	isExtended: boolean;
	userTimezone: string;
}
