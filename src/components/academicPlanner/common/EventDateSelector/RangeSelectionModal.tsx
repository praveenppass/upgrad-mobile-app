import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IRangeSelectionType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IRangeSelectionModal {
	isVisible: boolean;
	onCloseModal: () => void;
	rangeSelectionType: IRangeSelectionType;
	setRangeSelectionType: (rangeSelectionType: IRangeSelectionType) => void;

	hideCustomDateSelector?: boolean;
}

const { md, regular, semiBold } = commonStyles.text;
const { neutral, cta } = colors;

const ranges = [
	{ title: strings.DAY, type: IRangeSelectionType.Day },
	{ title: strings.WEEK, type: IRangeSelectionType.Week },
	{ title: strings.MONTH, type: IRangeSelectionType.Month },
	{ title: strings.CUSTOM_DATES, type: IRangeSelectionType.CustomDates },
];

const filterRanges = (hideCustomDateSelector: boolean) =>
	ranges.filter(
		(range) =>
			!hideCustomDateSelector ||
			range.type !== IRangeSelectionType.CustomDates,
	);

interface IRangeItem {
	type: IRangeSelectionType;
	title: string;
	active: boolean;
	onPress: () => void;
}

const RangeItem = ({ type, title, active, onPress }: IRangeItem) => (
	<Pressable key={type} onPress={onPress} style={styles.range}>
		<RNText
			title={title}
			style={[styles.modalItemText, active && styles.modalItemTextActive]}
		/>
	</Pressable>
);

const RangeSelectionModal = ({
	isVisible,
	onCloseModal,
	rangeSelectionType,
	setRangeSelectionType,
	hideCustomDateSelector = false,
}: IRangeSelectionModal) => (
	<ActionModal
		isOpen={isVisible}
		closeModal={onCloseModal}
		onBackPress={onCloseModal}
	>
		<View style={styles.indicator} />
		<View style={styles.container}>
			{filterRanges(hideCustomDateSelector).map((range) => (
				<RangeItem
					key={range.type}
					type={range.type}
					title={range.title}
					active={rangeSelectionType === range.type}
					onPress={() => setRangeSelectionType(range.type)}
				/>
			))}
		</View>
	</ActionModal>
);

export default RangeSelectionModal;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginVertical: verticalScale(12),
		rowGap: verticalScale(6),
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(12),
		width: horizontalScale(64),
	},
	modalItemText: {
		...regular,
		...md,
		color: neutral.black,
	},
	modalItemTextActive: {
		...semiBold,
	},
	range: {
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(4),
	},
});
