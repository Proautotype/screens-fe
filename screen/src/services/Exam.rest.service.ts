import instance from "../config/NetworkManager";

class ExamRestService {
  async getAssessment(examID: string) {
    try {
      return await (await instance({
        url:"getAssessment",
        params:{
          examID
        }
      }))
    }catch (e) {

    }
  }
}

export default ExamRestService