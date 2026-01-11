import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useAddWorkExperienceFields } from "@screens/Home/MyProfile/ManualProfileFlow/utils/fieldMappers";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import { IRadioValue } from "@components/Inputs/RadioInput";
import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import { ToastType, useToast } from "@components/Reusable/Toast";

import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";
import getUserWorkExperienceConfigQuery, {
	IGetUserWorkExperienceConfigQuery,
	IGetUserWorkExperienceConfigQueryVariables,
} from "@graphql/query/myProfile/workExperience/getUserWorkExperienceConfig";
import getProfileStatusCompletionQuery, {
	IProfileCompletionStatus,
} from "@graphql/query/profileBlocker/getProfileStatusCompletionQuery";

import {
	getWorkExperienceDetails,
	ICPSEmploymentStatus,
	ICPSWorkExperienceDetails,
	IUpdateWorkExperienceDetails,
	PartialWorkExperienceDetailsItem,
	updateWorkExperienceDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

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
	isCurrentWorkExperience?: boolean;
	startsAt?: string;
	endsAt?: string;
	hasReimbursementPolicy?: IRadioValue | null;
	noticePeriod?: string;
	hasProgramFeeReimbursement?: IRadioValue | null;
}

interface IUseWorkExperienceController {
	workExperienceIndex: number;
	workExperienceItem?: IWorkExperienceItem;
	workExperienceConfig?: IGetUserWorkExperienceConfigQuery;
	onDataSaved?: (data: IWorkExperienceItem) => void;
	isNewEntry?: boolean;
}

const useWorkExperienceController = ({
	workExperienceIndex = 0,
	workExperienceItem,
	onDataSaved,
	isNewEntry = false,
}: IUseWorkExperienceController) => {
	const { ...methods } = useForm<IFormValues>({
		defaultValues: isNewEntry
			? {
					isWorking: undefined,
					experience: undefined,
					designation: undefined,
					organization: undefined,
					industry: undefined,
					workDomain: undefined,
					ctc: undefined,
					isCurrentWorkExperience: false,
					startsAt: undefined,
					endsAt: undefined,
					noticePeriod: undefined,
					hasReimbursementPolicy: undefined,
					hasProgramFeeReimbursement: undefined,
				}
			: undefined,
	});
	const navigation = useNavigation<RootHomeStackList>();
	const { showToast } = useToast();

	const id = useSelector((state: RootState) => state.user.user.id) || "";

	useEffect(() => {
		// Always fetch work experience details
		// For new entries, we need it to append to existing list
		// For edit mode, we need it to pre-fill the form
		getAddWorkExperienceDetails();
		getUserWorkExperienceConfig();

		// Reset form to empty values for new entries
		if (isNewEntry) {
			methods.reset({
				isWorking: undefined,
				experience: undefined,
				designation: undefined,
				organization: undefined,
				industry: undefined,
				workDomain: undefined,
				ctc: undefined,
				startsAt: undefined,
				endsAt: undefined,
				noticePeriod: undefined,
				hasReimbursementPolicy: undefined,
				hasProgramFeeReimbursement: undefined,
			});
		}
	}, [isNewEntry]);

	const [workExperienceDetails, setWorkExperienceDetails] =
		useState<ICPSWorkExperienceDetails | null>(null);
	const [addWorkExperienceLoading, setAddWorkExperienceLoading] =
		useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const getAddWorkExperienceDetails = async () => {
		setAddWorkExperienceLoading(true);
		const response = await getWorkExperienceDetails();

		if (!response) return setAddWorkExperienceLoading(false);

		setWorkExperienceDetails(response);
		setAddWorkExperienceLoading(false);
	};

	const [
		getUserWorkExperienceConfig,
		{ data: workExperienceConfig, loading: workExperienceConfigLoading },
	] = useLazyQuery<
		IGetUserWorkExperienceConfigQuery,
		IGetUserWorkExperienceConfigQueryVariables
	>(getUserWorkExperienceConfigQuery, {
		client: client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const [
		updateProfileSectionStatus,
		{ loading: updateProfileSectionStatusLoading },
	] = useMutation<
		IUpdateProfileSectionStatusMutation,
		IUpdateProfileSectionStatusMutationVariables
	>(updateProfileSectionStatusMutation, {
		client,
		fetchPolicy: "no-cache",
		variables: {
			data: {
				section: "workExperience",
				isCompleted: true,
			},
		},
	});

	// Lazy query to refetch completion status and update stepper
	const [refetchCompletionStatus] = useLazyQuery<IProfileCompletionStatus>(
		getProfileStatusCompletionQuery,
		{
			client,
			fetchPolicy: "network-only",
			variables: { where: { id } },
		},
	);

	const updateUserWorkExperience = async (
		workExperiencesData: IUpdateWorkExperienceDetails,
	) => {
		setIsSaving(true);
		await updateWorkExperienceDetails(workExperiencesData);
		setIsSaving(false);
	};

	const getWorkExperienceFields = useAddWorkExperienceFields(
		workExperienceConfig?.userProfileConfigurationForLearner
			?.workExperience as any,
	);

	const WorkExperienceFields = useMemo(
		() => getWorkExperienceFields(),
		[getWorkExperienceFields],
	);

	const yesNoValues = [
		{ label: strings.YES, value: "true" },
		{ label: strings.NO, value: "false" },
	];
	const isWorkingLabel = {
		[ICPSEmploymentStatus.FRESHER]: strings.IM_FRESHER,
		[ICPSEmploymentStatus.WORKING]: strings.IM_WORKING_SELF_EMPLOYED,
		[ICPSEmploymentStatus.NOT_WORKING]: strings.HAVE_EXP_NOT_WORKING,
	};

	const apiToFieldValueMap: Record<string, string> = {
		[ICPSEmploymentStatus.FRESHER]: "FRESHER", // "no_fresher" -> "FRESHER"
		[ICPSEmploymentStatus.WORKING]: "WORKING", // "yes" -> "WORKING"
		[ICPSEmploymentStatus.NOT_WORKING]: "NOT_WORKING", // "no_unemployed" -> "NOT_WORKING"
	};

	// Map field values back to API values
	const fieldToApiValueMap: Record<string, ICPSEmploymentStatus> = {
		FRESHER: ICPSEmploymentStatus.FRESHER,
		WORKING: ICPSEmploymentStatus.WORKING,
		NOT_WORKING: ICPSEmploymentStatus.NOT_WORKING,
	};

	const isFirstWorkExperience = workExperienceIndex === 0;
	const getDate = (year: number, month: string) => {
		if (!year || !month) return;

		return moment(`${year}-${month}`, "YYYY-MMMM").toISOString();
	};
	const parseRadioFieldValue = (v: IRadioValue | null | undefined) => {
		if (v === undefined || v === null) return undefined;

		return v.value === "true";
	};

	useEffect(() => {
		// Skip pre-filling for new entries
		if (isNewEntry || !workExperienceDetails) return;

		// Find the work experience to edit
		let workExperience;

		if (workExperienceItem) {
			// If workExperienceItem is provided, find the matching work experience
			// by comparing designation and organization
			const matchingIndex =
				workExperienceDetails.workExperiences?.findIndex(
					(exp) =>
						exp.designation === workExperienceItem.designation &&
						exp.org === workExperienceItem.organization,
				);

			if (matchingIndex !== undefined && matchingIndex !== -1) {
				workExperience =
					workExperienceDetails.workExperiences?.[matchingIndex];
			} else {
				// Fallback to index if no match found
				workExperience =
					workExperienceDetails.workExperiences?.[
						workExperienceIndex
					];
			}
		} else {
			// Use the provided index directly
			workExperience =
				workExperienceDetails.workExperiences?.[workExperienceIndex];
		}

		// If no work experience found, return early
		if (!workExperience) return;
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
		// Map API value to field value for isWorking
		let isWorkingDefaultValue;
		if (isFirstWorkExperience) {
			if (workExperienceDetails.currentlyWorking) {
				const apiValue = workExperienceDetails.currentlyWorking;
				const fieldValue = apiToFieldValueMap[apiValue];
				isWorkingDefaultValue = {
					label: isWorkingLabel[apiValue],
					value: fieldValue,
				};
			}
		} else {
			isWorkingDefaultValue = {
				label: isWorkingLabel[ICPSEmploymentStatus.NOT_WORKING],
				value: apiToFieldValueMap[ICPSEmploymentStatus.NOT_WORKING],
			};
		}

		const defaultValues = {
			isWorking: isWorkingDefaultValue,
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
			endsAt:
				workExperience?.currentWorkExperience ||
				workExperience?.endMonth === "Invalid date"
					? undefined
					: getDate(
							workExperience?.endYear || 0,
							workExperience?.endMonth || "",
						),
			isCurrentWorkExperience:
				workExperience?.currentWorkExperience || false,
			noticePeriod: workExperience?.noticePeriod?.toString() || undefined,
			hasReimbursementPolicy: hasReimbursementPolicyValue,
			hasProgramFeeReimbursement: hasProgramFeeReimbursementValue,
		};
		methods.reset(defaultValues);
	}, [
		workExperienceDetails,
		isFirstWorkExperience,
		isNewEntry,
		workExperienceIndex,
		workExperienceItem,
	]);

	const fields = useMemo(
		() =>
			(WorkExperienceFields || [])
				.filter((a) => a.isVisible)
				.sort((a, b) => a.order - b.order),
		[WorkExperienceFields],
	);

	const onSubmit: SubmitHandler<IFormValues> = async ({
		isWorking,
		experience,
		designation,
		organization,
		industry,
		workDomain,
		ctc,
		isCurrentWorkExperience,
		startsAt,
		endsAt,
		noticePeriod,
		hasReimbursementPolicy,
		hasProgramFeeReimbursement,
	}) => {
		// Convert field value back to API value
		const getApiValueFromFieldValue = (fieldValue?: string) => {
			if (!fieldValue) return undefined;
			return fieldToApiValueMap[fieldValue] || fieldValue;
		};

		const currentIsWorking = isWorking
			? {
					label: isWorking.label,
					value: getApiValueFromFieldValue(isWorking.value),
				}
			: workExperienceDetails?.currentlyWorking
				? {
						label:
							isWorkingLabel[
								workExperienceDetails.currentlyWorking
							] || "",
						value: workExperienceDetails.currentlyWorking,
					}
				: undefined;

		const currentExperience =
			experience ||
			workExperienceDetails?.totalWorkExperience?.toString();

		const mappedWorkExperience: PartialWorkExperienceDetailsItem[] = [
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
			endYear: isCurrentWorkExperience
				? undefined
				: endsAt
					? moment(endsAt).year()
					: undefined,
			endMonth: isCurrentWorkExperience
				? "Invalid date"
				: endsAt
					? moment(endsAt).format("MMMM")
					: undefined,
			noticePeriod: noticePeriod ? +noticePeriod : undefined,
			reimbursementPolicy: parseRadioFieldValue(hasReimbursementPolicy),
			reimbursementStatus: parseRadioFieldValue(
				hasProgramFeeReimbursement,
			),
			currentWorkExperience: isCurrentWorkExperience || false,
		};

		// Handle new entry vs editing existing
		if (isNewEntry) {
			// For new entries, always push to array
			mappedWorkExperience.push(newWorkExperience);
		} else {
			// For editing, find the correct index if workExperienceItem was provided
			let editIndex = workExperienceIndex;
			if (workExperienceItem) {
				// Find the matching work experience by comparing designation and organization
				const matchingIndex = mappedWorkExperience.findIndex(
					(exp) =>
						exp.designation === workExperienceItem.designation &&
						exp.org === workExperienceItem.organization,
				);
				if (matchingIndex !== -1) {
					editIndex = matchingIndex;
				}
			}

			// Update at the specific index
			if (mappedWorkExperience.length > editIndex) {
				mappedWorkExperience[editIndex] = newWorkExperience;
			} else {
				// Fallback: if index doesn't exist, push to array
				mappedWorkExperience.push(newWorkExperience);
			}
		}

		try {
			await updateUserWorkExperience({
				workExperiences: mappedWorkExperience,
				...(isFirstWorkExperience
					? {
							currentlyWorking:
								currentIsWorking?.value as ICPSEmploymentStatus,
							totalWorkExperience: currentExperience
								? +currentExperience
								: 0,
						}
					: {}),
			});
			await updateProfileSectionStatus();

			// Refetch completion status to update stepper immediately
			await refetchCompletionStatus();

			showToast({
				message: strings.SAVED_SUCCESSFULLY,
				type: ToastType.SUCCESS,
				duration: 1000,
			});

			// Call the callback with the saved work experience data
			if (onDataSaved) {
				onDataSaved({
					id: `work-exp-${Date.now()}`,
					designation: designation?.value,
					organization: organization?.value,
					industry: industry?.value,
					ctc: ctc?.value,
					duration:
						isCurrentWorkExperience && startsAt
							? `${moment(startsAt).format("MMMM")} ${moment(startsAt).year()} - Present`
							: startsAt && endsAt
								? `${moment(startsAt).format("MMMM")} ${moment(startsAt).year()} - ${moment(endsAt).format("MMMM")} ${moment(endsAt).year()}`
								: "",
				});
			}

			setTimeout(() => navigation.goBack(), 1200);
		} catch (error) {
			showToast({
				message: "Failed to save work experience. Please try again.",
				type: ToastType.ERROR,
				duration: 2000,
			});
			setIsSaving(false);
		}
	};

	const onError: SubmitErrorHandler<IFormValues> = (errors) => {
		return errors;
	};

	return {
		fields,
		methods,
		onSubmit,
		onError,
		loading: addWorkExperienceLoading || isSaving,
		buttonDisabled: isSaving,
	};
};

export default useWorkExperienceController;
