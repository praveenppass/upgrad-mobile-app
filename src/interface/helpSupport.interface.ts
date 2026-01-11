interface ITicketDetails {
	id: string;
	subject: string;
	category: string;
	createdAt: string;
	qId: string | null;
	description: string;
	createdBy: ITicketUser;
	attachments: [] | null;
	status: HELP_SUPPORT_ENUM;
	userCourse: ICourse | null;
	userProgram: IProgram | null;
}

interface ITicketCourseDetail {
	id: string;
	workshop: string | null;
	deliveryType: {
		id: string;
		name: string;
		type: string;
	};
}

interface IProgram extends ITicketCourseDetail {
	program: {
		id: string;
		name: string;
		workshop: {
			disableRaiseRequest: boolean | null;
		};
	};
}

interface ICourse extends ITicketCourseDetail {
	course: {
		id: string;
		name: string;
	};
}

interface ITicketConversation {
	createdAt: string;
	description: string;
	createdBy: ITicketUser;
	attachments: ITicketAttachment[];
}

interface ITicketAttachment {
	id: number;
	name: string;
	size: number;
	contentType: string;
	content_type: string;
	createdAt: string;
	updatedAt: string;
	attachmentUrl: string;
	attachment_url: string;
}

interface ITicketUser {
	id: string;
	name?: string;
	image?: string;
	userId?: string;
	lastName: string;
	firstName: string;
	freshdeskUserId: string;
}

interface IHelpSupportData {
	data?: ITicketSummaryData;
}

interface ITicketSummaryData {
	ticketSummary?: ITicketSummary;
}

interface ITicketSummary {
	open?: number;
	closed?: number;
}

enum HELP_SUPPORT_ENUM {
	open = "Open",
	closed = "Closed",
}
enum HELP_AND_SUPPORT_DETAILS {
	open_ticket = "open_ticket",
	closed_ticket = "closed_ticket",
}
enum HELP_AND_SUPPORT_PAGE_LOADED {
	HELP_SUPPORT_LOADED = "HELP_SUPPORT_LOADED",
}
enum HELP_SUPPORT_EVENT {
	HELP_SUPPORT_EVENT = "help_and_support",
}

interface ITicketCard {
	data?: ITicketData;
}

interface ITicketData {
	tickets?: ITicket[];
}

interface ITicket {
	id: string;
	subject?: string;
	description?: string;
	description_text?: null;
	category: Category;
	status?: Status;
	priority?: Priority;
	attachments?: IAttachment[] | null;
	workshopID?: null;
	userID?: null;
	tags?: Tag[];
	zendeskTicketID?: null;
	freshdeskInfo?: IFreshdeskInfo;
	createdAt?: Date;
	updatedAt?: Date;
	userCourse: ICourse | null;
	userProgram: IProgram | null;
}

interface IAttachment {
	name?: string;
	key?: string;
	size?: number;
	contentType?: string;
	mimetype?: string;
	fileUrl?: string;
}

enum Category {
	LearningAssetIssue = "Learning Asset Issue",
}

interface IFreshdeskInfo {
	id?: string;
}

enum Priority {
	Low = "LOW",
}

enum Status {
	Open = "OPEN",
}

enum Tag {
	PrismDevelopmentTeam = "prism_development_team",
	Test = "test",
}

interface ICreateTicketData {
	data?: Data;
}

interface Data {
	subject?: string;
	category?: string;
	description?: string;
	attachments?: IAttachment[];
	userCourse?: ICourse;
	userProgram?: IProgram;
}

interface IFileUploadResType {
	ETag?: string;
	ServerSideEncryption?: string;
	Location?: string;
	key?: string;
	Key?: string;
	Bucket?: string;
	location?: string;
	link?: string;
	originalname?: string;
	fieldName?: string;
	contentType?: string;
	mimetype?: string;
	size?: number;
	encoding?: string;
	ACL?: string;
}

export {
	type ITicketDetails,
	type ITicketConversation,
	type IHelpSupportData,
	type IFreshdeskInfo,
	type IAttachment,
	Tag,
	Category,
	Priority,
	Status,
	HELP_SUPPORT_ENUM,
	HELP_AND_SUPPORT_DETAILS,
	HELP_AND_SUPPORT_PAGE_LOADED,
	HELP_SUPPORT_EVENT,
	type ITicketSummaryData,
	type ITicketCard,
	type ITicketData,
	type ITicket,
	type ITicketSummary,
	type ICreateTicketData,
	type IFileUploadResType,
};
