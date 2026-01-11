export interface INoteItem {
	notes?: INoteList[];
}

export interface INoteList {
	__typename?: string;
	id?: string;
	content?: string;
	createdAt?: Date;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	level?: string;
}
