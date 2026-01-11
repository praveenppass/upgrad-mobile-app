import { type ICourseVariantEnum } from "@interface/app.interface";
import {
	Asset,
	IDrawerContainer,
	type IUserProgramContainer,
} from "@interface/milestonetype.interface";
import { IResumeAssetLxp } from "@interface/types/nextAssetlxp.interface";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";

interface ISelectedCourseType {
	selectedCourseID?: string;
	courseVariant?: ICourseVariantEnum;
	selectedMilestone?: IUserProgramContainer | null;
	selectedWeek?: IUserProgramContainer | null;
	selectedCourseDetails?: unknown | null;
	selectedAsset?: Asset;
	///* Toggle triggerReload value to state reload of Any API (For Study Flow Only)
	triggerReload?: boolean;
	courseDetailTemp?: unknown | null;
	isResume?: boolean;
	isMilestoneResume?: boolean;
	courseCategory?: string;
	continueAsset?: IResumeAssetLxp | null;
}

interface StudyPlanState {
	moduleName: string;
	topicName: string;
	moduleCode?: string;
	isClearModal: boolean;
	milestoneList?: IUserProgramContainer[];
	selectedCourseID: string | null;
	courseVariant: ICourseVariantEnum | null;
	selectedMilestone: IUserProgramContainer | null;
	selectedWeek?: IUserProgramContainer | null;
	selectedCourseDetails?: unknown | null;
	selectedAsset: Asset | null;
	///* Toggle triggerReload value to state reload of Any API (For Study Flow Only)
	triggerReload: boolean;
	courseDetailTemp?: unknown | null;
	isResume: boolean;
	isMilestoneResume: boolean;
	courseCategory: string | null;
	continueAsset?: IResumeAssetLxp | null;
	selectedDrawerModules?: IDrawerContainer | null;
}

type StudyPlanSliceReducer<Payload> = CaseReducer<
	StudyPlanState,
	PayloadAction<Payload>
>;

const INITIAL_DATA: StudyPlanState = {
	moduleName: "NA",
	topicName: "NA",
	milestoneList: [],
	isClearModal: false,
	moduleCode: undefined,
	selectedCourseID: null,
	courseVariant: null,
	selectedMilestone: null,
	selectedWeek: null,
	selectedCourseDetails: null,
	selectedAsset: null,
	triggerReload: false,
	courseDetailTemp: null,
	isResume: false,
	isMilestoneResume: false,
	courseCategory: null,
	continueAsset: null,
	selectedDrawerModules: null,
};

const initialState: StudyPlanState = INITIAL_DATA;

const selectedCourseDetailsAction: StudyPlanSliceReducer<
	ISelectedCourseType
> = (state, action) => {
	const newState = {
		...state,
		...action.payload,
	};
	return newState;
};

const selectedCourseDetailsTemp: StudyPlanSliceReducer<ISelectedCourseType> = (
	state,
	action,
) => {
	const newState = {
		...state,
		courseDetailTemp: action.payload,
	};
	return newState;
};

const setMileStoneList: StudyPlanSliceReducer<
	IUserProgramContainer[] | undefined
> = (state, action) => {
	const newState = {
		...state,
		milestoneList: action.payload,
	};
	return newState;
};

const onClearModalState: StudyPlanSliceReducer<boolean> = (state, action) => {
	const newState = {
		...state,
		isClearModal: action.payload,
	};
	return newState;
};

const setModuleCode: StudyPlanSliceReducer<{ code: string; name: string }> = (
	state,
	action,
) => {
	const newState = {
		...state,
		moduleCode: action.payload.code,
		moduleName: action.payload.name,
	};
	return newState;
};

const setModuleTopic: StudyPlanSliceReducer<{
	topicName: string;
	moduleName: string;
}> = (state, action) => {
	const newState = {
		...state,
		topicName: action.payload.topicName,
		moduleName: action.payload.moduleName,
	};
	return newState;
};

const setModuleName: StudyPlanSliceReducer<string> = (state, action) => {
	const newState = {
		...state,
		moduleName: action.payload,
	};
	return newState;
};

const setTopicName: StudyPlanSliceReducer<string> = (state, action) => {
	const newState = {
		...state,
		topicName: action.payload,
	};
	return newState;
};

const selectMilestoneWeek: StudyPlanSliceReducer<
	IUserProgramContainer | null
> = (state, action) => {
	const newState = {
		...state,
		selectedWeek: action.payload,
	};
	return newState;
};

const resumeAsset: StudyPlanSliceReducer<IResumeAssetLxp | null> = (
	state,
	action,
) => {
	const newState = {
		...state,
		continueAsset: action.payload,
	};
	return newState;
};

const removeSelectMilestoneWeek: StudyPlanSliceReducer<void> = (state) => {
	const newState = {
		...state,
		selectedWeek: null,
	};
	return newState;
};

const selectMilestone: StudyPlanSliceReducer<IUserProgramContainer | null> = (
	state,
	action,
) => {
	const newState = {
		...state,
		selectedMilestone: action.payload,
	};
	return newState;
};

const restStudyState: StudyPlanSliceReducer<void> = () => INITIAL_DATA;

//* Select Asset
const selectAsset: StudyPlanSliceReducer<Asset | null> = (state, action) => {
	const newState = {
		...state,
		isResume: true,
		selectedAsset: action.payload,
	};
	return newState;
};

// Selected drawer module
const selectedDrawerModules: StudyPlanSliceReducer<
	// IUserProgramContainer | null
	IDrawerContainer | null
> = (state, action) => {
	const newState = {
		...state,
		selectedDrawerModules: action.payload,
	};
	return newState;
};
const studyPlanSlice = createSlice({
	name: "studyplan",
	initialState,
	reducers: {
		setModuleName,
		setModuleTopic,
		setTopicName,
		setModuleCode,
		selectMilestone,
		setMileStoneList,
		restStudyState,
		selectMilestoneWeek,
		selectAsset,
		selectedCourseDetailsAction,
		selectedCourseDetailsTemp,
		removeSelectMilestoneWeek,
		onClearModalState,
		resumeAsset,
		selectedDrawerModules,
	},
});

export { studyPlanSlice };
