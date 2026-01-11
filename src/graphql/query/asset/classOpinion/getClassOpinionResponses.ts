import { gql } from "@apollo/client";

const getClassOpinionResponsesQuery = gql`
	query classOpinionResponses(
		$where: ClassOpinionResponsesWhereInput
		$limit: Int
		$skip: Int
		$sort: ClassOpinionResponseSortInput
	) {
		classOpinionResponses(
			where: $where
			limit: $limit
			skip: $skip
			sort: $sort
		) {
			totalCount
			result {
				id
				response
				createdAt
				updatedAt
				createdBy {
					firstName
					lastName
					image
					id
				}
				userProgram {
					id
				}
				userCourse {
					id
				}
				superAssetCode {
					id
				}
			}
		}
	}
`;

export interface IGetClassOpinionResponsesQueryVariables {
	where: {
		asset: string | null;
		deliveryType: string | null;
		course: string | null;
		workshop: string | null;
	};
	sort?: IClassOpinionResponseSortInput; // Added sort input
}

export interface IGetClassOpinionResponsesQuery {
	classOpinionResponses: IClassOpinionResponses;
}

interface IClassOpinionResponses {
	totalCount: number;
	result: IClassOpinionResponse[];
}

export interface IClassOpinionResponse {
	id: string;
	response: string;
	createdAt: string;
	updatedAt: string;
	createdBy: IUser;
	userProgram: IUserProgram;
	userCourse: string | null;
	superAssetCode: string | null;
}

interface IUser {
	firstName: string;
	lastName: string;
	image: string | null;
	id: string;
}

interface IUserProgram {
	id: string;
}

export interface IClassOpinionResponseSortInput {
	createdAt?: "asc" | "desc";
}

export default getClassOpinionResponsesQuery;
