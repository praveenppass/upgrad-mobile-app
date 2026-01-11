import { gql } from "@apollo/client";

import { IProgramClassOpinion } from "@graphql/query/asset/video/getVideoProgramDetails";

const getVideoCourseDetailsQuery = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			status
			seekTime
			children {
				status
			}
			userCourse {
				id

				course {
					code
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
				video {
					brightcoveId
					vimeo
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
					vimeo
				}
			}
		}
	}
`;

export interface IGetVideoCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		userCourse: string | null;
	};
}

type SourceCodeFile = {
	displayName: string;
	fileName: string;
};
export interface IGetVideoCourseDetailsQuery {
	getAssetFromUserCourse: {
		status: string;
		seekTime: number;
		isOptional: boolean;
		children: {
			status: string;
		};
		userCourse: {
			id: string;
			course: {
				code: string;
			};
		};
		asset: {
			id: string;
			code: string;
			postText: string | null;
			preText: string | null;
			sourceCodeFiles: {
				beforeVideo: SourceCodeFile[];
				afterVideo: SourceCodeFile[];
				afterPostText: SourceCodeFile[];
			};
			video: {
				brightcoveId: string;
				subAssets: ISubAsset[];
				vimeo: string | null;
			};
		};
	};
}

interface ISubAsset {
	asset: {
		id: string;
		name: string;
		code: string;
		postText: string | null;
		preText: string | null;
		sourceCodeDisplayText: string | null;
		sourceCodeFilePath: string | null;
		assetType: {
			name: string;
			type: string;
		};
		classOpinion?: IProgramClassOpinion | null;
	};
	loadAt: number;
}

export default getVideoCourseDetailsQuery;
