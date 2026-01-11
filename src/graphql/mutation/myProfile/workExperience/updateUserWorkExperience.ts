import { gql } from "@apollo/client";

const updateUserWorkExperienceQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateUserWorkExperienceQuery;

export interface IUpdateUserWorkExperienceQueryVariables {
	where: {
		id: string;
	};
	data: {
		workExperiences: {
			startsAt?: string;
			endsAt?: string;
			designation?: string;
			organization?: string;
			industry?: string;
			workDomain?: string;
			noticePeriod?: string;
			package?: string;
			hasReimbursementPolicy?: boolean;
			hasProgramFeeReimbursement?: boolean;
			isWorking: boolean;
		}[];
		experience?: {
			year: number;
		};
		employmentStatus?: string;
		isProfileUpdate?: boolean;
	};
}

export interface IUpdateUserWorkExperienceQuery {
	updateUser: {
		id: string;
	};
}
