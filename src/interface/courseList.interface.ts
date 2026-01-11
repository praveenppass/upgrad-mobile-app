export interface IUserCourseList {
	allLearnerCourses?: IAllLearnerCourse[];
}

interface IAllLearnerCourse {
	__typename?: string;
	course?: IUserCourseListItem;
	id?: string;
	program?: IUserCourseListItem;
	deliveryType?: DeliveryType;
}

export interface DeliveryType {
	id?: string;
	name?: string;
}

interface IUserCourseListItem {
	__typename?: string;
	code?: string;
	name?: string;
}

export interface IAllTicketCategoryList {
	allTicketCategories?: AllTicketCategory[];
}

interface AllTicketCategory {
	__typename?: Typename;
	id?: string;
	name?: string;
}

enum Typename {
	TicketCategory = "TicketCategory",
}
