import { gql } from "@apollo/client";

const getWebViewCourseDetailsQuery = gql`
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

export interface IGetWebViewCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		userCourse: string | null;
	};
}
export interface IGetWebViewCourseDetailsQuery {
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

export default getWebViewCourseDetailsQuery;
