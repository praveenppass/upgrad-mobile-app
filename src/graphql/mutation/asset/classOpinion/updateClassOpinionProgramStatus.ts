import { gql } from "@apollo/client";

const updateClassOpinionProgramStatusQuery = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateClassOpinionProgramStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userProgram: string;
		asset: string;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
	};
}

export default updateClassOpinionProgramStatusQuery;
