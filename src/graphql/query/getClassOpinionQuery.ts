import { gql } from "@apollo/client";

export const getClassOpinionQuery = gql`
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
