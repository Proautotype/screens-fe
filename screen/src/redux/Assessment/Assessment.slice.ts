import {iExamination} from "../../types/interfaces.types";
import {createSlice} from "@reduxjs/toolkit";
import SliceNomes from "../Nomes";
import {createQuestionThunk, createSectionThunk, deleteQuestionThunk, getAssessmentThunk} from "./Assessment.thunk";

const initialState: iExamination = {
    id: "6a7ac861-c227-4744-9e9c-b08b809f7528",
    title: "",
    startTime: null,
    endTime: null,
    sections: [],
    pending: false
}

const AssessmentSlice = createSlice({
    name: SliceNomes.assessmentSlice,
    initialState,
    reducers: {
        add() {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssessmentThunk.fulfilled, (state, {payload}) => {
                state.pending = false;
                if (payload) {
                    state.id = payload.id;
                    state.title = payload.title;
                    state.startTime = payload.startTime;
                    state.endTime = payload.endTime;
                    state.sections = [...payload.sections];
                }
            })
            .addCase(createQuestionThunk.fulfilled, (state, action)=>{
              state.pending = false;
              const payL = action.payload;
                if(payL){
                    console.log(payL)
                    const currentSection = state.sections.findIndex((aSection)=> aSection.id === payL.sectionID)
                    if(currentSection !== -1){
                        state.sections[currentSection].questions = [...state.sections[currentSection].questions, payL.body];
                    }
                }
            })
            .addCase(createQuestionThunk.pending, (state, action)=>{
                state.pending = true;
            })
            .addCase(deleteQuestionThunk.fulfilled, (state, action)=>{
                state.pending = false;

            })
            .addCase(deleteQuestionThunk.pending, (state, action)=>{
                state.pending = true;
            })
            .addCase(getAssessmentThunk.pending, (state, action) => {
                state.pending = true;
            })
            .addCase(createSectionThunk.fulfilled, (state, action)=>{
              state.pending = false;
              if(action.payload)
                state.sections = [...state.sections, action.payload]
            })
            .addCase(createSectionThunk.pending, (state, action)=>{
              state.pending = true;
            })
    }
})

export const {add} = AssessmentSlice.actions;
export default AssessmentSlice.reducer;