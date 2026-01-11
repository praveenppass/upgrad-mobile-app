import { gql } from "@apollo/client";

const getRecallquizProgramDetails = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			asset {
				recallQuiz
			}
			userProgram {
				id
				user {
					id
				}
				comboCurriculum {
					code
				}
				deliveryType {
					id
					name
					type
				}
				workshop {
					id
				}
				program {
					code
					name
				}
			}
		}
	}
`;
export interface IGetRecallquizProgramDetailsQuery {
	getAssetFromUserProgram: IGetAssetFromUserProgram;
}
export interface IGetAssetFromUserProgram {
	status: string;
	userProgram: IProgramDetailsUserProgram;
	asset: IProgramAsset;
}
export interface IProgramDetailsUserProgram {
	id?: string;
	workshop: {
		id: string | null;
	};
	user: {
		id: string;
	};
	deliveryType: {
		id: string | null;
		name: string | null;
		type: string | null;
	};
	program: IProgram;

	comboCurriculum: {
		code: string;
	};
}
export interface IProgram {
	name: string;
	code: string;
}
export interface IProgramSkill {
	id: string;
	name: string;
}
export interface IProgramSubSkill {
	id: string;
	name: string;
}
export interface IProgramAsset {
	id: string;
	code: string;
	recallQuiz: string;
}
export interface IGetRecallqueryProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userProgram: string | null;
	};
}
export default getRecallquizProgramDetails;
