import React from 'react'
import Navbar from '../Compo/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer/Footer'

function Root({userName}) {
  return (
    <>
    <Navbar userName={userName}/>
    <br/>

   <div className='container'>
    
    <Outlet />
   
      </div>
      <br/>
      <br/>
      <div className='space'></div>
      <Footer/>
    </>
  )
}

export default Root