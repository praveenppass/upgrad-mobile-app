import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import {
	type IAppNetworkStatus,
	type IHalfBottomSheetType,
} from "@interface/app.interface";
import { BookmarkForUserProgram } from "@interface/bookmark.interface";

interface ModalState {
	logOutModal: boolean | null;
	mileStoneModal: boolean | null;
	streakModal: boolean | null;
	bottomSheetVisible: boolean | null;
	appNetworkStateModal: IAppNetworkStatus;
	bottomSheetOptions?: IHalfBottomSheetType | null;
	freeTrailBottomSheet: boolean | null;
	// courseCategoryBottomSheet: boolean | null;
	showEnrollBottomSheet: boolean | null;
	deleteBookmarkAsset: boolean | null;
	mileStoneNoteBottomSheet: boolean | null;
	editDoubtBottomSheet: boolean | null;
	deleteDoubtBottomSheet: boolean | null;
	discardDoubtBottomSheet: boolean | null;
	accountDeleteSuccessBottomSheet: boolean | null;
	editPersonalDetailsDropDownModal: boolean | null;
	deleteEducationDropDownModal: boolean | null;
	extensionModal: boolean | null;
	workExperienceModal: boolean | null;
	educationModal: boolean | null;
	bottomSheetBackGroundColor: string | null;
	deleteExperienceDropDownModal: boolean | null;

	deleteBookmarkAssetItem: BookmarkForUserProgram | null;
	deleteBookmarkAssetId: string | null;
}

type ModalSliceReducer<Payload> = CaseReducer<
	ModalState,
	PayloadAction<Payload>
>;

const initialState: ModalState = {
	logOutModal: null,
	streakModal: null,
	editPersonalDetailsDropDownModal: null,
	deleteEducationDropDownModal: null,
	extensionModal: null,
	appNetworkStateModal: Object(null),
	bottomSheetVisible: null,
	mileStoneModal: null,
	bottomSheetOptions: null,
	freeTrailBottomSheet: null,
	// courseCategoryBottomSheet: null,
	showEnrollBottomSheet: null,
	mileStoneNoteBottomSheet: null,
	editDoubtBottomSheet: null,
	deleteDoubtBottomSheet: null,
	discardDoubtBottomSheet: null,
	deleteBookmarkAsset: null,
	accountDeleteSuccessBottomSheet: null,
	workExperienceModal: null,
	educationModal: null,
	bottomSheetBackGroundColor: null,
	deleteExperienceDropDownModal: null,
	deleteBookmarkAssetItem: null,
	deleteBookmarkAssetId: null,
};

const showMileStone: ModalSliceReducer<void> = (state) => {
	const newState = { ...state, mileStoneModal: true };
	return newState;
};

const showStreakModal: ModalSliceReducer<void> = (state) => {
	const newState = { ...state, streakModal: true };
	return newState;
};

const showBottomSheet: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		bottomSheetVisible: action?.payload?.bottomSheetVisible !== false,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const showLogOutModal: ModalSliceReducer<void> = (state) => {
	const newState = { ...state, logOutModal: true };
	return newState;
};

const clearBottomSheetOptions: ModalSliceReducer<void> = (state) => {
	const newState = { ...state, bottomSheetOptions: null };
	return newState;
};

const showFreeTrailBottomSheet: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		freeTrailBottomSheet: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

interface IDeleteBookmarkAsset {
	id: string;
	item: BookmarkForUserProgram;
}

const deleteBookmarkAssetBottomSheet: ModalSliceReducer<
	IDeleteBookmarkAsset
> = (state, action) => {
	const newState = {
		...state,
		deleteBookmarkAsset: true,
		deleteBookmarkAssetId: action.payload.id,
		deleteBookmarkAssetItem: action.payload.item,
	};
	return newState;
};

const deleteBookmarkAssetBottomSheetClear: ModalSliceReducer<void> = (
	state,
) => {
	const newState = {
		...state,
		deleteBookmarkAsset: false,
		deleteBookmarkAssetId: null,
		deleteBookmarkAssetItem: null,
	};
	return newState;
};

const showNetworkDownModal: ModalSliceReducer<IAppNetworkStatus> = (
	state,
	action,
) => {
	const newState = {
		...state,
		appNetworkStateModal: action.payload,
	};
	return newState;
};

// const showCourseCategoryModal: ModalSliceReducer<void> = (state) => {
// 	const newState = {
// 		...state,
// 		courseCategoryBottomSheet: true,
// 	};
// 	return newState;
// };

const showEnrollBottomSheetAction: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		showEnrollBottomSheet: true,
	};
	return newState;
};

const showDeleteEducationBottomSheetAction: ModalSliceReducer<
	IHalfBottomSheetType
> = (state, action) => {
	const newState = {
		...state,
		deleteEducationDropDownModal: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const showExtensionBottomSheetAction: ModalSliceReducer<
	IHalfBottomSheetType
> = (state, action) => {
	const newState = {
		...state,
		extensionModal: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const openDeleteExperience: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		deleteExperienceDropDownModal: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const showMileStoneNoteBottomSheet: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		mileStoneNoteBottomSheet: true,
	};
	return newState;
};

const showDeleteDoubtBottomSheet: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		deleteDoubtBottomSheet: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const showDiscardDoubtBottomSheet: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		discardDoubtBottomSheet: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const showEditDoubtBottomSheet: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		editDoubtBottomSheet: true,
	};
	return newState;
};

const hideEditDoubtBottomSheet: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		editDoubtBottomSheet: false,
	};
	return newState;
};

const showEditPersonalDetailsDropDownModal: ModalSliceReducer<void> = (
	state,
) => {
	const newState = {
		...state,
		editPersonalDetailsDropDownModal: true,
	};
	return newState;
};

const showWorkExperienceModal: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		workExperienceModal: true,
	};
	return newState;
};

const showEducationModal: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		educationModal: true,
	};
	return newState;
};

const openAccountDeleteSuccess: ModalSliceReducer<IHalfBottomSheetType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		accountDeleteSuccessBottomSheet: true,
		bottomSheetOptions: action.payload,
	};
	return newState;
};

const setBottomSheetBackGroundColorAction: ModalSliceReducer<string> = (
	state,
	action,
) => {
	const newState = {
		...state,
		bottomSheetBackGroundColor: action.payload,
	};
	return newState;
};
//* keep hide modal in bottom...
const hideModals: ModalSliceReducer<void> = (state) => {
	const newState = {
		...state,
		logOutModal: state.logOutModal === null ? null : false,
		streakModal: state.streakModal === null ? null : false,
		showLogOutModal: state.logOutModal === null ? null : false,
		mileStoneModal: state.mileStoneModal === null ? null : false,
		bottomSheetVisible: state.bottomSheetVisible === null ? null : false,
		freeTrailBottomSheet:
			state.freeTrailBottomSheet === null ? null : false,
		// courseCategoryBottomSheet: state.courseCategoryBottomSheet
		// 	? false
		// 	: null,
		showEnrollBottomSheet:
			state.showEnrollBottomSheet === null ? null : false,
		editPersonalDetailsDropDownModal: state.editPersonalDetailsDropDownModal
			? false
			: null,
		deleteEducationDropDownModal: state.deleteEducationDropDownModal
			? false
			: null,
		extensionModal: state.extensionModal ? false : null,
		// createFilterBottomSheet:
		// 	state.createFilterBottomSheet === null ? null : false,
		mileStoneNoteBottomSheet:
			state.mileStoneNoteBottomSheet === null ? null : false,
		editDoubtBottomSheet:
			state.editDoubtBottomSheet === null ? null : false,
		deleteDoubtBottomSheet:
			state.deleteDoubtBottomSheet === null ? null : false,
		discardDoubtBottomSheet:
			state.discardDoubtBottomSheet === null ? null : false,
		deleteBookmarkAsset: state.deleteBookmarkAsset === null ? null : false,
		accountDeleteSuccessBottomSheet: state.accountDeleteSuccessBottomSheet
			? false
			: null,
		workExperienceModal: state.workExperienceModal === null ? null : false,
		educationModal: state.educationModal === null ? null : false,
		bottomSheetBackGroundColor: null,
		deleteExperienceDropDownModal: state.deleteExperienceDropDownModal
			? false
			: null,
		bottomSheetOptions: null,
	};
	return newState;
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideModals,
		showLogOutModal,
		showStreakModal,
		showBottomSheet,
		showMileStone,
		showNetworkDownModal,
		clearBottomSheetOptions,
		showFreeTrailBottomSheet,
		showEducationModal,
		// showCourseCategoryModal,
		showDiscardDoubtBottomSheet,
		showEnrollBottomSheetAction,
		showMileStoneNoteBottomSheet,
		deleteBookmarkAssetBottomSheet,
		showEditDoubtBottomSheet,
		hideEditDoubtBottomSheet,
		showDeleteDoubtBottomSheet,
		openAccountDeleteSuccess,
		showEditPersonalDetailsDropDownModal,
		showDeleteEducationBottomSheetAction,
		showWorkExperienceModal,
		setBottomSheetBackGroundColorAction,
		openDeleteExperience,
		showExtensionBottomSheetAction,
		deleteBookmarkAssetBottomSheetClear,
	},
});

export { modalSlice };
