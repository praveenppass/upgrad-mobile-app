import { gql } from "@apollo/client";

const getPdfProgramDetailsQuery = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			status
			userProgram {
				id
				program {
					code
				}
			}
			asset {
				id
				code
				ppt {
					filePath
				}
				pdf {
					filePath
				}
				sourceCodeDisplayText
				sourceCodeFilePath
			}
		}
	}
`;

export interface IGetPdfProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userProgram: string | null;
	};
}
export interface IGetPdfProgramDetailsQuery {
	getAssetFromUserProgram: {
		status: string;
		userProgram: {
			id: string;
			program: {
				code: string;
			};
		};
		asset: {
			id: string;
			code: string;
			ppt: {
				filePath: string;
			};
			pdf: {
				filePath: string;
			};
			sourceCodeDisplayText: string;
			sourceCodeFilePath: string;
		};
	};
}

export default getPdfProgramDetailsQuery;
