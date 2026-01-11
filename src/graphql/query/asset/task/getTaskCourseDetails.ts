import { gql } from "@apollo/client";

import { IProgramAnswerFile } from "@graphql/query/asset/task/getTaskProgramDetails";

const getTaskCourseDetails = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			# evaluationSetting {
			# 	id
			# 	revaluationSetting {
			# 		learnerRevaluationRequest
			# 	}
			# }
			timeSpent
			startsAt
			endsAt
			status
			enableLock
			# availableTill
			# deadlineReferredFrom
			isBookMarked
			userCourse {
				id
				workshop {
					id
				}
				deliveryType {
					id
					name
					type
				}
				user {
					id
				}
				isOptional
				course {
					id
					name
					description
					totalLearningDuration
					code
					enableRevaluation
				}
			}
			asset {
				id
				code
				allowedFileTypes {
					count
					type
				}
				skills {
					id
					name
				}
				dynamicLinks {
					url
					text
				}
				subSkills {
					id
					name
					skill {
						id
						name
					}
				}
				assignment {
					answerType
					id
					name
					duration
					marks
					submissionTemplate
					uploadFileTypes
					passPercentage
					instructions
					submitByDays
					subSkills {
						id
						name
					}
					summary {
						attempt {
							enableReSubmission
							id
							publishedAt
							answerUrl
							answerFiles {
								name
								url
							}
							status
							createdAt
							recentEvaluationTag
							report {
								score
								percentage
								attemptScore
								proficiencyPercentage
								classAvgProficiencyPercentage
							}
						}
					}
				}
				project {
					answerType
					id
					name
					duration
					marks
					passPercentage
					uploadFileTypes
					instructions
					subSkills {
						id
						name
					}
					summary {
						attempt {
							enableReSubmission
							id
							answerUrl
							answerFiles {
								name
								url
							}
							status
							createdAt
							report {
								score
								percentage
								attemptScore
								proficiencyPercentage
								classAvgProficiencyPercentage
							}
						}
					}
				}
			}
		}
	}
`;

export interface IGetTaskCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userCourse: string | null;
		translationLanguage?: string | null;
	};
}

export interface IGetReEvaluationQueryVariables {
	id: string | null;
	status: boolean | null;
	evaluatorMappingFor: string | null;
	evaluationStatus: string | null;
	evaluationProgress: number | null;
	evaluatorDeadline: string | null;
	assetAttemptEvaluation: string | null;
	learnerFeedback: null;
}
export interface IGetTaskCourseDetailsQuery {
	getAssetFromUserCourse: IGetAssetFromUserCourse;
}

export interface IGetAssetFromUserCourse {
	evaluationSetting: ICourseEvaluationSetting;
	timeSpent: number;
	startsAt: string | null;
	endsAt: string | null;
	isOptional: boolean;
	enableLock: boolean | null;
	status: string;
	// isExtensionRegained: boolean | null;
	deadlineReferredFrom: null;
	// extensionRequests: IExtensionRequest[];
	userCourse: ICourseDetailsUserCourse;
	asset?: ICourseAsset;
}

export interface IExtensionRequest {
	requestedAt: string;
}

export enum AssetUploadFileTypeEnum {
	DOCX,
	PDF,
	TXT,
	XLS,
	XLSX,
	CSV,
	PPTX,
	IPYNB,
	PY,
	SQL,
	AVI,
	MP4,
	URL,
	DOC,
	PPT,
	JPEG,
	JPG,
	PNG,
	ZIP,
	RAR,
	HTTP,
	HTTPS,
}

export interface ICourseAssetDynamicLink {
	url: string;
	text: string;
}
export interface ICourseEvaluationSetting {
	id: string;
	revaluationSetting: ICourseReValuationSetting;
}

export interface ICourseReValuationSetting {
	learnerRevaluationRequest: number;
}

export interface ICourseAsset {
	id: string;
	code: string;
	name: string;
	skills: ICourseSkill[];
	assignment: ICourseAssignment;
	project: ICourseProject;
	subSkills: ICourseSubSkill[];
	dynamicLinks: ICourseAssetDynamicLink[];
	allowedFileTypes: IAllowedFileTypes[];
}

interface IAllowedFileTypes {
	count: number;
	type: AssetUploadFileTypeEnum;
}

export interface ICourseAssignment {
	id: string;
	name: string;
	duration: number;
	marks: number;
	instructions?: string;
	submissionType: string;
	uploadFileTypes: string[];
	summary: ICourseSummary;
	answerType: string | null;
	submissionTemplate: string | null;
}

export interface ICourseProject {
	id: string;
	name: string;
	duration: number;
	marks: number;
	submissionType: string;
	instructions: string;
	uploadFileTypes: string[];
	summary: ICourseSummary;
	answerType: string | null;
	submissionTemplate: string | null;
}
export interface ICourseSubSkill {
	id: string;
	name: string;
}

export interface ICourseSkill {
	id: string;
	name: string;
}

export interface ICourseSummary {
	attempt: ICourseAttempt;
}

export interface ICourseAttempt {
	enableReSubmission: boolean;
	id: string;
	publishedAt: string;
	answerUrl: string | null;
	answerFiles: IProgramAnswerFile[];
	status: string | null;
	createdAt: string | null;
	publishDeadlineStartsAt: string | null;
	publishDeadlineEndsAt: string | null;
	evaluationProgress: number | null;
	requestedReEvaluationAt: string | null;
	recentEvaluationTag: string | null;
	report: {
		score: number | null;
		percentage: number | null;
		attemptScore: number | null;
		proficiencyPercentage: number | null;
		classAvgProficiencyPercentage: number | null;
	};
}

export interface ICourseDetailsUserCourse {
	id: string;
	totalProjects: null;
	totalAssignments: null;
	totalExtensionsTaken: number;
	workshop: {
		id: string | null;
	};
	deliveryType: {
		id: string | null;
		name: string | null;
		type: string | null;
	};
	course: ICourse;
}

interface ICourse {
	variant: string;
	code: string;
	name: string;
	totalLearningDuration: number;
	noOfDaysFromAssetPostDueDate: number;
	// totalExtensionsAllowed: number;
	// hardDeadlineDays: number;
	enableAvailableAndDueDate: boolean;
	// dueDateExtensionMode: string;
	enableRevaluation: boolean;
}

export default getTaskCourseDetails;
