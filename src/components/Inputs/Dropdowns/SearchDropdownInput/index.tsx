import React from "react";
import { UseControllerProps } from "react-hook-form";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import DropdownField from "@components/Inputs/Dropdowns/common/DropdownField";
import DropdownModal, {
	IDropdownInputType,
} from "@components/Inputs/Dropdowns/common/DropdownModal";
import AddFieldModal from "@components/Inputs/Dropdowns/SearchDropdownInput/common/AddFieldModal";
import useSearchDropdownController from "@components/Inputs/Dropdowns/SearchDropdownInput/useSearchDropdownController";
import withFormContext from "@components/Inputs/withFormContext";

import { IMasterDataKey } from "@services/cpsService";

import { strings } from "@assets/strings";

export interface ISearchDropdownInputProps extends UseControllerProps {
	label: string;
	defaultValue?: IDropdownInputItem;
	isMandatory?: boolean;
	isAddEnabled?: boolean;
	description?: string;
	values?: IDropdownInputItem[];
	searchText: string;
	setSearchText: (searchText: string) => void;
	updateValues: (values: IDropdownInputItem[]) => void;
	searchFieldName?: IMasterDataKey;
}

const SearchDropdownInput = (dropDownProps: ISearchDropdownInputProps) => {
	const {
		name,
		label,
		rules,
		defaultValue,
		isMandatory,
		isAddEnabled,
		description,
		values = [],
		disabled,
		searchText,
		setSearchText,
		updateValues,
		searchFieldName,
	} = dropDownProps;

	const {
		showDropdown,
		isAddModalVisible,
		handleCloseAddModal,
		handleAddItemCancel,
		handleCloseDropdownAndClearSearchText,
		handleDropdownFieldPress,
		handleAddItemFieldPress,
		handleAddItemPress,
		error,
		handleDropdownItemFieldPress,
		field,
	} = useSearchDropdownController({
		name,
		rules,
		defaultValue,
		searchText,
		setSearchText,
		updateValues,
		values,
		searchFieldName,
	});

	return (
		<>
			<DropdownField
				label={label}
				isMandatory={isMandatory}
				error={error?.message}
				description={description}
				value={field.value?.label}
				disabled={disabled}
				onFieldPress={handleDropdownFieldPress}
			/>

			<DropdownModal
				emptyDataTitle={strings.TYPE_MIN_3_CHAR}
				fieldValue={field.value?.value}
				onCloseDropdown={handleCloseDropdownAndClearSearchText}
				isSearchEnabled
				label={label}
				onFieldPress={handleDropdownItemFieldPress}
				showDropdown={showDropdown}
				values={values}
				dropdownType={IDropdownInputType.SEARCH}
				onAddFieldPress={handleAddItemFieldPress}
				searchText={searchText}
				setSearchText={setSearchText}
				isAddEnabled={isAddEnabled}
			/>

			<AddFieldModal
				isVisible={isAddModalVisible}
				onModalClose={handleCloseAddModal}
				onCancelPress={handleAddItemCancel}
				onAddPress={handleAddItemPress}
			/>
		</>
	);
};

export default withFormContext(SearchDropdownInput);
