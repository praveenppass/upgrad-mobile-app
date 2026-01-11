import { Asset } from "./assetsProgram.interface";

export interface INoteItem {
	bookmark?: IBookmarkList[];
}

export interface IBookmarkList {
	__typename?: string;
	name?: string;
	code?: string;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	asset?: Asset
}
