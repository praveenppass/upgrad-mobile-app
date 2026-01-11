import moment from "moment-timezone";

import {
	IGetDeadlineExtensionConfig,
	IGetDeadlineExtensionFormattedDate,
} from "@components/asset/deadlineExtension/deadlineExtension.interface";

import { IDateFormat } from "@interface/app.interface";

import { strings } from "@assets/strings";

const DEADLINE_EXTENSION_DESCRIPTION = {
	NONE: "",
	NEED_MORE_TIME: strings.NEED_MORE_TIME,
	CANCEL_EXTENSION: strings.CANCEL_EXTENSION_BEFORE_HARD_DEADLINE,
	EXTENSION_REGAINED: strings.EXTENSION_REGAINED_SUBMISSION_DONE,
	DUE_DATE_CAN_STILL_BE_EXTENDED: strings.SUBMISSION_BTW_DUE_HARD_DEADLINE,
	CANCEL_EXTENSION_TO_REGAIN: strings.CANCEL_CURRENT_EXTENSION,
	EXTENSION_APPLIED: strings.EXTENSION_APPLIED,
	EXTENSION_REGAINED_SUBMISSION_NOT_DONE:
		strings.EXTENSION_REGAINED_SUBMISSION_NOT_DONE,
};

const DEADLINE_EXTENSION_CTA = {
	NONE: "",
	EXTEND: strings.DEADLINE,
	CANCEL: strings.CANCEL_EXTENSION,
};

const getFormattedDate = ({
	date,
	isExtended,
	userTimezone,
}: IGetDeadlineExtensionFormattedDate) => {
	const title = isExtended ? strings.NEW_DUE_DATE : strings.DUE_DATE;
	return `${title}: ${date.tz(userTimezone).format(IDateFormat.dateWithTime)}`;
};

export const getDeadlineExtensionConfig = ({
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
}: IGetDeadlineExtensionConfig) => {
	const formattedExtendedDueDate = getFormattedDate({
		date: hardDeadlineDate,
		isExtended: true,
		userTimezone,
	});

	const formattedDueDate = getFormattedDate({
		date: originalDeadlineDate,
		isExtended: false,
		userTimezone,
	});

	let extensionText = DEADLINE_EXTENSION_DESCRIPTION.NONE;
	let ctaDisabled = false;
	let deadlineDate = "";
	let ctaText = DEADLINE_EXTENSION_CTA.NONE;
	let showExtensions = true;

	if (!isExtensionsEnabled) return null;

	const isSubmitted = !!submittedDate;
	const submissionDate = moment(submittedDate || undefined).tz(userTimezone);

	if (submissionDate.isBefore(originalDeadlineDate)) {
		if (isExtensionRegained) {
			extensionText = DEADLINE_EXTENSION_DESCRIPTION.EXTENSION_REGAINED;
			deadlineDate = formattedDueDate;
		} else {
			if (!isExtensionApplied) {
				if (isSubmitted) return null;
				else {
					deadlineDate = formattedDueDate;

					if (isExtensionsAvailable) {
						extensionText =
							DEADLINE_EXTENSION_DESCRIPTION.NEED_MORE_TIME;
						ctaText = DEADLINE_EXTENSION_CTA.EXTEND;
					} else ctaDisabled = true;
				}
			} else {
				if (isSubmitted) return null;
				else {
					extensionText =
						DEADLINE_EXTENSION_DESCRIPTION.CANCEL_EXTENSION;
					deadlineDate = formattedExtendedDueDate;
					ctaText = DEADLINE_EXTENSION_CTA.CANCEL;
				}
			}
		}
	} else if (
		submissionDate.isAfter(originalDeadlineDate) &&
		submissionDate.isBefore(hardDeadlineDate)
	) {
		if (isExtensionsEnabledUntilHardDeadline) {
			if (!isExtensionApplied) {
				if (isSubmitted) {
					deadlineDate = formattedDueDate;

					if (isExtensionsAvailable) {
						extensionText =
							DEADLINE_EXTENSION_DESCRIPTION.DUE_DATE_CAN_STILL_BE_EXTENDED;
						ctaText = DEADLINE_EXTENSION_CTA.EXTEND;
					} else ctaDisabled = true;
				} else {
					deadlineDate = formattedDueDate;

					if (isExtensionsAvailable) {
						extensionText =
							DEADLINE_EXTENSION_DESCRIPTION.NEED_MORE_TIME;
						ctaText = DEADLINE_EXTENSION_CTA.EXTEND;
					} else ctaDisabled = true;
				}
			} else {
				extensionText =
					DEADLINE_EXTENSION_DESCRIPTION.CANCEL_EXTENSION_TO_REGAIN;
				deadlineDate = formattedExtendedDueDate;
				ctaText = DEADLINE_EXTENSION_CTA.CANCEL;
			}
		} else {
			if (!isExtensionApplied) {
				if (isSubmitted) return null;
				else {
					deadlineDate = formattedDueDate;
					showExtensions = false;
				}
			} else {
				if (isSubmitted) return null;
				else {
					extensionText =
						DEADLINE_EXTENSION_DESCRIPTION.EXTENSION_APPLIED;
					deadlineDate = formattedExtendedDueDate;
					ctaText = DEADLINE_EXTENSION_CTA.CANCEL;
					ctaDisabled = true;
				}
			}
		}
	} else if (submissionDate.isAfter(hardDeadlineDate)) {
		if (isExtensionRegained) {
			if (isSubmitted) return null;
			else {
				extensionText =
					DEADLINE_EXTENSION_DESCRIPTION.EXTENSION_REGAINED_SUBMISSION_NOT_DONE;
				deadlineDate = formattedDueDate;
			}
		} else {
			if (!isExtensionApplied) {
				if (isSubmitted) return null;
				else {
					deadlineDate = formattedDueDate;
					showExtensions = false;
				}
			} else {
				if (isSubmitted) return null;
				else {
					extensionText = DEADLINE_EXTENSION_DESCRIPTION.NONE;
					deadlineDate = formattedExtendedDueDate;
				}
			}
		}
	}

	let ctaPress = null;

	if (!ctaDisabled) ctaPress = () => setModuleExtensionModalVisibility(true);

	return {
		extensionText,
		deadlineDate,
		ctaText,
		ctaPress,
		ctaDisabled,
		showExtensions,
	};
};
