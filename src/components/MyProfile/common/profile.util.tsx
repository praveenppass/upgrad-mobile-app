import moment from "moment-timezone";
import React from "react";

import EducationDetailsCard from "@components/MyProfile/common/EducationDetailsCard";
import {
	IFieldConfig,
	IFieldDependentValue,
	IFieldValidations,
	IGetTimezoneLabel,
	IGetValidations,
	IProfileInputType,
	IValidationType,
} from "@components/MyProfile/common/profile.interface";
import {
	RenderActionCardField,
	RenderCardField,
	RenderCheckboxField,
	RenderDateField,
	RenderDropdownField,
	RenderMobileNumberVerifyField,
	RenderRadioField,
	RenderSearchField,
	RenderTextField,
	RenderUploadField,
} from "@components/MyProfile/common/profileFieldRenderers";

import { getTimezoneFromStore } from "@utils/store.util";

import { strings } from "@assets/strings";

export const renderFields = (fields: IFieldConfig[]) => {
	return fields.map((field, index) => renderField(field, index));
};

const renderField = (field: IFieldConfig, index: number) => {
	// console.log(index, "show the field type", field);
	// CRITICAL FIX: Use field.name as React key to prevent component reuse across different fields
	// Using index as key causes React to reuse components when navigating between sections,
	// leading to data bleeding (e.g., address data appearing in LinkedIn field)
	// See: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
	const fieldKey = field.name || `field-${index}`;

	switch (field.type) {
		case IProfileInputType.TEXT:
			return <RenderTextField {...field} key={fieldKey} />;
		case IProfileInputType.DATE:
			return <RenderDateField {...field} key={fieldKey} />;
		case IProfileInputType.CHECKBOX:
			return <RenderCheckboxField {...field} key={fieldKey} />;
		case IProfileInputType.RADIO:
			return <RenderRadioField {...field} key={fieldKey} />;
		case IProfileInputType.UPLOAD:
			return <RenderUploadField {...field} key={fieldKey} />;
		case IProfileInputType.DROPDOWN:
			return <RenderDropdownField {...field} key={fieldKey} />;
		case IProfileInputType.SEARCH:
			return <RenderSearchField {...field} key={fieldKey} />;
		case IProfileInputType.MOBILE_NUMBER_VERIFY:
			return <RenderMobileNumberVerifyField {...field} key={fieldKey} />;
		case IProfileInputType.CARD:
			return <RenderCardField {...field} key={fieldKey} />;
		case IProfileInputType.ACTION_CARD:
			return <RenderActionCardField {...field} key={fieldKey} />;
		case IProfileInputType.EDUCATION_DETAILS_CARD:
			return <EducationDetailsCard {...field} key={fieldKey} />;
		default: {
			return <></>;
		}
	}
};

export const getTimezonePrefixOffset = (offset: string) => `(UTC${offset})`;

export const extractTimezoneFromLabel = (timezoneLabel: string) => {
	const [utcOffset, timezone] = timezoneLabel.split(" ");
	const [_, utc] = utcOffset.split("UTC");
	const [offset] = utc.split(")");
	return {
		name: timezone.trim(),
		offset,
	};
};

export const getTimezoneLabel = ({ timezone, offset }: IGetTimezoneLabel) => {
	return `${getTimezonePrefixOffset(offset)} ${timezone}`;
};

export const extractDependentFieldValue = (value?: IFieldDependentValue) => {
	if (!value) return "";
	if (typeof value === "string" || value instanceof Date)
		return value.toString();
	if (typeof value === "boolean") return String(value);
	if ("value" in value) return value.value;
	return "";
};

export const getFieldValidations = ({
	isMandatory,
	pattern,
	dateValidation,
}: IGetValidations) => {
	const validations: IFieldValidations = {};
	const { name: userTimezone } = getTimezoneFromStore();
	if (isMandatory)
		validations[IValidationType.REQUIRED] = strings.THIS_FIELD_IS_REQUIRED;

	if (pattern)
		validations[IValidationType.PATTERN] = {
			value: pattern,
			message: strings.PLEASE_ENTER_VALID_VALUE,
		};

	if (dateValidation)
		validations[IValidationType.VALIDATE] = (
			value: IFieldDependentValue,
		) => {
			const extractedValue = extractDependentFieldValue(value);
			const watchValue = dateValidation.watch?.() || "";

			if (!watchValue) return true;

			const endsAtDate = moment(extractedValue).tz(userTimezone);
			const startsAtDate = moment(watchValue).tz(userTimezone);

			return (
				endsAtDate.isAfter(startsAtDate, "day") ||
				dateValidation.error ||
				strings.START_DATE_END_DATE_ERROR
			);
		};

	return validations;
};
