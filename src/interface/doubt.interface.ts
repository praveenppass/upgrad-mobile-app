export interface DoubtSummary {
	data?: Data;
}

export interface Data {
	doubtFormQuestionSummary?: DoubtFormQuestionSummary;
	sessionGroupSession?: SessionGroupSession;
}

export interface DoubtFormQuestionSummary {
	allQuestions?: number;
	myQuestions?: number;
}

export interface DoubtData {
	doubtFormQuestions?: DoubtFormQuestions;
	doubtFormMyQuestions?: DoubtFormQuestions;
}

export interface DoubtFormQuestions {
	totalCount?: number;
	result?: IResult[];
}

export interface IResult {
	id?: string;
	createdBy?: CreatedBy;
	lastUpdatedDate?: Date;
	votes?: number;
	usersUpvote?: any[];
	isEdited?: boolean;
	isMarkedIrrelevant?: boolean;
	content?: string;
	createdAt?: Date;
}

export interface CreatedBy {
	id?: string;
	firstName?: string;
	lastName?: string;
}

export interface SessionGroupSession {
	id?: string;
	startsAt?: Date;
	endsAt?: Date;
	isOpenDoubtForm?: boolean;
	enableDoubtForm?: boolean;
}
