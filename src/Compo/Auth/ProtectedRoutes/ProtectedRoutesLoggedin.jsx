import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, Slide, toast } from 'react-toastify';

function ProtectedRoutesLoggedin({children}) {
  
  
    const token = localStorage.getItem('userToken');
    if (token) {
       
        toast.info("You Are Already Logged in ", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        return <Navigate to='/' replace />
    
        
    } 
  
    return children
}

export default ProtectedRoutesLoggedin