import { gql } from "@apollo/client";

const getHtmlContentCourseDetailsQuery = gql`
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

export interface IGetHtmlContentCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userCourse: string | null;
	};
}
export interface IGetHtmlContentCourseDetailsQuery {
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

export default getHtmlContentCourseDetailsQuery;
