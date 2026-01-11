interface INotification {
	id: string;
	body: string;
	readOn: Date;
	type: string;
	action: string;
	subject: string;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
	bodyParams: string;
	actionParams: string;
	subjectParams: string;
	ref: INotificationRef;
}

interface INotificationRef {
	type: string;
	ticket: {
		id: string;
	};
	discussion: {
		id: string;
		freshdeskId: string;
		status: INotificationTicketStatus;
	};
}

enum INotificationTicketStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED",
	PENDING = "PENDING",
	RESOLVED = "RESOLVED",
}

export { type INotification, INotificationTicketStatus };
