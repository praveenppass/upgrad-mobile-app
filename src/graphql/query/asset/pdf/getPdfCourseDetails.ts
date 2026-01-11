import { gql } from "@apollo/client";

const getPdfCourseDetailsQuery = gql`
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
				ppt {
					filePath
				}
				pdf {
					filePath
				}
				sourceCodeDisplayText
				sourceCodeFilePath
			}
		}
	}
`;

export interface IGetPdfCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		userCourse: string | null;
	};
}
export interface IGetPdfCourseDetailsQuery {
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
			ppt: {
				filePath: string;
			};
			pdf: {
				filePath: string;
			};
			sourceCodeDisplayText: string;
			sourceCodeFilePath: string;
		};
	};
}

export default getPdfCourseDetailsQuery;
