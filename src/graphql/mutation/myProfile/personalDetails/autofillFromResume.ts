import { gql } from "@apollo/client";

const autofillFromResumeQuery = gql`
	mutation AutofillFromResume($resumeUrl: String!) {
		autofillProfile(resumeUrl: $resumeUrl) {
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

export default autofillFromResumeQuery;

// Variables Interface
export interface IAutofillFromResumeQueryVariables {
	resumeUrl: string;
}

// Response Interfaces
export interface IAddress {
	city: string | null;
	state: string | null;
	country: string | null;
	pincode: string | null;
}

export interface IWorkExperience {
	org: string | null;
	designation: string | null;
	industry: string | null;
	startYear: number | null;
	endYear: number | null;
	startMonth: string | null;
	endMonth: string | null;
	noticePeriod: string | null;
	ctc: string | null;
	domain: string | null;
	currentWorkExperience: boolean | null;
	description: string | null;
}

export interface IEducation {
	instituteName: string | null;
	university: string | null;
	degree: string | null;
	branch: string | null;
	graduatingYearFrom: number | null;
	graduatingYearTo: number | null;
	percentage: number | null;
	passingYear: number | null;
	board: string | null;
	stream: string | null;
	educationType: string | null;
}

export interface IAutofillProfileResponse {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	mobileNumber: string | null;
	dateOfBirth: string | null;
	gender: string | null;
	nationality: string | null;
	linkedInUrl: string | null;
	githubProfile: string | null;
	profilePictureUrl: string | null;
	address: IAddress | null;
	currentlyWorking: boolean | null;
	totalWorkExp: number | null;
	recentEducation: string | null;
	workExperiences: IWorkExperience[] | null;
	education: IEducation[] | null;
	topSkills: string[] | null;
	isCachedResponse: boolean | null;
}

export interface IAutofillFromResumeQuery {
	autofillProfile: IAutofillProfileResponse;
}
