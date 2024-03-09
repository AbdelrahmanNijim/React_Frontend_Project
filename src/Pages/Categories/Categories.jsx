import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Slider from '../../Compo/Slider/Slider';

function Categories() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`);
    setProducts(data.categories);
    
  };

  useEffect(() => {
    getProducts();
  } , [] );


  return (
    <>
      
      <div>Categories</div>
    
   {/*     {products.map(product=>
      
       <div className='product'key={product._id} >     
        <img src={product.image.secure_url} />
     
      </div>
            
      )}*/}
    

   

      <Slider products={products}/>

       
    </>
    
  )

   
}

export default Categories