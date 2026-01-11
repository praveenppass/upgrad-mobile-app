import React, { useEffect, useRef } from "react";
import { UseControllerProps, useFormContext, useWatch } from "react-hook-form";

import { extractDependentFieldValue } from "@components/MyProfile/common/profile.util";

type IDefaultInputProps = {
	label: string;
	placeholder?: string;
} & UseControllerProps;

type IInputProps<T> = T & IDefaultInputProps;

interface IUseDependentInput<T> {
	dependency: string;
	hideUntilDependency?: boolean;
	dependencyValues?: string[];
	dependencyLabels?: Record<string, string>;
	Input: React.FC<IInputProps<T>>;
	inputProps: IInputProps<T>;
	isLabelAsPlaceholder?: boolean;
}

const DependentInput = <T,>({
	Input,
	inputProps,
	dependency,
	dependencyLabels,
	dependencyValues,
	hideUntilDependency,
	isLabelAsPlaceholder,
}: IUseDependentInput<T>) => {
	const { control, resetField } = useFormContext();

	const { name, label } = inputProps;

	const dependentFieldValue = useWatch({
		control,
		name: dependency,
	});

	const extractedDependentFieldValue =
		extractDependentFieldValue(dependentFieldValue);

	const dependentLabel =
		extractedDependentFieldValue &&
		dependencyLabels &&
		dependencyLabels[extractedDependentFieldValue];

	const shouldHideInput =
		hideUntilDependency &&
		(!dependencyValues
			? !extractedDependentFieldValue
			: !dependencyValues?.includes(extractedDependentFieldValue));

	const prevShouldHideRef = useRef(shouldHideInput);

	useEffect(() => {
		if (shouldHideInput && !prevShouldHideRef.current) {
			resetField(name, {
				defaultValue: null,
			});
		}
		prevShouldHideRef.current = shouldHideInput;
	}, [shouldHideInput, name, resetField]);

	if (shouldHideInput) return <></>;

	const finalLabel = dependentLabel || label;

	const placeholder = isLabelAsPlaceholder
		? finalLabel
		: inputProps.placeholder;

	return (
		<Input {...inputProps} label={finalLabel} placeholder={placeholder} />
	);
};

export default DependentInput;
