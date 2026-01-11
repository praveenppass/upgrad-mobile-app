import { gql } from "@apollo/client";

const getHtmlContentProgramDetailsQuery = gql`
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
				dynamicLinks {
					url
					text
				}
				sourceCodeDisplayText
				sourceCodeFilePath
				onlineEditor {
					description
				}
			}
		}
	}
`;

export interface IGetHtmlContentProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userProgram: string | null;
		translationLanguage?: string | null;
	};
}
export interface IGetHtmlContentProgramDetailsQuery {
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
			dynamicLinks: {
				url: string;
				text: string;
			}[];
			sourceCodeDisplayText: string;
			sourceCodeFilePath: string;
			onlineEditor: {
				description: string;
			};
		};
	};
}

export default getHtmlContentProgramDetailsQuery;
