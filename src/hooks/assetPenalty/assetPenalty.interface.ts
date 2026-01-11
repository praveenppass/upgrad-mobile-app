import { IAssetPenaltyConfigurationsQuery } from "@graphql/query/assetPenalty/getAssetPenaltyConfiguration";
import { IConfiguration } from "@graphql/query/assetPenalty/getAssetPenaltyConfiguration";

export interface IAssetPenaltyItem {
	penalty: string;
	percentage: number;
}

export interface IGetPenaltyMessage {
	startDate: string | null;
	endDate: string | null;
}

export interface IUseAssetPenalty {
	dueDate: string | null;
	extendedDueDate: string | null;
	isDueDateExtended: boolean;
	learningPathCode?: string;
	isProgram?: boolean;
	penaltyConfigurationData?: IAssetPenaltyConfigurationsQuery;
}

export interface IGetAssetPenalties {
	penaltyConfigurationData?: IAssetPenaltyConfigurationsQuery;
	dueDate: string | null;
	extendedDueDate: string | null;
	isDueDateExtended: boolean;
}

export interface IGetPenaltyStartDate {
	fromDays: number | null;
	dueDate: string;
}

export interface IGetPenaltyEndDate {
	toDays: number | null;
	dueDate: string;
}

export interface IMapAssetPenaltyConfiguration {
	configItem: IConfiguration;
	dueDate: string;
}

export interface IGetValidConfigurations {
	configurations: IConfiguration[];
	dueDate: string;
	extendedDueDate: string;
	isDueDateExtended: boolean;
}
