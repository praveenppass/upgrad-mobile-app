import { gql } from "@apollo/client";

const getZipDownloadCourseDetailsQuery = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			status
			userCourse {
				id
				course {
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

export interface IGetZipDownloadCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3?: string | null;
		level4?: string | null;
		userCourse: string | null;
		translationLanguage?: string | null;
	};
}
export interface IGetZipDownloadCourseDetailsQuery {
	getAssetFromUserCourse: {
		status: string;
		userCourse: {
			id: string;
			course: {
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

export default getZipDownloadCourseDetailsQuery;
