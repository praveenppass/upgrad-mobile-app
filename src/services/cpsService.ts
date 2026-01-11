import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { jwtDecode } from "jwt-decode";

import {
	getGooglePlaceDetails,
	getGooglePlacesPredictions,
	mapGooglePlacesPredictions,
} from "@services/googlePlaces";
import { IGooglePlacesTypes } from "@services/googlePlaces/googlePlaces.interface";

import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import { store } from "@redux/store/store";

import StorageKeys from "@constants/storage.constants";

import countries from "@data/countries.json";
import indiaStates from "@data/india-states.json";

export interface ICPSEducationDetails {
	degree: string;
	graduatingYearFrom: number;
	graduatingYearTo: number;
	branch: string;
	percentage: number;
	university: string;
	educationType: string;
	board: string;
	stream: string;
	isHighestEducation: boolean;
}

export interface ICPSMyTimezoneDetails {
	timezone: string;
}

export interface ICPSWorkExperienceDetailsItem {
	org: string;
	designation: string;
	industry: string;
	startYear: number;
	endYear: number;
	noticePeriod: number;
	ctc: string;
	domain: string;
	currentWorkExperience: boolean;
	description: string;
	reimbursementPolicy: boolean;
	reimbursementStatus: boolean;
	totalWorkExperienceInMonth: number;
	totalWorkExperienceInYear: number;
	startMonth: string;
	endMonth: string;
}
export interface ICPSContactDetails {
	alternateEmail?: string;
	whatsAppNumber?: string | null;
	whatsAppNumberCountryCode?: string | null;
}

export enum ICPSEmploymentStatus {
	FRESHER = "no_fresher",
	WORKING = "yes",
	NOT_WORKING = "no_unemployed",
}

export interface ICPSBaseResponse {
	userId: number;
	firstName: string | null;
	lastName: string | null;
	profilePictureUrl: string;
	countryCode: string | null;
	email: string | null;
	phoneVerified: boolean;
	alternateEmail: string | null;
	whatsAppNumber: string | null;
	whatsAppNumberCountryCode: string | null;
	mobileNumber: string | null;
	pinCode: string | null;
	address: {
		flatNo: string | null;
		pincode: number | null;
		city: string | null;
		country: string | null;
		state: string | null;
	} | null;
	education: ICPSEducationDetails[] | null;
	workExperiences: ICPSWorkExperienceDetailsItem[] | null;
	currentlyWorking: ICPSEmploymentStatus | null;
	totalWorkExp: number | null;
	resume: string | null;
	dateOfBirth: string | null;
	isProfileUpdate: boolean | null;
	userProfileResume: IUserProfileResume;
	githubProfile: string | null;
	kaggleProfile: string | null;
	linkedInUrl: string | null;
	stackOverflowUrl: string | null;
	telegramId: string | null;
	resumeLink: string | null;
	nationality: string | null;
	state: string | null;
	city: string | null;
	gender: string | null;
	country: string | null;
	timezone: string | null;
	parentDocument: {
		fatherName: string | null;
	} | null;
	saProfile: boolean;
	saToken: string | null;
}

export interface ICPSUpdatePersonalDetailsData {
	linkedInUrl?: string;
	nationality?: string;
	country?: string;
	state?: string;
	city?: string;
	githubProfile?: string;
	address?: {
		state?: string;
		city?: string;
		country?: string;
		flatNo?: string;
		pincode?: number;
	};
	kaggleProfile?: string;
	stackOverflowUrl?: string;
	gender?: string;
	dateOfBirth?: string;
	lastName?: string;
	firstName?: string;
	parentDocument?: {
		fatherName: string;
	};
	profilePictureUrl?: string;
	telegramId?: string;
	userProfileResume?: {
		resumes: {
			fileName: string;
			filePath: string;
			uploadedAt: string;
		}[];
	};
}

export interface ICPSContactDetailsConfigField {
	id: string;
	section: string;
	subSection: string;
	name: string;
	sequence: number;
	placeholder: string;
	type: string;
	errorMessage: string;
	key: string;
	fieldInfo: string;
	infoMessage: string;
	isDisplay: boolean;
	isMandatory: boolean;
	regex: string;
}

interface ICPSApiResponse {
	success?: boolean;
	message?: string;
	data?: unknown;
	[key: string]: unknown;
}

const CPS_BASE_URL = ENV.cpsServiceUrl;

const getAuthToken = (): string | null => {
	const omsAuthToken = storage.getString(StorageKeys.OMS_AUTH_TOKEN);
	return omsAuthToken || null;
};

const appendServiceNameToPayload = <T extends Record<string, unknown>>(
	payload: T,
): T & { serviceName: string } => {
	return {
		...payload,
		serviceName: "upgrad-app",
	};
};

const cpsAxios: AxiosInstance = axios.create({
	baseURL: CPS_BASE_URL,
	timeout: 30000,
});

export const INDIA_COUNTRY_NAME = "India";

cpsAxios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getAuthToken();

		if (token) {
			config.headers["Auth-Token"] = token;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

cpsAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

const makeCPSRequest = async (
	saToken?: boolean,
): Promise<ICPSBaseResponse | null> => {
	try {
		let learningPartnerUserId =
			store.getState().user.user.learningPartnerUserId;

		if (!learningPartnerUserId) {
			const omsAuthToken = storage.getString(StorageKeys.OMS_AUTH_TOKEN);
			if (!omsAuthToken) {
				return null;
			}

			const decoded = jwtDecode(omsAuthToken);
			learningPartnerUserId = decoded.sub;
		}

		const url = saToken
			? `/user/${learningPartnerUserId}/profile?saToken=true`
			: `/user/${learningPartnerUserId}/profile`;

		const response: AxiosResponse<ICPSBaseResponse> =
			await cpsAxios.get(url);

		return response.data;
	} catch (error) {
		return null;
	}
};

export interface IUserProfileResume {
	resumes: IResume[] | null;
}

export interface IResume {
	fileName: string;
	filePath: string;
	uploadedAt: string;
	resumeId: string;
	_isDeleted: boolean;
}

export interface IUserProfileResponse {
	firstName: string | null;
	lastName: string | null;
	image: string | null;
	mobile: string | null;
	email: string | null;
	pincode: number | null;
	address: string | null;
	educations: ICPSEducationDetails[] | null;
	workExperiences: ICPSWorkExperienceDetailsItem[] | null;
	// employmentStatus: ICPSEmploymentStatus | null;
	currentlyWorking: ICPSEmploymentStatus | null;
	totalWorkExp: number | null;
	alternateEmail: string | null;
	resume: string | null;
	dateOfBirth: string | null;
	isProfileUpdate: boolean | null;
	userProfileResume: IUserProfileResume;
	timezone: string | null;
	userId: number;
}
export interface IUserProfileWithSaTokenResponse {
	saProfile: boolean;
	saToken: string | null;
}

export const getUserProfile =
	async (): Promise<IUserProfileResponse | null> => {
		const response = await makeCPSRequest();

		if (!response) return null;

		return {
			userId: response.userId,
			firstName: response.firstName,
			lastName: response.lastName,
			image: response.profilePictureUrl,
			mobile: response.mobileNumber?.toString() || null,
			email: response.email,
			pincode: response.address?.pincode ?? null,
			address: response.address?.flatNo || null,
			educations: response.education || [],
			workExperiences: response.workExperiences,
			currentlyWorking: response.currentlyWorking,
			totalWorkExp: response.totalWorkExp,
			alternateEmail: response.alternateEmail,
			resume: response.resume,
			dateOfBirth: response.dateOfBirth,
			isProfileUpdate: response.isProfileUpdate,
			userProfileResume: response.userProfileResume,
			timezone: response.timezone,
		};
	};

export const getUserProfileWithSaToken =
	async (): Promise<IUserProfileWithSaTokenResponse | null> => {
		const response = await makeCPSRequest(true);

		if (!response) return null;

		return {
			saProfile: response.saProfile,
			saToken: response.saToken || null,
		};
	};

export const getContactDetails = async () => {
	const response = await makeCPSRequest();

	if (!response) return null;

	return {
		user: {
			isd: response.countryCode,
			email: response.email,
			isMobileVerify: response.phoneVerified,
			alternateEmail: response.alternateEmail,
			whatsAppMobile: response.whatsAppNumber,
			whatsAppIsd: response.whatsAppNumberCountryCode,
			mobile: response.mobileNumber?.toString() || null,
		},
	};
};

export const getPersonalDetails = async () => {
	const response = await makeCPSRequest();
	if (!response) return null;

	return {
		user: {
			firstName: response.firstName,
			lastName: response.lastName,
			fatherName: response.parentDocument?.fatherName,
			image: response.profilePictureUrl,
			isd: response.countryCode,
			mobile: response.mobileNumber,
			email: response.email,
			pincode: response.address?.pincode,
			address: response.address?.flatNo,
			dateOfBirth: response.dateOfBirth,
			github: response.githubProfile,
			kaggle: response.kaggleProfile,
			linkedIn: response.linkedInUrl,
			stackOverflow: response.stackOverflowUrl,
			telegram: response.telegramId,
			resume: response.resumeLink,
			city: response.address?.city,
			country: response.address?.country,
			gender: response.gender,
			nationality: response.nationality,
			state: response.address?.state,
		},
	};
};

export type PartialContactDetails = Partial<ICPSContactDetails>;

export const updateContactDetails = async (
	contactDetails: PartialContactDetails,
) => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	if (!authToken || !learningPartnerUserId) return null;

	try {
		const payload = appendServiceNameToPayload({ ...contactDetails });

		const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
			`/user/${learningPartnerUserId}/profile`,
			payload,
			{ headers: { "Auth-Token": authToken } },
		);

		return response.data;
	} catch (error) {
		return null;
	}
};

export type PartialMyTimezone = Partial<ICPSMyTimezoneDetails>;

export const updateUserMyTimezone = async (timezone: PartialMyTimezone) => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	if (!authToken || !learningPartnerUserId) return null;

	try {
		const payload = appendServiceNameToPayload({
			timezone: timezone.timezone,
		});

		const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
			`/user/${learningPartnerUserId}/profile`,
			payload,
			{ headers: { "Auth-Token": authToken } },
		);

		return response.data;
	} catch (error) {
		return null;
	}
};

export type PartialPersonalDetails = Partial<ICPSUpdatePersonalDetailsData>;

export const updatePersonalDetails = async (
	updateData: PartialPersonalDetails,
): Promise<ICPSApiResponse> => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	const payload = appendServiceNameToPayload(updateData);

	const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
		`/user/${learningPartnerUserId}/profile`,
		payload,
		{
			headers: {
				Accept: "application/json",
				"Auth-Token": authToken,
				"Content-Type": "application/json",
			},
		},
	);
	return response.data;
};

export enum IMasterDataKey {
	ACADEMIC_STREAM = "academicStream",
	DEGREE = "degree",
	MATRICULATION_BOARD = "matriculationBoard",
	INTERMEDIATE_BOARD = "intermediateBoard",
	FIELDS = "fields",
	GENDER = "gender",
	NATIONALITY = "nationality",
	CTC = "ctc",
	ROLES = "roles",
	ORGANIZATION = "organization",
	WORK_DOMAIN = "workDomain",
	INDUSTRY = "industry",
	TIMEZONE = "timezone",
	PRIMARY_REASON_TO_JOIN_PROGRAM = "primaryReasonToJoinProgram",
	PREFERRED_DOMAIN = "preferredDomain",
	SUB_DOMAIN = "subDomain",
	PREFERRED_CITY = "preferredCity",
	PI_TIME_SLOTS = "piTimeSlots",
}

interface IMasterData {
	value: string;
	offset?: string;
}

export type IMasterDataResponse = IMasterData[];

// Helper function to make CPS requests using configured axios instance
export const getMasterData = async (masterDataKey: IMasterDataKey) => {
	try {
		const response: AxiosResponse<IMasterDataResponse> = await cpsAxios.get(
			`/master-data/type/${masterDataKey}/status/ACTIVE`,
		);
		return response.data;
	} catch (error) {
		return null;
	}
};

interface IAddMasterData {
	masterDataKey: IMasterDataKey;
	value: string;
}

export const addMasterData = async ({
	masterDataKey,
	value,
}: IAddMasterData) => {
	await cpsAxios.post("/master-data", {
		type: masterDataKey,
		value,
		status: "ACTIVE",
	});
};

export const getEducationDetails = async () => {
	const response = await makeCPSRequest();
	if (!response) return null;

	return response.education;
};
export interface ICPSAccountDetails {
	id: string;
	profilePictureUrl: string;
	firstName: string;
	lastName: string;
	mobile: string;
	dateOfBirth: string;
	email: string;
	address: string;
}

export type PartialEducationDetails = Partial<ICPSEducationDetails>;
export type PartialAccountDetails = Partial<ICPSAccountDetails>;

export const updateEducationDetails = async (
	educations: PartialEducationDetails[],
) => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	if (!authToken || !learningPartnerUserId) return null;

	try {
		const payload = appendServiceNameToPayload({ education: educations });

		const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
			`/user/${learningPartnerUserId}/profile`,
			payload,
			{ headers: { "Auth-Token": authToken } },
		);

		return response.data;
	} catch (error) {
		return null;
	}
};

export const updateMyAccountProfileDetails = async (
	accountData: PartialAccountDetails,
) => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	if (!authToken || !learningPartnerUserId) return null;

	try {
		const payload = appendServiceNameToPayload(accountData);

		const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
			`/user/${learningPartnerUserId}/profile`,
			payload,
			{ headers: { "Auth-Token": authToken } },
		);

		return response.data;
	} catch (error) {
		return null;
	}
};
export type PartialWorkExperienceDetailsItem =
	Partial<ICPSWorkExperienceDetailsItem>;

export interface ICPSWorkExperienceDetails {
	workExperiences: ICPSWorkExperienceDetailsItem[] | null;
	currentlyWorking: ICPSEmploymentStatus | null;
	totalWorkExperience: number | null;
}

export const getWorkExperienceDetails =
	async (): Promise<ICPSWorkExperienceDetails | null> => {
		const response = await makeCPSRequest();
		if (!response) return null;

		return {
			workExperiences: response.workExperiences,
			currentlyWorking: response.currentlyWorking,
			totalWorkExperience: response.totalWorkExp,
		};
	};

export interface IUpdateWorkExperienceDetails {
	workExperiences?: PartialWorkExperienceDetailsItem[];
	totalWorkExperience?: number;
	currentlyWorking?: ICPSEmploymentStatus;
}

export const updateWorkExperienceDetails = async ({
	workExperiences,
	totalWorkExperience,
	currentlyWorking,
}: IUpdateWorkExperienceDetails) => {
	const learningPartnerUserId =
		store.getState().user.user.learningPartnerUserId;
	const authToken = getAuthToken();

	if (!authToken || !learningPartnerUserId) return null;

	try {
		const payload = appendServiceNameToPayload({
			...(workExperiences !== undefined && {
				workExperiences: workExperiences,
			}),
			...(totalWorkExperience && {
				totalWorkExp: totalWorkExperience,
			}),
			...(currentlyWorking && {
				currentlyWorking: currentlyWorking,
			}),
		});

		const response: AxiosResponse<ICPSApiResponse> = await cpsAxios.put(
			`/user/${learningPartnerUserId}/profile`,
			payload,
			{ headers: { "Auth-Token": authToken } },
		);

		return response.data;
	} catch (error) {
		return null;
	}
};

export const getCPSCountryList = async (input: string) => {
	return countries
		.filter((country) =>
			country.toLowerCase().includes(input.toLowerCase()),
		)
		.map((country) => ({
			label: country,
			value: country,
		}));

	// Google Places API is now deprecated for country list

	// const predictions = await getGooglePlacesPredictions({
	// 	input,
	// 	types: "country",
	// });
	// return mapGooglePlacesPredictions(predictions);
};

interface IGooglePlacesStateListByCountry {
	input: string;
	countryName: string;
}

export const getCPSStateListByCountry = async ({
	input,
	countryName,
}: IGooglePlacesStateListByCountry) => {
	if (countryName === INDIA_COUNTRY_NAME)
		return indiaStates
			.filter((state) =>
				state.toLowerCase().includes(input.toLowerCase()),
			)
			.map((state) => ({
				label: state,
				value: state,
			}));

	const country = await getGooglePlaceDetails({
		placeName: countryName,
		placeType: IGooglePlacesTypes.COUNTRY,
	});

	if (!country) return [];

	const countryCode = country.short_name;

	const predictions = await getGooglePlacesPredictions({
		input,
		types: IGooglePlacesTypes.STATE,
		components: `country:${countryCode}`,
	});

	return mapGooglePlacesPredictions(predictions);
};

interface IGooglePlacesCityListByState {
	input: string;
	stateName: string;
}

export const getCPSCityListByState = async ({
	input,
	stateName,
}: IGooglePlacesCityListByState) => {
	const state = await getGooglePlaceDetails({
		placeName: stateName,
		placeType: IGooglePlacesTypes.STATE,
	});

	if (!state) return [];

	const stateLongName = state.long_name;

	const predictions = await getGooglePlacesPredictions({
		input,
		types: IGooglePlacesTypes.CITY,
	});

	const filteredCities = predictions.filter((city) => {
		const description = city.description.toLowerCase();
		const stateNameLower = stateLongName.toLowerCase();

		return description.includes(stateNameLower);
	});

	return mapGooglePlacesPredictions(filteredCities);
};

// Unified Profile Data Service
export interface IUnifiedProfileData {
	personalDetails: {
		user: {
			firstName: string | null;
			lastName: string | null;
			fatherName: string | null;
			image: string | null;
			isd: string | null;
			mobile: string | null;
			email: string | null;
			pincode: number | null;
			address: string | null;
			dateOfBirth: string | null;
			github: string | null;
			kaggle: string | null;
			linkedIn: string | null;
			stackOverflow: string | null;
			telegram: string | null;
			resume: string | null;
			city: string | null;
			country: string | null;
			gender: string | null;
			nationality: string | null;
			state: string | null;
		};
	};
	contactDetails: {
		user: {
			isd: string | null;
			email: string | null;
			isMobileVerify: boolean;
			alternateEmail: string | null;
			whatsAppMobile: string | null;
			whatsAppIsd: string | null;
			mobile: string | null;
		};
	};
	workExperienceDetails: ICPSWorkExperienceDetails;
	educationArray: ICPSEducationDetails[] | null;
}

export const getAllUserProfileData =
	async (): Promise<IUnifiedProfileData | null> => {
		const response = await makeCPSRequest();
		if (!response) return null;

		return {
			// Personal Details Data (matches getPersonalDetails structure)
			personalDetails: {
				user: {
					firstName: response.firstName,
					lastName: response.lastName,
					fatherName: response.parentDocument?.fatherName || null,
					image: response.profilePictureUrl,
					isd: response.countryCode,
					mobile: response.mobileNumber,
					email: response.email,
					pincode: response.address?.pincode || null,
					address: response.address?.flatNo || null,
					dateOfBirth: response.dateOfBirth,
					github: response.githubProfile,
					kaggle: response.kaggleProfile,
					linkedIn: response.linkedInUrl,
					stackOverflow: response.stackOverflowUrl,
					telegram: response.telegramId,
					resume: response.resumeLink,
					city: response.address?.city || null,
					country: response.address?.country || null,
					gender: response.gender,
					nationality: response.nationality,
					state: response.address?.state || null,
				},
			},

			// Contact Details Data (matches getContactDetails structure)
			contactDetails: {
				user: {
					isd: response.countryCode,
					email: response.email,
					isMobileVerify: response.phoneVerified,
					alternateEmail: response.alternateEmail,
					whatsAppMobile: response.whatsAppNumber,
					whatsAppIsd: response.whatsAppNumberCountryCode,
					mobile: response.mobileNumber?.toString() || null,
				},
			},

			// Work Experience Data (matches getWorkExperienceDetails structure)
			workExperienceDetails: {
				workExperiences: response.workExperiences,
				currentlyWorking: response.currentlyWorking,
				totalWorkExperience: response.totalWorkExp,
			},

			// Education Data (matches getEducationDetails structure)
			educationArray: response.education,
		};
	};
