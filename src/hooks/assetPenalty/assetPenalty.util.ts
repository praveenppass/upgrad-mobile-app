import moment, { Moment } from "moment-timezone";

import { IConfiguration } from "@graphql/query/assetPenalty/getAssetPenaltyConfiguration";

import {
	IAssetPenaltyItem,
	IGetAssetPenalties,
	IGetPenaltyEndDate,
	IGetPenaltyMessage,
	IGetPenaltyStartDate,
	IGetValidConfigurations,
	IMapAssetPenaltyConfiguration,
} from "@hooks/assetPenalty/assetPenalty.interface";

import { getTimezoneFromStore } from "@utils/store.util";

import { IDateFormat } from "@interface/app.interface";

const getPenaltyMessage = ({ startDate, endDate }: IGetPenaltyMessage) => {
	if (!startDate && !endDate) return "";

	if (!startDate) return `Before ${endDate}`;
	if (!endDate) return `After ${startDate}`;

	return `From ${startDate} to ${endDate}`;
};

const getPenaltyStartDate = ({ fromDays, dueDate }: IGetPenaltyStartDate) => {
	const { name: userTimezone } = getTimezoneFromStore();
	const deadlineDate = moment(dueDate).tz(userTimezone);
	if (fromDays === null) return null;

	return deadlineDate.add(fromDays - 1, "days").add(1, "minutes");
};

const getPenaltyEndDate = ({ toDays, dueDate }: IGetPenaltyEndDate) => {
	const { name: userTimezone } = getTimezoneFromStore();
	const deadlineDate = moment(dueDate).tz(userTimezone);
	if (toDays === null) return null;

	return deadlineDate.add(toDays, "days");
};

const formatDate = (date: Moment | null) => {
	const { name: userTimezone } = getTimezoneFromStore();
	return date?.tz(userTimezone).format(IDateFormat.dateWithTime) || "";
};

const mapAssetPenaltyConfiguration = ({
	configItem,
	dueDate,
}: IMapAssetPenaltyConfiguration): IAssetPenaltyItem => {
	const penaltyStartDate = formatDate(
		getPenaltyStartDate({ fromDays: configItem.from, dueDate }),
	);

	const penaltyEndDate = formatDate(
		getPenaltyEndDate({ toDays: configItem.to, dueDate }),
	);

	return {
		penalty: getPenaltyMessage({
			startDate: penaltyStartDate,
			endDate: penaltyEndDate,
		}),
		percentage: configItem.percentage,
	};
};

const getValidConfigurations = ({
	configurations,
	dueDate,
	extendedDueDate,
	isDueDateExtended,
}: IGetValidConfigurations) => {
	const { name: userTimezone } = getTimezoneFromStore();
	const deadlineDate = moment(dueDate).tz(userTimezone);
	const extendedDeadlineDate = moment(extendedDueDate).tz(userTimezone);

	const isConfigurationValid = (configItem: IConfiguration) => {
		if (!isDueDateExtended) return true;

		return configItem.to === null;
	};

	const validConfigurations = configurations.filter(isConfigurationValid);

	const validConfigurationsLength = validConfigurations.length;
	if (validConfigurationsLength)
		validConfigurations[validConfigurationsLength - 1].to = null;

	const defaultConfiguration = {
		from: null,
		to: isDueDateExtended
			? extendedDeadlineDate.diff(deadlineDate, "days") - 1
			: 0,
		percentage: 0,
	};

	return [defaultConfiguration, ...validConfigurations];
};

export const getAssetPenalties = ({
	penaltyConfigurationData,
	dueDate,
	extendedDueDate,
	isDueDateExtended,
}: IGetAssetPenalties) => {
	if (!penaltyConfigurationData || !dueDate || !extendedDueDate) return [];

	const configurations =
		penaltyConfigurationData?.assetPenaltyConfigurations?.[0]
			?.configurations || [];

	const validConfigurations = getValidConfigurations({
		configurations,
		dueDate,
		extendedDueDate,
		isDueDateExtended,
	});

	return validConfigurations.map((configItem) =>
		mapAssetPenaltyConfiguration({
			configItem,
			dueDate,
		}),
	);
};
