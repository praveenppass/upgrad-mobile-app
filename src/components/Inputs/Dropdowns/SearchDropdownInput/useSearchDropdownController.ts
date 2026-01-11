import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";

import { addMasterData, IMasterDataKey } from "@services/cpsService";

interface IUseSearchDropdownController extends UseControllerProps {
	defaultValue?: IDropdownInputItem;
	searchText: string;
	setSearchText: (searchText: string) => void;
	updateValues: (values: IDropdownInputItem[]) => void;
	values: IDropdownInputItem[];
	searchFieldName?: IMasterDataKey;
}

const useSearchDropdownController = ({
	name,
	rules,
	defaultValue,
	setSearchText,
	searchText,
	updateValues,
	values,
	searchFieldName,
}: IUseSearchDropdownController) => {
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const [showDropdown, setShowDropdown] = useState(false);

	const [isAddModalVisible, setAddModalVisible] = useState(false);

	const handleCloseAddModal = () => setAddModalVisible(false);

	const handleAddItemCancel = () => {
		handleCloseAddModal();
		setTimeout(() => setShowDropdown(true), 200);
	};

	const handleCloseDropdownAndClearSearchText = () => {
		setShowDropdown(false);
		setSearchText("");
	};

	const handleDropdownItemFieldPress = (item: IDropdownInputItem) => {
		field.onChange(item);
		handleCloseDropdownAndClearSearchText();
	};

	const handleAddItemFieldPress = () => {
		setShowDropdown(false);
		setTimeout(() => setAddModalVisible(true), 200);
	};

	const handleDropdownFieldPress = () => setShowDropdown(true);

	const handleAddItemPress = async () => {
		if (!searchFieldName) return;

		handleCloseAddModal();

		await addMasterData({
			masterDataKey: searchFieldName,
			value: searchText,
		});

		field.onChange({
			label: searchText,
			value: searchText,
		});

		updateValues([...values, { label: searchText, value: searchText }]);

		setSearchText("");
	};

	return {
		showDropdown,
		isAddModalVisible,
		handleCloseAddModal,
		handleAddItemCancel,
		handleCloseDropdownAndClearSearchText,
		handleDropdownItemFieldPress,
		handleAddItemFieldPress,
		handleDropdownFieldPress,
		handleAddItemPress,

		error,
		field,
	};
};

export default useSearchDropdownController;
