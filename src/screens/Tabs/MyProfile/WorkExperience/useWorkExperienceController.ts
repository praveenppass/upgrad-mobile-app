import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import useWorkExperienceModel from "@screens/Tabs/MyProfile/WorkExperience/useWorkExperienceModel";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import { IRadioValue } from "@components/Inputs/RadioInput";
import {
	IDateFieldConfig,
	IDropdownFieldConfig,
	IProfileInputType,
	IRadioFieldConfig,
	ISearchFieldConfig,
	ITextFieldConfig,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import {
	getMasterData,
	ICPSEmploymentStatus,
	IMasterDataKey,
	PartialWorkExperienceDetailsItem,
} from "@services/cpsService";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IFormValues {
	isWorking?: IDropdownInputItem;
	experience?: string;
	designation?: IDropdownInputItem;
	organization?: IDropdownInputItem;
	industry?: IDropdownInputItem;
	workDomain?: IDropdownInputItem;
	ctc?: IDropdownInputItem;
	startsAt?: string;
	endsAt?: string;
	hasReimbursementPolicy?: IRadioValue | null;
	noticePeriod?: string;
	hasProgramFeeReimbursement?: IRadioValue | null;
}

const isWorkingLabel = {
	[ICPSEmploymentStatus.FRESHER]: strings.IM_FRESHER,
	[ICPSEmploymentStatus.WORKING]: strings.IM_WORKING_SELF_EMPLOYED,
	[ICPSEmploymentStatus.NOT_WORKING]: strings.HAVE_EXP_NOT_WORKING,
};

const isWorkingValues = Object.entries(isWorkingLabel).map(
	([value, label]) => ({
		label,
		value,
	}),
);

const yesNoValues = [
	{ label: strings.YES, value: "true" },
	{ label: strings.NO, value: "false" },
];

const getDate = (year: number, month: string) => {
	if (!year || !month) return;

	return moment(`${year}-${month}`, "YYYY-MMMM").toISOString();
};

interface IWorkExperienceFields {
	isWorking: IDropdownFieldConfig;
	experience: ITextFieldConfig;
	designation: ISearchFieldConfig;
	organization: ISearchFieldConfig;
	industry: ISearchFieldConfig;
	workDomain: ISearchFieldConfig;
	ctc: IDropdownFieldConfig;
	startsAt: IDateFieldConfig;
	endsAt: IDateFieldConfig;
	hasReimbursementPolicy: IRadioFieldConfig;
	noticePeriod: ITextFieldConfig;
	hasProgramFeeReimbursement: IRadioFieldConfig;
}

interface IUseWorkExperienceController {
	workExperienceIndex: number;
}

const ctcLabels = {
	[ICPSEmploymentStatus.WORKING]: strings.CURRENT_CTC,
	[ICPSEmploymentStatus.NOT_WORKING]: strings.CTC,
};

const useWorkExperienceController = ({
	workExperienceIndex = 0,
}: IUseWorkExperienceController) => {
	const {
		getUserWorkExperienceList,
		workExperienceDetails,
		getUserWorkExperienceConfig,
		workExperienceConfig,

		updateUserWorkExperience,
		updateUserWorkExperienceLoading,

		workExperienceConfigLoading,
		workExperienceListLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	} = useWorkExperienceModel();

	const { showToast } = useToast();
	const navigation = useNavigation<RootHomeStackList>();

	const isFirstWorkExperience = workExperienceIndex === 0;

	useEffect(() => {
		getUserWorkExperienceList();
		getUserWorkExperienceConfig();
	}, []);

	const { ...methods } = useForm<IFormValues>();

	const [WorkExperienceFields, setWorkExperienceFields] =
		useState<IWorkExperienceFields | null>(null);

	useEffect(() => {
		if (!workExperienceConfig) return;

		const {
			userProfileConfigurationForLearner: {
				workExperience: {
					fields: {
						isWorking,
						experience,
						organization,
						designation,
						industry,
						workDomain,
						package: ctc,
						startsAt,
						endsAt,
						noticePeriod,
						hasReimbursementPolicy,
						hasProgramFeeReimbursement,
					},
				},
			},
		} = workExperienceConfig;

		const isWorkingMandatory =
			isFirstWorkExperience && isWorking.isMandatory;
		const isWorkingVisble = isFirstWorkExperience && isWorking.show;

		const isExperienceMandatory =
			isFirstWorkExperience && experience.isMandatory;
		const isExperienceVisible = isFirstWorkExperience && experience.show;

		const workExperienceMapped: IWorkExperienceFields = {
			isWorking: {
				name: "isWorking",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: isWorking.order,
				label: isWorking.label,
				isMandatory: isWorkingMandatory,
				isVisible: isWorkingVisble,
				values: isWorkingValues,
				validations: getFieldValidations({
					isMandatory: isWorkingMandatory,
				}),
				description: isWorking.subText || "",
			},
			experience: {
				name: "experience",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: experience.order,
				label: experience.label,
				isMandatory: isExperienceMandatory,
				isVisible: isExperienceVisible,
				validations: getFieldValidations({
					isMandatory: isExperienceMandatory,
					pattern: /^(?:100|[1-9]?[0-9])$/,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
				},
				description: experience.subText || "",
				textType: "number-pad",
			},
			designation: {
				name: "designation",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: designation.order,
				label: designation.label,
				isMandatory: designation.isMandatory,
				isVisible: designation.show,
				validations: getFieldValidations({
					isMandatory: designation.isMandatory,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
					searchFieldName: IMasterDataKey.ROLES,
				},
				description: designation.subText || "",
			},
			organization: {
				name: "organization",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: organization.order,
				label: organization.label,
				isMandatory: organization.isMandatory,
				isVisible: organization.show,
				validations: getFieldValidations({
					isMandatory: organization.isMandatory,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
					searchFieldName: IMasterDataKey.ORGANIZATION,
				},
				description: organization.subText || "",
			},
			workDomain: {
				name: "workDomain",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: workDomain.order,
				label: workDomain.label,
				isMandatory: workDomain.isMandatory,
				isVisible: workDomain.show,
				validations: getFieldValidations({
					isMandatory: workDomain.isMandatory,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
					searchFieldName: IMasterDataKey.WORK_DOMAIN,
				},
				description: workDomain.subText || "",
			},
			industry: {
				name: "industry",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: industry.order,
				label: industry.label,
				isMandatory: industry.isMandatory,
				isVisible: industry.show,
				validations: getFieldValidations({
					isMandatory: industry.isMandatory,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
					searchFieldName: IMasterDataKey.INDUSTRY,
				},
				description: industry.subText || "",
			},
			ctc: {
				name: "ctc",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: ctc.order,
				label: ctc.label,
				isMandatory: ctc.isMandatory,
				isVisible: ctc.show,
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
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
					dependencyLabels: ctcLabels,
					dependency: "isWorking",
				},
				description: ctc.subText || "",
			},
			startsAt: {
				name: "startsAt",
				type: IProfileInputType.DATE,
				isDisabled: false,
				order: startsAt.order,
				label: startsAt.label,
				isMandatory: startsAt.isMandatory,
				isVisible: startsAt.show,
				validations: getFieldValidations({
					isMandatory: startsAt.isMandatory,
				}),
				disableFutureDates: true,
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [
						ICPSEmploymentStatus.WORKING,
						ICPSEmploymentStatus.NOT_WORKING,
					],
				},
				description: startsAt.subText || "",
			},
			endsAt: {
				name: "endsAt",
				type: IProfileInputType.DATE,
				isDisabled: false,
				order: endsAt.order,
				label: endsAt.label,
				isMandatory: endsAt.isMandatory,
				isVisible: endsAt.show,
				validations: getFieldValidations({
					isMandatory: endsAt.isMandatory,
					dateValidation: {
						watch: () => methods.watch("startsAt") || "",
					},
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [ICPSEmploymentStatus.NOT_WORKING],
				},
				description: endsAt.subText || "",
			},
			noticePeriod: {
				name: "noticePeriod",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: noticePeriod.order,
				label: noticePeriod.label,
				isMandatory: noticePeriod.isMandatory,
				isVisible: noticePeriod.show,
				validations: getFieldValidations({
					isMandatory: noticePeriod.isMandatory,
					pattern: /^(?:100|[1-9]?[0-9])$/,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [ICPSEmploymentStatus.WORKING],
				},
				description: noticePeriod.subText || "",
				textType: "number-pad",
			},
			hasReimbursementPolicy: {
				name: "hasReimbursementPolicy",
				type: IProfileInputType.RADIO,
				isDisabled: false,
				order: hasReimbursementPolicy.order,
				label: hasReimbursementPolicy.label,
				isMandatory: hasReimbursementPolicy.isMandatory,
				isVisible: hasReimbursementPolicy.show,
				validations: getFieldValidations({
					isMandatory: hasReimbursementPolicy.isMandatory,
				}),
				valuesDependency: {
					dependency: "isWorking",
					hideUntilDependency: true,
					dependencyValues: [ICPSEmploymentStatus.WORKING],
				},
				description: hasReimbursementPolicy.subText || "",
				values: yesNoValues,
			},
			hasProgramFeeReimbursement: {
				name: "hasProgramFeeReimbursement",
				type: IProfileInputType.RADIO,
				isDisabled: false,
				order: hasProgramFeeReimbursement.order,
				label: hasProgramFeeReimbursement.label,
				isMandatory: hasProgramFeeReimbursement.isMandatory,
				isVisible: hasProgramFeeReimbursement.show,
				validations: getFieldValidations({
					isMandatory: hasProgramFeeReimbursement.isMandatory,
				}),
				valuesDependency: {
					dependency: "hasReimbursementPolicy",
					hideUntilDependency: true,
					dependencyValues: ["true"],
				},
				description: hasProgramFeeReimbursement.subText || "",
				values: yesNoValues,
			},
		};

		setWorkExperienceFields(workExperienceMapped);
	}, [workExperienceConfig]);

	useEffect(() => {
		if (!workExperienceDetails) return;

		const workExperience =
			workExperienceDetails.workExperiences?.[workExperienceIndex];

		let hasReimbursementPolicyValue;
		let hasProgramFeeReimbursementValue;

		if (workExperience?.reimbursementPolicy !== undefined) {
			const option = yesNoValues.find(
				({ value }) =>
					value === workExperience.reimbursementPolicy?.toString(),
			);

			if (option)
				hasReimbursementPolicyValue = {
					label: option.label,
					value: option.value,
				};
		}

		if (workExperience?.reimbursementStatus !== undefined) {
			const option = yesNoValues.find(
				({ value }) =>
					value === workExperience.reimbursementStatus?.toString(),
			);

			if (option)
				hasProgramFeeReimbursementValue = {
					label: option.label,
					value: option.value,
				};
		}

		const defaultValues = {
			isWorking: isFirstWorkExperience
				? workExperienceDetails.currentlyWorking
					? {
							label: isWorkingLabel[
								workExperienceDetails.currentlyWorking
							],
							value: workExperienceDetails.currentlyWorking,
						}
					: undefined
				: {
						label: isWorkingLabel[ICPSEmploymentStatus.NOT_WORKING],
						value: ICPSEmploymentStatus.NOT_WORKING,
					},

			experience:
				workExperienceDetails?.totalWorkExperience?.toString() ||
				undefined,
			designation: workExperience?.designation
				? {
						label: workExperience.designation || "",
						value: workExperience.designation || "",
					}
				: undefined,
			organization: workExperience?.org
				? {
						label: workExperience.org || "",
						value: workExperience.org || "",
					}
				: undefined,
			industry: workExperience?.industry
				? {
						label: workExperience.industry || "",
						value: workExperience.industry || "",
					}
				: undefined,
			workDomain: workExperience?.domain
				? {
						label: workExperience.domain || "",
						value: workExperience.domain || "",
					}
				: undefined,
			ctc: workExperience?.ctc
				? {
						label: workExperience.ctc || "",
						value: workExperience.ctc || "",
					}
				: undefined,
			startsAt: getDate(
				workExperience?.startYear || 0,
				workExperience?.startMonth || "",
			),
			endsAt: getDate(
				workExperience?.endYear || 0,
				workExperience?.endMonth || "",
			),
			noticePeriod: workExperience?.noticePeriod?.toString() || undefined,
			hasReimbursementPolicy: hasReimbursementPolicyValue,
			hasProgramFeeReimbursement: hasProgramFeeReimbursementValue,
		};

		methods.reset(defaultValues);
	}, [workExperienceDetails, isFirstWorkExperience]);

	const fields = Object.values(WorkExperienceFields || {})
		.filter((a) => a.isVisible)
		.sort((a, b) => a.order - b.order);

	const parseRadioFieldValue = (v: IRadioValue | null | undefined) => {
		if (v === undefined || v === null) return undefined;

		return v.value === "true";
	};

	const onSubmit: SubmitHandler<IFormValues> = async ({
		isWorking,
		experience,
		designation,
		organization,
		industry,
		workDomain,
		ctc,
		startsAt,
		endsAt,
		noticePeriod,
		hasReimbursementPolicy,
		hasProgramFeeReimbursement,
	}) => {
		let mappedWorkExperience: PartialWorkExperienceDetailsItem[] = [
			...(workExperienceDetails?.workExperiences || []),
		];

		const newWorkExperience = {
			designation: designation?.value,
			org: organization?.value,
			industry: industry?.value,
			domain: workDomain?.value,
			ctc: ctc?.value,
			startYear: moment(startsAt).year(),
			startMonth: moment(startsAt).format("MMMM"),
			endYear: moment(endsAt).year(),
			endMonth: moment(endsAt).format("MMMM"),
			noticePeriod: noticePeriod ? +noticePeriod : undefined,
			reimbursementPolicy: parseRadioFieldValue(hasReimbursementPolicy),
			reimbursementStatus: parseRadioFieldValue(
				hasProgramFeeReimbursement,
			),
			currentWorkExperience:
				isWorking?.value === ICPSEmploymentStatus.WORKING,
		};

		if (
			isFirstWorkExperience &&
			isWorking?.value === ICPSEmploymentStatus.FRESHER
		)
			mappedWorkExperience = [newWorkExperience];
		else if (mappedWorkExperience.length)
			mappedWorkExperience[workExperienceIndex] = newWorkExperience;
		else mappedWorkExperience.push(newWorkExperience);

		await updateUserWorkExperience({
			workExperiences: mappedWorkExperience,
			...(isFirstWorkExperience
				? {
						currentlyWorking:
							isWorking?.value as ICPSEmploymentStatus,
						totalWorkExperience: experience ? +experience : 0,
					}
				: {}),
		});

		await updateProfileSectionStatus();

		showToast({
			message: strings.SAVED_SUCCESSFULLY,
			type: ToastType.SUCCESS,
			duration: 1000,
		});
		setTimeout(() => navigation.goBack(), 1200);
	};

	const onError: SubmitErrorHandler<IFormValues> = (errors) => errors;

	const buttonDisabled =
		updateUserWorkExperienceLoading || updateProfileSectionStatusLoading;
	const loading = workExperienceConfigLoading || workExperienceListLoading;

	return {
		fields,
		methods,
		onSubmit,
		onError,
		loading,
		buttonDisabled,
	};
};

export default useWorkExperienceController;
