import { gql } from "@apollo/client";

const getContainer3ProgramQuery = gql`
	query getContainer3ProgramData(
		$where: UserProgramContainerWhereInput!
		$userProgramContainerWhere: UserProgramContainerWhereInput!
		$assetPenaltyWhere: AssetPenaltyConfigurationsWhereInput!
		$userProgramWhere: UserProgramWhereUniqueInput!
		$pendingFeedbackWhere: PendingFeedbackWhereInput!
	) {
		userProgramContainers(where: $where) {
			code
			name
			label
			type
			asset {
				code
			}
			activity {
				progress
				enableLock
				extensionRequests {
					requestedAt
				}
				totalCompletedGradableAssets
				totalGradableAssets
				dueAt
				completedDuration
				duration
				status
			}
			level
			isOptional
		}
		userProgramContainer(where: $userProgramContainerWhere) {
			isOptional
			track
			elective
			name
		}
		assetPenaltyConfigurations(where: [$assetPenaltyWhere]) {
			configurations {
				from
				to
				percentage
			}
		}
		userProgram(where: $userProgramWhere) {
			totalExtensionsTaken
			program {
				totalExtensionsAllowed
				dueDateExtensionMode
				hardDeadlineDays
				enableComboCurriculum
			}
			comboCurriculum {
				dueDateExtensionMode
				totalExtensionsAllowed
			}
		}
		pendingFeedback(where: $pendingFeedbackWhere) {
			id
		}
	}
`;

export default getContainer3ProgramQuery;

interface IUserProgramContainerWhere {
	id: string;
	level1: string;
	trackGroup?: string;
	track?: string;
	elective?: string;
	electiveGroup?: string;
}

export interface IGetContainer3ProgramQueryVariables {
	where: IUserProgramContainerWhere;
	userProgramContainerWhere: IUserProgramContainerWhere;
	assetPenaltyWhere: {
		program: string;
	};
	userProgramWhere: {
		id: string;
	};
	pendingFeedbackWhere: {
		feedbackFrom: string;
		level1: string;
		type: string;
		userProgram: string;
	};
}

export interface IGetContainer3ProgramQueryData {
	userProgramContainers: IUserProgramContainer[];
	userProgramContainer: IUserProgramContainerHeader;
	assetPenaltyConfigurations: IAssetPenaltyConfiguration[];
	userProgram: IUserProgram;
	pendingFeedback: {
		id: string;
	} | null;
}

interface IUserProgramContainerHeader {
	isOptional: boolean;
	name: string;
	track: string;
	elective: string;
}
interface IUserProgram {
	id: string;
	totalExtensionsTaken: number;
	program: {
		totalExtensionsAllowed: number;
		dueDateExtensionMode: IDeadlineExtensionMode;
		hardDeadlineDays: number;
		enableComboCurriculum: boolean;
	};
	comboCurriculum: {
		dueDateExtensionMode: IDeadlineExtensionMode;
		totalExtensionsAllowed: number;
	};
}

export enum IDeadlineExtensionMode {
	DUE_DATE_EXTENSION = "DUE_DATE_EXTENSION",
	DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE = "DUE_DATE_EXTENSION_UNTIL_HARD_DEADLINE",
}

interface IExtensionRequest {
	requestedAt: string;
}

export interface IUserProgramContainer {
	id: string;
	code: string;
	type: string;
	name: string;
	label: string;
	asset: {
		code: string;
	};
	activity: {
		progress: number;
		enableLock: boolean;
		extensionRequests: IExtensionRequest[];
		totalCompletedGradableAssets: number;
		totalGradableAssets: number;
		dueAt: string;
		completedDuration: number;
		duration: number;
		status: string;
	};
	level: number;
	isOptional: boolean;
}

export interface IAssetPenaltyConfiguration {
	configurations: IConfiguration[];
}
interface IConfiguration {
	from: number | null;
	to: number | null;
	percentage: number;
}
