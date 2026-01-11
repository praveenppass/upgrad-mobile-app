export interface GetAssetFromUserCourseData {
	getAssetFromUserCourse?: GetAssetFromUserCourse;
}

export interface GetAssetFromUserCourse {
	timeSpent?: number;
	startsAt?: null;
	endsAt?: null;
	status?: string;
	isBookMarked?: boolean;
	seekTime?: number;
	children?: null;
	questionUrl?: null;
	userCourse?: UserCourse;
	userLabAsset?: null;
	userCloudProgrammingLabAsset?: null;
	userCloudProgrammingLabAssetUrl?: null;
	asset?: Asset;
	nextAsset?: NextAssetClass;
	previousAsset?: NextAssetClass;
	attempt?: {
		url: string;
	};
}

export interface IClassOpinion {
	question?: string;
	minWordCount?: number;
	maxWordCount?: number;
	enableViewResponseBeforeSubmit?: boolean;
}

interface Asset {
	sourceCodeFilePath?: null;
	idleDuration?: number;
	id?: string;
	code?: string;
	labPath?: null;
	labType?: null;
	children?: unknown[];
	assetType?: AssetType;
	name?: string;
	duration?: number;
	skills?: Skill[];
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
	assessment?: string;
	recallQuiz?: string;
}

interface OnlineEditor {
	description?: string;
	solutionFilePath?: string;
}

interface HTMLZip {
	filePath?: string;
}

interface PDF {
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

interface Lab {
	path?: string;
	meta?: Meta;
}

interface Meta {
	editorSettings?: EditorSettings;
	resultPort?: number;
	resultPath?: string;
	answerUrl?: string;
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

interface Assignment {
	id?: string;
	name?: string;
	duration?: number;
	marks?: number;
	passPercentage?: number;
	instructions?: string;
	submitByDays?: number;
	subSkills?: Skill[];
	preset?: null;
	presetConfiguration?: null;
	enableHint?: boolean;
	hint?: null;
	enableShowAnswer?: boolean;
	enableReset?: boolean;
	labType?: string;
	lab?: null;
	problemStatement?: string;
	enableSpecifications?: boolean;
	specifications?: string;
	question?: string;
	template?: null;
	summary?: null;
	questionUrl?: string;
	answerUrl?: string;
	testCases?: TestCase[];
}

interface Skill {
	id?: string;
	name?: string;
}

interface TestCase {
	suiteName?: string;
	name?: string;
	marks?: number;
	subSkills?: Skill[];
}

interface AssetType {
	name?: string;
	type?: string;
}

interface CodeZip {
	filePath?: string;
}

interface Scorm {
	type?: string;
	filePath?: string;
}

interface Skill {
	id?: string;
	name?: string;
}

interface SubSkill {
	id?: string;
	name?: string;
	skill?: Skill;
}

interface Video {
	transcriptFile?: string;
	transcript?: null;
	type?: string;
	vimeo?: string;
	brightcoveId?: string;
	isBrightcoveIdVerified?: boolean;
}

export interface NextAssetClass {
	asset?: string;
	level1?: string;
	level2?: null | string;
	level3?: string;
	level4?: string;
}

export interface UserCourse {
	id?: string;
	workshop?: Workshop;
	user?: User;
	enterprise?: null;
	labType?: string;
	labPath?: null;
	lab?: null;
	deliveryType?: DeliveryType;
	isOptional?: null;
	userProgram?: null;
	course?: Course;
}

interface Course {
	id?: string;
	name?: string;
	description?: string;
	totalLearningDuration?: number;
	totalProjects?: number;
	totalAssessments?: number;
	totalAssignments?: number;
	courseLevels?: Skill[];
	playgroundSettings?: PlaygroundSettings;
	enableLockGradableAssets?: boolean;
	code?: string;
	playgroundTemplates?: PlaygroundTemplate[];
	enablePracticeLab?: boolean;
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

export interface DeliveryType {
	name?: string;
	id?: string;
	type?: string;
}

interface User {
	id?: string;
}

interface Workshop {
	id?: string;
	noOfSessions?: number;
}
