import {Socket} from "socket.io-client";
import dayjs from "dayjs";

class ExamSocketService {
  static instance: ExamSocketService | null = null;
  private static LECTURERID = "8b6e23ad-e393-4770-8515-55e1fc043b6b";
  private static socket: Socket

  constructor() {
    if (ExamSocketService.instance === null) {
      ExamSocketService.instance = this;
    }
  }

  static setSocket = (socket: Socket) => {
    this.socket = socket;
  }
  static GetLecturerID = () => this.LECTURERID;

  static CreateExam = (prop: { title: string, ownerId: string,  startTime: dayjs.Dayjs | null, endTime: dayjs.Dayjs | null }) => {
    console.log(this.socket)
    if (this.socket !== null){
      this.socket.emit("create-exam", prop);
    }else{
      throw new Error("");
    }
  }

  static UpdateTitle = (prop: {examID: string, title: string}) => {
    try {
      this.socket.emit("update-exam-title", prop);
    }catch (e: any) {
      alert('error ' + e.message);
    }
  }

  static UpdateStartDate = (prop: { examID: string, date: dayjs.Dayjs | null}) => {
    try {
      this.socket.emit("update-exam-start-time", {...prop, moment: 0});
    }catch (e: any) {
      console.dir(e)
      alert('error ' + e.message);
    }

  }

  static UpdateEndDate = (prop: { examID: string, date: dayjs.Dayjs | null}) => {
    try {
      this.socket.emit("update-exam-end-time", {...prop, moment: 1});
    }catch (e: any) {
      alert('error ' + e.message);
    }
  }

}

export default ExamSocketService