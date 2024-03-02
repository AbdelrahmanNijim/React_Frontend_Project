import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Slider from '../Slider/Slider';

function Categories() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=9');
    setProducts(data.categories);

  };

  useEffect(() => {
    getProducts();
   


  }, []);


  return (
    <>
      
      <div>Categories</div>
    
      {products.map(product=>
      
      <div className='product'key={product.id} >     
        <img src={product.secure_url} />
     
      </div>
            
      )}
    

   

      <Slider products={products}/>

       
    </>
    
  )

   
}

export default Categories