import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import  { useEffect } from 'react'


function Products() {

    const {id}= useParams();
    
    return (
       <>


      <div>Products {id}</div>
  
  
    </>

  )
}

export default Products