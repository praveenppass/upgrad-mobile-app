import { LearningPathType } from "@interface/app.interface";

export interface IAssessment {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	ispostSubmission?: boolean;
	attemptID?: string | null;
	recallQuizCode?: string | null;
	isPostRecallSubmission?: boolean;
	assetType: string | null;
	isScreenModel?: boolean;
	assessmentCode?: string | null;
	input?: {
		recallQuiz: string;
		meta: {
			asset: string;
			user: string;
			course?: string | null;
			userCourse?: string | null;
			program?: string | null;
			userProgram?: string | null;
			workshop: string;
			learnerCourse: string;
			deliveryType: string;
		};
	};
	setAttemptId?: (id: string) => void;
	setPreviewMode?: (id: boolean | undefined) => void;
}

export enum AssestQuiz {
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
	NOT_STARTED = "NOT_STARTED",
}

export enum PostsubmissionStatus {
	PASS = "PASS",
	FAIL = "FAIL",
}
export interface Assessment {
	instruction?: string;
	skills?: string[] | undefined;
	subSkills?: string[] | undefined;
	code?: string | undefined;
	description?: string;
}
export interface Settings {
	generalSettings?: {
		attemptLevel: string;
		attemptLimit?: number;
		duration?: number;
		passPercentage?: number;
	};
	reportSettings?: { enableDetailedReport: boolean };
	proctoringSettings?: { enableBrowserFullScreen?: boolean };
	afterTakingSettings?: {
		failedMessageHeader: string;
		passedMessageDescription: string;
		passedMessageHeader: string;
		failedMessageDescription: string;
		showScore: boolean;
		showTimeTaken: boolean;
		header: string;
		description: string;
	};
}
export interface Attempt {
	status?: string;
	attemptNumber?: number;
	questions?: [];
	attemptedAllQuestions?: boolean;
	result?: PostsubmissionResult;
}
export interface PageData {
	assessment?: Assessment;
	settings?: Settings;
	attempt?: Attempt;
	attemptQuiz?: Object | any;
	quiz?: object | any;
	extraData?: { totalQuestions: number };
}
export interface PostsubmissionResult {
	status: string;
	correctPercentage: number;
	timeSpent: number;
}

export interface IAssessmentControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
	assessmentCode?: string | null;
}

export interface IAssessmentDetailsViewProps {
	assessmentData?: any;
	assessmentProgramInfo?: any;
	isSubmitted: boolean;
	submittedDate?: string | null;
	showUnderStandModal?: () => void;
	assessmentURL?: string | null;
	assetCode?: string | null;
	attemptId?: string | null;
	courseId?: string | null;
	moduleId?: string | null;
	sessionId?: string | null;
	segmentId?: string | null;
	learningPathId?: string | null;
	learningPathType?: string | null;
	pageData?: Object;
	isProgram: boolean;
	loader?: boolean;
	assetType?: string;
	learningPathCode?: string | null;
	refetch: () => void;
	totalExtensionsAllowed?: number;
	dueDateExtensionMode?: string;
	comboCurriculumCode?: string | null;
}
export interface IAssessmentDetailsControllerLxp {
	assetCode?: string | null;
	isProgram?: boolean;
	attemptId?: string | null;
	courseId?: string | null;
	moduleId?: string | null;
	sessionId?: string | null;
	segmentId?: string | null;
	learningPathId?: string | null;
	learningPathType?: string | null;
	pageData?: Object;
	timeSpent?: number;
	assessmentProgramInfo?: any;
	assessmentComponentData?: any;
	learningPathCode?: string | null;
	comboCurriculumCode?: string | null;
}

export interface Data {
	attempt: Attempt;
	assessment: Assessment;
	settings: Settings;
	extraData: ExtraData;
}

export interface ExtraData {
	totalQuestions: number;
	totalScore: number;
}

export interface AfterTakingSettings {
	showScore: boolean;
	showTimeTaken: boolean;
	header: string;
	description: string;
	failedMessageHeader: string;
	failedMessageDescription: string;
	passedMessageHeader: string;
	passedMessageDescription: string;
}

export interface GeneralSettings_ {
	attemptLimit: number;
	userLimit: number;
	passPercentage: number | null;
	enableRandomizeQuestion: boolean;
	enableShuffleQuestions: boolean;
	enableAssessmentLevelTimer?: boolean;
	enableNonTimedAssessment: boolean;
	enableQuestionLevelTimer: boolean;
	enableReport: boolean;
	enableHint: boolean;
	enableWrongAnswerReason: boolean;
	enableCorrectAnswerReason: boolean;
	duration: number;
	enableShuffleAnswerChoice: boolean;
	enableSkilledAssessment: boolean;
	enableSkipping: boolean;
	enableAttemptLimitPerCustomField: boolean;
	attemptLimitCustomField: string;
	attemptLevel: string;
}

export interface LearnerViewSettings {
	enableGridView: boolean;
	enableListView: boolean;
}

export interface NavigationSettings {
	enableMoveOnlyForward: boolean;
	enablePauseAssessment: boolean;
	enableForceAllAnswers: boolean;
	enableQuestionResubmit: boolean;
}

export interface ShowQuestionAnalysis {
	enable: boolean;
	explanationVideo: boolean;
	correctAnswer: boolean;
	answerReason: boolean;
	lastAttemptOnly: boolean;
}

export interface ReportSettings {
	enableDetailedReport: boolean;
	showQuestionAnalysis: ShowQuestionAnalysis;
	enableNotifications: boolean;
}

export interface LearnerDetails {
	emailID: string;
	firstName: string;
	lastName: string;
}

export interface GroupSettings {
	enablePassingLevel: boolean;
	skills: string[];
}

export interface GeneralSettings {
	attemptLevel: string;
}

export interface Question {
	questionId: string;
	status: "ANSWERED" | "SKIPPED";
	isPinned: boolean;
	answer: string[];
	duration: number;
	submittedAt: string;
	isCorrect: boolean;
	attempted: number;
	questionInfo: QuestionInfo;
	hint?: string;
	difficultyLevel: number;
	attempts: number;
	expiredAt: string;
	startedAt: string;
}

export interface QuestionInfo {
	question: string;
	qId: number;
	questionCode: string;
	questionType: "msq" | "mcq" | "numerical" | "sequence";
	msq?: MSQOptions;
	mcq?: MCQOptions;
	numerical?: NUMERICALOptions;
	sequence?: SEQUENCEOptions;
	hint?: string;
	difficultyLevel: number;
	attempts: number;
}

export interface MSQOptions {
	options: Option[];
	isFeedbackEnable: boolean;
}

export interface MCQOptions {
	options: Option[];
	isFeedbackEnable: boolean;
}

export interface NUMERICALOptions {
	options: Option[];
	isFeedbackEnable: boolean;
}

export interface SEQUENCEOptions {
	options: Option[];
	isFeedbackEnable: boolean;
}

export interface Option {
	id: string;
	text: string;
	feedback: string;
}

export interface Result {
	status: "PASS" | "FAIL";
	timeSpent: number;
	totalScore: number;
	correctScore: number;
	correctPercentage: number;
	totalProficiencyScore: number;
	attemptProficiencyScore: number;
	realAttemptProficiencyScore: number;
	proficiencyPercentage: number;
	realProficiencyPercentage: number;
	noOfCorrectAnsweredQuestions: number;
	noOfWrongAnsweredQuestions: number;
	noOfAttemptedQuestions: number;
	noOfAnsweredQuestions: number;
	noOfNotAnsweredQuestions: number;
	questions: ResultQuestion[];
}

export interface ResultQuestion {
	questionId: string;
	marks: number;
	isCorrect: boolean;
	isSkipped: boolean;
}

export enum AssetModulepopup {
	ASSET_HINT = "asset_hint",
	ASSET_INFO = "asset_info",
	ASSET_OVERVIEW = "asset_overview",
	ASSET_FINSH = "asset_finsh",
	ASSET_TIMER_COMPLETED = "asset_timer_completed",
	ASSET_SKIP = "asset_skip",
}

export enum QuestionStatusEnum {
	ANSWERED = "ANSWERED",
	NOT_ANSWERED = "NOT_ANSWERED",
	NOT_VISITED = "NOT_VISITED",
}

export enum EQuestionType {
	MCQ = "mcq",
	MSQ = "msq",
	NUMERICAL = "numerical",
	SEQUENCING = "sequence",
	POLL = "poll",
	OPEN_RESPONSE = "openresponse",
}
