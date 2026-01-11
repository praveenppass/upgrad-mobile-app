import { gql } from "@apollo/client";

export interface IProfileEnrichHistoryAddress {
	city: string;
	state: string;
	country: string;
	pincode: string;
}

export interface IProfileEnrichHistoryWorkExperience {
	org: string;
	designation: string;
	industry: string;
	startYear: number;
	endYear: number;
	startMonth: number;
	endMonth: number;
	noticePeriod: string;
	ctc: string;
	domain: string;
	currentWorkExperience: boolean;
	description: string;
}

export interface IProfileEnrichHistoryEducation {
	instituteName: string;
	university: string;
	degree: string;
	branch: string;
	graduatingYearFrom: number;
	graduatingYearTo: number;
	percentage: string;
	passingYear: number;
	board: string;
	stream: string;
	educationType: string;
}

export interface IProfileEnrichHistory {
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	dateOfBirth: string;
	gender: string;
	nationality: string;
	linkedInUrl: string;
	githubProfile: string;
	profilePictureUrl: string;
	address: IProfileEnrichHistoryAddress;
	currentlyWorking: boolean;
	totalWorkExp: number;
	recentEducation: string;
	workExperiences: IProfileEnrichHistoryWorkExperience[];
	education: IProfileEnrichHistoryEducation[];
	topSkills: string[];
	isCachedResponse: boolean;
}

export interface IGetProfileEnrichHistoryQuery {
	profileEnrichHistory: IProfileEnrichHistory | null;
}

export const GET_PROFILE_ENRICH_HISTORY_QUERY = gql`
	query GetProfileEnrichHistory {
		profileEnrichHistory {
			firstName
			lastName
			email
			mobileNumber
			dateOfBirth
			gender
			nationality
			linkedInUrl
			githubProfile
			profilePictureUrl
			address {
				city
				state
				country
				pincode
			}
			currentlyWorking
			totalWorkExp
			recentEducation
			workExperiences {
				org
				designation
				industry
				startYear
				endYear
				startMonth
				endMonth
				noticePeriod
				ctc
				domain
				currentWorkExperience
				description
			}
			education {
				instituteName
				university
				degree
				branch
				graduatingYearFrom
				graduatingYearTo
				percentage
				passingYear
				board
				stream
				educationType
			}
			topSkills
			isCachedResponse
		}
	}
`;

export default GET_PROFILE_ENRICH_HISTORY_QUERY;
