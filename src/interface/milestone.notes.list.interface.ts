import { Asset } from "./assetsProgram.interface";
import { INoteList } from "./notes.interface";

export interface IMileStoneListType {
	notesForUserProgram?: NotesForUserProgram[];
	notesForUserCourse?: NotesForUserProgram[];
}

export interface NotesForUserProgram {
	code?: string;
	label?: string;
	name?: string;
	level1?: string;
	level2?: string;
	totalNotes?: number;
	asset?: Asset;
	notes?: INoteList[];
	//* reloadItem
	reloadItem?: boolean;
}
