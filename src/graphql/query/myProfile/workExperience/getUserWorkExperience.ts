import { gql } from "@apollo/client";

const getUserWorkExperienceQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			employmentStatus
			experience {
				year
			}
			workExperiences {
				isWorking
				designation {
					code
					name
				}
				organization {
					code
					name
				}
				industry {
					code
					name
				}
				workDomain {
					code
					name
				}
				startsAt
				endsAt
				hasReimbursementPolicy
				hasProgramFeeReimbursement
				noticePeriod
				package
			}
		}
	}
`;

export interface IGetUserWorkExperienceQueryVariables {
	where: {
		id: string;
	};
}
export interface IGetUserWorkExperienceQuery {
	user: {
		employmentStatus: string | null;
		experience: {
			year: number;
		} | null;
		workExperiences: {
			isWorking: boolean | null;
			designation: {
				code: string;
				name: string;
			} | null;
			organization: {
				code: string;
				name: string;
			} | null;
			industry: {
				code: string;
				name: string;
			} | null;
			workDomain: {
				code: string;
				name: string;
			} | null;
			startsAt: string | null;
			endsAt: string | null;
			hasReimbursementPolicy: boolean | null;
			hasProgramFeeReimbursement: boolean | null;
			noticePeriod: string | null;
			package: string | null;
		}[];
	};
}

export default getUserWorkExperienceQuery;
