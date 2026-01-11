import { gql } from "@apollo/client";

const getMyAccountDetails = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			firstName
			lastName
			image
			mobile
			email
			pincode
			address
			educations {
				university
				recentEducation {
					name
				}
				matriculationBoard {
					name
				}
				intermediateBoard {
					name
				}
				academicStream {
					name
				}
				degree {
					name
				}
				field {
					name
				}
				fromYear
				toYear
			}
			workExperiences {
				isWorking
				designation {
					name
				}
				organization {
					name
				}
				industry {
					name
				}
				startsAt
				endsAt
			}
			employmentStatus
			isProfileUpdate
			alternateEmail
			resume
			dateOfBirth
			userProfileResume {
				resumes {
					fileName
					filePath
					uploadedAt
					resumeId
					_isDeleted
				}
			}
		}
	}
`;

export default getMyAccountDetails;

export interface IMyAccountQueryResponse {
	user: {
		firstName: string | null;
		lastName: string | null;
		image: string | null;
		mobile: string | null;
		email: string | null;
		pincode: string | null;
		address: string | null;
		educations: IEducation[] | null;
		workExperiences: IWorkExperience[] | null;
		employmentStatus: string | null;
		alternateEmail: string | null;
		resume: string | null;
		dateOfBirth: string | null;
		isProfileUpdate: boolean | null;
		userProfileResume: IUserProfileResume;
	};
}
export interface IMyAccountQueryVariables {
	where: {
		id: string;
	};
}
export interface IEducation {
	university: string;
	recentEducation: {
		name: string;
	};
	matriculationBoard: {
		name: string;
	};
	intermediateBoard: {
		name: string;
	};
	academicStream: {
		name: string;
	};
	degree: {
		name: string;
	};
	field: {
		name: string;
	};
	fromYear: number;
	toYear: number;
}

export interface IPersonalDetails {
	userPincode: string | null;
	userAddress: string | null;
	userDateOfBirth: string | null;
}

export interface IWorkExperience {
	isWorking: boolean;
	designation: {
		name: string;
	};
	organization: {
		name: string;
	};
	industry: {
		name: string;
	};
	workDomain: {
		name: string;
	};
	startsAt: string;
	endsAt: string;
}

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
