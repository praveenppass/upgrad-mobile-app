import { gql } from "@apollo/client";

const UpdatePdfProgramStatusQuery = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdatePdfProgramStatusQueryVariables {
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

export interface IUpdatePdfProgramStatusQuery {
	updateAssetForUserProgram: {
		status: string;
	};
}
export default UpdatePdfProgramStatusQuery;
