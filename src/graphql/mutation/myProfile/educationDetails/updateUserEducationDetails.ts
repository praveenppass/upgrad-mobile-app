import { gql } from "@apollo/client";

const updateUserEducationDetailsQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateUserEducationDetailsQuery;

export interface IUpdateUserEducationDetailsQueryVariables {
	where: {
		id: string;
	};
	data: {
		isProfileUpdate?: boolean;
		educations: {
			university?: string;
			degree?: string;
			toYear?: number;
			percentage?: number;
			field?: string;
			fromYear?: number;
			matriculationBoard?: string;
			academicStream?: string;
			intermediateBoard?: string;
			recentEducation?: string;
		}[];
	};
}

export interface IUpdateUserEducationDetailsQuery {
	updateUser: {
		id: string;
	};
}
