import { storage } from "@config/mmkvStorage";

import { RootState } from "@redux/store/root.reducer";
import { store } from "@redux/store/store";

export const getStoreState = () => store.getState() as RootState;

export const getTimezoneFromStore = () => {
	const state = getStoreState();
	return state.personalDetails.timezone;
};

// Save uploaded files persistently
export const UPLOADS_KEY = "VIDEO_UPLOADS";

export const saveUploadedFile = (file: {
	name: string;
	url: string;
	type: string;
}) => {
	const existing = storage.getString(UPLOADS_KEY);
	const files = existing ? JSON.parse(existing) : [];
	files.push(file); // add new file
	storage.set(UPLOADS_KEY, JSON.stringify(files));
};

// Get uploaded files
export const getUploadedFiles = (): {
	name: string;
	url: string;
	type: string;
}[] => {
	const data = storage.getString(UPLOADS_KEY);
	return data ? JSON.parse(data) : [];
};
