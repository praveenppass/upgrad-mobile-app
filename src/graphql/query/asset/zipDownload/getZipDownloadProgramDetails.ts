import { gql } from "@apollo/client";

const getZipDownloadProgramDetailsQuery = gql`
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
				name
				postText
				preText
				sourceCodeDisplayText
				sourceCodeFilePath
				codeZip {
					filePath
				}
			}
		}
	}
`;

export interface IGetZipDownloadProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3?: string | null;
		level4?: string | null;
		userProgram: string | null;
		translationLanguage?: string | null;
	};
}
export interface IGetZipDownloadProgramDetailsQuery {
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
			name: string;
			postText: string | null;
			preText: string | null;
			sourceCodeDisplayText: string | null;
			sourceCodeFilePath: string | null;
			codeZip: {
				filePath: string;
			};
		};
	};
}

export default getZipDownloadProgramDetailsQuery;
