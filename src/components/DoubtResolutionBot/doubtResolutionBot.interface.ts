import { FlatList } from "react-native";

import { IAssetType } from "@interface/asset.interface";

export enum userType {
	BOT = "bot",
	USER = "user",
}

export enum voteType {
	UP = "up",
	DOWN = "down",
}

export enum IconType {
	Positive = "positive",
	Neutral = "neutral",
	Negative = "negative",
}

export enum ButtonType {
	LEFT = "left",
	RIGHT = "right",
}

export enum ButtonText {
	CANCEL = "Cancel",
	SUBMIT = "Submit",
	NO = "No",
	YES = "Yes",
}

export const PAGE_SIZE = 5;
export const WELCOME_MESSAGE_ID = 12345;

export enum CoachModeTriggerCodes {
	REVISION_L2_ = "REVISION_L2_",
	REVISION_ALL_ = "REVISION_ALL_",
	GRADED_QUESTION_COACH_MODE = "graded_question_coach_mode",
}

export enum CoachModeCodes {
	REVISE_COACH = "revise_coach",
	GRADED_QUESTION_COACH = "graded_question_coach",
}
export interface CustomPrompt {
	code: string;
	disabled: boolean;
	label: string;
	value: string;
}

export interface MessageItem {
	id?: number;
	isCompleted?: boolean;
	sender: userType;
	text: string;
	displayBotActions?: boolean;
	questionId?: string;
	showPrompt?: boolean;
	prompts?: string[];
	vote?: voteType;
	customPrompts?: CustomPrompt[];
}

export interface DRBotProps {
	onClose: () => void;
	programName: string;
	workshopId?: string;
	workshopCode?: string;
	userProgramId?: string;
	assetCode?: string;
	courseId?: string;
	moduleId?: string;
	sessionId?: string;
	segmentId?: string;
	learningPathId?: string;
	assetType?: IAssetType;
	programCode?: string;
	programId?: string;
	buildPath?: string;
	pageUrlFromStudyPlan?: string;
}

export interface Message {
	text: string;
	sender: userType;
	isCompleted?: boolean;
	id?: number;
	questionId?: string;
	vote?: voteType;
	displayBotActions?: boolean;
	showPrompt?: boolean;
	customPrompts?: CustomPrompt[];
	prompts?: string[];
}

export interface FeedbackPayload {
	input: {
		feed_back: string;
		thread_id: string;
		chat_rating: number;
	};
}

export interface ChatHistoryPayload {
	user_id: string;
	user_program_id: string;
	page_size: number;
	page_number: number;
}

export interface InitiateChatPayload {
	asset_type: string[];
	username: string;
}

export interface FeedbackInput {
	question_id: string;
	rating: number;
	feedback: string;
	thread_id: string;
}

export interface MetaData {
	program_id?: string;
	program_code?: string;
	user_program_id?: string;
	program_name?: string;
	user_name?: string;
	timezone?: string;
	workshop_id?: string;
	workshop_code?: string;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	asset?: string;
	asset_type?: string[];
}

export interface SubmitInputRequest {
	question: string | null;
	user_id: string | null;
	thread_id?: string | null;
	meta_data: MetaData;
}

export interface DoubtResolutionBotControllerProps {
	assetCode?: string;
	assetType?: IAssetType;
	learningPathId?: string;
	programName?: string;
	workshopId?: string;
	workshopCode?: string;
	userProgramId?: string;
	pageUrlFromStudyPlan?: string;
	courseId?: string;
	moduleId?: string;
	sessionId?: string;
	segmentId?: string;
	flatListRef?: React.RefObject<FlatList<Message> | null>;
	programCode?: string;
	programId?: string;
	buildPath?: string;
}
