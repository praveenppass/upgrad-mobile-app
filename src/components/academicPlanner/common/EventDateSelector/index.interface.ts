export enum IRangeSelectionType {
	Day,
	Week,
	Month,
	CustomDates,
}

export interface ICustomDatesModalOnSubmit {
	startDate: string;
	endDate: string;
}

export enum IEventViewType {
	Calendar = "calendar",
	List = "list",
}
