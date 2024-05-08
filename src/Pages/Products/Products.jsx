import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { TailSpin } from "react-loader-spinner";
import styles from './Products.module.css'
function Products() {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getProducts = async () => {
   try{
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
          setProducts(data.products);
          setLoading(true);
          console.log(data);
       


   } catch(error){

    console.log(error);
   }finally{
    setLoading(false);
   }

  };

  useEffect(() => {
    getProducts();
  
  }, []);


  return (
    <>

      <div className={styles.container}>
        <div className={styles.Row}>
          <div className={styles.corseitem}  >
          {isLoading ? (
            <div className='center'>
              <TailSpin color="red" radius={"20px"} />
            </div>
          ) : (
            products.map((product) => (
              
           
              <div className={styles.course} key={product._id}>
             
                   
                <div className={styles.corsecard}>
               
                  <img src={product.mainImage.secure_url} />
         
                  <div className={styles.carddescription}>
                  <Link to={`/products/${product._id}`} >    
                    <h3>{product.name}</h3>
                    </Link>
                  </div>
                  <div className={styles.carddetails}>
                    <span> Price:${product.price}</span>

                  </div>

                  <div className={styles.cardbutt}>
                  <Link to={`/products/${product._id}`} >
                      <span>More Details</span>
                      </Link>

                  </div>

                </div>
               
         
             


              </div>







            ))

         )}
 
          </div>
      
        </div>
      </div>
    </>

  )
}

export default Products