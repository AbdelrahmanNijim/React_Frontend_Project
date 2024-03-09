import React from 'react'
import Navbar from '../Compo/Navbar/Navbar'
import Categories from '../Pages/Categories/Categories'
import { Outlet } from 'react-router-dom'

function Root({userName}) {
  return (
    <>
    <Navbar userName={userName}/>
    <Outlet />
      
    </>
  )
}

export default Root