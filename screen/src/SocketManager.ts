import {Manager} from "socket.io-client";

const address = "localhost";
const port = "8085";

const SocketManager = new Manager('ws://'+address+':'+port, {
  autoConnect: false,
  query:{
    room: "a"
  }
})

export const ChatSocket = SocketManager.socket('/chat');
export const NotificationSocket = SocketManager.socket('/notification');
export const ExaminationSocket = SocketManager.socket('/EXAMS-SPACE');
export const SectionSocket = SocketManager.socket('/SECTION-SPACE');
