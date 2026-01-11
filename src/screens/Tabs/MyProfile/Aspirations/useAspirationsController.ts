import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import useAspirationsModel from "@screens/Tabs/MyProfile/Aspirations/useAspirationsModel";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import { IRadioValue } from "@components/Inputs/RadioInput";
import {
	IDropdownFieldConfig,
	IProfileInputType,
	IRadioFieldConfig,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IFormValues {
	reason?: IDropdownInputItem;
	optForPI?: IRadioValue;
	firstPreferredTimeForPI?: IDropdownInputItem;
	secondPreferredTimeForPI?: IDropdownInputItem;
	openForInternship?: IRadioValue;
	domain?: IDropdownInputItem;
	subDomain?: IDropdownInputItem;
	city?: IDropdownInputItem;
}

interface IAspirationsFields {
	reason: IDropdownFieldConfig;
	optForPI: IRadioFieldConfig;
	firstPreferredTimeForPI: IDropdownFieldConfig;
	secondPreferredTimeForPI: IDropdownFieldConfig;
	openForInternship: IRadioFieldConfig;
	domain: IDropdownFieldConfig;
	subDomain: IDropdownFieldConfig;
	city: IDropdownFieldConfig;
}

interface IUseAspirationController {
	learningPathId: string;
	learningPathCode: string;
	workshopId?: string;
	learningPathType: LearningPathType;
}

const REASON_TO_GET_A_JOB_VALUE = "66eacacfda027172eefb8da3";

interface IMapUserAspirationValue {
	option: string;
	code: string;
}
const mapUserAspirationValue = ({ option, code }: IMapUserAspirationValue) => ({
	label: option,
	value: code,
});

const useAspirationsController = ({
	learningPathId,
	learningPathCode,
	workshopId,
	learningPathType,
}: IUseAspirationController) => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const {
		getUserAspirations,
		aspiration,
		aspirationConfig,
		getUserAspirationsConfig,
		aspirationConfigLoading,
		aspirationLoading,
		updateUserProgramAspirations,
		updateUserProgramAspirationsLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	} = useAspirationsModel();

	const { showToast } = useToast();
	const navigation = useNavigation<RootHomeStackList>();

	useEffect(() => {
		getUserAspirations({
			variables: {
				where: {
					user: id,
					userProgram: learningPathId,
				},
			},
		});
		getUserAspirationsConfig();
	}, []);

	const getUserAsipirationBasedOnName = (name: string) => {
		if (!aspiration) return;

		const {
			userProfileCoursesProgramQuestions: { profileQuestions },
		} = aspiration;
		if (!profileQuestions) return;

		const result = profileQuestions.find(
			({ question }) => question.instruction === name,
		);

		return result;
	};

	const getUserAspirationValues = (
		name: string,
		depdendentValue?: string,
	) => {
		let options = getUserAsipirationBasedOnName(name)?.question.options;

		if (!options) return [];

		if (depdendentValue)
			options = options.filter((op) => op.domain === depdendentValue);

		return options.map(mapUserAspirationValue);
	};

	const getUserAspirationSubmmitedValue = (name: string) => {
		const question = getUserAsipirationBasedOnName(name)?.question;

		if (!question) return;

		const submittedAnswer = question.submittedAnswer;
		if (submittedAnswer) return mapUserAspirationValue(submittedAnswer);

		const preferredAnswer = question.preferredAnswer;
		if (preferredAnswer) return mapUserAspirationValue(preferredAnswer);
	};

	const [aspirationsFields, setAspirationsFields] =
		useState<IAspirationsFields | null>(null);

	useEffect(() => {
		if (!aspiration || !aspirationConfig) return;

		const {
			userProfileConfigurationForLearner: {
				aspiration: {
					fields: {
						city,
						domain,
						firstPreferredTimeForPI,
						openForInternship,
						optForPI,
						reason,
						secondPreferredTimeForPI,
						subDomain,
					},
				},
			},
		} = aspirationConfig;

		const {
			userProfileCoursesProgramQuestions: { profileQuestions },
		} = aspiration;

		if (!profileQuestions) return;

		const getOptInOptionsYesCode =
			getUserAspirationValues("optForPI").find(
				({ label }) => label.toLowerCase() === "yes",
			)?.value || "";

		const aspirationsMapped: IAspirationsFields = {
			reason: {
				name: "reason",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: reason.order,
				label: reason.label,
				isMandatory: reason.isMandatory,
				isVisible: reason.show,
				values: getUserAspirationValues("reason"),
				description: reason.subText || "",
				validations: getFieldValidations({
					isMandatory: reason.isMandatory,
				}),
			},
			optForPI: {
				name: "optForPI",
				type: IProfileInputType.RADIO,
				isDisabled: false,
				order: optForPI.order,
				label: optForPI.label,
				isMandatory: optForPI.isMandatory,
				isVisible: optForPI.show,
				values: getUserAspirationValues("optForPI"),
				validations: getFieldValidations({
					isMandatory: optForPI.isMandatory,
				}),
				description: optForPI.subText || "",
			},
			firstPreferredTimeForPI: {
				name: "firstPreferredTimeForPI",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: firstPreferredTimeForPI.order,
				label: firstPreferredTimeForPI.label,
				isMandatory: firstPreferredTimeForPI.isMandatory,
				isVisible: firstPreferredTimeForPI.show,
				values: getUserAspirationValues("firstPreferredTimeForPI"),
				validations: getFieldValidations({
					isMandatory: firstPreferredTimeForPI.isMandatory,
				}),
				description: firstPreferredTimeForPI.subText || "",
				valuesDependency: {
					dependency: "optForPI",
					dependencyValues: [getOptInOptionsYesCode],
					hideUntilDependency: true,
				},
			},
			secondPreferredTimeForPI: {
				name: "secondPreferredTimeForPI",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: secondPreferredTimeForPI.order,
				label: secondPreferredTimeForPI.label,
				isMandatory: secondPreferredTimeForPI.isMandatory,
				isVisible: secondPreferredTimeForPI.show,
				values: getUserAspirationValues("secondPreferredTimeForPI"),
				validations: getFieldValidations({
					isMandatory: secondPreferredTimeForPI.isMandatory,
				}),
				description: secondPreferredTimeForPI.subText || "",
				valuesDependency: {
					dependency: "optForPI",
					dependencyValues: [getOptInOptionsYesCode],
					hideUntilDependency: true,
				},
			},
			domain: {
				name: "domain",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: domain.order,
				label: domain.label,
				isMandatory: domain.isMandatory,
				isVisible: domain.show,
				values: getUserAspirationValues("domain"),
				validations: getFieldValidations({
					isMandatory: domain.isMandatory,
				}),
				description: domain.subText || "",
				valuesDependency: {
					dependency: "reason",
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
					hideUntilDependency: true,
				},
			},
			subDomain: {
				name: "subDomain",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: subDomain.order,
				label: subDomain.label,
				isMandatory: subDomain.isMandatory,
				isVisible: subDomain.show,
				validations: getFieldValidations({
					isMandatory: domain.isMandatory,
				}),
				description: domain.subText || "",
				valuesDependency: {
					dependency: "domain",
					hideUntilDependency: true,
					getValues: async (reasonValue: string) =>
						getUserAspirationValues("subDomain", reasonValue),
				},
			},
			city: {
				name: "city",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: city.order,
				label: city.label,
				isMandatory: city.isMandatory,
				isVisible: city.show,
				values: getUserAspirationValues("city"),
				validations: getFieldValidations({
					isMandatory: city.isMandatory,
				}),
				description: city.subText || "",
				valuesDependency: {
					dependency: "reason",
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
					hideUntilDependency: true,
				},
			},

			openForInternship: {
				name: "openForInternship",
				type: IProfileInputType.RADIO,
				isDisabled: false,
				order: openForInternship.order,
				label: openForInternship.label,
				isMandatory: openForInternship.isMandatory,
				isVisible: openForInternship.show,
				values: getUserAspirationValues("openForInternship"),
				validations: getFieldValidations({
					isMandatory: openForInternship.isMandatory,
				}),
				description: openForInternship.subText || "",
				valuesDependency: {
					dependency: "reason",
					dependencyValues: [REASON_TO_GET_A_JOB_VALUE],
					hideUntilDependency: true,
				},
			},
		};

		setAspirationsFields(aspirationsMapped);
	}, [aspiration, aspirationConfig]);

	useEffect(() => {
		if (!aspiration) return;

		const defaultValues = {
			reason: getUserAspirationSubmmitedValue("reason"),
			optForPI: getUserAspirationSubmmitedValue("optForPI"),
			firstPreferredTimeForPI: getUserAspirationSubmmitedValue(
				"firstPreferredTimeForPI",
			),
			secondPreferredTimeForPI: getUserAspirationSubmmitedValue(
				"secondPreferredTimeForPI",
			),
			domain: getUserAspirationSubmmitedValue("domain"),
			subDomain: getUserAspirationSubmmitedValue("subDomain"),
			city: getUserAspirationSubmmitedValue("city"),
			openForInternship:
				getUserAspirationSubmmitedValue("openForInternship"),
		};

		methods.reset(defaultValues);
	}, [aspiration]);

	const fields = Object.values(aspirationsFields || {})
		.filter((a) => a.isVisible)
		.sort((a, b) => a.order - b.order);

	const { ...methods } = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = (data) => {
		const submitData = Object.entries(data)
			.filter(([, value]) => !!value)
			.map(([key, value]) => {
				const userApiration =
					getUserAsipirationBasedOnName(key)?.question;

				return {
					question: userApiration?.id || "",
					answerOption: value.value,
					questionType: userApiration?.type || "",
				};
			});

		updateUserProgramAspirations({
			variables: {
				data: {
					profileResponse: {
						response: submitData,
						isCompleted: true,
						...(isProgram
							? {
									program: learningPathCode,
									userProgram: learningPathId,
									workshop: workshopId || undefined,
								}
							: {
									course: learningPathCode,
									userCourse: learningPathId,
								}),
					},
				},
			},
			onCompleted: async () => {
				await updateProfileSectionStatus();
				showToast({
					message: strings.SAVED_SUCCESSFULLY,
					type: ToastType.SUCCESS,
					duration: 1000,
				});
				setTimeout(() => navigation.goBack(), 1200);
			},
		});
	};

	const onError: SubmitErrorHandler<IFormValues> = (errors) => errors;

	const buttonDisabled =
		updateUserProgramAspirationsLoading ||
		updateProfileSectionStatusLoading;
	const loading = aspirationConfigLoading || aspirationLoading;

	return {
		fields,
		methods,
		onSubmit,
		onError,
		buttonDisabled,
		loading,
	};
};

export default useAspirationsController;
