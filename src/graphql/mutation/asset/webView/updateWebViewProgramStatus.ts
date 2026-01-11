import { gql } from "@apollo/client";

const UpdateWebViewProgramStatusQuery = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateWebViewProgramStatusQueryVariables {
	data: {
		status: string;
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
export interface IUpdateWebViewProgramStatusQuery {
	updateAssetForUserProgram: {
		status: string;
	};
}
export default UpdateWebViewProgramStatusQuery;
