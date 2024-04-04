import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Bounce, Slide, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner'
import { TailSpin } from "react-loader-spinner";
import styles from "./CategoriesProduct.module.css"
import ReactStars from 'react-rating-star-with-type'
function CategoriesProducts() {
  const navigate = useNavigate();
  const { id } = useParams('id');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const controller = new AbortController();

  const getProducts = async () => {
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
      console.log(data);
      setProducts(data.products);
      setLoading(true);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }


  };
  useEffect(() => {

    getProducts();


  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
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

      navigate("/login");

    } else {
      try {
        const data = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
          productId
        }, {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
        console.log(data);
        setLoading(true);
        if (data.data.message == 'success') {
          toast.success('Item Add to the Cart!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
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

      } finally {
        setLoading(false);
      }

    }

  };





  return (
    <>

      <div><span>If you did not login it will send you to the  log in page when you press on add to cart</span></div>


      {isLoading ? (
        <div className='center'>
          <TailSpin color="red" radius={"20px"} />
        </div>
      ) : (
        products.map((product) => (

          <div className={styles.Products} key={product._id}>

            <div className={styles.CardS}>
              <div className={styles.cardStart}>
                <div className={styles.Image}>
                  <img src={product.mainImage.secure_url}></img>
                </div>
                <div className={styles.Rate}> <span> <ReactStars
                  value={product.avgRating}
                  edit={false}
                  activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]}
                /></span></div>

              </div>

              <div className={styles.Cardend}>
                <div className={styles.details}>
                  <h2 className={styles.Titel}>{product.name}</h2>

                  <h5>{product.description} </h5>

                </div>


                <div className={styles.BTN} >
                  <a  className={styles.AddtoCar} onClick={() => addToCart(product._id)} disabled={isLoading ? 'disabled' : null}
                  >{!isLoading ? 'Add To cart' : <Puff
                    visible={true}
                    height="40"
                    width="40"
                    color="#eee"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />}
                  </a>

                </div>
              </div>

            </div>



          </div>














        ))

      )}


    </>

  )
}

export default CategoriesProducts