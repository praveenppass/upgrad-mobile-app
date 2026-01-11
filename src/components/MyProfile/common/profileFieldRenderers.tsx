import React, { useEffect, useState } from "react";

import ActionCard from "@components/Inputs/ActionCard";
import CardInput, { ICardItem } from "@components/Inputs/CardInput";
import CheckboxInput, {
	ICheckboxInput,
} from "@components/Inputs/CheckboxInput";
import DateInput, { IDateInputProps } from "@components/Inputs/DateInput";
import DependentInput from "@components/Inputs/DependentInput";
import DropdownInput from "@components/Inputs/Dropdowns/DropdownInput";
import DependentDropdownInput from "@components/Inputs/Dropdowns/DropdownInput/DependentDropdownInput";
import DependentSearchDropdownInput from "@components/Inputs/Dropdowns/SearchDropdownInput/DependentSearchDropdownInput";
import NetworkDependentDropdownIput from "@components/Inputs/NetworkDependentDropdownInput";
import NumberInputWithVerify from "@components/Inputs/numberInputVerify/NumberInputWithVerify";
import RadioInput, { IRadioInputProps } from "@components/Inputs/RadioInput";
import TextInput, { ITextInputProps } from "@components/Inputs/TextInput";
import UploadInput, { IUploadInputProps } from "@components/Inputs/UploadInput";
import {
	IActionCardFieldConfig,
	ICardFieldConfig,
	ICheckboxFieldConfig,
	IDateFieldConfig,
	IDropdownFieldConfig,
	IMobileNumberVerifyFieldConfig,
	IRadioFieldConfig,
	ISearchFieldConfig,
	ITextFieldConfig,
	IUploadFieldConfig,
} from "@components/MyProfile/common/profile.interface";

import { strings } from "@assets/strings";

export const RenderDropdownField = ({
	valuesDependency,
	isDisabled,
	validations,
	...rest
}: IDropdownFieldConfig) => {
	const inputProps = {
		...rest,
		placeholder: strings.CHOOSE_OPTION,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency) return <DropdownInput {...inputProps} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		getValues,
		hideUntilDependency,
	} = valuesDependency;

	if (!dependency)
		return (
			<NetworkDependentDropdownIput
				{...inputProps}
				getValues={getValues}
			/>
		);

	return (
		<DependentDropdownInput
			{...inputProps}
			getValues={getValues}
			dependency={dependency}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			dependencyLabels={dependencyLabels}
		/>
	);
};

export const RenderSearchField = ({
	valuesDependency,
	isDisabled,
	validations,
	...rest
}: ISearchFieldConfig) => {
	const inputProps = {
		...rest,
		placeholder: strings.CHOOSE_OPTION,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency) {
		return <></>;
	}

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
		searchFieldName,
		getValues,
	} = valuesDependency;

	return (
		<DependentSearchDropdownInput
			{...inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			searchFieldName={searchFieldName}
			getValues={getValues}
		/>
	);
};

export const RenderCheckboxField = ({
	valuesDependency,
	isDisabled,
	validations,
	...rest
}: ICheckboxFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};
	if (!valuesDependency) return <CheckboxInput {...inputProps} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput<ICheckboxInput>
			Input={CheckboxInput}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
		/>
	);
};

export const RenderRadioField = ({
	valuesDependency,
	isDisabled,
	validations,
	...rest
}: IRadioFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency) return <RadioInput {...inputProps} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput<IRadioInputProps>
			Input={RadioInput}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
		/>
	);
};

export const RenderUploadField = ({
	valuesDependency,
	isDisabled,
	validations,
	...rest
}: IUploadFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency) return <UploadInput {...inputProps} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput<IUploadInputProps>
			Input={UploadInput}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
		/>
	);
};

export const RenderTextField = ({
	valuesDependency,
	validations,
	isDisabled,
	...rest
}: ITextFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency)
		return <TextInput {...inputProps} placeholder={rest.label} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput<ITextInputProps>
			Input={TextInput}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			isLabelAsPlaceholder
		/>
	);
};

export const RenderDateField = ({
	valuesDependency,
	validations,
	isDisabled,
	...rest
}: IDateFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};

	if (!valuesDependency)
		return <DateInput {...inputProps} placeholder={rest.label} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput<IDateInputProps>
			Input={DateInput}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
			isLabelAsPlaceholder
		/>
	);
};

export const RenderMobileNumberVerifyField = ({
	validations,
	isDisabled,
	...rest
}: IMobileNumberVerifyFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
	};

	return <NumberInputWithVerify {...inputProps} />;
};

export const RenderCardField = ({
	valuesDependency,
	isDisabled,
	validations,
	iconMapping,
	name,
	...rest
}: ICardFieldConfig) => {
	const inputProps = {
		...rest,
		name,
		rules: validations,
		disabled: isDisabled,
	};

	const [values, setValues] = useState<ICardItem[]>([]);

	useEffect(() => {
		if (!valuesDependency?.getValues) return;

		const fetchValues = async () => {
			const getValues = valuesDependency.getValues;
			if (!getValues) return;

			const fetchedValues = await getValues();
			if (!fetchedValues) return;

			// Handle icon mapping
			let finalIconMapping:
				| Record<
						string,
						React.ComponentType<{
							width?: number;
							height?: number;
							color?: string;
						}>
				  >
				| undefined = iconMapping;

			// For gender field, handle case-insensitive matching
			if (name === "gender" && iconMapping) {
				// Create a normalized mapping that handles case-insensitive lookups
				const normalizedMapping: Record<
					string,
					React.ComponentType<{
						width?: number;
						height?: number;
						color?: string;
					}>
				> = {};

				fetchedValues.forEach((item) => {
					const normalizedKey = item.value.toUpperCase();

					// Try exact match first
					if (iconMapping[item.value]) {
						normalizedMapping[item.value] = iconMapping[item.value];
					}
					// Try uppercase match (e.g., "MALE" matches "Male")
					else if (iconMapping[normalizedKey]) {
						normalizedMapping[item.value] =
							iconMapping[normalizedKey];
					}
				});
				finalIconMapping = normalizedMapping;
			}

			// Map icons to values
			const valuesWithIcons: ICardItem[] = finalIconMapping
				? fetchedValues.map((item) => ({
						...item,
						icon: finalIconMapping
							? finalIconMapping[item.value]
							: undefined,
					}))
				: fetchedValues;

			setValues(valuesWithIcons);
		};

		fetchValues();
	}, [valuesDependency, iconMapping, name]);

	if (!valuesDependency || !valuesDependency.getValues || !values.length) {
		return <></>;
	}

	return <CardInput {...inputProps} values={values} />;
};

export const RenderActionCardField = ({
	valuesDependency,
	isDisabled,
	validations,
	title,
	subtitle,
	actionText,
	onActionPress,
	...rest
}: IActionCardFieldConfig) => {
	const inputProps = {
		...rest,
		rules: validations,
		disabled: isDisabled,
		title,
		subtitle,
		actionText,
		onActionPress,
	};

	if (!valuesDependency) return <ActionCard {...inputProps} />;

	const {
		dependency,
		dependencyLabels,
		dependencyValues,
		hideUntilDependency,
	} = valuesDependency;

	return (
		<DependentInput
			Input={ActionCard}
			inputProps={inputProps}
			dependency={dependency}
			dependencyLabels={dependencyLabels}
			dependencyValues={dependencyValues}
			hideUntilDependency={hideUntilDependency}
		/>
	);
};
