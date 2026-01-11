import { gql } from "@apollo/client";

const getClassOpinionProgramDetailsQuery = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			status
			userProgram {
				id
				workshop {
					id
				}
				deliveryType {
					id
				}
				program {
					code
					name
				}
			}
			asset {
				id
				code
				name
				classOpinion {
					question
					minWordCount
					maxWordCount
					enableViewResponseBeforeSubmit
				}
			}
		}
	}
`;
export interface IGetClassOpinionProgramQueryVariables {
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

export interface IGetClassOpinionProgramQuery {
	getAssetFromUserProgram: IGetClassOpinionProgram;
}

interface IGetClassOpinionProgram {
	status: string;
	userProgram: IProgramDetailsUserProgram;
	asset: IProgramAsset;
}
interface IProgramDetailsUserProgram {
	id: string;
	workshop: {
		id: string;
	};
	deliveryType: {
		id: string;
	};
	program: IProgram;
}
interface IProgramAsset {
	id: string;
	code: string;
	name: string;
	classOpinion: IProgramClassOpinion;
}
export interface IProgramClassOpinion {
	question: string;
	minWordCount: number;
	maxWordCount: number;
	enableViewResponseBeforeSubmit: boolean;
}
interface IProgram {
	code: string;
	name: string;
}

export default getClassOpinionProgramDetailsQuery;
