import { useState } from "react";
import "./App.css";
import Root from "./routes/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Categories from "./Pages/Categories/Categories";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import SendCode from "./Pages/ForgotPassword/SendCode";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Products from "./Pages/Products/Products";
import SpecificProduct from "./Pages/Products/SpecificProduct";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Order from "./Pages/Order/Order";
import CategoriesProducts from "./Pages/Categories/CategoriesProducts"
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./Compo/Auth/ProtectedRoutes/ProtectedRoutes";
import ProtectedRoutesLoggedin from "./Compo/Auth/ProtectedRoutes/ProtectedRoutesLoggedin";
import Profile from "./Pages/Profile/Profile";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {

        path: '/',
        element: <Home />,


      },
      {
        path: '/login',
        element:
          <ProtectedRoutesLoggedin>
            <Login />
          </ProtectedRoutesLoggedin>


      },
      {
        path: '/signup',
        element: <Signup />


      },
      {
        path: '/SendCode',
        element: <SendCode />


      },
      {
        path: '/ForgotPassword',
        element: <ForgotPassword />


      },
      {
        path: '/profile',

        element:
         
            <Profile />
   

      },
     
      {
        path: '/products/:id',
        element:

          <SpecificProduct />





      },
      {
        path: '/products',
        element:

          <Products />





      },
      {
        path: '/cart',

        element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>

      },
      {
        path: "/category/:id",
        element: <CategoriesProducts />
      },
      {
        path: '/order',

        element:
         
            <Order />
   

      },

      {
        path: '*',
        element: <NotFound />,
      },

    ]
  },

]);




function App() {


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
