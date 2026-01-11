import { gql } from "@apollo/client";

const getAssessmentDetailsQueryForProgram = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			endsAt
			isExtensionRegained
			extensionRequests {
				requestedAt
			}
			userProgram {
				totalExtensionsTaken
				program {
					code
					dueDateExtensionMode
					totalExtensionsAllowed
					hardDeadlineDays
					enableComboCurriculum
				}
				comboCurriculum {
					code
					dueDateExtensionMode
					totalExtensionsAllowed
				}
				workshop {
					id
				}
				user {
					id
				}
				deliveryType {
					id
				}
			}
			asset {
				version
				assignment {
					summary {
						attempt {
							createdAt
						}
					}
				}
				project {
					summary {
						attempt {
							createdAt
						}
					}
				}
			}
			attempt {
				url
			}
		}
	}
`;

export interface IGetAssessmentDetailsQueryForProgramQueryVariables {
	where: {
		asset: string;
		userProgram: string;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
	};
}

export interface IGetAssessmentDetailsQueryForProgram {
	getAssetFromUserProgram: {
		endsAt: string | null;
		isExtensionRegained: boolean | null;
		extensionRequests: {
			requestedAt: string;
		}[];
		userProgram: {
			totalExtensionsTaken?: number;
			program: IProgram;
			workshop: { id: string };
			user: { id: string };
			deliveryType: { id: string };
			comboCurriculum: {
				code: string;
				dueDateExtensionMode: string;
				totalExtensionsAllowed: number;
			};
		};
		asset: {
			version: number;
			assignment: {
				summary: {
					attempt: {
						createdAt: string | null;
					};
				};
			};
			project: {
				summary: {
					attempt: {
						createdAt: string | null;
					};
				};
			};
		};
		attempt: {
			url: string;
		};
	};
}

export interface IProgram {
	code: string;
	totalExtensionsAllowed: number;
	dueDateExtensionMode: string;
	hardDeadlineDays: number;
	enableComboCurriculum: boolean;
}

export default getAssessmentDetailsQueryForProgram;
