import { gql } from "@apollo/client";

const getMyWorkExperienceDetailsQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
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
		}
	}
`;

export default getMyWorkExperienceDetailsQuery;

export interface IMyWorkExperienceQueryVariables {
	user: {
		workExperiences: IWorkExperience[] | null;
		employmentStatus: string | null;
	};
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
