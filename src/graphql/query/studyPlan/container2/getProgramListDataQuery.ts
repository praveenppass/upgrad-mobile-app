import { gql } from "@apollo/client";

const getProgramListDataQuery = gql`
	query getProgramListData(
		$where: UserProgramContainerWhereInput!
		$userProgramWhere: UserProgramWhereUniqueInput!
		$blockerSurveyWhere: BlockerSurveyForUserUniqueWhereInput!
		$userProfileConfigurationWhere: UserProfileConfigurationWhereUniqueInput!
		$userWhere: UserWhereUniqueInput!
		$userCourseProfileResponsesWhere: UserCourseProfileResponseWhereInput
	) {
		userProgramContainers(where: $where) {
			code
			label
			name
			duration
			isOptional
			trackGroup
			electiveGroup
			children {
				code
				label
				name
				duration
				isOptional
				trackGroup
				electiveGroup

				activity {
					totalCompletedGradableAssets
					totalGradableAssets
					progress
					isTrack
					isTrackGroup
					isElective
					isElectiveGroup
					duration
					completedDuration

					trackSelectionFrom
					trackAvailableTill

					electiveSelectionFrom
					electiveAvailableTill
				}
			}

			activity {
				totalCompletedGradableAssets
				totalGradableAssets
				progress
				isTrack
				isTrackGroup
				isElective
				isElectiveGroup
				duration
				completedDuration
				enableLock
				currentCourseState {
					asset
					level1
					level2
					level3
					level4
				}

				trackSelectionFrom
				trackAvailableTill

				electiveSelectionFrom
				electiveAvailableTill
			}

			userMilestoneCertificate {
				id
				isNotified
				certificate
			}
		}
		userProgram(where: $userProgramWhere) {
			id
			totalExtensionsTaken
			specializationsPurchasedCount
			isSpecialization
			progress
			firstAccessedAt
			relatedUserPrograms {
				id
			}
			totalLearningDuration
			progress
			workshop {
				id
				code
				contentStartsAt
				startsAt
			}
			program {
				id
				code
				enableProductivityGPT
				totalExtensionsAllowed
				description
				enableComboCurriculum
			}
			comboCurriculum {
				totalExtensionsAllowed
			}
			isUpgraded
			registeredAt
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

export default getProgramListDataQuery;

export interface IGetCombinedProgramData {
	userProgramContainers: IUserProgramContainer[];
	userProgram: IUserProgram;
	blockerSurveyForUser: IBlockerSurveyForUser;
	userProfileConfiguration: IUserProfileConfiguration;
	user: {
		profileSectionCompletion: IUserProfileSectionCompletion;
	};
	userCourseProfileResponses: IUserCourseProfileResponse[];
}

export interface IUserProgramContainer {
	code: string;
	label: string;
	name: string;
	duration: number;
	isOptional: boolean;
	trackGroup: string;
	electiveGroup: string;
	children: IUserProgramContainer[];
	activity: {
		totalCompletedGradableAssets: number;
		totalGradableAssets: number;
		progress: number;
		isTrack: boolean;
		isTrackGroup: boolean;
		isElective: boolean;
		isElectiveGroup: boolean;
		duration: number;
		completedDuration: number;
		enableLock: boolean;
		currentCourseState: {
			asset: string;
			level1: string;
			level2: string;
			level3: string;
			level4: string;
		};
		trackSelectionFrom: string;
		trackAvailableTill: string;
		electiveSelectionFrom: string;
		electiveAvailableTill: string;
	};
	userMilestoneCertificate: IUserMilestoneCertificate | null;
}

export interface IUserMilestoneCertificate {
	id: string;
	isNotified: boolean;
	certificate: string;
}

export interface IUserProgram {
	id: string;
	totalExtensionsTaken: number;
	specializationsPurchasedCount: number;
	isSpecialization: boolean;
	totalLearningDuration: number;
	progress: number;
	firstAccessedAt: string;
	relatedUserPrograms: IRelatedUserProgram[];
	workshop: {
		id: string;
		contentStartsAt: string;
		startsAt: string;
	};
	program: {
		totalExtensionsAllowed: number;
		description: string;
		id: string;
		code: string;
		enableProductivityGPT: boolean;
		enableComboCurriculum: boolean;
	};
	comboCurriculum: {
		totalExtensionsAllowed: number;
	} | null;
	isUpgraded: boolean;
	registeredAt: string;
}

export interface IRelatedUserProgram {
	id: string;
}

export interface IGetProgramListDataVariables {
	where: {
		id: string;
	};
	userProgramWhere: {
		id: string;
	};
	blockerSurveyWhere: {
		userId: string;
		program: string;
		workshop: string;
	};

	userProfileConfigurationWhere: {
		workshop: string;
		program: string;
	};
	userWhere: {
		id: string;
	};
	userCourseProfileResponsesWhere: {
		workshop: string;
		userProgram: string;
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
