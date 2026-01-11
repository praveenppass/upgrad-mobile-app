export type IFilterState<T extends string> = Record<T, string[]>;

export interface Filter<T extends string> {
	title: string;
	type: T;
	options: IFilterOption[];
}

export interface IFilterOption {
	type: string;
	title: string;
}
