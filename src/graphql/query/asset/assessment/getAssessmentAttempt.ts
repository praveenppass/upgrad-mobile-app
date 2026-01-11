import { gql } from "@apollo/client";

const getAssessmentAttemptQuery = gql`
	query GetAssessmentAttempt($attemptId: String!, $assetCode: String!) {
		assessmentAttempt(attemptId: $attemptId, assetCode: $assetCode)
			@rest(
				type: "AssessmentAttempt"
				path: "/assessment-attempt/{args.attemptId}?deliveryId={args.assetCode}"
			) {
			id
			score
			status
		}
	}
`;

export interface IGetAssessmentAttemptVariables {
	attemptId: string;
	assetCode: string;
}
export interface IAssessmentAttempt {
	id: string;
	score: number;
	status: string;
	passPercentage: number;
}

export interface IAssessmentAttemptData {
	attempt: {
		status: string;
		isQuestionLevelTimer: boolean;
		attemptNumber: number;
		isLatest: boolean;
		penaltyPercentage: number;
		attemptedAllQuestions: boolean;
		questions: {
			attempted: number;
			questionInfo: {
				question: string;
				attempts: number;
			};
		}[];

		result: {
			status: string;
			timeSpent: number;
			totalScore: number;
			correctScore: number;
			correctPercentage: number;
		};
	};
	settings: {
		afterTakingSettings: {
			showScore: boolean;
			showTimeTaken: boolean;
			header: string;
			description: string;
			failedMessageHeader: string;
			failedMessageDescription: string;
			passedMessageHeader: string;
			passedMessageDescription: string;
		};
		generalSettings: {
			attemptLimit: any;
			userLimit: number;
			passPercentage: number;
			duration: number;
			attemptLevel: string;
		};
		reportSettings: {
			enableDetailedReport: boolean;
		};
	};
}

export default getAssessmentAttemptQuery;
