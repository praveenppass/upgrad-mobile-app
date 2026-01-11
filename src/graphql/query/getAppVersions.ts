import { gql } from "@apollo/client";

const getAppVersionsQuery = gql`
	query getAppVersions($filter: AppVersionFilter) {
		appVersions(filter: $filter) {
			nodes {
				force_update
				app_type
				version
				platform
				released_date
				status
				code
			}
		}
	}
`;
export interface IAppVersionsQuery {
	appVersions: {
		nodes: Array<{
			force_update: boolean;
			app_type: string;
			version: string;
			platform: string;
			released_date: string;
			status: boolean;
			code: string;
		}>;
	};
}
export default getAppVersionsQuery;
