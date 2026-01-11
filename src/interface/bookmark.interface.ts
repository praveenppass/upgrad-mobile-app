import { Asset } from "./assetsProgram.interface";

export interface IBookmarkType {
	bookmarksForUserProgram?: BookmarkForUserProgram[];
	bookmarksForUserCourse?: BookmarkForUserProgram[];
}

export interface BookmarkForUserProgram {
	code?: string;
	label?: string;
	name?: string;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	totalBookmarks?: number;
	asset?: Asset;
	reloadItem?: boolean;
}
