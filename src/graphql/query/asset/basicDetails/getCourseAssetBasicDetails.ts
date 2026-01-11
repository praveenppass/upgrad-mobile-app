import { gql } from "@apollo/client";

import { IAssetType } from "@interface/asset.interface";

const getCourseAssetBasicDetailsQuery = gql`
	query getAssetFromUserCourse(
		$where: UserCourseAssetWhereUniqueInput!
		$blockerSurveyWhere: BlockerSurveyForUserUniqueWhereInput!
		$userProfileConfigurationWhere: UserProfileConfigurationWhereUniqueInput!
		$userWhere: UserWhereUniqueInput!
		$userCourseProfileResponsesWhere: UserCourseProfileResponseWhereInput
		$userCourseWhere: UserCourseWhereUniqueInput!
	) {
		getAssetFromUserCourse(where: $where) {
			isBookMarked
			startsAt
			timeSpent
			seekTime
			status
			children {
				status
			}
			asset {
				name
				assetType {
					type
				}
				recallQuiz
				assessment
			}

			nextAsset {
				asset
				level1
				level2
				# level3
				# level4
			}
			previousAsset {
				asset
				level1
				level2
				# level3
				# level4
			}
		}

		blockerSurveyForUser(where: $blockerSurveyWhere) {
			id
			formId
			deadlineDate
		}

		userProfileConfiguration(where: $userProfileConfigurationWhere) {
			personalDetails {
				hasDeadline
				dueByDays
			}
			workExperience {
				hasDeadline
				dueByDays
			}
			education {
				hasDeadline
				dueByDays
			}
			aspiration {
				hasDeadline
				dueByDays
			}
			contactDetails {
				hasDeadline
				dueByDays
			}
		}
		user(where: $userWhere) {
			profileSectionCompletion {
				personalDetails
				education
				workExperience
				aspiration
				contactDetails
			}
		}
		userCourseProfileResponses(where: $userCourseProfileResponsesWhere) {
			isCompleted
		}

		userCourse(where: $userCourseWhere) {
			isOptional
			workshop {
				id
				contentStartsAt
				startsAt
			}
		}
	}
`;

export interface IGetCourseAssetBasicDetailsQueryVariables {
	where: {
		asset: string;
		userCourse: string;
		level1?: string;
		level2?: string;
	};
	blockerSurveyWhere: {
		userId: string;
		course: string;
		workshop: string;
	};
	userProfileConfigurationWhere: {
		workshop: string;
		course: string;
	};
	userWhere: {
		id: string;
	};
	userCourseProfileResponsesWhere: {
		workshop: string;
		userCourse: string;
	};
	userCourseWhere: {
		id: string;
	};
}

export interface IGetCourseAssetBasicDetailsQuery {
	getAssetFromUserCourse: {
		isBookMarked: boolean;
		startsAt: string;
		seekTime: number;
		timeSpent: number;
		asset: {
			name: string;
			assetType: {
				type: IAssetType;
			};
			recallQuiz: string;
			assessment: string;
		};

		nextAsset: {
			asset: string;
			level1: string;
			level2: string;
		} | null;
		previousAsset: {
			asset: string;
			level1: string;
			level2: string;
		} | null;
	};
	blockerSurveyForUser: IAssetBlockerSurveyForUser;
	userProfileConfiguration: IAssetUserProfileConfiguration;
	user: {
		profileSectionCompletion: IAssetUserProfileSectionCompletion;
	};
	userCourseProfileResponses: IAssetUserCourseProfileResponse[];
	userCourse: {
		isOptional: boolean;
		workshop: {
			id: string;
			contentStartsAt: string;
			startsAt: string;
		};
	};
}

interface IAssetBlockerSurveyForUser {
	id: string;
	formId: string;
	deadlineDate: string;
}

interface IAssetUserProfileConfiguration {
	aspiration: {
		dueByDays: number;
		hasDeadline: boolean;
	};
	contactDetails: {
		dueByDays: number;
		hasDeadline: boolean;
	};
	education: {
		dueByDays: number;
		hasDeadline: boolean;
	};
	personalDetails: {
		dueByDays: number;
		hasDeadline: boolean;
	};
	workExperience: {
		dueByDays: number;
		hasDeadline: boolean;
	};
}

interface IAssetUserProfileSectionCompletion {
	personalDetails: boolean;
	education: boolean;
	workExperience: boolean;
	aspiration: boolean;
	contactDetails: boolean;
}

interface IAssetUserCourseProfileResponse {
	isCompleted: boolean;
}

export default getCourseAssetBasicDetailsQuery;
