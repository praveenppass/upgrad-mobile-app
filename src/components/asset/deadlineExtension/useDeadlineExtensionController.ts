import moment from "moment-timezone";
import { useState } from "react";

import {
	IDeadlineExtensionController,
	IDeadlineExtensionMode,
} from "@components/asset/deadlineExtension/deadlineExtension.interface";
import { getDeadlineExtensionConfig } from "@components/asset/deadlineExtension/deadlineExtension.util";

import useGetTimezone from "@hooks/useGetTimezone";

const useDeadlineExtensionController = ({
	originalDueDate,
	extendedDueDate,
	extensionRequests,
	dueDateExtensionMode,
	totalExtensionsAllowed,
	totalExtensionsTaken,
	submittedDate,
	isExtensionRegained,
}: IDeadlineExtensionController) => {
	const availableExtensions =
		(totalExtensionsAllowed || 0) - (totalExtensionsTaken || 0);
	const { name: userTimezone } = useGetTimezone();

	const [isModuleExtensionModalVisible, setModuleExtensionModalVisibility] =
		useState(false);

	const originalDeadlineDate = moment(originalDueDate).tz(userTimezone);
	const hardDeadlineDate = moment(extendedDueDate).tz(userTimezone);

	const isExtensionsEnabled =
		!!originalDueDate ||
		moment(originalDueDate)
			.tz(userTimezone)
			.isSame(moment(extendedDueDate).tz(userTimezone));

	const isExtensionApplied = !!extensionRequests?.length;

	const isExtensionsEnabledUntilHardDeadline =
		dueDateExtensionMode ===
		IDeadlineExtensionMode.DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE;

	const isExtensionsAvailable = availableExtensions > 0;

	const deadlineExtensionConfig = getDeadlineExtensionConfig({
		isExtensionApplied,
		isExtensionsEnabled,
		submittedDate,
		originalDeadlineDate,
		hardDeadlineDate,
		isExtensionsAvailable,
		isExtensionsEnabledUntilHardDeadline,
		setModuleExtensionModalVisibility,
		isExtensionRegained,
		userTimezone,
	});

	return {
		availableExtensions,
		deadlineExtensionConfig,
		isModuleExtensionModalVisible,
		setModuleExtensionModalVisibility,
	};
};

export default useDeadlineExtensionController;
