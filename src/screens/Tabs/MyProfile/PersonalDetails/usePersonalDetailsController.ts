import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import usePersonalDetailsModel from "@screens/Tabs/MyProfile/PersonalDetails/usePersonalDetailsModel";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import {
	IUploadFile,
	IUploadFileType,
} from "@components/Inputs/UploadInput/useUploadController";
import {
	IDateFieldConfig,
	IDropdownFieldConfig,
	IProfileInputType,
	ISearchFieldConfig,
	ITextFieldConfig,
	IUploadFieldConfig,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import {
	getCPSCityListByState,
	getCPSCountryList,
	getCPSStateListByCountry,
	getMasterData,
	IMasterDataKey,
} from "@services/cpsService";

import { RootState } from "@redux/store/root.reducer";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { isLinkedInUrl } from "@constants/regex.constants";

import { strings } from "@assets/strings";

interface IFormValues {
	firstName?: string;
	lastName?: string;
	fathersName?: string;
	dateOfBirth?: string;
	gender?: IDropdownInputItem;
	country?: IDropdownInputItem;
	state?: IDropdownInputItem;
	city?: IDropdownInputItem;
	nationality?: IDropdownInputItem;
	timezone?: IDropdownInputItem;
	linkedIn?: string;
	telegram?: string;
	address?: string;
	pincode?: string;
	github?: string;
	image?: IUploadFile;
	kaggle?: string;
	stackOverflow?: string;
	resume?: IUploadFile;
}

interface IPersonalDetailsFields {
	firstName: ITextFieldConfig;
	lastName: ITextFieldConfig;
	fathersName: ITextFieldConfig;
	dateOfBirth: IDateFieldConfig;
	gender: IDropdownFieldConfig;
	country: ISearchFieldConfig;
	state: ISearchFieldConfig;
	city: ISearchFieldConfig;
	nationality: IDropdownFieldConfig;
	linkedIn: ITextFieldConfig;
	telegram: ITextFieldConfig;
	address: ITextFieldConfig;
	pincode: ITextFieldConfig;
	github: ITextFieldConfig;
	image: IUploadFieldConfig; //TODO
	kaggle: ITextFieldConfig;
	resume: IUploadFieldConfig; //TODO
	stackOverflow: ITextFieldConfig;
}

interface IUsePersonalDetailsController {
	isStudyPlanBlocker: boolean;
}

const usePersonalDetailsController = ({
	isStudyPlanBlocker,
}: IUsePersonalDetailsController) => {
	const {
		getUserPersonalDetails,
		personalDetails,
		getUserPersonalDetailsConfig,
		personalDetailsConfig,
		updateUserPersonalDetails,
		updateUserPersonalDetailsLoading,
		personalDetailsConfigLoading,
		personalDetailsLoading,
		updateUserPersonalDetailsResume,
		getUserPersonalDetailsResume,
		userPersonalDetailsResume,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	} = usePersonalDetailsModel();

	const { showToast } = useToast();
	const navigation = useNavigation<RootHomeStackList>();
	const userId = useSelector((state: RootState) => state.user.user.id) || "";
	const userCurrentTimezone = useSelector(
		(state: RootState) => state.personalDetails.timezone,
	);

	useEffect(() => {
		getUserPersonalDetails();
		getUserPersonalDetailsConfig();
		getUserPersonalDetailsResume();
	}, []);

	const [personalDetailsFields, setPersonalDetailsFields] =
		useState<IPersonalDetailsFields | null>(null);

	useEffect(() => {
		if (!personalDetails || !personalDetailsConfig) return;

		const {
			userProfileConfigurationForLearner: {
				personalDetails: {
					fields: {
						firstName,
						lastName,
						fathersName,
						dateOfBirth,
						// aadhaar,
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
						// timezone,
						state,
					},
				},
			},
		} = personalDetailsConfig;

		const { user } = personalDetails;
		const personalDetailsMapped: IPersonalDetailsFields = {
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
			fathersName: {
				name: "fathersName",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: fathersName?.order,
				label: fathersName?.label,
				isMandatory: fathersName?.isMandatory,
				isVisible: fathersName?.show,

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
				type: IProfileInputType.DROPDOWN,
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
			},
			country: {
				name: "country",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: 7,
				label: country.label,
				isMandatory: country.isMandatory,
				isVisible: country.show,
				isAddEnabled: false,
				valuesDependency: {
					getValues: getCPSCountryList,
				},
				validations: getFieldValidations({
					isMandatory: country.isMandatory,
				}),
				description: country.subText || "",
			},
			state: {
				name: "state",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: 8,
				label: state.label,
				isMandatory: state.isMandatory,
				isVisible: state.show,
				isAddEnabled: false,
				valuesDependency: {
					dependency: "country",
					getValues: async (input: string, countryName: string) => {
						if (!countryName) return [];

						const data = await getCPSStateListByCountry({
							input,
							countryName,
						});

						return data;
					},
				},
				validations: getFieldValidations({
					isMandatory: state.isMandatory,
				}),
				description: state.subText || "",
			},
			city: {
				name: "city",
				type: IProfileInputType.SEARCH,
				isDisabled: false,
				order: 9,
				label: city.label,
				isMandatory: city.isMandatory,
				isVisible: city.show,
				isAddEnabled: false,
				valuesDependency: {
					dependency: "state",
					getValues: async (input: string, stateName: string) => {
						if (!stateName) return [];

						const data = await getCPSCityListByState({
							input,
							stateName,
						});

						if (!data) return [];

						return data;
					},
				},
				validations: getFieldValidations({
					isMandatory: city.isMandatory,
				}),
				description: city.subText || "",
			},
			nationality: {
				name: "nationality",
				type: IProfileInputType.DROPDOWN,
				isDisabled: false,
				order: nationality.order,
				label: nationality.label,
				isMandatory: nationality.isMandatory,
				isVisible: nationality.show,
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
				validations: getFieldValidations({
					isMandatory: nationality.isMandatory,
				}),
				description: nationality.subText || "",
				isSearchEnabled: true,
			},
			linkedIn: {
				name: "linkedIn",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: linkedIn.order,
				label: linkedIn.label,
				isMandatory: linkedIn.isMandatory,
				isVisible: linkedIn.show,
				validations: getFieldValidations({
					isMandatory: linkedIn.isMandatory,
					pattern: isLinkedInUrl,
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
			image: {
				name: "image",
				type: IProfileInputType.UPLOAD,
				fileType: IUploadFileType.MEDIA,
				isDisabled: false,
				order: image.order,
				label: image.label,
				isMandatory: image.isMandatory,
				isVisible: isStudyPlanBlocker && image.show,
				validations: getFieldValidations({
					isMandatory: image.isMandatory,
				}),
				description: image.subText || "",
				buttonLabel: strings.UPLOAD,
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
			resume: {
				name: "resume",
				type: IProfileInputType.UPLOAD,
				fileType: IUploadFileType.PDF,
				isDisabled: false,
				order: resume.order,
				label: resume.label,
				isMandatory: resume.isMandatory,
				isVisible: isStudyPlanBlocker && resume.show,
				validations: getFieldValidations({
					isMandatory: resume.isMandatory,
				}),
				description: "", //TODO
				buttonLabel: strings.UPLOAD_RESUME,
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
		};

		setPersonalDetailsFields(personalDetailsMapped);
	}, [personalDetailsConfig, personalDetails]);

	const getLatestResumeFromUser = () => {
		const resumeList = getAllResumesFromUser();
		if (!resumeList) return;

		const resumeLength = resumeList?.length;
		if (!resumeLength) return;

		const lastestResume = resumeList[resumeLength - 1];
		if (!lastestResume) return;

		return lastestResume;
	};

	const getAllResumesFromUser = () => {
		if (!userPersonalDetailsResume) return;

		const resumeList =
			userPersonalDetailsResume?.user.userProfileResume?.resumes;

		if (!resumeList) return;

		const filteredResumeList = resumeList.filter(
			(rL: any) => !rL._isDeleted,
		);

		return filteredResumeList;
	};

	const prevResumes = (getAllResumesFromUser() || [])
		.slice(0, -1)
		.map((r: any) => ({
			fileName: r.fileName,
			filePath: r.filePath,
			uploadedAt: r.uploadedAt,
		}));
	useEffect(() => {
		if (!personalDetails) return;

		const { user } = personalDetails;

		const resume = getLatestResumeFromUser();

		const defaultValues = {
			firstName: user.firstName || undefined,
			lastName: user.lastName || undefined,
			fathersName: user.fatherName || undefined,
			dateOfBirth: user.dateOfBirth || undefined,
			gender: user.gender
				? {
						label: user.gender,
						value: user.gender,
					}
				: undefined,
			country: user.country
				? {
						label: user.country,
						value: user.country,
					}
				: undefined,
			state: user.state
				? {
						label: user.state,
						value: user.state,
					}
				: undefined,
			city: user.city
				? {
						label: user.city,
						value: user.city,
					}
				: undefined,
			nationality: user.nationality
				? {
						label: user.nationality,
						value: user.nationality,
					}
				: undefined,
			linkedIn: user.linkedIn || undefined,
			telegram: user.telegram || undefined,
			address: user.address || undefined,
			pincode: user.pincode?.toString() || undefined,
			github: user.github || undefined,
			image: user.image
				? { filePath: user.image, fileName: "", uploadedAt: "" }
				: undefined,
			kaggle: user.kaggle || undefined,
			resume: resume
				? {
						fileName: resume.fileName,
						filePath: resume.filePath,
						uploadedAt: resume.uploadedAt,
					}
				: undefined,
			stackOverflow: user.stackOverflow || undefined,
		};

		methods.reset(defaultValues);
	}, [personalDetails]);

	const fields = Object.values(personalDetailsFields || {})
		.filter((a) => a.isVisible)
		.sort((a, b) => a.order - b.order);

	const { ...methods } = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const resume = data.resume;
		const isResumeFieldVisible = personalDetailsFields?.resume?.isVisible;

		if (resume && isResumeFieldVisible) {
			updateUserPersonalDetailsResume({
				variables: {
					where: { id: userId },
					data: {
						userProfileResume: {
							resumes: [resume],
						},
					},
				},
			});
		}

		await updateUserPersonalDetails({
			firstName: data.firstName,
			lastName: data.lastName,
			dateOfBirth: moment(data.dateOfBirth)
				.tz(userCurrentTimezone.name)
				.toISOString(),
			gender: data.gender?.value,
			parentDocument: data.fathersName
				? {
						fatherName: data.fathersName,
					}
				: undefined,
			nationality: data.nationality?.value,
			linkedInUrl: data.linkedIn,
			telegramId: data.telegram,
			address: {
				flatNo: data.address,
				pincode: data.pincode ? +data.pincode : undefined,
				state: data.state?.label,
				city: data.city?.label,
				country: data.country?.label,
			},
			githubProfile: data.github,
			profilePictureUrl: data.image?.filePath,
			kaggleProfile: data.kaggle,
			stackOverflowUrl: data.stackOverflow,
			userProfileResume: data.resume
				? { resumes: [...prevResumes, data.resume] }
				: undefined,
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
		updateUserPersonalDetailsLoading || updateProfileSectionStatusLoading;
	const loading = personalDetailsConfigLoading || personalDetailsLoading;

	return {
		fields,
		methods,
		onSubmit,
		onError,
		buttonDisabled,
		loading,
	};
};

export default usePersonalDetailsController;
