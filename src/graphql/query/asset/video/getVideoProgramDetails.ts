import { gql } from "@apollo/client";

const getAssetFromUserProgramQuery = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			status
			enableLock
			seekTime
			isOptional
			children {
				status
			}
			userProgram {
				id
				user {
					id
				}
				workshop {
					id
				}
				deliveryType {
					id
					name
					type
				}
				program {
					variant
					code
					name
					level {
						id
						name
					}
				}
			}
			asset {
				id
				code
				postText
				preText
				sourceCodeDisplayText
				sourceCodeFilePath
				sourceCodeFiles {
					beforeVideo {
						displayName
						fileName
					}
					afterVideo {
						displayName
						fileName
					}
					afterPostText {
						displayName
						fileName
					}
				}
				name
				assetType {
					name
					type
				}
				video {
					type
					vimeo
					brightcoveId
					isBrightcoveIdVerified
					subAssets {
						asset {
							id
							name
							code
							assetType {
								name
								type
							}
							assessment
							recallQuiz
							classOpinion {
								question
								minWordCount
								maxWordCount
								enableViewResponseBeforeSubmit
							}
						}
						loadAt
					}
				}
			}
		}
	}
`;

export interface IGetAssetFromUserProgramQueryVariables {
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

export interface IGetAssetFromUserProgramQuery {
	getAssetFromUserProgram: IGetAssetFromUserProgram;
}

interface IGetAssetFromUserProgram {
	status: string;
	enableLock: boolean | null;
	seekTime: number;
	isOptional: boolean;

	userProgram: IProgramDetailsUserProgram;
	asset: IProgramAsset;
}

interface IProgramDetailsUserProgram {
	id: string;
	user: { id: string };
	workshop: { id: string };
	deliveryType: {
		id: string;
		name: string;
		type: string;
	};
	program: IProgram;
}

interface IProgramAsset {
	id: string;
	code: string;
	name: string;
	assetType: {
		name: string;
		type: string;
	};
	video: IVideoAsset | null;
}

interface IVideoAsset {
	type: string;
	vimeo: string | null;
	brightcoveId: string | null;
	isBrightcoveIdVerified: boolean;
	subAssets: ISubAsset[];
}

type SourceCodeFile = {
	displayName: string;
	fileName: string;
};

interface ISubAsset {
	asset: {
		id: string;
		name: string;
		code: string;
		postText: string | null;
		preText: string | null;
		sourceCodeFiles: {
			beforeVideo: SourceCodeFile[];
			afterVideo: SourceCodeFile[];
			afterPostText: SourceCodeFile[];
		};
		assetType: {
			name: string;
			type: string;
		};
		classOpinion?: IProgramClassOpinion | null;
	};
	loadAt: number;
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
	variant: string;
	level: { id: string; name: string }[];
}

export default getAssetFromUserProgramQuery;
