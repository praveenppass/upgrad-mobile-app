import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DependentInput from "@components/Inputs/DependentInput";
import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import { IDropdownInputProps } from "@components/Inputs/Dropdowns/DropdownInput";
import SearchDropdownInput, {
	ISearchDropdownInputProps,
} from "@components/Inputs/Dropdowns/SearchDropdownInput";
import { extractDependentFieldValue } from "@components/MyProfile/common/profile.util";

import { getMasterData, IMasterDataKey } from "@services/cpsService";

interface IDependentSearchDropdownInputProps
	extends Omit<IDropdownInputProps, "values"> {
	getValues?: (...params: string[]) => Promise<IDropdownInputItem[]>;
	dependency?: string;
	hideUntilDependency?: boolean;
	dependencyValues?: string[];
	dependencyLabels?: Record<string, string>;
	searchFieldName?: IMasterDataKey;
	isAddEnabled?: boolean;
}

const DependentSearchDropdownInput = (
	props: IDependentSearchDropdownInputProps,
) => {
	const {
		dependency,
		dependencyValues,
		getValues,
		hideUntilDependency,
		dependencyLabels,
		name,
		searchFieldName,
		...rest
	} = props;

	const { control, resetField } = useFormContext();

	const dependentFieldValue = useWatch({
		control,
		name: dependency || "",
	});

	const extractedDependentFieldValue =
		extractDependentFieldValue(dependentFieldValue);

	const [searchText, setSearchText] = useState<string>("");
	const [searchValues, setSearchValues] = useState<IDropdownInputItem[]>([]);
	const [isInitialized, setInitialized] = useState(false);

	const [allSearchValues, setAllSearchValues] = useState<
		IDropdownInputItem[]
	>([]);

	const isSearchTextLengthValid = searchText.length >= 3;

	const debouncedFetch = useCallback(
		debounce(async (st: string) => {
			if (!searchFieldName && getValues) {
				const data = await getValues(
					searchText,
					extractedDependentFieldValue,
				);
				setSearchValues(data);
			} else {
				const filteredValues = allSearchValues.filter((value) =>
					value.label.toLowerCase().includes(st.toLowerCase()),
				);
				setSearchValues(filteredValues);
			}
		}, 300),
		[
			searchFieldName,
			allSearchValues,
			searchText,
			extractedDependentFieldValue,
		],
	);

	useEffect(() => {
		if (!dependency) return;

		if (isInitialized)
			resetField(name, {
				defaultValue: null,
			});
		else setInitialized(true);
	}, [extractedDependentFieldValue]);

	useEffect(() => {
		const fetchAllSearchValues = async () => {
			if (!searchFieldName) return;
			const data = await getMasterData(searchFieldName);
			setAllSearchValues(
				data?.map(({ value }) => ({
					label: value,
					value,
				})) ?? [],
			);
		};
		fetchAllSearchValues();
	}, []);

	useEffect(() => {
		if (!isSearchTextLengthValid) return;
		debouncedFetch(searchText);

		return () => {
			debouncedFetch.cancel();
		};
	}, [searchText, isSearchTextLengthValid, debouncedFetch]);

	return (
		<DependentInput<ISearchDropdownInputProps>
			Input={SearchDropdownInput}
			inputProps={{
				...rest,
				name,
				searchText,
				setSearchText,
				values: searchValues,
				updateValues: setSearchValues,
				searchFieldName,
			}}
			dependency={dependency || ""}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			dependencyLabels={dependencyLabels}
		/>
	);
};

export default DependentSearchDropdownInput;
