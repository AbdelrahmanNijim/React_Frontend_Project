import React from 'react'
import Navbar from '../Compo/Navbar/Navbar'
import Categories from '../Compo/Categories/Categories'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
    <Navbar />
    <Outlet />
      
    </>
  )
}

export default Root