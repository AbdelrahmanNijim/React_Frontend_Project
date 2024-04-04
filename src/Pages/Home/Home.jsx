import React from 'react'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'
import styled from 'styled-components';

function Home() {
  const StyledBody = styled.body`
  background-color: ##f1f1f3b3; 
`;
  return (
  <>
   
  <div className='container'>
   
    <br/>
     <h1>Only Cart is Protected </h1>
     <br />
  
    <Categories/>
    <br />
    
    <Products/>
    </div>
  
  </>
    
  )
}

export default Home