import { useCallback } from "react";
import { data } from "tests/components/asset/common/ReportAnIssueModal/index.data";

import { IUploadFileType } from "@components/Inputs/UploadInput/useUploadController";
import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import {
	IFieldConfig,
	IFieldValidations,
	IProfileInputType,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";

import { IGetUserAspirationsQuery } from "@graphql/query/myProfile/aspirations/getUserAspirations";

import {
	getCPSCountryList,
	getCPSStateListByCountry,
	getMasterData,
	ICPSEducationDetails,
	IMasterDataKey,
	INDIA_COUNTRY_NAME,
} from "@services/cpsService";

import { FresherIcon, NotWorkingIcon, WorkingIcon } from "@assets/icons";
import {
	GenderFemaleIcon,
	GenderMaleIcon,
	GenderNeutralIcon,
} from "@assets/icons/svg/studyPlan";
import { strings } from "@assets/strings";

interface IFieldConfigData {
	show: boolean;
	order: number;
	label: string;
	isMandatory: boolean;
	subText?: string;
	name: string;
}

interface IFieldMappingItem {
	config: IFieldConfigData;
	name: string;
	type: IProfileInputType;
	validations: IFieldValidations;
	values?: { label: string; value: string }[];
	valuesDependency?: {
		dependency?: string;
		hideUntilDependency?: boolean;
		dependencyValues?: string[];
		dependencyLabels?: Record<string, string>;
		searchFieldName?: string;
		getValues?: (
			...params: string[]
		) => Promise<{ label: string; value: string }[]>;
	};
	iconMapping?: Record<
		string,
		React.ComponentType<{ width?: number; height?: number; color?: string }>
	>;
	title?: string;
	subtitle?: string;
	actionText?: string;
	item?: any;
	onActionPress?: () => void;
	modalTitle?: string;
	modalDescription?: string;
	workExperienceItems?: IWorkExperienceItem[];
	onWorkExperienceAdd?: (data: IWorkExperienceItem) => void;
	onWorkExperienceDelete?: (id: string) => void;
	onWorkExperienceEdit?: (id: string) => void;
}

interface IPersonalDetailsConfig {
	fields: {
		firstName: IFieldConfigData;
		lastName: IFieldConfigData;
		fathersName?: IFieldConfigData;
		dateOfBirth: IFieldConfigData;
		address: IFieldConfigData;
		city: IFieldConfigData;
		country: IFieldConfigData;
		gender: IFieldConfigData;
		github: IFieldConfigData;
		image: IFieldConfigData;
		kaggle: IFieldConfigData;
		linkedIn: IFieldConfigData;
		nationality: IFieldConfigData;
		pincode: IFieldConfigData;
		resume: IFieldConfigData;
		stackOverflow: IFieldConfigData;
		telegram: IFieldConfigData;
		state: IFieldConfigData;
	};
}

interface IWorkExperienceConfig {
	fields: {
		isWorking: IFieldConfigData;
		experience: IFieldConfigData;
		designation: IFieldConfigData;
		organization: IFieldConfigData;
		industry: IFieldConfigData;
		workDomain: IFieldConfigData;
		package: IFieldConfigData;
		startsAt: IFieldConfigData;
		endsAt: IFieldConfigData;
		noticePeriod: IFieldConfigData;
		hasReimbursementPolicy: IFieldConfigData;
		hasProgramFeeReimbursement: IFieldConfigData;
	};
}

interface IContactDetailsConfig {
	fields: {
		email: IFieldConfigData;
		mobile: IFieldConfigData;
		whatsAppMobile: IFieldConfigData;
		alternateEmail: IFieldConfigData;
	};
}

interface IEducationConfig {
	fields: {
		degree: IFieldConfigData;
		graduatingYearFrom: IFieldConfigData;
		graduatingYearTo: IFieldConfigData;
		branch: IFieldConfigData;
		percentage: IFieldConfigData;
		university: IFieldConfigData;
		educationType: IFieldConfigData;
		board: IFieldConfigData;
		stream: IFieldConfigData;
	};
}

interface IAspirationConfig {
	fields: {
		reason: IFieldConfigData;
		domain: IFieldConfigData;
		subDomain: IFieldConfigData;
		city: IFieldConfigData;
		openForInternship: IFieldConfigData;
		optForPI: IFieldConfigData;
		firstPreferredTimeForPI: IFieldConfigData;
		secondPreferredTimeForPI: IFieldConfigData;
	};
}

interface IPersonalDetailsData {
	user?: {
		firstName?: string;
		lastName?: string;
	};
}

const REASON_TO_GET_A_JOB_VALUE = "66eacacfda027172eefb8da3";

export const usePersonalDetailsFieldMapper = (
	personalDetailsConfig: IPersonalDetailsConfig | null,
	personalDetails: IPersonalDetailsData | null,
	uploadHandlers?: {
		onProfilePictureUpload?: () => void;
		onResumeUpload?: () => void;
	},
) => {
	return useCallback(() => {
		if (!personalDetailsConfig?.fields) return [];

		const {
			fields: {
				firstName,
				lastName,
				fathersName,
				dateOfBirth,
				address,
				city,
				country,
				gender,
				github,
				image,
				kaggle,
				linkedIn,
				nationality,
				pincode,
				resume,
				stackOverflow,
				telegram,
				state,
			},
		} = personalDetailsConfig;

		const user = personalDetails?.user || {};

		const personalDetailsFields: Record<string, IFieldConfig> = {
			firstName: {
				name: "firstName",
				type: IProfileInputType.TEXT,
				isDisabled: !!user.firstName,
				order: firstName.order,
				label: firstName.label,
				isMandatory: firstName.isMandatory,
				isVisible: firstName.show,
				validations: getFieldValidations({
					isMandatory: firstName.isMandatory,
					pattern: /^[a-zA-Z ]+$/,
				}),
				description: firstName.subText || "",
			},
			lastName: {
				name: "lastName",
				type: IProfileInputType.TEXT,
				isDisabled: !!user.lastName,
				order: lastName.order,
				label: lastName.label,
				isMandatory: lastName.isMandatory,
				isVisible: lastName.show,
				validations: getFieldValidations({
					isMandatory: lastName.isMandatory,
					pattern: /^[a-zA-Z ]+$/,
				}),
				description: lastName.subText || "",
			},
			fatherName: {
				name: "fatherName",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: fathersName?.order ?? 0,
				label: fathersName?.label ?? "",
				isMandatory: fathersName?.isMandatory ?? false,
				isVisible: fathersName?.show ?? false,
				validations: getFieldValidations({
					isMandatory: fathersName?.isMandatory,
					pattern: /^[a-zA-Z. ]+$/,
				}),
				description: "",
			},
			dateOfBirth: {
				name: "dateOfBirth",
				type: IProfileInputType.DATE,
				isDisabled: false,
				order: dateOfBirth.order,
				label: dateOfBirth.label,
				isMandatory: dateOfBirth.isMandatory,
				isVisible: dateOfBirth.show,
				validations: getFieldValidations({
					isMandatory: dateOfBirth.isMandatory,
				}),
				description: dateOfBirth.subText || "",
				disableFutureDates: true,
			},
			gender: {
				name: "gender",
				type: IProfileInputType.CARD,
				isDisabled: false,
				order: gender.order,
				label: gender.label,
				isMandatory: gender.isMandatory,
				isVisible: gender.show,
				validations: getFieldValidations({
					isMandatory: gender.isMandatory,
				}),
				description: gender.subText || "",
				valuesDependency: {
					getValues: async () => {
						const data = await getMasterData(IMasterDataKey.GENDER);
						if (!data) return [];
						return data.map(({ value }) => ({
							label: value,
							value,
						}));
					},
				},
				iconMapping: {
					MALE: GenderMaleIcon,
					FEMALE: GenderFemaleIcon,
					OTHER: GenderNeutralIcon,
				},
			},
			nationality: {
				name: "nationality",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: nationality.order,
				label: nationality.label,
				isMandatory: nationality.isMandatory,
				isVisible: nationality.show,
				validations: getFieldValidations({
					isMandatory: nationality.isMandatory,
				}),
				description: nationality.subText || "",
				isSearchEnabled: true,
				valuesDependency: {
					getValues: async () => {
						const data = await getMasterData(
							IMasterDataKey.NATIONALITY,
						);
						if (!data) return [];
						return data.map(({ value }) => ({
							label: value,
							value,
						}));
					},
				},
			},
			countryOfResidence: {
				name: "countryOfResidence",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: 7,
				label: country.label,
				isMandatory: country.isMandatory,
				isVisible: country.show,
				validations: getFieldValidations({
					isMandatory: country.isMandatory,
				}),
				description: country.subText || "",
				isAddEnabled: false,
				valuesDependency: {
					getValues: getCPSCountryList,
				},
			},
			state: {
				name: "state",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: 8,
				label: state.label,
				isMandatory: state.isMandatory,
				isVisible: state.show,
				validations: getFieldValidations({
					isMandatory: state.isMandatory,
				}),
				description: state.subText || "",
				isAddEnabled: false,
				valuesDependency: {
					dependency: "countryOfResidence",
					getValues: async (input: string, countryName: string) => {
						if (!countryName) return [];
						const data = await getCPSStateListByCountry({
							input,
							countryName,
						});
						return data;
					},
					hideUntilDependency: true,
					dependencyValues: [INDIA_COUNTRY_NAME],
				},
			},
			cityOfResidence: {
				name: "cityOfResidence",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: 9,
				label: city.label,
				isMandatory: city.isMandatory,
				isVisible: city.show,
				validations: getFieldValidations({
					isMandatory: city.isMandatory,
				}),
				description: city.subText || "",
			},
			address: {
				name: "address",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: address.order,
				label: address.label,
				isMandatory: address.isMandatory,
				isVisible: address.show,
				validations: getFieldValidations({
					isMandatory: address.isMandatory,
				}),
				description: address.subText || "",
			},
			pincode: {
				name: "pincode",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: pincode.order,
				label: pincode.label,
				isMandatory: pincode.isMandatory,
				isVisible: pincode.show,
				validations: getFieldValidations({
					isMandatory: pincode.isMandatory,
					pattern: /^\d+$/,
				}),
				description: pincode.subText || "",
				textType: "number-pad",
				maxLength: 10,
			},
			linkedin: {
				name: "linkedin",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: linkedIn.order,
				label: linkedIn.label,
				isMandatory: linkedIn.isMandatory,
				isVisible: linkedIn.show,
				validations: getFieldValidations({
					isMandatory: linkedIn.isMandatory,
					pattern:
						/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
				}),
				description: linkedIn.subText || "",
			},
			telegram: {
				name: "telegram",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: telegram.order,
				label: telegram.label,
				isMandatory: telegram.isMandatory,
				isVisible: telegram.show,
				validations: getFieldValidations({
					isMandatory: telegram.isMandatory,
				}),
				description: telegram.subText || "",
			},
			github: {
				name: "github",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: github.order,
				label: github.label,
				isMandatory: github.isMandatory,
				isVisible: github.show,
				validations: getFieldValidations({
					isMandatory: github.isMandatory,
					pattern:
						/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
				}),
				description: github.subText || "",
			},
			kaggle: {
				name: "kaggle",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: kaggle.order,
				label: kaggle.label,
				isMandatory: kaggle.isMandatory,
				isVisible: kaggle.show,
				validations: getFieldValidations({
					isMandatory: kaggle.isMandatory,
					pattern:
						/^(https?:\/\/)?(www\.)?kaggle\.com\/[A-Za-z0-9_-]+\/?$/,
				}),
				description: kaggle.subText || "",
			},
			stackOverflow: {
				name: "stackOverflow",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: stackOverflow.order,
				label: stackOverflow.label,
				isMandatory: stackOverflow.isMandatory,
				isVisible: stackOverflow.show,
				validations: getFieldValidations({
					isMandatory: stackOverflow.isMandatory,
					pattern:
						/^(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/\d+\/[A-Za-z0-9_-]+\/?$/,
				}),
				description: stackOverflow.subText || "",
			},
			profilePicture: {
				name: "profilePicture",
				type: IProfileInputType.UPLOAD,
				fileType: IUploadFileType.MEDIA,
				isDisabled: false,
				order: image.order,
				label: image.label,
				isMandatory: image.isMandatory,
				isVisible: image.show,
				validations: getFieldValidations({
					isMandatory: image.isMandatory,
				}),
				description: image.subText || "",
				buttonLabel: strings.UPLOAD,
				...(uploadHandlers?.onProfilePictureUpload && {
					onUploadPress: uploadHandlers.onProfilePictureUpload,
				}),
			},
			resume: {
				name: "resume",
				type: IProfileInputType.UPLOAD,
				fileType: IUploadFileType.PDF,
				isDisabled: false,
				order: resume.order,
				label: resume.label,
				isMandatory: resume.isMandatory,
				isVisible: resume.show,
				validations: getFieldValidations({
					isMandatory: resume.isMandatory,
				}),
				description: "",
				buttonLabel: strings.UPLOAD,
				...(uploadHandlers?.onResumeUpload && {
					onUploadPress: uploadHandlers.onResumeUpload,
				}),
			},
		};

		return Object.values(personalDetailsFields)
			.filter((field) => field.isVisible)
			.sort((a, b) => a.order - b.order);
	}, [personalDetailsConfig, personalDetails, uploadHandlers]);
};

export const useWorkExperienceFieldMapper = (
	workExperienceConfig: IWorkExperienceConfig | null,
	workExperienceItems?: IWorkExperienceItem[],
	onWorkExperienceAdd?: (data: IWorkExperienceItem) => void,
	onWorkExperienceDelete?: (id: string) => void,
	onWorkExperienceEdit?: (id: string) => void,
) => {
	return useCallback(() => {
		if (!workExperienceConfig?.fields) return [];

		const {
			fields: {
				isWorking,
				experience,
				// designation,
				// organization,
				// industry,
				// workDomain,
				// package: ctc,
				// startsAt,
				// endsAt,
				// noticePeriod,
				// hasReimbursementPolicy,
				// hasProgramFeeReimbursement,
			},
		} = workExperienceConfig;

		const mappedFields: IFieldConfig[] = [];

		const fieldMappings = [
			{
				config: isWorking,
				name: "isWorking",
				type: IProfileInputType.CARD,
				validations: getFieldValidations({
					isMandatory: isWorking.isMandatory,
				}),
				valuesDependency: {
					getValues: async () => [
						{ label: "I'm a Fresher", value: "FRESHER" },
						{
							label: "I'm Working/Self Employed",
							value: "WORKING",
						},
						{
							label: "I have experience but not working",
							value: "NOT_WORKING",
						},
					],
				},
				iconMapping: {
					FRESHER: FresherIcon,
					WORKING: WorkingIcon,
					NOT_WORKING: NotWorkingIcon,
				},
			},
			{
				config: experience,
				name: "experience",
				type: IProfileInputType.TEXT,
				validations: getFieldValidations({
					isMandatory: experience.isMandatory,
					pattern: /^(?:100|[1-9]?[0-9])$/,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: ["WORKING", "NOT_WORKING"],
				},
			},
			{
				config: {
					show: experience.show,
					order: experience.order + 0.5,
					label: "",
					isMandatory: false,
					subText: "",
				},
				name: "addWorkExperienceCard",
				type: IProfileInputType.ACTION_CARD,
				title: "Every Role Tells a Story",
				subtitle:
					"Provide details of your roles to showcase your career journey.",
				actionText: "Add Work Experience",
				modalTitle: "Work Experience Details",
				modalDescription:
					"Provide details of your roles to showcase your career journey.",
				workExperienceItems: workExperienceItems || [],
				onWorkExperienceAdd,
				onWorkExperienceDelete,
				onWorkExperienceEdit,
				validations: getFieldValidations({
					isMandatory: false,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: ["WORKING", "NOT_WORKING"],
				},
			},
		];

		fieldMappings.forEach(
			({
				config,
				name,
				type,
				validations,
				values,
				valuesDependency,
				iconMapping,
				title,
				subtitle,
				actionText,
				onActionPress,
				modalTitle,
				modalDescription,
				workExperienceItems: weItems,
				onWorkExperienceAdd: onWEAdd,
				onWorkExperienceDelete: onWEDelete,
				onWorkExperienceEdit: onWEEdit,
			}: IFieldMappingItem) => {
				if (config && config.show) {
					const field = {
						name,
						type,
						isDisabled: false,
						order: config.order,
						label: config.label,
						isMandatory: config.isMandatory,
						isVisible: config.show,
						description: config.subText || "",
						validations,
						...(values && { values }),
						...(valuesDependency && { valuesDependency }),
						...(iconMapping && { iconMapping }),
						...(title && { title }),
						...(subtitle && { subtitle }),
						...(actionText && { actionText }),
						...(onActionPress && { onActionPress }),
						...(modalTitle && { modalTitle }),
						...(modalDescription && { modalDescription }),
						...(weItems && { workExperienceItems: weItems }),
						...(onWEAdd && { onWorkExperienceAdd: onWEAdd }),
						...(onWEDelete && {
							onWorkExperienceDelete: onWEDelete,
						}),
						...(onWEEdit && { onWorkExperienceEdit: onWEEdit }),
					} as IFieldConfig;

					mappedFields.push(field);
				}
			},
		);

		return mappedFields.sort((a, b) => a.order - b.order);
	}, [
		workExperienceConfig,
		workExperienceItems,
		onWorkExperienceAdd,
		onWorkExperienceDelete,
		onWorkExperienceEdit,
	]);
};

// Education Field Mapper
export const useEducationFieldMapper = (
	educationConfig: IEducationConfig | null,
	educationArray?: ICPSEducationDetails[],
	handleOpenEducationModal?: () => void,
	handleEditEducation?: (index: number) => void,
	handleDeleteEducation?: (index: number) => void,
	handleAddEducation?: (data: ICPSEducationDetails, index: number) => void,
) => {
	return useCallback(() => {
		const mappedFields: IFieldConfig[] = [];
		const modalFields: IFieldConfig[] = [];

		const fieldMappings = [
			{
				config: {
					show: true,
					order: 0,
					label: "",
					isMandatory: false,
					subText: "",
					name: "addEducationCard",
				},
				name: "addEducationCard",
				type: IProfileInputType.EDUCATION_DETAILS_CARD,
				title: "Your Education, Your Foundation",
				subtitle:
					"Share your latest educational qualification to help us align the program with your goals.",
				actionText: "Add Education Details",
				item: [],
				validations: getFieldValidations({
					isMandatory: false,
				}),
				onActionPress: handleOpenEducationModal,
				onEditPress: handleEditEducation,
				onDeletePress: handleDeleteEducation,
				onSaveSuccess: handleAddEducation,
			},
		];

		educationArray?.forEach((educationItem, index) => {
			fieldMappings.push({
				config: {
					show: true,
					order: index + 1,
					label: "",
					isMandatory: false,
					subText: "",
					name: `addEducationCard`,
				},
				name: `addEducationCard`,
				type: IProfileInputType.EDUCATION_DETAILS_CARD,
				title: "",
				subtitle: "",
				actionText: "Edit Details",
				item: educationItem,
				validations: getFieldValidations({}),
				onEditPress: handleEditEducation,
				onDeletePress: handleDeleteEducation,
				onSaveSuccess: handleAddEducation,
			});
		});

		fieldMappings.forEach(
			({
				config,
				name,
				type,
				validations,
				values,
				valuesDependency,
				iconMapping,
				title,
				subtitle,
				actionText,
				item,
				onActionPress,
				onEditPress,
				onDeletePress,
				onSaveSuccess,
			}: IFieldMappingItem) => {
				if (config && config.show) {
					const field = {
						name,
						type,
						isDisabled: false,
						order: config.order,
						label: config.label,
						isMandatory: config.isMandatory,
						isVisible: config.show,
						description: config.subText || "",
						validations,
						item,
						...(values && { values }),
						...(valuesDependency && { valuesDependency }),
						...(iconMapping && { iconMapping }),
						...(title && { title }),
						...(subtitle && { subtitle }),
						...(actionText && { actionText }),
						...(onActionPress && { onActionPress }),
						...(onEditPress && {
							onEditPress: handleEditEducation,
						}),
						...(onDeletePress && {
							onDeletePress: handleDeleteEducation,
						}),
						...(onSaveSuccess && {
							onSaveSuccess: handleAddEducation,
						}),
					} as IFieldConfig;

					// Separate fields for modal vs main view
					// Fields that depend on "addEducationCard" go to modal
					if (valuesDependency?.dependency === "addEducationCard") {
						// Create modal field without valuesDependency
						const { ...modalField } = field;
						modalFields.push(modalField as IFieldConfig);
						mappedFields.push(field);
					} else {
						mappedFields.push(field);
					}
				}
			},
		);

		return mappedFields.sort((a, b) => a.order - b.order);
	}, [
		educationConfig,
		educationArray,
		handleEditEducation,
		handleDeleteEducation,
		handleAddEducation,
		handleOpenEducationModal,
	]);
};

export const useContactDetailsFieldMapper = (
	contactDetailsConfig: IContactDetailsConfig | null,
) => {
	return useCallback(() => {
		if (!contactDetailsConfig?.fields) return [];

		const {
			fields: { email, mobile, whatsAppMobile, alternateEmail },
		} = contactDetailsConfig;

		const mappedFields: IFieldConfig[] = [];

		const fieldMappings = [
			{
				config: email,
				name: "email",
				isDisabled: true,
				type: IProfileInputType.TEXT,
				validations: getFieldValidations({
					isMandatory: email.isMandatory,
					pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				}),
			},
			{
				config: alternateEmail,
				name: "alternateEmail",
				type: IProfileInputType.TEXT,
				validations: getFieldValidations({
					isMandatory: alternateEmail.isMandatory,
					pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				}),
			},
			{
				config: mobile,
				name: "mobileNumber",
				type: IProfileInputType.MOBILE_NUMBER_VERIFY,
				validations: getFieldValidations({
					isMandatory: false,
				}),
				isVerified: true,
				isDisabled: true,
				hideVerify: true,
				onVerifySuccess: () => {
					// TODO: Handle mobile verification success
				},
				placeholder: "Mobile Number",
				isMandatory: false,
			},
			{
				config: whatsAppMobile,
				name: "isWhatsappNumber",
				type: IProfileInputType.CHECKBOX,
				validations: getFieldValidations({
					isMandatory: whatsAppMobile.isMandatory,
				}),
			},
		];

		fieldMappings.forEach(
			({
				config,
				name,
				type,
				validations,
				isVerified,
				isDisabled,
				hideVerify,
				isMandatory,
				onVerifySuccess,
				placeholder,
			}) => {
				if (config && config.show) {
					const field = {
						name,
						type,
						isDisabled:
							isDisabled !== undefined ? isDisabled : false,
						order: config.order,
						label: config.label,
						isMandatory:
							isMandatory !== undefined
								? isMandatory
								: config.isMandatory,
						isVisible: config.show,
						description: config.subText || "",
						validations,
						...(isVerified !== undefined && { isVerified }),
						...(hideVerify !== undefined && { hideVerify }),
						...(onVerifySuccess && { onVerifySuccess }),
						...(placeholder && { placeholder }),
					} as IFieldConfig;

					mappedFields.push(field);
				}
			},
		);

		return mappedFields.sort((a, b) => a.order - b.order);
	}, [contactDetailsConfig]);
};

export const useAddWorkExperienceFields = (
	workExperienceConfig: IWorkExperienceConfig | null,
) => {
	return useCallback(() => {
		if (!workExperienceConfig?.fields) return [];

		const {
			fields: {
				designation,
				organization,
				industry,
				workDomain,
				package: ctc,
				startsAt,
				endsAt,
				noticePeriod,
				hasReimbursementPolicy,
				hasProgramFeeReimbursement,
			},
		} = workExperienceConfig;

		const mappedFields: IFieldConfig[] = [];

		const fieldMappings = [
			{
				config: designation,
				name: "designation",
				type: IProfileInputType.SEARCH,
				validations: getFieldValidations({
					isMandatory: designation.isMandatory,
				}),
				valuesDependency: {
					searchFieldName: IMasterDataKey.ROLES,
				},
			},
			{
				config: organization,
				name: "organization",
				type: IProfileInputType.SEARCH,
				validations: getFieldValidations({
					isMandatory: organization.isMandatory,
				}),
				valuesDependency: {
					searchFieldName: IMasterDataKey.ORGANIZATION,
				},
			},
			{
				config: industry,
				name: "industry",
				type: IProfileInputType.SEARCH,
				validations: getFieldValidations({
					isMandatory: industry.isMandatory,
				}),
				valuesDependency: {
					searchFieldName: IMasterDataKey.INDUSTRY,
				},
			},
			{
				config: workDomain,
				name: "workDomain",
				type: IProfileInputType.SEARCH,
				validations: getFieldValidations({
					isMandatory: workDomain.isMandatory,
				}),
				valuesDependency: {
					searchFieldName: IMasterDataKey.WORK_DOMAIN,
				},
			},
			{
				config: ctc,
				name: "ctc",
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: ctc.isMandatory,
				}),
				valuesDependency: {
					getValues: async () => {
						const data = await getMasterData(IMasterDataKey.CTC);
						if (!data) return [];
						return data.map(({ value }) => ({
							label: value,
							value,
						}));
					},
				},
			},
			{
				config: {
					show: ctc.show,
					order: ctc.order + 0.1,
					label: "I'm currently working in this role",
					isMandatory: false,
					subText: "",
					name: "isCurrentWorkExperience",
				},
				name: "isCurrentWorkExperience",
				type: IProfileInputType.CHECKBOX,
				validations: getFieldValidations({
					isMandatory: false,
				}),
			},
			{
				config: startsAt,
				name: "startsAt",
				type: IProfileInputType.DATE,
				validations: getFieldValidations({
					isMandatory: startsAt.isMandatory,
				}),
			},
			{
				config: endsAt,
				name: "endsAt",
				type: IProfileInputType.DATE,
				validations: getFieldValidations({
					isMandatory: endsAt.isMandatory,
				}),
				valuesDependency: {
					dependency: "isCurrentWorkExperience",
					hideUntilDependency: true,
					dependencyValues: ["false", ""],
				},
			},
			{
				config: noticePeriod,
				name: "noticePeriod",
				type: IProfileInputType.TEXT,
				validations: getFieldValidations({
					isMandatory: noticePeriod.isMandatory,
					pattern: /^(?:100|[1-9]?[0-9])$/,
				}),
			},
			{
				config: hasReimbursementPolicy,
				name: "hasReimbursementPolicy",
				type: IProfileInputType.RADIO,
				validations: getFieldValidations({
					isMandatory: hasReimbursementPolicy.isMandatory,
				}),
				values: [
					{ label: "Yes", value: "true" },
					{ label: "No", value: "false" },
				],
			},
			{
				config: hasProgramFeeReimbursement,
				name: "hasProgramFeeReimbursement",
				type: IProfileInputType.RADIO,
				validations: getFieldValidations({
					isMandatory: hasProgramFeeReimbursement.isMandatory,
				}),
				values: [
					{ label: "Yes", value: "true" },
					{ label: "No", value: "false" },
				],
				valuesDependency: {
					dependency: "hasReimbursementPolicy",
					hideUntilDependency: true,
					dependencyValues: ["true"],
				},
			},
		];

		fieldMappings.forEach(
			({
				config,
				name,
				type,
				validations,
				values,
				valuesDependency,
			}: IFieldMappingItem) => {
				if (config && config.show) {
					const field = {
						name,
						type,
						isDisabled: false,
						order: config.order,
						label: config.label,
						isMandatory: config.isMandatory,
						isVisible: config.show,
						description: config.subText || "",
						validations,
						...(values && { values }),
						...(valuesDependency && { valuesDependency }),
					} as IFieldConfig;

					mappedFields.push(field);
				}
			},
		);

		return mappedFields.sort((a, b) => a.order - b.order);
	}, [workExperienceConfig]);
};

export const useAspirationFieldMapper = (
	aspirationConfig: IAspirationConfig | null,
	aspiration?: IGetUserAspirationsQuery,
) => {
	const mapQuestionOptions = useCallback(
		(fieldName: string) => {
			if (
				!aspiration?.userProfileCoursesProgramQuestions
					?.profileQuestions
			)
				return [];

			const matchingQuestion =
				aspiration.userProfileCoursesProgramQuestions.profileQuestions.find(
					(q) => q.question.instruction === fieldName,
				);

			if (matchingQuestion && matchingQuestion.question.options) {
				return matchingQuestion.question.options.map((opt) => ({
					value: opt.code,
					label: opt.option,
				}));
			}

			return [];
		},
		[aspiration],
	);

	return useCallback(() => {
		if (!aspirationConfig?.fields) return [];

		const {
			fields: {
				reason,
				domain,
				subDomain,
				city,
				openForInternship,
				optForPI,
				firstPreferredTimeForPI,
				secondPreferredTimeForPI,
			},
		} = aspirationConfig;

		const mappedFields: IFieldConfig[] = [];

		const fieldMappings = [
			{
				config: reason,
				name: reason.name,
				type: IProfileInputType.RADIO,
				validations: getFieldValidations({
					isMandatory: reason.isMandatory,
				}),
				values: mapQuestionOptions(reason.name),
			},
			{
				config: domain,
				name: domain.name,
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: domain.isMandatory,
				}),
				values: mapQuestionOptions(domain.name),
				valuesDependency: {
					dependency: reason.name,
					hideUntilDependency: true,
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
				},
			},
			{
				config: subDomain,
				name: subDomain.name,
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: subDomain.isMandatory,
				}),
				valuesDependency: {
					dependency: domain.name,
					hideUntilDependency: true,
					getValues: async (domainValue: string) => {
						if (!domainValue) return [];

						const subDomainQuestion =
							aspiration?.userProfileCoursesProgramQuestions?.profileQuestions?.find(
								(q) =>
									q.question.instruction === subDomain.name,
							);

						if (!subDomainQuestion) return [];

						return subDomainQuestion.question.options
							.filter((opt) => opt.domain === domainValue)
							.map((opt) => ({
								value: opt.code,
								label: opt.option,
							}));
					},
				},
			},
			{
				config: city,
				name: city.name,
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: city.isMandatory,
				}),
				isSearchEnabled: true,
				values: mapQuestionOptions(city.name),
				valuesDependency: {
					dependency: reason.name,
					hideUntilDependency: true,
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
				},
			},
			{
				config: openForInternship,
				name: openForInternship.name,
				type: IProfileInputType.RADIO,
				validations: getFieldValidations({
					isMandatory: openForInternship.isMandatory,
				}),
				values: mapQuestionOptions(openForInternship.name),
				valuesDependency: {
					dependency: reason.name,
					hideUntilDependency: true,
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
				},
			},
			{
				config: optForPI,
				name: optForPI.name,
				type: IProfileInputType.RADIO,
				validations: getFieldValidations({
					isMandatory: optForPI.isMandatory,
				}),
				values: mapQuestionOptions(optForPI.name),
			},
			{
				config: firstPreferredTimeForPI,
				name: firstPreferredTimeForPI.name,
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: firstPreferredTimeForPI.isMandatory,
				}),
				valuesDependency: {
					dependency: optForPI.name,
					hideUntilDependency: true,
					dependencyValues: [
						mapQuestionOptions(optForPI.name).find(
							(opt) => opt.label.toLowerCase() === "yes",
						)?.value || "true",
					],
					getValues: async () => {
						return mapQuestionOptions(firstPreferredTimeForPI.name);
					},
				},
			},
			{
				config: secondPreferredTimeForPI,
				name: secondPreferredTimeForPI.name,
				type: IProfileInputType.DROPDOWN,
				validations: getFieldValidations({
					isMandatory: secondPreferredTimeForPI.isMandatory,
				}),
				valuesDependency: {
					dependency: optForPI.name,
					hideUntilDependency: true,
					dependencyValues: [
						mapQuestionOptions(optForPI.name).find(
							(opt) => opt.label.toLowerCase() === "yes",
						)?.value || "true",
					],
					getValues: async () => {
						return mapQuestionOptions(
							secondPreferredTimeForPI.name,
						);
					},
				},
			},
		];

		fieldMappings.forEach(
			({
				config,
				name,
				type,
				validations,
				values,
				valuesDependency,
				isSearchEnabled,
			}) => {
				if (config && config.show) {
					const field = {
						name,
						type,
						isDisabled: false,
						order: config.order,
						label: config.label,
						isMandatory: config.isMandatory,
						isVisible: config.show,
						description: config.subText || "",
						validations,
						...(values && { values }),
						...(valuesDependency && { valuesDependency }),
						...(isSearchEnabled && { isSearchEnabled }),
					} as IFieldConfig;

					mappedFields.push(field);
				}
			},
		);

		return mappedFields.sort((a, b) => a.order - b.order);
	}, [aspirationConfig, mapQuestionOptions]);
};
