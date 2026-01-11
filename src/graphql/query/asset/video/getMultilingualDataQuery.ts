import { gql } from "@apollo/client";

const getMultilingualDataQuery = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			asset {
				video {
					vimeo
					brightcoveId
					isBrightcoveIdVerified
					language {
						id
						name
					}
				}
				videos {
					vimeo
					brightcoveId
					isBrightcoveIdVerified
					language {
						id
						name
					}
				}
			}
		}
	}
`;

export default getMultilingualDataQuery;

export interface IGetMultilingualDataQueryVariables {
	where: {
		asset: string;
		level1: string;
		level2: string;
		level3?: string;
		level4?: string;
		userProgram?: string;
	};
}

export interface IGetMultilingualDataQuery {
	getAssetFromUserProgram: {
		asset: {
			video: {
				vimeo: string | null;
				brightcoveId: string;
				isBrightcoveIdVerified: boolean;
				language: {
					id: string;
					name: string;
				};
			};
			videos: {
				vimeo: string | null;
				brightcoveId: string | null;
				isBrightcoveIdVerified: boolean;
				language: {
					id: string;
					name: string;
				};
			}[];
		};
	};
}

export interface IMultilingualVideo {
	type: string;
	vimeo: string | null;
	brightcoveId: string | null;
	isBrightcoveIdVerified: boolean;
	language: {
		id: string;
		name: string;
	};
}
