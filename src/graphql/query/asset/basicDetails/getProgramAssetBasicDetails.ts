import { gql } from "@apollo/client";

import { IAssetType } from "@interface/asset.interface";
import { ILanguage } from "@interface/userProgram.interface";

const getProgramAssetBasicDetailsQuery = gql`
	query getAssetFromUserProgram(
		$where: UserProgramAssetWhereInput!
		$blockerSurveyWhere: BlockerSurveyForUserUniqueWhereInput!
		$userProfileConfigurationWhere: UserProfileConfigurationWhereUniqueInput!
		$userWhere: UserWhereUniqueInput!
		$userCourseProfileResponsesWhere: UserCourseProfileResponseWhereInput
		$pendingFeedbackWhere: PendingFeedbackWhereInput!
		$userProgramWhere: UserProgramWhereUniqueInput!
	) {
		getAssetFromUserProgram(where: $where) {
			isBookMarked
			isOptional
			enableLock
			availableTill
			timeSpent
			startsAt
			seekTime
			status
			aliasName
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
				level1
				level2
				level3
				level4
				track
				trackGroup
				elective
				electiveGroup
				assetDoc {
					code
					name

					assetType {
						type
					}
				}
			}
			previousAsset {
				level1
				level2
				level3
				level4
				track
				trackGroup
				elective
				electiveGroup
				assetDoc {
					code
					name

					assetType {
						type
					}
				}
			}
			trackGroup
			track
			elective
			electiveGroup
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

		pendingFeedback(where: $pendingFeedbackWhere) {
			id
			feedback {
				id
			}
		}

		userProgram(where: $userProgramWhere) {
			id
			program {
				id
				code
				enableComboCurriculum
				enableTranslation
				languages {
					id
					name
				}
			}
			workshop {
				id
				contentStartsAt
				startsAt
			}
			comboCurriculum {
				code
			}
			firstAssetNotificationViewedAt
			progressStatus
			translationLanguage {
				id
				name
			}
		}
	}
`;

export interface IGetProgramAssetBasicDetailsQueryVariables {
	where: {
		asset: string;
		userProgram: string;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
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

	pendingFeedbackWhere: {
		feedbackFrom: string;
		level1: string;
		level2: string;
		type: string;
		userProgram: string;
	};
	userProgramWhere: {
		id: string;
	};
}

export interface IGetProgramAssetBasicDetailsQuery {
	getAssetFromUserProgram: {
		isBookMarked: boolean;
		isOptional: boolean;
		enableLock: boolean;
		availableTill: string;
		timeSpent: number;
		startsAt: string;
		seekTime: number;
		status: string;
		aliasName: string | null;
		children: {
			status: string;
		};

		asset: {
			name: string;
			assetType: {
				type: IAssetType;
			};
			recallQuiz: string;
			assessment: string;
		};
		nextAsset: {
			level1: string;
			level2: string;
			level3: string;
			level4: string;
			assetDoc: {
				code: string;
				name: string;
				assetType: {
					type: IAssetType;
				};
			};
		};

		previousAsset: {
			level1: string;
			level2: string;
			level3: string;
			level4: string;
			assetDoc: {
				code: string;
				name: string;
				assetType: {
					type: IAssetType;
				};
			};
		};
		trackGroup: string;
		track: string;
		elective: string;
		electiveGroup: string;
	};
	blockerSurveyForUser: IAssetBlockerSurveyForUser;
	userProfileConfiguration: IAssetUserProfileConfiguration;
	user: {
		profileSectionCompletion: IAssetUserProfileSectionCompletion;
	};
	userCourseProfileResponses: IAssetUserCourseProfileResponse[];
	pendingFeedback: {
		id: string;
		feedback: { id: string };
	} | null;

	userProgram: {
		id: string;
		program: {
			id: string;
			code: string;
			enableComboCurriculum: boolean;
			enableTranslation?: boolean;
			languages?: ILanguage[];
		};
		workshop: {
			id: string;
			contentStartsAt: string;
			startsAt: string;
		};
		comboCurriculum: {
			code: string;
		};
		firstAssetNotificationViewedAt: string;
		progressStatus: string;
		translationLanguage?: ILanguage | null;
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

export default getProgramAssetBasicDetailsQuery;
