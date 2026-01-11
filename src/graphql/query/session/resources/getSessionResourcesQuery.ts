import { gql } from "@apollo/client";

import { ISessionResourcesResult } from "@graphql/query/session/resources/sessionResources.interface";

const getSessionResourcesQuery = gql`
	query resourcesForSession(
		$where: SessionResourceWhereInput!
		$limit: Int
		$skip: Int
	) {
		resourcesForSession(where: $where, limit: $limit, skip: $skip) {
			totalCount
			result {
				id
				fileName
				fileSize
				url
			}
		}
	}
`;

export interface ISessionResources {
	resourcesForSession: ISessionResourcesResult;
}

export interface ISessionResourcesQueryVariables {
	where: { session: string };
}

export default getSessionResourcesQuery;
