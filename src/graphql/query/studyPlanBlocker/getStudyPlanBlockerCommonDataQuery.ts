import { gql } from "@apollo/client";

const getStudyPlanBlockerCommonDataQuery = gql`
	query getStudyPlanBlockerCommonData(
		$userProfileConfigurationWhere: UserProfileConfigurationWhereUniqueInput!
		$userWhere: UserWhereUniqueInput!
		$userCourseProfileResponsesWhere: UserCourseProfileResponseWhereInput
		$blockerSurveyWhere: BlockerSurveyForUserUniqueWhereInput
	) {
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
			course
			program
			userCourse
			userProgram
			workshop
		}
		blockerSurveyForUser(where: $blockerSurveyWhere) {
			id
			formId
			deadlineDate
		}
	}
`;

export default getStudyPlanBlockerCommonDataQuery;

export interface IStudyPlanBlockerCommonData {
	userProfileConfiguration: {
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
	};
	user: {
		profileSectionCompletion: {
			personalDetails: boolean;
			education: boolean;
			workExperience: boolean;
			aspiration: boolean;
			contactDetails: boolean;
		};
	};
	userCourseProfileResponses: [
		{
			isCompleted: boolean;
			course: string;
			program: string;
			userCourse: string;
			userProgram: string;
			workshop: string;
		},
	];
	blockerSurveyForUser?: {
		id: string;
		formId: string;
		deadlineDate: string;
	};
}

export interface IStudyPlanBlockerCommonDataVariables {
	userProfileConfigurationWhere: {
		workshopId?: string;
		program?: string;
	};
	userWhere: {
		id?: string;
	};
	userCourseProfileResponsesWhere?: {
		workshop?: string;
		userProgram?: string;
		userId?: string;
	};
	blockerSurveyWhere?: {
		workshop?: string;
		program?: string;
		course?: string;
		userId?: string;
	};
}
