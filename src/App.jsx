import { useState } from "react";
import "./App.css";
import Root from "./routes/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Categories from "./Compo/Categories/Categories";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import axios from "axios";
import { useEffect } from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {

        path: '/',
        element: <Categories />,


      },
      {
        path: '/login',
        element: <Login />


      },
      {
        path: '/signup',
        element: <Signup />


      },
      {
        path: '/products',
        element: <Products />


      },
      {
        path: '/cart',
        element: <Cart />

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
    </>
  );
}

export default App;
