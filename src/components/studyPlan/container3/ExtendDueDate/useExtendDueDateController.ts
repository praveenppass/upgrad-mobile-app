import { useState } from "react";

import { IDeadlineExtensionMode } from "@components/asset/deadlineExtension/deadlineExtension.interface";
import { isCurrentDateBeforeGivenDate } from "@components/studyPlan/container3/ExtendDueDate/extendDueDate.util";

import { IAssetPenaltyConfiguration } from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";

import useAssetPenalty from "@hooks/assetPenalty/useAssetPenalty";
import useGetTimezone from "@hooks/useGetTimezone";

import { calculateDueDates } from "@utils/functions";

import { strings } from "@assets/strings";

interface IUseExtendDueDateController {
	penaltyConfigurationData?: IAssetPenaltyConfiguration[];
	dueDate: string;
	hardDeadlineDays: number;
	isDueDateExtended: boolean;
	dueDateExtensionMode?: IDeadlineExtensionMode | null; //TODO
	totalExtensionsAllowed: number;
	totalExtensionsTaken: number;
	status: string;
}

const useExtendDueDateController = ({
	penaltyConfigurationData,
	dueDate,
	hardDeadlineDays,
	isDueDateExtended,
	dueDateExtensionMode,
	totalExtensionsAllowed,
	totalExtensionsTaken,
	status,
}: IUseExtendDueDateController) => {
	const { name: userTimezone } = useGetTimezone();
	const [isModuleExtensionModalVisible, setModuleExtensionModalVisibility] =
		useState(false);

	const { extendedDueDate, originalDueDate } = calculateDueDates({
		dueDate,
		hardDeadlineDays,
		isDueDateExtended,
	});

	const { revertedPenalties } = useAssetPenalty({
		dueDate: originalDueDate,
		extendedDueDate: extendedDueDate,
		isDueDateExtended: isDueDateExtended,
		penaltyConfigurationData: {
			assetPenaltyConfigurations: penaltyConfigurationData || [],
		},
	});

	const isDeadlineExtensionUntilHardDeadline =
		dueDateExtensionMode ===
		IDeadlineExtensionMode.DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE;

	const isWithinExtensionPeriod = isCurrentDateBeforeGivenDate({
		givenDate: isDeadlineExtensionUntilHardDeadline
			? extendedDueDate
			: originalDueDate,
		userTimezone,
	});

	const ctaText = isDueDateExtended
		? strings.CANCEL_EXTENSION
		: strings.DEADLINE;

	const availableExtensions = totalExtensionsAllowed - totalExtensionsTaken;

	const showExtensionButton =
		availableExtensions > 0 &&
		isWithinExtensionPeriod &&
		(status !== "completed" || isDeadlineExtensionUntilHardDeadline);

	return {
		isModuleExtensionModalVisible,
		setModuleExtensionModalVisibility,
		revertedPenalties,
		ctaText,
		originalDueDate,
		extendedDueDate,
		showExtensionButton,
	};
};

export default useExtendDueDateController;
