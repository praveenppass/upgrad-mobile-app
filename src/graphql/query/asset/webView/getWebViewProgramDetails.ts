import { gql } from "@apollo/client";

const getWebViewProgramDetailsQuery = gql`
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
				sourceCodeFilePath
				sourceCodeDisplayText
				scorm {
					type
					filePath
				}
				htmlZip {
					filePath
				}
			}
		}
	}
`;

export interface IGetWebViewProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userProgram: string | null;
	};
}
export interface IGetWebViewProgramDetailsQuery {
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
			sourceCodeFilePath: string;
			sourceCodeDisplayText: string;
			scorm: {
				filePath: string;
			};
			htmlZip: {
				filePath: string;
			};
		};
	};
}

export default getWebViewProgramDetailsQuery;
