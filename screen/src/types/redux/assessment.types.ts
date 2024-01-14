export interface reduxAssessmentTypes {
  examID: string
  createSection:{
    examID: string
    sectionName: string
  }
  createQuestion: {
    examID: string,
    sessionID: string
  }
}