import React, { useEffect, useRef, useState } from "react";
import {
	FlatList,
	Pressable,
	TextInput as RNTextInput,
	StyleSheet,
	View,
} from "react-native";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import DropdownFlatlistItem from "@components/Inputs/Dropdowns/common/DropdownFlatlistItem";
import EmptyDropdown from "@components/Inputs/Dropdowns/common/EmptyDropdown";
import AddFieldItem from "@components/Inputs/Dropdowns/SearchDropdownInput/common/AddFieldItem";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AlertIcon, SearchGrayIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, semiBold, reg, regular, sm } = commonStyles.text;
const { neutral, cta, state } = colors;

export enum IDropdownInputType {
	SEARCH,
	NORMAL,
}

interface IDropdownModal {
	showDropdown: boolean;
	onCloseDropdown: () => void;
	isSearchEnabled?: boolean;
	values: IDropdownInputItem[];
	label: string;
	fieldValue: string;
	onFieldPress: (item: IDropdownInputItem) => void;
	onAddFieldPress?: () => void;
	emptyDataTitle: string;
	dropdownType: IDropdownInputType;
	searchText: string;
	setSearchText: (searchText: string) => void;
	isAddEnabled?: boolean;
}
const validateSearchText = (st: string) => {
	if (st.length > 128) return strings.MAX_128_CHAR;
	else return null;
};

const DropdownModal = ({
	showDropdown,
	onCloseDropdown,
	isSearchEnabled,
	values,
	label,
	fieldValue,
	onFieldPress,
	onAddFieldPress,
	emptyDataTitle,
	dropdownType = IDropdownInputType.NORMAL,
	searchText,
	setSearchText,
	isAddEnabled = true,
}: IDropdownModal) => {
	const flatListRef = useRef<FlatList<IDropdownInputItem> | null>(null);
	const searchInputRef = useRef<RNTextInput | null>(null);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (showDropdown) {
			setTimeout(() => {
				onSearchPress();
			}, 300);
		}
	}, [showDropdown]);

	const onSearchPress = () => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	const isSearchTextLengthValid = searchText.trim().length >= 3;

	const searchValues = values.filter((item) =>
		item.label.toLowerCase().includes(searchText.trim().toLowerCase()),
	);

	useEffect(() => {
		if (!isSearchTextLengthValid) return;

		setSearchText(searchText);
	}, [searchText]);

	const isLabelAlreadyPresent = searchValues.some(
		(searchValue) => searchValue.label === searchText,
	);

	return (
		<ActionModal
			isOpen={showDropdown}
			closeModal={onCloseDropdown}
			onBackPress={onCloseDropdown}
			style={[styles.modal, isSearchEnabled && styles.modalFixed]}
			disableCloseOnSwipeDown
		>
			<View style={styles.indicator} />
			<View style={styles.modalLabelContainer}>
				<RNText style={styles.modalLabelText}>{label}</RNText>
			</View>

			{isSearchEnabled ? (
				<View style={styles.searchContainer}>
					<Pressable
						style={[
							styles.searchInputContainer,
							error ? styles.errorInput : null,
						]}
						onPress={onSearchPress}
					>
						<SearchGrayIcon />
						<RNTextInput
							ref={searchInputRef}
							placeholder={strings.SEARCH}
							placeholderTextColor={neutral.grey_05}
							style={styles.searchInput}
							onChangeText={(st) => {
								const err = validateSearchText(st);

								if (err) setError(err);
								else setError(null);

								setSearchText(st);
							}}
							value={searchText}
						/>
					</Pressable>
					{error ? (
						<View style={styles.errorContainer}>
							<AlertIcon />
							<RNText style={styles.errorLabel} title={error} />
						</View>
					) : (
						<></>
					)}
				</View>
			) : (
				<></>
			)}
			<FlatList
				data={
					dropdownType === IDropdownInputType.NORMAL
						? searchValues
						: isSearchTextLengthValid
							? searchValues
							: []
				}
				keyExtractor={(item) => item.value}
				ref={flatListRef}
				keyboardShouldPersistTaps="handled"
				initialNumToRender={50}
				renderItem={({ item }) => (
					<DropdownFlatlistItem
						isActive={fieldValue === item.value}
						label={item.label}
						onPress={() => onFieldPress(item)}
					/>
				)}
				ListEmptyComponent={() => (
					<EmptyDropdown
						hideDropdown={isSearchTextLengthValid}
						title={emptyDataTitle}
					/>
				)}
				ListFooterComponent={() => (
					<AddFieldItem
						hideItem={
							!isAddEnabled ||
							dropdownType === IDropdownInputType.NORMAL ||
							!isSearchTextLengthValid ||
							isLabelAlreadyPresent ||
							!!error
						}
						onFieldPress={() => onAddFieldPress?.()}
						label={searchText.trim()}
					/>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</ActionModal>
	);
};

export default DropdownModal;

const styles = StyleSheet.create({
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: verticalScale(5),
		marginTop: verticalScale(5),
	},
	errorInput: {
		borderColor: state.error_red,
	},
	errorLabel: {
		color: state.error_red,
		...regular,
		...sm,
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	modal: {
		maxHeight: verticalScale(400),
		paddingHorizontal: 0,
	},
	modalFixed: {
		height: verticalScale(400),
	},
	modalLabelContainer: {
		alignItems: "center",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},
	modalLabelText: {
		...reg,
		...semiBold,
		color: neutral.black,
	},
	searchContainer: {
		marginHorizontal: horizontalScale(14),
		marginVertical: verticalScale(8),
	},
	searchInput: {
		...md,
		color: neutral.grey_07,
		flex: 1,
	},
	searchInputContainer: {
		alignItems: "center",
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(10),
		borderWidth: 1,
		columnGap: horizontalScale(12),
		flexDirection: "row",
		height: verticalScale(36),
		paddingHorizontal: horizontalScale(16),
	},
	separator: {
		backgroundColor: neutral.grey_03,
		height: 1,
	},
});
