import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructor from "../Instructor/Instructor";
import Class from "../Class/Class";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'instructor',
            element: <Instructor></Instructor>
        },
        {
            path: 'class',
            element: <Class></Class>
        }
      ]
    },
  ])