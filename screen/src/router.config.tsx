import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "./App";
import ErrorPage from "./views/ErrorPage";
import Signin from "./views/Signin";
import Student from "./views/Student";

export const routerPaths = {
  root: "/",
  signin: "/signin",
  student: "/student"
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
    path: routerPaths.student,
    element: <Student/>,
    errorElement: <ErrorPage/>,
  }
]

const routerConfig = createBrowserRouter(routes,{
  basename:"/",
});

export default routerConfig