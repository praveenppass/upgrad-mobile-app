interface IUserToken {
	// status?: string;
	// id_token: string;
	// isNewUser?: boolean;
	access_token: string;
	refresh_token: string;
	// userReferralCode: string;
}

interface IKeyCloakUser {
	sub: string;
	name: string;
	realm: string;
	email: string;
	tenant: string;
	prismId: string;
	timezone: string;
	userName: string;
	given_name: string;
	family_name: string;
	isDefaultRole: string;
	isEmailVerify: boolean;
	email_verified: boolean;
	preferred_username: string;
	user_roles: {
		roles: string[];
	};
}

interface IEducation {
	university?: string;
	degree?: IDreamCompany;
	field?: IDreamCompany;
	recentEducation?: IDreamCompany;
	matriculationBoard?: IDreamCompany;
	academicStream?: IDreamCompany;
	intermediateBoard?: IDreamCompany;
	fromYear?: number;
	toYear?: number;
	percentage?: number | string;
}

enum IEducationType {
	HIGH_SCHOOL = "HIGH_SCHOOL",
	LEST_THAN_HIGH_SCHOOL = "LEST_THAN_HIGH_SCHOOL",
	FOR_DEGREE = "FOR_DEGREE",
}

enum IEducationInput {
	RecentEducation = "recentEducation",
	Profession = "professionType",
	University = "university",
	Degree = "degree",
	Field = "field",
	FromYear = "fromYear",
	ToYear = "toYear",
	Percentage = "percentage",
	MatriculationBoard = "matriculationBoard",
	IntermediateBoard = "intermediateBoard",
	AcademicStream = "academicStream",
}

interface ICountry {
	id: string;
	isd: string;
	name: string;
}

interface ICity {
	id: string;
	name: string;
}

interface IPasswordHistory {
	createdAt: Date;
}

interface IWorkExperience {
	isWorking?: boolean;
	designation?: IDreamCompany;
	organization?: IDreamCompany;
	industry?: IDreamCompany;
	workDomain?: IDreamCompany;
	package?: string;
	startsAt?: Date;
	onNoticePeriod?: boolean;
	endsAt?: Date;
}

interface IDreamCompany {
	code: string;
	name: string;
}

interface IExperience {
	year?: number;
	month?: number;
}

interface INationality {
	id: string;
	name: string;
}
interface IInterestAreas {
	technicalCourses?: IDreamCompany[];
	certificationCourses?: IDreamCompany[];
}

interface IStateRef {
	id?: string;
	name?: string;
	slug?: string;
}
interface ISkill {
	skill?: INationality;
	experience?: IExperience;
}

interface IUserInfo {
	id?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	isd?: string;
	phone?: string;
	fullName?: string;
	mobile?: string;
	isMobileVerify?: boolean;
	isWhatsAppVerify?: boolean;
	email?: string;
	createdAt?: Date;
	passwordHistory?: IPasswordHistory;
	companyName?: string;
	designation?: string;
	shortBio?: string;
	address?: string;
	gender?: string;
	nationality?: INationality;
	educations?: IEducation[];
	workExperiences?: IWorkExperience[];
	professionType?: string;
	dreamRole?: IDreamCompany;
	dreamCompany?: IDreamCompany;
	skills?: ISkill[];
	interestAreas?: IInterestAreas;
	alternateMobile?: number;
	alternateEmail?: string;
	whatsAppMobile?: number;
	whatsAppIsd?: string | number;
	telegram?: string | number;
	resume?: string;
	videoResume?: string;
	codingRequired?: string;
	dateOfBirth?: Date;
	timezone?: string;
	country?: ICountry;
	stateRef?: IStateRef;
	city?: ICity;
	career?: ICareer;
	experience?: IExperience;
	linkedIn?: string;
	github?: string;
	stackOverflow?: string;
	isProductIntroduced?: boolean;
	isProductTourAccessed?: boolean;
	isSkipProductIntroduced?: boolean;
	isGetStartedCompleted?: boolean;
	isProfileUpdate?: boolean;
	isSkipJobProfilePopUp?: boolean;
	basicPlanCourses?: string[];
	learningPartnerUserId?: string;
	bootcampCourses?: any[];
	jobProfileCourses?: string[];
	userProfileResume: {
		resumes: IResume[];
		videoResume: IResume;
	};
	profileSectionCompletion: {
		[IProfileSections.about]: boolean;
		[IProfileSections.skills]: boolean;
		[IProfileSections.settings]: boolean;
		[IProfileSections.education]: boolean;
		[IProfileSections.careerProfile]: boolean;
		[IProfileSections.areaOfInterest]: boolean;
		[IProfileSections.workExperience]: boolean;
		[IProfileSections.personalDetails]: boolean;
		[IProfileSections.programRequireAddProfileInfo]: boolean;
	};
}

enum IProfileSections {
	about = "about",
	skills = "skills",
	settings = "settings",
	education = "education",
	careerProfile = "careerProfile",
	areaOfInterest = "areaOfInterest",
	workExperience = "workExperience",
	personalDetails = "personalDetails",
	programRequireAddProfileInfo = "programRequireAddProfileInfo",
}

interface ICareer {
	workMode: string;
	experience: string;
	currentCtc: string;
	expectedCtc: string;
	noticePeriod: string;
	jobLocations: IJObLocation[];
}

interface IJObLocation {
	id: string;
	name: string;
	country: ICountry;
}

interface IResume {
	fileName: string;
	filePath: string;
	uploadedAt: string;
	resumeId?: string;
	fileSize?: string;
	_isDeleted?: boolean;
}

interface IProfileDetails {
	city: ICity;
	gender: string;
	resume: string;
	github?: string;
	linkedIn: string;
	timezone: string;
	lastName: string;
	address?: string;
	firstName: string;
	country: ICountry;
	dateOfBirth: string;
	stateRef: IStateRef;
	stackOverflow?: string;
	nationality: INationality;
	videoResume?: {
		filePath: string;
		fileName?: string;
		uploadedAt?: string;
	};
}

enum IEditProfileInput {
	city = "city",
	gender = "gender",
	resume = "resume",
	country = "country",
	lastName = "lastName",
	stateRef = "stateRef",
	timezone = "timezone",
	linkedIn = "linkedIn",
	firstName = "firstName",
	dateOfBirth = "dateOfBirth",
	nationality = "nationality",
	address = "address",
	github = "github",
	stackOverflow = "stackOverflow",
	videoResume = "videoResume",
}

enum IWorkExperienceInput {
	IsWorking = "isWorking",
	Designation = "designation",
	Organization = "organization",
	Industry = "industry",
	Package = "package",
	StartsAt = "startsAt",
	EndsAt = "endsAt",
	InSameRoll = "isSameRoll",
	ExperienceYear = "experience.year",
	ExperienceMonth = "experience.month",
	CodingRequired = "codingRequired",
	CurrentDomain = "workDomain",
	onNoticePeriod = "onnoticeperiod",
}

enum ISearchField {
	ORGANIZATION = "ORGANIZATION",
	DOMAIN = "WORK_DOMAIN",
	ROLES = "ROLES",
	INDUSTRY = "INDUSTRY",
	DEGREE = "DEGREES",
	UNIVERSITY = "UNIVERSITY",
	FIELD = "FIELD",
	PROFESSION = "PROFESSION",
	DREAM_COMPANY = "DREAM_COMPANY",
	RECENT_EDUCATION = "RECENT_EDUCATION",
	RECENT_EDUCATIONS = "RECENT_EDUCATIONS",
	MATRICULATION_BOARD = "MATRICULATION_BOARD",
	ACADEMIC_STREAM = "ACADEMIC_STREAM",
	INTERMEDIATE_BOARD = "INTERMEDIATE_BOARD",
}

interface IDropDownOptions {
	title: string;
	modalType?: string;
	selectedItem: string;
	queryKey?: ISearchField;
}

enum IInterestField {
	TECHNICAL_COURSES = "TECHNICAL_COURSES",
	CERTIFICATION_COURSES = "CERTIFICATION_COURSES",
}

// Enum for dropdown options
enum DropdownOption {
	YES = "yes",
	NO = "No",
}

// Enum for skill levels
enum SkillLevel {
	POOR = "Poor",
	BASIC = "Basic",
	INTERMEDIATE = "Intermediate",
	ADVANCED = "Advanced",
}

// Interface for question
interface IQuestion {
	id: string;
	question: string;
	description: string | null;
	instruction: string | null;
	options: DropdownOption[] | SkillLevel[];
	type: IQuestionType.DROPDOWN | IQuestionType.CHOICE | IQuestionType.TEXT;
	groupCode: string;
	preferredAnswer: string | null;
	submittedAnswer: string | null;
	dependentQuestions: string[] | null;
	isChild: boolean;
}

// Interface for profile questions
interface IProfileQuestion {
	isMandatory: boolean;
	question: IQuestion;
}

// Interface for user profile courses program questions
interface IUserProfileCoursesProgramQuestions {
	id: string;
	code: string;
	name: string;
	profileQuestions: IProfileQuestion[];
}

interface IDropDownData {
	id: string;
	code?: string;
	name: string;
}

interface ISettingForm {
	otp?: number | string;
	alternativeEmail?: string;
	telegramId?: string | number;
	whatsAppEnable?: boolean;
}

enum IQuestionType {
	TEXT = "text",
	CHOICE = "choice",
	DROPDOWN = "dropdown",
}

enum IDropdownYesNo {
	YES = "yes",
	NO = "No",
}

enum IISettingFormInput {
	otp = "otp",
	alternativeEmail = "alternativeEmail",
	telegramId = "telegramId",
}

export {
	type IUserProfileCoursesProgramQuestions,
	type IDropDownData,
	type ICity,
	type IUserInfo,
	type IStateRef,
	type ICountry,
	type ICareer,
	type IEducation,
	type IDreamCompany,
	type IProfileDetails,
	type IWorkExperience,
	type IPasswordHistory,
	type IInterestAreas,
	type INationality,
	type IUserToken,
	type ISkill,
	type IResume,
	type IKeyCloakUser,
	IEditProfileInput,
	IWorkExperienceInput,
	ISearchField,
	SkillLevel,
	IDropdownYesNo,
	IProfileSections,
	DropdownOption,
	type IJObLocation,
	type IDropDownOptions,
	type ISettingForm,
	type IExperience,
	IEducationInput,
	IInterestField,
	IEducationType,
	type IProfileQuestion,
	type IQuestion,
	IISettingFormInput,
	IQuestionType,
};
