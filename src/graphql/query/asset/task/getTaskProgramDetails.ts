import { gql } from "@apollo/client";

import { AssetUploadFileTypeEnum } from "./getTaskCourseDetails";

const getTaskProgramDetails = gql`
	query getAssetFromUserProgram($where: UserProgramAssetWhereInput!) {
		getAssetFromUserProgram(where: $where) {
			evaluationSetting {
				id
				revaluationSetting {
					learnerRevaluationRequest
				}
			}
			timeSpent
			startsAt
			endsAt
			isExtensionRegained
			deadlineReferredFrom
			status
			extensionRequests {
				requestedAt
			}
			userProgram {
				id
				totalExtensionsTaken
				workshop {
					id
				}
				deliveryType {
					id
					name
					type
				}
				program {
					variant
					enableAvailableAndDueDate
					dueDateExtensionMode
					enableRevaluation
					totalExtensionsAllowed
					enableAssetPenalty
					hardDeadlineDays
					code
					name
					totalLearningDuration
					noOfDaysFromAssetPostDueDate
					enableComboCurriculum
				}
				comboCurriculum {
					dueDateExtensionMode
					totalExtensionsAllowed
				}
			}
			asset {
				id
				code
				version
				skills {
					id
					name
				}
				allowedFileTypes {
					count
					type
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
					submissionTemplate
					answerType
					id
					name
					duration
					marks
					submissionType
					submitByDays
					instructions
					enableSkilled
					subSkills {
						id
						name
					}
					uploadFileTypes
					summary {
						attempt {
							enableReSubmission
							publishDeadlineStartsAt
							publishDeadlineEndsAt
							id
							publishedAt
							answerUrl
							answerFiles {
								name
								url
							}
							status
							createdAt
							requestedReEvaluationAt
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
				dynamicLinks {
					url
					text
				}
				project {
					submissionTemplate
					id
					answerType
					name
					duration
					marks
					submissionType
					instructions
					subSkills {
						id
						name
					}
					uploadFileTypes
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
							publishDeadlineStartsAt
							publishDeadlineEndsAt
							evaluationProgress
							requestedReEvaluationAt
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
			}
		}
	}
`;

export interface IGetTaskProgramDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userProgram: string | null;
		translationLanguage?: string | null;
	};
}
export interface IGetTaskProgramDetailsQuery {
	getAssetFromUserProgram: IGetAssetFromUserProgram;
}

export interface IGetAssetFromUserProgram {
	evaluationSetting: IProgramEvaluationSetting;
	timeSpent: number;
	startsAt: string | null;
	endsAt: string | null;
	enableLock: boolean | null;
	status: string;
	availableTill: null;
	isExtensionRegained: boolean | null;
	deadlineReferredFrom: null;
	extensionRequests: IProgramExtensionRequest[];
	userProgram: IProgramDetailsUserProgram;
	asset: IProgramAsset;
}

export interface IProgramExtensionRequest {
	requestedAt: string;
}

export interface IProgramEvaluationSetting {
	id: string;
	revaluationSetting: IProgramReValuationSetting;
}

export interface IProgramReValuationSetting {
	learnerRevaluationRequest: number;
}

export interface IProgramAssetDynamicLink {
	url: string;
	text: string;
}
export interface IEvaluationSetting {
	id: string;
	revaluationSetting: string | null;
}
export interface IProgramAsset {
	id: string;
	code: string;
	version: number | null;
	name: string;
	skills: IProgramSkill[];
	assignment: IProgramAssignment;
	project: IProgramProject;
	subSkills: IProgramSubSkill[];
	dynamicLinks: IProgramAssetDynamicLink[];
	allowedFileTypes: IAllowedFileTypes[];
}

interface IAllowedFileTypes {
	count: number;
	type: AssetUploadFileTypeEnum;
}

export interface IProgramAssignment {
	id?: string;
	name?: string;
	duration?: number;
	marks?: number;
	instructions?: string;
	subSkills?: IProgramSkill[];
	uploadFileTypes: string[];
	submissionType: string;
	summary?: IProgramSummary;
	answerType: string | null;
	submissionTemplate: string | null;
}

export interface IProgramProject {
	id: string;
	name: string;
	duration: number;
	marks: number;
	submissionType: string;
	instructions: string;
	subSkills: IProgramSubSkill[];
	uploadFileTypes: string[];
	summary: IProgramSummary;
	answerType: string | null;
	submissionTemplate: string | null;
}

export interface IProgramSummary {
	attempt: IProgramAttempt;
}

export interface IProgramAnswerFile {
	name: string;
	url: string;
}

export interface IProgramAttempt {
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

export interface IProgramSkill {
	id: string;
	name: string;
}
export interface IProgramDetailsUserProgram {
	id?: string;
	totalProjects?: null;
	totalAssignments?: null;
	totalExtensionsTaken?: number;
	workshop: {
		id: string | null;
	};
	deliveryType: {
		id: string | null;
		name: string | null;
		type: string | null;
	};
	program: IProgram;
	comboCurriculum: {
		dueDateExtensionMode: string;
		totalExtensionsAllowed: number;
	};
}

export interface IProgramSubSkill {
	id: string;
	name: string;
}

export interface IProgram {
	variant: string;
	code: string;
	name: string;
	totalLearningDuration: number;
	noOfDaysFromAssetPostDueDate: number;
	totalExtensionsAllowed: number;
	hardDeadlineDays: number;
	enableAvailableAndDueDate: boolean;
	dueDateExtensionMode: string;
	enableRevaluation: boolean;
	enableComboCurriculum: boolean;
}

export default getTaskProgramDetails;
