import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner";
import { Puff } from 'react-loader-spinner';
import ReactDOM from 'react-dom';
import { Bounce, Slide, toast } from 'react-toastify';
import styles from './Products.module.css';
import ReactStars from 'react-rating-star-with-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { date } from 'yup';
import { object, string } from 'yup';
import Rating from '@mui/material/Rating';
function SpecificProduct() {

  const { id } = useParams('id');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const controller = new AbortController();
  const [rating, setRating] = useState([]);
  const [errors, setErrors] = useState([]);


  const [user, setUser] = useState({
    comment: '',
    rating: '',


  });


  const getProducts = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      console.log(response.data);

      setProducts([response.data.product]);
      setRate(response.data.avgRating);

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


        if (data.data.message == 'success') {
          toast.success('Item Added To The Cart', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }

        console.log(data);


      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
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

  /***************************************************************************************** */

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,


    });
  };





  const validateData = async () => {
    const RateSchema = object({

      comment: string().required(),
      rating: string().min(1).max(5).required(),


    });
    try {
      await RateSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("validation error", error.errors);
      setErrors(error.errors);
      setLoading(false);
      return false;
    }

  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validate = await validateData(user);
    const token = localStorage.getItem("userToken");
    if (await validateData(user)) {

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${id}/review`, {
          comment: user.comment,
          rating: user.rating,

        }, {
          headers: {
            Authorization: `Tariq__${token}`
          }

        });
        setUser({
          comment: '',
          rating: '',
        });
        console.log(data);

        if (data.message == 'success') {
          toast.success('Thank You for Your Review', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

        }


      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });



      } finally {
        setLoading(false);
      }

    }
    console.log(date);

  }





  /*********************************************************************************************** */


  return (
    <>



      <div className={styles.contanier}>
        <br />
        <div><span>If you did not login it will send you to the  log in page when you press on add to cart</span></div>

        {isLoading ? (
          <div className="center">
            <TailSpin color="red" radius={"20px"} />
          </div>
        ) : (
          products.map((product) => (
            <>
              <div className={styles.productCard} key={product._id}>
                <div className={styles.Product}>
                  <div className={styles.productStart}>
                    <img src={product.mainImage.secure_url} alt={product.name} />
                  </div>

                  <div className={styles.vl}></div>

                  <div className={styles.Productdetails}>

                    <div className={styles.Details}>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className={styles.Mid}>
                      <div className={styles.price}> <span>Price: ${product.price} </span>  </div>

                      <div className={styles.avgRating}>

                        <ReactStars
                          value={rate}
                          edit={false}
                          activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]}
                        />
                      </div>

                      <div className={styles.Comment}>

                        <a href="#Comment">
                          Leave Your review <FontAwesomeIcon icon={faComment} />
                        </a>











                      </div>










                    </div>



                    <div className={styles.cartbutt}>

                      <a onClick={() => addToCart(product._id)} disabled={isLoading ? 'disabled' : null}
                      >{!isLoading ? 'Add To cart' : <Puff
                        visible={true}
                        height="40"
                        width="40"
                        color="#eee"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />}    <span></span> </a>



                    </div>

                  </div>
                </div>

              </div>

            </>



          ))
        )}


        <form onSubmit={handelSubmit} id='Comment'>
          <div className={styles.Form}>


            <div className={styles.row} >
              <div className={styles.midForm}>
                <div className="modal-body">
                  <div className="form-group">

                    <div className={styles.formRow}>
                      <label htmlFor="exampleInputEmail1">Comment</label>
                      <input type="text" className="form-control" id="formGroupExampleInput2" value={user.comment} placeholder="  Comment Here " name='comment' onChange={handelChange} />
                      <br />
                    </div>
                    <div className={styles.formRow}>
                      <label htmlFor="exampleInputPassword1">Rating</label>
                      <Rating
                        name="simple-controlled"
                        value={user.rating}
                        onChange={(event, newValue) => handelChange({ target: { name: 'rating', value: newValue } })}
                      />
                      <br />
                    </div>
                  </div>
                  <br />



                </div>


              </div>



              <button type="submit" className="btn btn-primary" disabled={isLoading ? 'disabled' : null}
              >{!isLoading ? 'Submit Review' : <Puff
                visible={true}
                height="40"
                width="40"
                color="#eee"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />}  </button>



            </div>
          </div>
        </form>
      </div>


    </>

  )
}


export default SpecificProduct