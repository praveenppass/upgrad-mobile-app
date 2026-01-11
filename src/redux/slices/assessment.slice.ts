import { IAssessment , AssessmentData  } from "@interface/app.interface";
import { createSlice , type CaseReducer , type PayloadAction} from "@reduxjs/toolkit";

const initialData: AssessmentData = {
    data: [],
    errors: [],
}

type AssessmentSliceReducer<Payload> = CaseReducer<AssessmentData , PayloadAction<Payload> >;

const initialState:AssessmentData = initialData;

const savedId : AssessmentSliceReducer<AssessmentData> = (state , action) => {
    state.data = action.payload; 
    state.errors = [];
}

const AssessmentSliceData = createSlice({
    name: "AssessmentSlice",
    initialState,
    reducers: {
        savedId
    }
})

export {AssessmentSliceData }