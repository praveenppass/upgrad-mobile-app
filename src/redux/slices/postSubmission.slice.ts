import { IPostType, PostData } from "@interface/app.interface";
import {
    createSlice ,
    type CaseReducer,
    type PayloadAction,
} from "@reduxjs/toolkit";

const initialData: PostData = {
    data: [],
    errors: [],
}

type PostDataSliceReducer<Payload> = CaseReducer<PostData , PayloadAction<Payload> >;

const initialState:PostData  = initialData;

const savedData: PostDataSliceReducer<PostData> = (state , action) => {
    state.data = action.payload;
    state.errors = [];
} 

const postSubmissionSlice = createSlice({
    name: "postSubmission",
    initialState,
    reducers: {     
        savedData ,
    }
})

export { postSubmissionSlice}