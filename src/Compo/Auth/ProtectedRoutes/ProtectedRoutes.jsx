import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, Slide, toast } from 'react-toastify';

function ProtectedRoutes({children}) {

    const token = localStorage.getItem('userToken');
    if (!token) {
        toast.warn("You Must Login First", {
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
        return <Navigate to='/login' replace />
    
        
    } 
        return children;
}

export default ProtectedRoutes