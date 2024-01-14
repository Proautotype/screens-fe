import {createAsyncThunk} from "@reduxjs/toolkit";
import {reduxAssessmentTypes} from "../../types/redux/assessment.types";
import SectionRestService from "../../services/Section.rest.service";
import {iExamination, iQuestionData, iSection} from "../../types/interfaces.types";
import ExamRestService from "../../services/Exam.rest.service";
import {iCreateQuestion} from "../../views/Lecturer";

let sectionService: SectionRestService = new SectionRestService();
let examRestService: ExamRestService = new ExamRestService();

export const getAssessmentThunk
    = createAsyncThunk("assessment/getAssessment", (arg: reduxAssessmentTypes['examID']) => {
    return examRestService.getAssessment(arg).then((res) => {
        console.log(res?.data)
        return res?.data as iExamination
    });
});

export const getAllSections
    = createAsyncThunk("assessment/getAllSections", (arg: reduxAssessmentTypes['examID']) => {
    sectionService.getAllSections(arg).then((res) => {
        if (res && res.status === 200) {
            return res.data.body as iSection[];
        }
    });
});

export const createSectionThunk
    = createAsyncThunk("assessment/createSection", (arg: reduxAssessmentTypes['createSection']) => {
    return sectionService.createSection(arg.examID, arg.sectionName).then((res) => {
        console.log(res);
        if (res && res.status === 200) {
            return res.data.body as iSection
        }
    })
})

interface icreateQuestion {
    data: iCreateQuestion,
    sectionID: string
}

export const createQuestionThunk
    = createAsyncThunk("assessment/createQuestion",
    async (arg: icreateQuestion) => {
        return sectionService.createQuestion(arg.data).then((res) => {
            // console.log(res)
            if (res && res.status === 200) {
                return res.data as { body: iQuestionData, sectionID: string };
            }
        })
    })

export const deleteQuestionThunk
    = createAsyncThunk("assessment/deleteQuestion", (arg:string, thunkAPI)=>{
    return sectionService.deleteQuestion(arg).then((res) => {
        // console.log(res)
        if (res && res.status === 200) {
            return res.data;
        }
    })
})

