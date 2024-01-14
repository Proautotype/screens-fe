import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "./App";
import ErrorPage from "./views/ErrorPage";
import Signin from "./views/Signin";
import Student from "./views/Student";
import StudentHome from "./views/Student/Home";
import StudentExam from "./views/Student/Exams/Exam";
import ExamInstructions from "./views/Student/Exams/ExamInstructions";
import CameraInstructions from "./views/Student/Exams/CameraInstructions";
import QuestionBoard from "./views/Question";
import Lecturer from "./views/Lecturer";


export const routerPaths = {
  root: "/",
  signin: "/signin",
  student: {
    root: "/student",
    home: "/student/home",
    exam: "/student/exam",
  },
  exams:{
    instructions:"/exam/instructions",
    camera:"/exam/instructions/camera",
    questions:"/exam/questions",
  },
  lecturer:{
    root: "/lecturer",
  }
}
const routes: RouteObject[] = [
  {
    path: routerPaths.root,
    errorElement: <ErrorPage/>,
    element: <App/>,
  },
  {
    path: routerPaths.signin,
    element: <Signin/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: routerPaths.student.root,
    element: <Student/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: routerPaths.student.home,
        element: <StudentHome/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: routerPaths.student.exam,
        element: <StudentExam/>,
        errorElement: <ErrorPage/>,
      }
    ]
  },
  {
    path: routerPaths.exams.instructions,
    element: <ExamInstructions/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: routerPaths.exams.camera,
    element: <CameraInstructions/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: routerPaths.exams.questions,
    element: <QuestionBoard/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: routerPaths.lecturer.root,
    element: <Lecturer AssessmentID={"3a7f93f0-14b2-4ba3-a5b8-522e2623b562"}/>,
    errorElement: <ErrorPage/>,
  }
]
const routerConfig = createBrowserRouter(routes,{
  basename:"/",
});

export default routerConfig