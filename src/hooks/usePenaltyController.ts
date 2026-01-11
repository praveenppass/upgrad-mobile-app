import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GlobeBottomSheetController from "@components/Modals/GlobeBottomSheetController";

import usePenalty from "@hooks/usePenalty";

import {
	formatDateByTime,
	getDateTwoDaysPriorFormatted,
} from "@utils/timezoneHelper";

import { RootState } from "@redux/store/root.reducer";

import { IDateFormat } from "@interface/app.interface";
import { IDueDateExtension } from "@interface/asset.interface";
import { ExtensionRequest } from "@interface/milestonetype.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

const {
	themes: { bg, primary },
} = C;

interface IPenaltyProps {
	date?: string;
	availableFrom?: string;
	extensionRequests?: ExtensionRequest[] | null;
	disabled?: boolean | null;
	assetCode?: string | number;
	title?: string;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	pullDownToRefresh?: any;
}

const usePenaltyController = ({
	date,
	disabled,
	extensionRequests,
	assetCode,
	title,
	availableFrom,
	level4,
	level3,
	level2,
	moduleCode,
	pullDownToRefresh,
}: IPenaltyProps) => {
	const [dueDateColor, setDueDateColor] = useState("");
	const [bgColor, setBgColor] = useState("");
	const { onCancelExtensionHandler, onExtensionHandler } = usePenalty({
		assetCode,
		level2,
		level3,
		level4,
		moduleCode,
		pullDownToRefresh,
	});

	const [dueDateState, setDueDateState] = useState<string | number | null>(
		"",
	);
	const [extensionState, setExtensionState] = useState<
		string | number | null
	>("");

	const selectedCourseDetails = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseDetails,
	);

	const dueDateObject = new Date(date);
	const currentDate = new Date();

	const formattedDueDate = date
		? formatDateByTime(date, IDateFormat.dateWithTime)
		: "";
	const totalExtensionsAllowed =
		selectedCourseDetails?.userProgram?.program.totalExtensionsAllowed ?? 0;

	const totalExtensionsTaken =
		selectedCourseDetails?.userProgram?.totalExtensionsTaken ?? 0;

	const dueDateExtensionMode =
		selectedCourseDetails?.userProgram?.program.dueDateExtensionMode ?? "";

	const availableExtensions = totalExtensionsAllowed - totalExtensionsTaken;

	const cancel = date
		? `${getDateTwoDaysPriorFormatted(
				`${date}`,
				selectedCourseDetails?.userProgram?.program?.hardDeadlineDays,
			)}`
		: "";

	useEffect(() => {
		if (date !== undefined && date !== null) {
			const extensionInfoCheck =
				Array.isArray(extensionRequests) && extensionRequests.length > 0
					? true
					: false;
			if (
				extensionRequests != null &&
				extensionRequests != undefined &&
				extensionInfoCheck
			) {
				setDueDateState(`${strings.NEW_DUE_DATE}: ${formattedDueDate}`);
			} else {
				setDueDateState(`${strings.DUE_DATE}: ${formattedDueDate}`);
			}
			const twoDaysFromNow = new Date();
			twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
			if (
				dueDateObject > currentDate &&
				dueDateObject <= twoDaysFromNow
			) {
				setDueDateColor(colors.state.warning_yellow);
				setBgColor(primary.color4);
			} else if (dueDateObject < currentDate) {
				setDueDateColor(colors.primary.red_06);
				setBgColor(bg.lightOrange);
			} else {
				setDueDateColor(colors.state.success_green);
				setBgColor(bg.lightGreen);
			}

			if (
				availableExtensions > 0 &&
				dueDateExtensionMode === IDueDateExtension.DUE_DATE_EXTENSION &&
				!extensionInfoCheck
			) {
				setExtensionState(`${strings.NEED_EXTENSION}`);
			} else if (
				extensionRequests != null &&
				dueDateExtensionMode === IDueDateExtension.DUE_DATE_EXTENSION &&
				extensionInfoCheck
			) {
				setExtensionState(`${strings.CANCEL_EXTENSION}`);
			}
		}
	}, [date, disabled, extensionRequests]);

	const extensionTitle = `${
		extensionState === strings.CANCEL_EXTENSION
			? strings.CANCEL_EXTENSION_TXT
			: strings.EXTENSION_TXT
	} - ${title}`;

	const subTitleTxt =
		availableExtensions === 1
			? `${strings.NO_EXTENSION_LEFT}`
			: extensionState === strings.CANCEL_EXTENSION
				? `${strings.ON_CANCEL_ASSIGNMENT} ${cancel} ${strings.AVOID_PENALTY}`
				: `${strings.NO_MORE_EXTENSION} ${availableExtensions - 1} ${
						strings.LEFT_FOR_SUBMISSION
					}`;

	const primaryButtonText =
		extensionState === strings.CANCEL_EXTENSION
			? strings.CANCEL_EXTENSION
			: strings.GET_EXTENSION;

	const hideModalAction = () => {
		GlobeBottomSheetController.hideModal();
	};

	const ExtensionOnConfirm = () => {
		if (extensionState === strings.CANCEL_EXTENSION) {
			const onCompleteCancel = () => {
				setExtensionState(strings.NEED_EXTENSION);
				setDueDateState(`${strings.DUE_DATE}: ${formattedDueDate}`);
			};
			onCancelExtensionHandler(onCompleteCancel);
		} else {
			const onChangeToCancel = () => {
				setExtensionState(strings.CANCEL_EXTENSION);
				setDueDateState(`${strings.NEW_DUE_DATE}: ${formattedDueDate}`);
			};
			onExtensionHandler(onChangeToCancel);
		}
	};

	return {
		dueDateColor,
		dueDateState,
		bgColor,
		dueDateObject,
		availableExtensions,
		currentDate,
		ExtensionOnConfirm,
		extensionState,
		hideModalAction,
		primaryButtonText,
		subTitleTxt,
		extensionTitle,
	};
};

export default usePenaltyController;
