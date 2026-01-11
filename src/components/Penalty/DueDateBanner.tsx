import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import usePenaltyController from "@hooks/usePenaltyController";

import { formatDateByTime } from "@utils/timezoneHelper";

import { ExtensionRequest } from "@interface/milestonetype.interface";

import { C } from "@assets/constants";
import { strings } from "@assets/strings";

import { dueDateStyles as styles } from "./DueDateStyles";

interface IDueDateProps {
	date?: string;
	extensionRequests?: ExtensionRequest[] | null;
	disabled?: boolean | null;
	assetCode?: string | number;
	title?: string;
	isOptional?: boolean;
	availableFrom?: string;
	level1?: string | number | null;
	level2?: string | number | null;
	level4?: string | number | null;
	level3?: string | number | null;
	moduleCode?: string | number | null;
	assetStatus: string | null;
}

const {
	themes: { border },
	commonStyles: {
		text: { xSm },
	},
} = C;

const DueDateBanner = ({
	date,
	assetStatus,
	disabled,
	extensionRequests,
	assetCode,
	title,
	availableFrom,
	level4,
	level2,
	level3,
	moduleCode,
}: IDueDateProps) => {
	const { dueDateColor, dueDateState, currentDate } = usePenaltyController({
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
	});

	const txtStyle = StyleSheet.compose(
		{ ...xSm },
		dueDateColor ? { color: dueDateColor } : null,
	);
	const isAvailable = availableFrom
		? new Date(currentDate) >= new Date(availableFrom)
		: true;

	const availableFromDate = availableFrom
		? `${formatDateByTime(`${availableFrom}`)}`
		: "";

	return (
		<>
			{!assetStatus ? (
				<>
					{isAvailable && date && dueDateState ? (
						<View style={styles.main}>
							<RNText
								title={dueDateState}
								numberOfLines={2}
								style={txtStyle}
							/>
						</View>
					) : null}

					{availableFrom && !isAvailable ? (
						<View style={styles.main}>
							<RNText
								title={`${strings.AVAILABLE_FROM}: ${availableFromDate}`}
								numberOfLines={2}
								style={{ color: border.green, ...xSm }}
							/>
						</View>
					) : null}
				</>
			) : null}
		</>
	);
};
export default DueDateBanner;
