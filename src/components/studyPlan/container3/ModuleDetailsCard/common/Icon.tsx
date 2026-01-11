import React, { memo } from "react";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AnalyticsIcon, TimerLxp } from "@assets/icons";
import { CalendarOutlineIcon } from "@assets/icons/svg/studyPlan";

const { state, neutral } = colors;

// Constants
const ICON_SIZES = {
	timer: horizontalScale(14),
	analytics: horizontalScale(12),
	calendar: horizontalScale(11),
} as const;

// Types
export enum InfoType {
	TIME_LEFT,
	ASSESSMENTS,
	DUEDATE,
}

// Interfaces
interface IIcon {
	type: InfoType;
	isDueDatePassed?: boolean;
}

const Icon = ({ type, isDueDatePassed }: IIcon) => {
	switch (type) {
		case InfoType.TIME_LEFT:
			return (
				<TimerLxp
					width={ICON_SIZES.timer}
					height={ICON_SIZES.timer}
					color={neutral.grey_07}
				/>
			);
		case InfoType.ASSESSMENTS:
			return (
				<AnalyticsIcon
					width={ICON_SIZES.analytics}
					height={ICON_SIZES.analytics}
					color={neutral.grey_07}
				/>
			);
		case InfoType.DUEDATE:
			return (
				<CalendarOutlineIcon
					width={ICON_SIZES.calendar}
					height={ICON_SIZES.calendar}
					color={isDueDatePassed ? state.error_red : neutral.grey_07}
				/>
			);
	}
};

export default memo(Icon);
