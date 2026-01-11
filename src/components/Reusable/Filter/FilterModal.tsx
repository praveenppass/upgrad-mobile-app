import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomCheckbox from "@components/Reusable/CustomCheckbox";
import {
	Filter,
	IFilterState,
} from "@components/Reusable/Filter/filter.interface";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, regular, semiBold, medium, med, sm } = commonStyles.text;
const { neutral, cta, content } = colors;

interface IFilterModal<T extends string> {
	isVisible: boolean;
	onCloseModal: () => void;
	filters: Filter<T>[];
	initialFilterState: IFilterState<T>;
	setFilterState: (fs: IFilterState<T>) => void;
}

interface ICheckbox {
	isChecked: boolean;
	setIsChecked: (b: boolean) => void;
	label: string;
}

interface IToggleFilterOption {
	type: string;
	checked: boolean;
}

const Checkbox = ({ isChecked, setIsChecked, label }: ICheckbox) => (
	<CustomCheckbox
		isChecked={isChecked}
		setIsChecked={setIsChecked}
		label={label}
		checkboxStyle={[styles.checkbox, isChecked && styles.checkboxChecked]}
		labelStyle={styles.checkboxLabel}
		style={styles.checkboxContainer}
		checkmarkColor={neutral.white}
	/>
);

const FilterModal = <T extends string>({
	isVisible,
	onCloseModal,
	filters,
	initialFilterState,
	setFilterState,
}: IFilterModal<T>) => {
	const [filter, setFilter] = useState(initialFilterState);

	useEffect(() => {
		if (isVisible) setFilter(initialFilterState);
	}, [isVisible]);

	const [activeFilterType, setActiveFilterType] = useState<T>(
		filters[0].type,
	);

	const activeFilterState = filter[activeFilterType];
	const activeFilterOptions =
		filters.find(({ type }) => type === activeFilterType)?.options || [];

	const isActiveFilterOptionsValid = activeFilterOptions.length > 1;

	const activeFilterOptionsStatus = activeFilterOptions.map(
		({ type }) => type,
	);

	const toggleSelectAll = (checked: boolean) =>
		setFilter({
			...filter,
			[activeFilterType]: checked ? activeFilterOptionsStatus : [],
		});

	const isSelectAllChecked = isEqual(
		activeFilterState,
		activeFilterOptionsStatus,
	);

	const toggleFilterOption = ({ type, checked }: IToggleFilterOption) => {
		let options;

		if (checked) options = [...activeFilterState, type];
		else options = activeFilterState.filter((s) => s !== type);

		setFilter({
			...filter,
			[activeFilterType]: options,
		});
	};

	const isFilterOptionChecked = (type: string) =>
		activeFilterState.includes(type);

	const handleResetFilter = () => {
		const keys = Object.keys(filter);

		const resetFilterState = keys.reduce(
			(acc, key) => ({ ...acc, [key]: [] }),
			{} as Record<T, string[]>,
		);

		setFilter(resetFilterState);
		setFilterState(resetFilterState);

		onCloseModal();
	};

	const handleApplyFilter = () => {
		setFilterState(filter);
		onCloseModal();
	};

	const isAnyFilterApplied = !Object.values(filter).flat().length;

	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={onCloseModal}
			onBackPress={onCloseModal}
			style={styles.modal}
			disableCloseOnSwipeDown
		>
			<View>
				<View style={styles.indicator} />

				<View style={styles.container}>
					<View style={styles.headingContainer}>
						<RNText style={styles.heading}>Filters</RNText>
					</View>

					<View style={styles.filterContainer}>
						<View style={styles.filterTypeContainer}>
							{filters.map(({ type, title }) => {
								const isActive = activeFilterType === type;

								const hasFilterForActiveFilterState =
									!!filter[type].length;

								return (
									<Pressable
										key={type}
										onPress={() =>
											setActiveFilterType(type)
										}
										style={[
											styles.filterType,
											isActive && styles.activeFilterType,
										]}
									>
										<RNText
											style={[
												styles.filterTypeText,
												isActive &&
													styles.activeFilterTypeText,
											]}
										>
											{title}
										</RNText>
										{hasFilterForActiveFilterState && (
											<View
												style={styles.filterIndicator}
											/>
										)}
									</Pressable>
								);
							})}
						</View>
						<ScrollView style={styles.filterOptionContainer}>
							<Pressable
								style={styles.filterOptionContentContainer}
							>
								{isActiveFilterOptionsValid && (
									<Checkbox
										isChecked={isSelectAllChecked}
										setIsChecked={toggleSelectAll}
										label={strings.SELECT_ALL}
									/>
								)}

								{activeFilterOptions.map((status) => (
									<Checkbox
										key={status.type}
										isChecked={isFilterOptionChecked(
											status.type,
										)}
										setIsChecked={(checked) =>
											toggleFilterOption({
												type: status.type,
												checked,
											})
										}
										label={status.title}
									/>
								))}
							</Pressable>
						</ScrollView>
					</View>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={[
						styles.button,
						styles.lightButton,
						isAnyFilterApplied && styles.disabledResetButton,
					]}
					onPress={handleResetFilter}
					disabled={isAnyFilterApplied}
				>
					<RNText
						title={strings.RESET_FILTER}
						style={[
							styles.buttonText,
							styles.lightButtonText,
							isAnyFilterApplied && styles.disabledButtonText,
						]}
					/>
				</Pressable>
				<Pressable
					style={[
						styles.button,
						isAnyFilterApplied && styles.disabledApplyButton,
					]}
					onPress={handleApplyFilter}
					disabled={isAnyFilterApplied}
				>
					<RNText title={strings.APPLY} style={styles.buttonText} />
				</Pressable>
			</View>
		</ActionModal>
	);
};

export default FilterModal;

const styles = StyleSheet.create({
	activeFilterType: {
		backgroundColor: neutral.grey_02,
		borderRightColor: neutral.grey_07,
		borderRightWidth: 1,
	},
	activeFilterTypeText: {
		...medium,
		color: neutral.black,
	},
	button: {
		backgroundColor: cta.fill.primary_black_default,
		borderRadius: horizontalScale(6),
		flex: 1,
		paddingVertical: verticalScale(12),
	},
	buttonContainer: {
		columnGap: horizontalScale(12),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(8),
	},
	buttonText: {
		textAlign: "center",
		...semiBold,
		...md,
		color: neutral.white,
	},
	checkbox: {
		borderColor: neutral.black,
		borderRadius: horizontalScale(2),
		borderWidth: horizontalScale(1),
		marginRight: 0,
	},
	checkboxChecked: {
		backgroundColor: neutral.black,
	},
	checkboxContainer: {
		flex: 1,
		marginTop: 0,
		marginVertical: 0,
	},
	checkboxLabel: {
		...sm,
		...regular,
		color: content.text.body_grey_08,
		marginLeft: horizontalScale(8),
	},
	container: {
		height: verticalScale(600),
	},
	disabledApplyButton: {
		backgroundColor: cta.fill.disable,
	},
	disabledButtonText: {
		color: cta.fill.disable,
	},
	disabledResetButton: {
		borderColor: cta.fill.disable,
	},
	filterContainer: { flexDirection: "row", flex: 1 },
	filterIndicator: {
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(5),
		height: horizontalScale(5),
		width: horizontalScale(5),
	},
	filterOptionContainer: {
		backgroundColor: neutral.grey_02,
		flex: 1,
		paddingHorizontal: horizontalScale(20),
	},
	filterOptionContentContainer: {
		flex: 1,
		gap: verticalScale(16),
		paddingVertical: verticalScale(10),
	},
	filterType: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(15),
		paddingVertical: verticalScale(8),
	},
	filterTypeContainer: { width: horizontalScale(140) },
	filterTypeText: {
		...med,
		...regular,
		color: neutral.grey_06,
	},
	heading: {
		...md,
		...semiBold,
		color: neutral.black,
	},
	headingContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(12),
		width: horizontalScale(64),
	},
	lightButton: {
		backgroundColor: neutral.white,
		borderColor: cta.fill.primary_black_default,
		borderWidth: 1,
	},
	lightButtonText: {
		color: neutral.black,
	},
	modal: {
		paddingBottom: 0,
		paddingHorizontal: 0,
	},
});
