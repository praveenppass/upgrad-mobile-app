import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import useAddEducationModel from "@screens/Home/MyProfile/AddEducation/useAddEducationModel";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import {
	IDropdownFieldConfig,
	IProfileInputType,
	ISearchFieldConfig,
	ITextFieldConfig,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import updateProfileSectionStatusMutationQuery, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";

import {
	getEducationDetails,
	getMasterData,
	ICPSEducationDetails,
	IMasterDataKey,
	PartialEducationDetails,
	updateEducationDetails,
} from "@services/cpsService";

import { RootState } from "@redux/store/root.reducer";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IFormValues {
	recentEducation?: IDropdownInputItem;
	degree?: IDropdownInputItem;
	field?: IDropdownInputItem;
	fromYear?: IDropdownInputItem;
	academicStream?: IDropdownInputItem;
	toYear?: IDropdownInputItem;
	intermediateBoard?: IDropdownInputItem;
	matriculateBoard?: IDropdownInputItem;
	percentage?: string;
	university?: string;
}

interface IEducationDetailsFields {
	recentEducation: IDropdownFieldConfig;
	degree: IDropdownFieldConfig;
	field: ISearchFieldConfig;
	fromYear: IDropdownFieldConfig;
	academicStream: IDropdownFieldConfig;
	toYear: IDropdownFieldConfig;
	intermediateBoard: ISearchFieldConfig;
	matriculateBoard: ISearchFieldConfig;
	percentage: ITextFieldConfig;
	university: ITextFieldConfig;
}
interface IUseEducationController {
	educationIndex: number;
	educationItem?: ICPSEducationDetails;
	onDataSuccess: (data: ICPSEducationDetails, index: number) => void;
}

const educationsValues = {
	DOCTORATE: "Doctorate",
	MASTERS: "Post Graduation",
	UNDERGRAD: "Graduation",
	XII: "Class 12",
	BELOW_XII: "Below Class 12",
};

const educationList = Object.values(educationsValues).map((value) => ({
	label: value,
	value,
}));

const higherEducation = [
	educationsValues.DOCTORATE,
	educationsValues.MASTERS,
	educationsValues.UNDERGRAD,
];

const toYearLabels = {
	[educationsValues.DOCTORATE]: strings.GRADUATING_YEAR_TO,
	[educationsValues.MASTERS]: strings.GRADUATING_YEAR_TO,
	[educationsValues.UNDERGRAD]: strings.GRADUATING_YEAR_TO,
	[educationsValues.XII]: strings.PASSING_YEAR,
	[educationsValues.BELOW_XII]: strings.PASSING_YEAR,
};

const universityLabels = {
	[educationsValues.DOCTORATE]: strings.COLLEGE_UNIVERSITY,
	[educationsValues.MASTERS]: strings.COLLEGE_UNIVERSITY,
	[educationsValues.UNDERGRAD]: strings.COLLEGE_UNIVERSITY,
	[educationsValues.XII]: strings.CLASS_12TH_SCHOOL_NAME,
	[educationsValues.BELOW_XII]: strings.CLASS_10TH_SCHOOL_NAME,
};

const currentYear = new Date().getFullYear();

const mapYearsToLabelValue = (index: number, future = 0) => {
	const year = `${currentYear - index + future}`;

	return {
		label: year,
		value: year,
	};
};

const toYearValues = Array.from({ length: 62 }, (_, i) =>
	mapYearsToLabelValue(i, 11),
);
const fromYearValues = Array.from({ length: 51 }, (_, i) =>
	mapYearsToLabelValue(i),
);

const useAddEducationController = ({
	educationIndex,
	educationItem,
	onDataSuccess,
}: IUseEducationController) => {
	const { educationConfig, educationConfigLoading, getUserEducationConfig } =
		useAddEducationModel();

	const isFirstEducationDetails = educationIndex === 0;

	const id = useSelector((state: RootState) => state.user.user.id) || "";
	const navigation = useNavigation<RootHomeStackList>();

	const [educationDetailsFields, setEducationDetailsFields] =
		useState<IEducationDetailsFields | null>(null);
	const [existingEducationList, setExistingEducationList] = useState<
		ICPSEducationDetails[]
	>([]);
	const [isSaving, setIsSaving] = useState(false);
	const { showToast } = useToast();

	const [updateProfileSectionStatusMutation] = useMutation<
		IUpdateProfileSectionStatusMutation,
		IUpdateProfileSectionStatusMutationVariables
	>(updateProfileSectionStatusMutationQuery);

	const updateProfileSectionStatus = async () => {
		await updateProfileSectionStatusMutation({
			variables: {
				data: {
					section: "education",
					isCompleted: true,
				},
			},
		});
	};

	useEffect(() => {
		getUserEducationConfigData();
		fetchExistingEducation();
	}, [isFirstEducationDetails]);

	const fetchExistingEducation = async () => {
		try {
			const educationData = await getEducationDetails();
			if (educationData && educationData.length > 0) {
				setExistingEducationList(educationData);
				console.log(
					"🎓 AddEducation - Fetched existing education:",
					educationData,
				);
			}
		} catch (error) {
			console.error(
				"🎓 AddEducation - Failed to fetch education:",
				error,
			);
		}
	};

	const getUserEducationConfigData = () => {
		const variables = { where: { user: id } };
		getUserEducationConfig({ variables });
	};

	useEffect(() => {
		if (!educationConfig) return;

		const {
			userProfileConfigurationForLearner: {
				education: {
					fields: {
						academicStream,
						degree,
						field,
						fromYear,
						intermediateBoard,
						percentage,
						recentEducation,
						toYear,
						university,
					},
				},
			},
		} = educationConfig;

		const educationDetailsMapped: IEducationDetailsFields = {
			recentEducation: {
				name: "recentEducation",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: recentEducation.order,
				label: isFirstEducationDetails
					? recentEducation.label
					: strings.EDUCATION,
				isMandatory: recentEducation.isMandatory,
				isVisible: recentEducation.show,
				values: educationList,
				validations: getFieldValidations({
					isMandatory: recentEducation.isMandatory,
				}),
				description: recentEducation.subText || "",
			},
			degree: {
				name: "degree",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: degree.order,
				label: degree.label,
				isMandatory: degree.isMandatory,
				isVisible: degree.show,
				valuesDependency: {
					getValues: async () => {
						const data = await getMasterData(IMasterDataKey.DEGREE);
						if (!data) return [];
						return data.map(({ value }) => ({
							label: value,
							value,
						}));
					},
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: higherEducation,
				},
				validations: getFieldValidations({
					isMandatory: degree.isMandatory,
				}),
				description: degree.subText || "",
			},
			academicStream: {
				name: "academicStream",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: academicStream.order,
				label: academicStream.label,
				isMandatory: academicStream.isMandatory,
				isVisible: academicStream.show,
				valuesDependency: {
					getValues: async () => {
						const data = await getMasterData(
							IMasterDataKey.ACADEMIC_STREAM,
						);

						if (!data) return [];

						return data.map(({ value }) => ({
							label: value,
							value,
						}));
					},
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: [
						educationsValues.BELOW_XII,
						educationsValues.XII,
					],
				},

				validations: getFieldValidations({
					isMandatory: academicStream.isMandatory,
				}),
				description: academicStream.subText || "",
			},
			university: {
				name: "university",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: university.order,
				label: university.label,
				isMandatory: university.isMandatory,
				isVisible: university.show,
				validations: getFieldValidations({
					isMandatory: university.isMandatory,
				}),
				description: university.subText || "",
				valuesDependency: {
					dependency: "recentEducation",
					dependencyLabels: universityLabels,
					hideUntilDependency: true,
				},
			},
			percentage: {
				name: "percentage",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: percentage.order,
				label: percentage.label,
				isMandatory: percentage.isMandatory,
				isVisible: percentage.show,
				validations: getFieldValidations({
					isMandatory: percentage.isMandatory,
					pattern: /^(100|[1-9]?[0-9])$/,
				}),
				description: percentage.subText || "",
				textType: "number-pad",
				valuesDependency: {
					dependency: "recentEducation",
					hideUntilDependency: true,
				},
			},
			field: {
				name: "field",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: field.order,
				label: field.label,
				isMandatory: field.isMandatory,
				isVisible: field.show,
				valuesDependency: {
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: higherEducation,
					searchFieldName: IMasterDataKey.FIELDS,
				},
				validations: getFieldValidations({
					isMandatory: field.isMandatory,
				}),
				description: field.subText || "",
			},
			intermediateBoard: {
				name: "intermediateBoard",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: intermediateBoard.order,
				label: strings.CLASS_12TH_BOARD,
				isMandatory: intermediateBoard.isMandatory,
				isVisible: intermediateBoard.show,
				valuesDependency: {
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: [educationsValues.XII],
					searchFieldName: IMasterDataKey.INTERMEDIATE_BOARD,
				},
				validations: getFieldValidations({
					isMandatory: intermediateBoard.isMandatory,
				}),
				description: intermediateBoard.subText || "",
			},
			matriculateBoard: {
				name: "matriculateBoard",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: intermediateBoard.order,
				label: strings.CLASS_10TH_BOARD,
				isMandatory: intermediateBoard.isMandatory,
				isVisible: intermediateBoard.show,
				valuesDependency: {
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: [educationsValues.BELOW_XII],
					searchFieldName: IMasterDataKey.MATRICULATION_BOARD,
				},
				validations: getFieldValidations({
					isMandatory: intermediateBoard.isMandatory,
				}),
				description: intermediateBoard.subText || "",
			},
			toYear: {
				name: "toYear",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: toYear.order,
				label: toYear.label,
				isMandatory: toYear.isMandatory,
				isVisible: toYear.show,
				validations: getFieldValidations({
					isMandatory: toYear.isMandatory,
					dateValidation: {
						watch: () => methods.watch("fromYear")?.value || "",
						error: strings.END_YEAR_SHOULD_BE_GREATER_THAN_START_YEAR,
					},
				}),
				values: toYearValues,
				description: toYear.subText || "",
				valuesDependency: {
					dependency: "recentEducation",
					dependencyLabels: toYearLabels,
					hideUntilDependency: true,
				},
			},
			fromYear: {
				name: "fromYear",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: fromYear.order,
				label: fromYear.label,
				isMandatory: fromYear.isMandatory,
				isVisible: fromYear.show,
				validations: getFieldValidations({
					isMandatory: fromYear.isMandatory,
				}),
				values: fromYearValues,
				description: fromYear.subText || "",
				valuesDependency: {
					dependency: "recentEducation",
					hideUntilDependency: true,
					dependencyValues: higherEducation,
				},
			},
		};

		setEducationDetailsFields(educationDetailsMapped);
	}, [educationConfig]);

	useEffect(() => {
		if (!educationItem) return;

		const education = educationItem;

		const defaultValues = {
			recentEducation: education?.educationType
				? {
						label: education.educationType,
						value: education.educationType,
					}
				: undefined,
			degree: education?.degree
				? {
						label: education.degree,
						value: education.degree,
					}
				: undefined,
			field: education?.branch
				? {
						label: education.branch,
						value: education.branch,
					}
				: undefined,
			fromYear: education?.graduatingYearFrom
				? {
						label: `${education.graduatingYearFrom}`,
						value: `${education.graduatingYearFrom}`,
					}
				: undefined,
			academicStream: education?.stream
				? {
						label: education.stream,
						value: education.stream,
					}
				: undefined,
			toYear: education?.graduatingYearTo
				? {
						label: `${education.graduatingYearTo}`,
						value: `${education.graduatingYearTo}`,
					}
				: undefined,
			intermediateBoard: education?.board
				? {
						label: education.board,
						value: education.board,
					}
				: undefined,
			matriculateBoard: education?.board
				? {
						label: education.board,
						value: education.board,
					}
				: undefined,
			percentage: education?.percentage?.toString() || "",
			university: education?.university || "",
		};

		methods.reset(defaultValues);
	}, [educationItem]);

	const fields = Object.values(educationDetailsFields || {})
		.filter((a) => a.isVisible)
		.sort((a, b) => a.order - b.order);

	const { ...methods } = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async ({
		academicStream,
		degree,
		field,
		fromYear,
		intermediateBoard,
		matriculateBoard,
		percentage,
		recentEducation,
		toYear,
		university,
	}) => {
		const newEducation: ICPSEducationDetails = {
			isHighestEducation: isFirstEducationDetails,
			stream: academicStream?.value || "",
			degree: degree?.value || "",
			branch: field?.value || "",
			graduatingYearFrom: fromYear?.value ? +fromYear.value : 0,
			board: matriculateBoard?.value || intermediateBoard?.value || "",
			percentage: percentage ? +percentage : 0,
			educationType: recentEducation?.value || "",
			graduatingYearTo: toYear?.value ? +toYear.value : 0,
			university: university || "",
		};

		// Merge with existing education list (similar to work experience)
		const mappedEducation: ICPSEducationDetails[] = [
			...existingEducationList,
		];

		console.log(
			"🎓 AddEducation - Existing education list:",
			mappedEducation,
		);
		console.log("🎓 AddEducation - New education:", newEducation);
		console.log("🎓 AddEducation - Education index:", educationIndex);

		// Handle new entry vs editing existing
		const isNewEntry = educationIndex === 0 || educationIndex === null;

		if (isNewEntry) {
			// For new entries, always push to array
			console.log("🎓 AddEducation - Adding new education");
			mappedEducation.push(newEducation);
		} else {
			// For editing, update at the specific index
			console.log(
				"🎓 AddEducation - Editing education at index:",
				educationIndex - 1,
			);
			if (mappedEducation.length > educationIndex - 1) {
				mappedEducation[educationIndex - 1] = newEducation;
			} else {
				// Fallback: if index doesn't exist, push to array
				mappedEducation.push(newEducation);
			}
		}

		console.log(
			"🎓 AddEducation - Final education list to save:",
			mappedEducation,
		);

		try {
			setIsSaving(true);

			// Save to backend (similar to work experience)
			await updateEducationDetails(mappedEducation);
			console.log("🎓 AddEducation - API call successful");

			// Update profile section status
			await updateProfileSectionStatus();
			console.log("🎓 AddEducation - Profile section status updated");

			showToast({
				message: strings.SAVED_SUCCESSFULLY,
				type: ToastType.SUCCESS,
				duration: 1000,
			});

			// Update parent state
			onDataSuccess(newEducation, educationIndex);

			setTimeout(() => navigation.goBack(), 1200);
		} catch (error) {
			console.error("🎓 AddEducation - API call failed:", error);
			showToast({
				message: "Failed to save education details. Please try again.",
				type: ToastType.ERROR,
				duration: 2000,
			});
			setIsSaving(false);
		}
	};

	const onError: SubmitErrorHandler<IFormValues> = (errors) => errors;

	return {
		fields,
		methods,
		onError,
		onSubmit,
		buttonDisabled: educationConfigLoading || isSaving,
		loading: educationConfigLoading || isSaving,
	};
};

export default useAddEducationController;
