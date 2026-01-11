export enum IEventFilterType {
	STATUS = "status",
	TASK = "task",
	PROGRAM = "program",
}

export type IEventFilterState = Record<IEventFilterType, string[]>;
