import instance from "../config/NetworkManager";
import {iCreateQuestion} from "../views/Lecturer";

class SectionRestService {
  EXAM_ID: string = "";

  setID(EXAM_ID: string) {
    this.EXAM_ID = EXAM_ID;
  }

  async getAssessment(examID: string) {
    try {
      return await await instance({
        url: "getAssessment",
        method: "GET",
        params: {
          examID
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllSections(examID: string) {
    try {
      return await await instance({
        url: "getAllSections",
        method: "GET",
        params: {
          examID
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createSection(examID: string, name: string) {
    try {
      return (await (await instance({
        method: "POST",
        url: "createSection",
        data: {
          examID,
          sectionName: name
        }
      })))
    } catch (e) {
      console.log(e)
    }
  }

  deleteSection(name: string) {
  }

  async createQuestion(data: iCreateQuestion) {
    const outData: any = data;
    outData.questionType = data.questionType ? "OBJECTIVES" : "WRITTEN";
    outData.answerType = data.answerType ? "SINGLE" : "MULTIPLE";
    try {
      return ((await instance({
        method: "POST",
        url: "createQuestion",
        data: {
          ...outData
        }
      })))
    } catch (e) {
      console.log(e)
    }
  }

  async deleteQuestion(questionID: string){
    try {
      return (await instance({
        method:"DELETE",
        url:"deleteQuestion",
        params:{
          questionID
        }
      }))
    }catch (e) {

    }
  }

  async getAllQuestions(examID: string, sectionID: string) {
    try {
      return ((await instance({
        method: "POST",
        url: "createQuestion",
        data: {
          examID,
          sectionID: sectionID
        }
      })));
    } catch (e) {
      console.log(e)
    }
  }
}

export default SectionRestService