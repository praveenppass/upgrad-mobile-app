import { gql } from "@apollo/client";

export const pendingFeedbackQuery = gql`
	query pendingFeedback($where: PendingFeedbackWhereInput!) {
		pendingFeedback(where: $where) {
			id
			level1
			level2
			moduleId
			feedback {
				id
				name
				type
				children {
					category {
						questions {
							id
							question
							type
							options {
								option
							}
							isChild
							childrenQuestions
							preferredAnswer
						}
					}
				}
			}
		}
	}
`;

export interface IPendingFeedbackQueryVariables {
	where: {
		feedbackFrom: string;
		level1: string;
		level2?: string;
		type: string;
		userProgram: string;
	};
}

export interface IPendingFeedbackQuery {
	pendingFeedback: IPendingFeedbackData;
}

export interface IPendingFeedbackData {
	id: string;
	feedback: IFeedback;
	moduleId: string;
	level1: string;
	level2: string;
}

export interface IFeedback {
	id: string;
	name: string;
	type: string;
	children: IPendingFeedbackChild[];
}

export interface IPendingFeedbackChild {
	category: IPendingFeedbackChildCategory;
}

export interface IPendingFeedbackChildCategory {
	questions: IPendingFeedbackChildCategoryQuestions[];
}

export interface IPendingFeedbackChildCategoryQuestions {
	id: string;
	question: string;
	type: IPendingFeedbackType;
	options: IPendingFeedbackOptions[];
	isChild: boolean;
	childrenQuestions: string[];
	preferredAnswer: string;
}

export enum IPendingFeedbackType {
	RATING = "RATING",
	OPTIONS = "OPTIONS",
	TEXT = "TEXT",
}

export interface IPendingFeedbackOptions {
	option: string;
	tagGroupLabel: string;
	tags: string[];
}
