import { gql } from "@apollo/client";

const updateAssetTimeSpentProgramQuery = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
			timeSpent
		}
	}
`;

export interface IUpdateAssetUserProgramVariables {
	data: {
		timeSpent: number;
	};
	where: {
		asset: string;
		userProgram: string;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
	};
}

export interface IUpdateAssetUserProgramQuery {
	status: string;
	timeSpent: number;
}

export default updateAssetTimeSpentProgramQuery;
