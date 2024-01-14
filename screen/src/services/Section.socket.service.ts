import {Socket} from "socket.io-client";

class SectionSocketService {

  private static socket: Socket

  static setSocket(SectionSocket: Socket) {
    this.socket = SectionSocket;
  }

  static addSection(prop: { examID: string; sectionName: string }) {

    try {
      this.socket.emit("add-exam-section", prop);
    }catch (e: any) {
      alert('error ' + e.message);
    }
  }

}

export default SectionSocketService
