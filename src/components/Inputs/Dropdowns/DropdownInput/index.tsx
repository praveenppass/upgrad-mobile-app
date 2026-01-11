import React, { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import DropdownField from "@components/Inputs/Dropdowns/common/DropdownField";
import DropdownModal, {
	IDropdownInputType,
} from "@components/Inputs/Dropdowns/common/DropdownModal";
import withFormContext from "@components/Inputs/withFormContext";

import { strings } from "@assets/strings";

export interface IDropdownInputProps extends UseControllerProps {
	label: string;
	defaultValue?: IDropdownInputItem;
	isMandatory?: boolean;
	isSearchEnabled?: boolean;
	description?: string;
	values?: IDropdownInputItem[];
}

const DropdownInput = (dropDownProps: IDropdownInputProps) => {
	const {
		name,
		label,
		rules,
		defaultValue,
		isMandatory,
		isSearchEnabled,
		description,
		values = [],
		disabled,
	} = dropDownProps;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const [searchText, setSearchText] = useState<string>("");
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		if (showDropdown) setSearchText("");
	}, [showDropdown]);

	const handleCloseDropdown = () => setShowDropdown(false);
	const hasValues = !!values.length;

	return (
		<>
			<DropdownField
				label={label}
				isMandatory={isMandatory}
				error={error?.message}
				description={description}
				value={field.value?.label}
				disabled={disabled}
				onFieldPress={() => setShowDropdown(true)}
			/>

			<DropdownModal
				emptyDataTitle={strings.NO_OPTIONS_AVAIL}
				fieldValue={field.value?.value}
				onCloseDropdown={handleCloseDropdown}
				isSearchEnabled={isSearchEnabled && hasValues}
				label={label}
				onFieldPress={(item) => {
					field.onChange(item);
					handleCloseDropdown();
				}}
				showDropdown={showDropdown}
				values={values}
				dropdownType={IDropdownInputType.NORMAL}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
		</>
	);
};

export default withFormContext(DropdownInput);
