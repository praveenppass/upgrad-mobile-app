import React from "react";
import { KeyboardTypeOptions } from "react-native";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import { IRadioValue } from "@components/Inputs/RadioInput";
import {
	IUploadFile,
	IUploadFileType,
} from "@components/Inputs/UploadInput/useUploadController";
import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";

import { ICPSEducationDetails, IMasterDataKey } from "@services/cpsService";

export enum IProfileInputType {
	TEXT,
	DATE,
	DROPDOWN,
	RADIO,
	CHECKBOX,
	MOBILE_NUMBER_VERIFY,
	UPLOAD,
	SEARCH,
	DUMMY_VERIFY,
	CARD,
	ACTION_CARD,
	EDUCATION_DETAILS_CARD,
}

export enum IValidationType {
	REQUIRED = "required",
	PATTERN = "pattern",
	VALIDATE = "validate",
}

export interface IGetValidations {
	isMandatory?: boolean;
	pattern?: RegExp;
	dateValidation?: {
		watch?: () => string;
		error?: string;
	};
}

export type IFieldValidations = Partial<{
	[IValidationType.REQUIRED]?: string;
	[IValidationType.PATTERN]?: {
		value: RegExp;
		message: string;
	};
	[IValidationType.VALIDATE]?: (
		value: IFieldDependentValue,
	) => string | boolean;
}>;

export type IFieldConfig =
	| ITextFieldConfig
	| IDateFieldConfig
	| ICheckboxFieldConfig
	| IRadioFieldConfig
	| IUploadFieldConfig
	| IDropdownFieldConfig
	| ISearchFieldConfig
	| IMobileNumberVerifyFieldConfig
	| ICardFieldConfig
	| IActionCardFieldConfig
	| IEducationDetailsCardFieldConfig;

interface IBaseFieldConfig {
	type: IProfileInputType;
	name: string;
	isDisabled: boolean;
	order: number;
	label: string;
	isMandatory: boolean;
	isVisible: boolean;
	validations: IFieldValidations;
	description: string;
}

interface IValuesDependency {
	dependency: string;
	hideUntilDependency?: boolean;
	dependencyValues?: string[];
	dependencyLabels?: Record<string, string>;
}

interface IValuesDependencyWithGetValues
	extends Omit<IValuesDependency, "dependency"> {
	searchFieldName?: IMasterDataKey;
	getValues?: (...params: string[]) => Promise<IDropdownInputItem[]>;
	dependency?: string;
}

export interface IDummyVerifyFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.DUMMY_VERIFY;
}

export interface ITextFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.TEXT;
	textType?: KeyboardTypeOptions;
	maxLength?: number;
	defaultValue?: string;
	valuesDependency?: IValuesDependency;
}

export interface IDateFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.DATE;
	defaultValue?: string;
	disableFutureDates?: boolean;
	valuesDependency?: IValuesDependency;
}

interface IDropdownValuesDependency
	extends Omit<IValuesDependency, "dependency"> {
	getValues?: (...params: string[]) => Promise<IDropdownInputItem[]>;
	dependency?: string;
}

export interface IDropdownFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.DROPDOWN;
	values?: IDropdownInputItem[];
	defaultValue?: IDropdownInputItem;
	isSearchEnabled?: boolean;
	valuesDependency?: IDropdownValuesDependency;
}

export interface ISearchFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.SEARCH;
	defaultValue?: IDropdownInputItem;
	// searchFieldName: IMasterDataKey;
	valuesDependency?: IValuesDependencyWithGetValues;
	isAddEnabled?: boolean;
}
export interface IRadioFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.RADIO;
	defaultValue?: IRadioValue;
	values: IRadioValue[];
	valuesDependency?: IValuesDependency;
}

export interface ITextFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.TEXT;
	textType?: KeyboardTypeOptions;
	defaultValue?: string;
	valuesDependency?: IValuesDependency;
}

export interface ICheckboxFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.CHECKBOX;
	defaultValue?: boolean;
	valuesDependency?: IValuesDependency;
}

export interface IUploadFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.UPLOAD;
	defaultValue?: IUploadFile;
	fileType: IUploadFileType;
	valuesDependency?: IValuesDependency;
	buttonLabel?: string;
	onUploadPress?: () => void;
}

export interface IMobileNumberVerifyFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.MOBILE_NUMBER_VERIFY;
	defaultValue?: string;
	isVerified: boolean;
	onVerifySuccess: () => void;
	placeholder?: string;
	hideVerify?: boolean;
}

export interface ICardFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.CARD;
	defaultValue?: IDropdownInputItem;
	valuesDependency?: IDropdownValuesDependency;
	iconMapping?: Record<
		string,
		React.ComponentType<{ width?: number; height?: number; color?: string }>
	>;
}

export interface IActionCardFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.ACTION_CARD;
	title?: string;
	subtitle?: string;
	actionText?: string;
	onActionPress?: () => void;
	onEditPress?: (id: string) => void;
	onDeletePress?: (id: string) => void;
	valuesDependency?: IValuesDependency;
	modalTitle?: string;
	modalDescription?: string;
	workExperienceItems?: IWorkExperienceItem[];
	onWorkExperienceAdd?: (data: IWorkExperienceItem) => void;
	onWorkExperienceDelete?: (id: string) => void;
	onWorkExperienceEdit?: (id: string) => void;
	handleAddEducation?: (data: ICPSEducationDetails, index?: number) => void;
}

export interface IEducationDetailsCardFieldConfig extends IBaseFieldConfig {
	type: IProfileInputType.EDUCATION_DETAILS_CARD;
	title?: string;
	subtitle?: string;
	actionText?: string;
	onActionPress?: () => void;
	onEditPress?: (id: string) => void;
	onDeletePress?: (id: string) => void;
	valuesDependency?: IValuesDependency;
	modalTitle?: string;
	modalDescription?: string;
	isDisabled: boolean;
	item?: ICPSEducationDetails;
}

export type IFieldDependentValue =
	| IDropdownInputItem
	| IRadioValue
	| Date
	| string;

export interface IGetTimezoneLabel {
	timezone: string;
	offset: string;
}
