import { gql } from "@apollo/client";

const updateAssetSeekTimeForUserProgram = gql`
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

export interface IUpdateAssetSeekTimeVariablesForUserProgram {
	data: {
		seekTime: number;
	};
	where: {
		asset: string;
		userProgram: string;
		superAssetCode?: string | undefined;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
	};
}

export interface IIUpdateAssetSeekTimeQueryForUserProgram {
	status: string;
	timeSpent: number;
}
export default updateAssetSeekTimeForUserProgram;
