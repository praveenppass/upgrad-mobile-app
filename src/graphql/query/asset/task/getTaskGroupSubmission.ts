import { gql } from "@apollo/client";

const getTaskGroupSubmissionQuery = gql`
	query workshopLearnerGroupForAsset(
		$where: WorkshopLearnerGroupForAssetWhereInput!
	) {
		workshopLearnerGroupForAsset(where: $where) {
			users {
				user {
					id
					firstName
					lastName
				}
			}
			attemptedBy {
				firstName
				lastName
			}
		}
	}
`;

export interface IGetTaskGroupSubmissionQueryVariables {
	where: {
		asset: string;
		user: string;
		workshop: string;
	};
}

export interface IGetTaskGroupSubmissionQuery {
	workshopLearnerGroupForAsset: {
		users: {
			user: {
				id: string;
				firstName: string;
				lastName: string | null;
			};
		}[];
		attemptedBy: {
			firstName: string;
			lastName: string | null;
		};
	} | null;
}

export default getTaskGroupSubmissionQuery;
