import { IAssetType } from "./asset.interface";

export interface GetAssetFromUserProgramData {
	getAssetFromUserProgram?: GetAssetFromUserProgram;
}

export interface GetAssetFromUserProgram {
	timeSpent?: number;
	userLabAsset?: null;
	userCloudProgrammingLabAsset?: null;
	userCloudProgrammingLabAssetUrl?: null;
	startsAt?: string;
	endsAt?: string;
	isOptional?: boolean;
	enableLock?: boolean | null;
	status?: string;
	isBookMarked?: boolean;
	isUpgraded?: boolean;
	seekTime?: number;
	extensionRequests?: ExtensionRequest[];
	children?: null;
	userProgram?: UserProgram;
	asset?: Asset;
	nextAsset?: NextAssetClass;
	previousAsset?: NextAssetClass;
	attempt?: {
		url?: string;
	};
}

export interface ExtensionRequest {
	requestedAt: string;
}

export interface Asset {
	sourceCodeFilePath?: string;
	idleDuration?: number;
	id?: string;
	code?: string;
	labPath?: null;
	labType?: null;
	children?: unknown[];
	assetType?: AssetType;
	name?: string;
	duration?: number;
	skills?: unknown[];
	subSkills?: SubSkill[];
	video?: Video;
	audio?: null;
	ppt?: PDF;
	pdf?: PDF;
	scorm?: Scorm;
	htmlZip?: HTMLZip;
	codeZip?: CodeZip;
	onlineEditor?: OnlineEditor;
	handsOn?: HandsOn;
	assignment?: Assignment;
	project?: null;
	assessment?: {
		url: string;
	};
	recallQuiz?: string;
}

interface OnlineEditor {
	description?: string;
	solutionFilePath?: string;
}

interface CodeZip {
	filePath?: string;
}

interface HandsOn {
	id?: string;
	name?: string;
	instructions?: string;
	preset?: string;
	presetConfiguration?: PresetConfiguration;
	enableHint?: boolean;
	hint?: string;
	enableShowAnswer?: boolean;
	enableReset?: boolean;
	labType?: string;
	lab?: Lab;
	question?: string;
	template?: Template;
	questionUrl?: string;
	answerUrl?: string;
	testCases?: TestCase[];
	questions?: unknown[];
	labAnswerType?: string;
	duration?: number;
}

export interface Assignment {
	id?: string;
	name?: string;
	duration?: number;
	marks?: number;
	passPercentage?: number;
	instructions?: string;
	subSkills?: Skill[];
	preset?: string;
	presetConfiguration?: PresetConfiguration;
	enableHint?: boolean;
	hint?: string;
	enableShowAnswer?: boolean;
	enableReset?: boolean;
	labType?: string;
	lab?: Lab;
	problemStatement?: string;
	enableSpecifications?: boolean;
	specifications?: string;
	question?: string;
	template?: Template;
	summary?: null;
	questionUrl?: string;
	answerUrl?: string;
	testCases?: TestCase[];
}

interface Lab {
	path?: string;
	meta?: Meta;
}

interface Meta {
	editorSettings?: EditorSettings;
}

interface EditorSettings {
	isPreview?: boolean;
}

interface PresetConfiguration {
	enableEditor?: boolean;
	enableBrowser?: boolean;
	enableDatabase?: boolean;
	enableTerminal?: boolean;
	enableMultipleTerminals?: boolean;
}

interface Template {
	type?: string;
	name?: string;
	presetConfiguration?: PresetConfiguration;
}

interface TestCase {
	suiteName?: string;
	name?: string;
	marks?: number;
	subSkills?: Skill[];
}

interface Skill {
	id?: string;
	name?: string;
}

interface PDF {
	filePath?: string;
}

interface Video {
	transcriptFile?: null;
	transcript?: null;
	type?: string;
	vimeo?: string;
	brightcoveId?: string;
	isBrightcoveIdVerified?: boolean;
}

interface HTMLZip {
	filePath?: string;
}

interface AssetType {
	name?: string;
	type?: IAssetType;
}

interface Scorm {
	type?: string;
	filePath?: string;
}

interface SubSkill {
	id?: string;
	name?: string;
	skill?: Skill;
}

interface NextAssetClass {
	asset?: string;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: null;
}

export interface UserProgram {
	id?: string;
	totalCourses?: null;
	remainingUnlockRequests: number;
	totalProjects?: null;
	totalAssessments?: null;
	totalAssignments?: null;
	totalHandsOns?: null;
	totalLevel1Containers?: null;
	totalWorkshopSessions?: null;
	totalExtensionsTaken?: number;
	user?: User;
	enterprise?: null;
	workshop?: {
		id: string;
	};
	labType?: string;
	lab?: null;
	deliveryType?: DeliveryType;
	program?: Program;
}

interface DeliveryType {
	id?: string;
	name?: string;
	type?: string;
}

interface Program {
	variant?: string;
	enableLockGradableAssets?: boolean;
	level?: Skill[];
	code?: string;
	name?: string;
	totalLearningDuration?: number;
	noOfDaysFromAssetPostDueDate?: number;
	playgroundSettings?: PlaygroundSettings;
	labSettings?: LabSettings;
	playgroundTemplates?: PlaygroundTemplate[];
	enablePracticeLab?: boolean;
	remainingUnlockRequests: number;
	totalExtensionsAllowed: number;
	hardDeadlineDays: number;
}

interface LabSettings {
	relatedImages?: unknown[];
}

interface PlaygroundSettings {
	preFix?: null;
	port?: null;
	path?: null;
	postFix?: null;
}

interface PlaygroundTemplate {
	dockerImage?: string;
	name?: string;
	imageUrl?: string;
	dockerLabAsset?: string;
}

interface User {
	id?: string;
}
