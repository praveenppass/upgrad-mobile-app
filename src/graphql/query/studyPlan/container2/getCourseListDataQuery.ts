import { gql } from "@apollo/client";

const getCourseListDataQuery = gql`
	query getCourseListData(
		$where: UserCourseContainerWhereInput!
		$userCourseWhere: UserCourseWhereUniqueInput!
		$blockerSurveyWhere: BlockerSurveyForUserUniqueWhereInput!
		$userProfileConfigurationWhere: UserProfileConfigurationWhereUniqueInput!
		$userWhere: UserWhereUniqueInput!
		$userCourseProfileResponsesWhere: UserCourseProfileResponseWhereInput
	) {
		userCourseContainers(where: $where) {
			code
			label
			name
			totalAssessments
			duration
			activity {
				progress
				enableLock
			}
		}
		userCourse(where: $userCourseWhere) {
			totalLearningDuration
			progress
			workshop {
				id
				contentStartsAt
				startsAt
			}
			course {
				id
				code
				description
			}
			isUpgraded
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
	}
`;

export default getCourseListDataQuery;

export interface IGetCombinedCourseData {
	userCourseContainers: IUserCourseContainer[];
	userCourse: IUserCourse;
	blockerSurveyForUser: IBlockerSurveyForUser;
	userProfileConfiguration: IUserProfileConfiguration;
	user: {
		profileSectionCompletion: IUserProfileSectionCompletion;
	};
	userCourseProfileResponses: IUserCourseProfileResponse[];
}

export interface IUserCourseContainer {
	code: string;
	label: string;
	name: string;
	totalAssessments: number;
	duration: number;
	activity: {
		progress: number;
		enableLock: boolean;
	};
}

export interface IUserCourse {
	totalLearningDuration: number;
	progress: number;
	firstAccessedAt: string;
	workshop: {
		id: string;
		contentStartsAt: string;
		startsAt: string;
	};
	course: {
		description: string;
		id: string;
		code: string;
	};
	isUpgraded: boolean;
}

export interface IGetCourseListDataVariables {
	where: {
		id: string;
	};
	userCourseWhere: {
		id: string;
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
}

interface IBlockerSurveyForUser {
	id: string;
	formId: string;
	deadlineDate: string;
}

interface IUserProfileConfiguration {
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

interface IUserProfileSectionCompletion {
	personalDetails: boolean;
	education: boolean;
	workExperience: boolean;
	aspiration: boolean;
	contactDetails: boolean;
}

interface IUserCourseProfileResponse {
	isCompleted: boolean;
}
