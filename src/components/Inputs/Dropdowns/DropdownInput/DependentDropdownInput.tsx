import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DependentInput from "@components/Inputs/DependentInput";
import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import DropdownInput, {
	IDropdownInputProps,
} from "@components/Inputs/Dropdowns/DropdownInput";
import { extractDependentFieldValue } from "@components/MyProfile/common/profile.util";

interface IDependentDropdownInputProps
	extends Omit<IDropdownInputProps, "values"> {
	values?: IDropdownInputItem[];
	getValues?: (...params: string[]) => Promise<IDropdownInputItem[]>;
	dependency: string;
	hideUntilDependency?: boolean;
	dependencyValues?: string[];
	dependencyLabels?: Record<string, string>;
}

const DependentDropdownInput = (props: IDependentDropdownInputProps) => {
	const {
		values,
		dependency,
		dependencyValues,
		getValues,
		hideUntilDependency,
		dependencyLabels,
		...rest
	} = props;

	const [fieldValues, setFieldValues] = useState<IDropdownInputItem[]>([]);
	const [isInitialized, setInitialized] = useState(false);

	const { control, resetField } = useFormContext();
	const dependentFieldValue = useWatch({
		control,
		name: dependency,
	});

	const extractedDependentFieldValue =
		extractDependentFieldValue(dependentFieldValue);

	useEffect(() => {
		const fetchValues = async () => {
			if (!extractedDependentFieldValue) {
				resetField(rest.name, {
					defaultValue: null,
				});

				return setFieldValues([]);
			}

			if (
				!dependencyValues ||
				dependencyValues.includes(extractedDependentFieldValue)
			) {
				if (values?.length) setFieldValues(values);
				else if (getValues) {
					if (isInitialized)
						resetField(rest.name, {
							defaultValue: null,
						});
					else setInitialized(true);

					if (extractedDependentFieldValue) {
						const v = await getValues(extractedDependentFieldValue);
						setFieldValues(v);
					} else {
						const v = await getValues();
						setFieldValues(v);
					}
				}
			}
		};

		fetchValues();
	}, [extractedDependentFieldValue]);

	return (
		<DependentInput<IDropdownInputProps>
			Input={DropdownInput}
			inputProps={{ ...rest, values: fieldValues }}
			dependency={dependency}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			dependencyLabels={dependencyLabels}
		/>
	);
};

export default DependentDropdownInput;
