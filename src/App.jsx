import { useState } from "react";
import "./App.css";
import Root from "./routes/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Categories from "./Pages/Categories/Categories";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./Compo/Auth/ProtectedRoutes/ProtectedRoutes";
import ProtectedRoutesLoggedin from "./Compo/Auth/ProtectedRoutes/ProtectedRoutesLoggedin";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root  />,

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
        path: '/products/:id',
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
        path: "/categories",
        element: <Categories />
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
