import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructor from "../Instructor/Instructor";
import Class from "../Class/Class";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../pages/AddClass/AddClass";
import ManageClass from "../pages/ManageClass/ManageClass";
import MyClasses from "../pages/MyClasses/MyClasses";
import Payment from "../pages/Payment/Payment";
import EnrolledClasses from "../pages/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";

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
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'signup',
            element: <SignUp></SignUp>
        }
        
      ]
      
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'mycart',
          element: <MyCart></MyCart>
        },
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'addClass',
          element: <AddClass></AddClass>

        },
        {
          path: 'manageClass',
          element: <ManageClass></ManageClass>

        },
        {
          path: 'myClasses',
          element: <MyClasses></MyClasses>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'enrolledClass',
          element: <EnrolledClasses></EnrolledClasses>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        }
      ]
    }
  ])