import { IEventKeys } from "@interface/calendar.interface";

export enum IHomeSessionStatus {
	COMPLETED = "completed",
	IN_PROGRESS = "in-progress",
	NOT_STARTED = "not-started",
}

export interface IHomeSession {
	id: string;
	name?: string;
	title?: string;
	type: string | undefined;
	endsAt: string;
	startsAt: string;
	workshop: {
		id: string;
		code: string;
	};
	userProgram: {
		program: {
			name: string;
		};
	};
	virtualMeetingProvider?: {
		joinUrl: string;
		code: string;
		encryptedPassword: string;
	};
	virtualMeeting?: {
		joinUrl: string;
		code: string;
		encryptedPassword: string;
		uploadedFiles: {
			joinUrl: string;
		}[];
	};

	order: number;

	buddy?: {
		lastName: string;
		firstName: string;
	};

	mentorUser?: {
		mentor: {
			lastName: string;
			firstName: string;
		};
	};
}

export interface IHomeLearnerSessionResult {
	id: string;
	type: IEventKeys;
	workshopSession: IHomeSession | null;
	sessionGroup: IHomeSession | null;
	sessionGroupSession: IHomeSession | null;
	mentoringSession: IHomeSession | null;
	buddySession: IHomeSession | null;
	session: IHomeSession | null;
	endsAt: string;
	startsAt: string;
	userProgram: {
		program: {
			name: string;
		};
	};
}

export interface IHomeLearnerSession {
	userEvents: {
		totalCount: number;
		result: IHomeLearnerSessionResult[];
	};
}

export interface IHomeLearnerSessionVariables {
	where: {
		_and: [
			{ user?: string },
			{
				type: {
					_in: [
						IEventKeys.buddyConnect,
						IEventKeys.careerCounselling,
						IEventKeys.dailydoubtResolution,
						IEventKeys.other,
						IEventKeys.problemSolving,
						// IEventKeys.group,
						IEventKeys.training,
						IEventKeys.liveSession,
						IEventKeys.careerPrep,
					];
				};
			},
		];
	};
	sort: {
		endsAt: string;
	};
	limit: number;
}

export enum IHomeLearnerAssetProgressStatusType {
	NOT_STARTED = "not-started",
	IN_PROGRESS = "in-progress",
}

export interface IHomeLearnerAsset {
	lastAccessedAsset: {
		activity: {
			level1: string;
			level2: string;
			level3: string;
			level4: string;
			status: string;
			aliasName: string;
		};
		asset: {
			id: string;
			code: string;
			name: string;
			assetType: {
				type: string;
			};
		};
		userProgram: {
			id: string;
			program: {
				id: string;
				code: string;
				name: string;
				variant: string;
				universityPartner: string;
			};
			workshop: {
				id: string;
				code: string;
			};
			courseInfo: {
				name: string;
			};
			progress: number;
			progressStatus: IHomeLearnerAssetProgressStatusType;
		};
	};
}
export interface IHomeLearnerCourses {
	learnerCourses: {
		result: {
			id: string;
			progress: number;
			variant: string;
			progressStatus: IHomeSessionStatus;
			totalLearningDuration: number;
			specializationsPurchasedCount: number;
			relatedUserPrograms: {
				id: string;
				courseInfo: {
					name: string;
				};
			}[];
			program: {
				id: string;
				code: string;
				name: string;
				image: string;
				universityPartner: string;
			};
			course: {
				id: string;
				code: string;
				name: string;
				image: string;
			};
			courseInfo: {
				name: string;
			};
			workshop: {
				id: string;
				code: string;
			};
		}[];

		totalCount: number;
	};
}

export interface IHomeLearnerCoursesVariables {
	where?: {
		progressStatus: {
			_in: IHomeSessionStatus[];
		};
		// course: {
		// 	_exists: boolean;
		// };
	};
	limit?: number;
	skip?: number;
}

export enum IHomeReferAndEarnPosition {
	ONGOING = "ongoing",
	BOTTOM = "bottom",
	COMPLETED = "completed",
}

export interface IHomeReferAndEarn {
	position: IHomeReferAndEarnPosition;
	index: number;
}
