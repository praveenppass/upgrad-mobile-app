import { gql } from "@apollo/client";

const getProgramModuleDetailsQuery = gql`
	query userProgramContainer($where: UserProgramContainerWhereInput!) {
		userProgramContainer(where: $where) {
			name
			activity {
				totalGradableAssets
				totalCompletedGradableAssets
			}
		}
	}
`;

export default getProgramModuleDetailsQuery;

export interface IProgramModuleDetailsQueryVariables {
	where: {
		id: string;
		level1: string;
		level2: string;
	};
}

export interface IProgramModuleDetailsQuery {
	userProgramContainer: {
		name: string;
		activity: {
			totalGradableAssets: number;
			totalCompletedGradableAssets: number;
		};
	};
}
