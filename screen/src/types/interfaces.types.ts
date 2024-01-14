import dayjs from "dayjs";

export interface iAnswer {
  id: string,
  data: string
  isCorrect: boolean
}

export interface iExamination {
  id: string
  title: string
  startTime: dayjs.Dayjs | null
  endTime: dayjs.Dayjs | null
  sections: iSection[]
  pending: boolean
}

export type iExaminationActionTyped =
  | { type: "updateId"; value: iExamination['id'] }
  | { type: "updateTitle"; value: iExamination['title'] }
  | { type: "updateStartTime"; value: iExamination['startTime'] }
  | { type: "updateEndTime"; value: iExamination['endTime'] }
  | { type: "updateSection"; value: iSection }
  | { type: "addQuestionToSection"; value: iQuestionData }
  | { type: "addSections"; value: iExamination['sections'] }

export interface iSection {
  id: string,
  name: string,
  questions: iQuestionData[]
}

export interface iQuestionData {
  id: string,
  question: string,
  questionType: string
  answer: iAnswer[]
  answerType: string
}

export interface iSingleQuestionProp {
  questionNumber: number
  sectionID: string,
    question: iQuestionData
}

/*PAGES*/
export interface iAssessmentPage {
  tab: number
  openCreateSectionDialog?: boolean
  title: string
  startTime: dayjs.Dayjs | null
  endTime: dayjs.Dayjs | null
}