import { gql } from "@apollo/client";

import { ISessionResourcesResult } from "@graphql/query/session/resources/sessionResources.interface";

const getWorkshopSessionResourcesQuery = gql`
	query resourcesForWorkshopSession(
		$where: SessionResourceWhereInput!
		$limit: Int
		$skip: Int
	) {
		resourcesForWorkshopSession(where: $where, limit: $limit, skip: $skip) {
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

export interface IWorkshopSessionResources {
	resourcesForWorkshopSession: ISessionResourcesResult;
}

export interface IWorkshopSessionResourcesQueryVariables {
	where: { session: string };
}

export default getWorkshopSessionResourcesQuery;
