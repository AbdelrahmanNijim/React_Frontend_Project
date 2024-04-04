import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { object, string } from 'yup';
import { Puff } from 'react-loader-spinner'
import { TailSpin } from "react-loader-spinner";
import styles from './Cart.module.css'
import { Bounce, Slide, toast } from 'react-toastify';

function Cart() {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();




  const getProducts = async () => {
    const token = localStorage.getItem("userToken");
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setLoading(true);
      setProducts(data.products);




      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


  };
  useEffect(() => {

    getProducts();




  }, []);

  const increase = async (productId) => {

    setLoading(true);
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

      console.log(data);


    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false);
    }


  };

  const decrease = async (productId) => {
    setLoading(true);
    const token = localStorage.getItem("userToken");

    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });


      console.log(data);

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false);
    }




  };

  const clearItems = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });


      setLoading(true);
      if (data.data.message == 'success') {
        toast('Cart Cleard!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      console.log(data);

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false);
    }





  };



  const RemoveItems = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });


      setLoading(true);
      if (data.data.message == 'success') {
        toast('Item Removed!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      console.log(data);

    } catch (error) {
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
      console.log(error)

    } finally {
      setLoading(false);
    }





  };




  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.details.price * product.quantity;
    });
    return totalPrice;
  };

  





  /* Orderrrrrrr */

  /**************************************** */






  const [user, setUser] = useState({
    couponName: '',
    address: '',
    phone: '',

  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };


  const validateData = async () => {
    const OrderSchema = object({
      couponName: string(),
      address: string().min(4).max(25).required(),
      phone: string().min(10).max(14).required(),

    });
    try {
      await OrderSchema.validate(user, { abortEarly: false });
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
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
          couponName: user.couponName,
          address: user.address,
          phone: user.phone,

        }, {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });

        setUser({
          couponName: '',
          address: '',
          phone: '',
        });

        console.log(data);
        if (data.message == 'success') {
          toast.success('Order Made', {
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


          navigate('/order');
        }

      } catch (error) {
        console.log(error);
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

  }


  /*************************************** */






  return (
    <>  
    


      <div className='container'>
        <div className='Row'>


          <div className={styles.vl}>   <hr /></div>

          <div className={styles.ClearCartBtn}>
            <button onClick={() => clearItems(products.productId)} className='btn btn-outline-danger' disabled={isLoading ? 'disabled' : null}
            >{!isLoading ? 'Clear Cart' : <Puff
              visible={true}
              height="40"
              width="40"
              color="#eee"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />}</button>
          </div>

          {isLoading ? (
            <div className='center'>
              <TailSpin color="red" radius={"20px"} />
            </div>
          ) : (
            products.map((product) => (





              <div className={styles.Cartproducts} key={product._id}>










                <div className={styles.ProductsDetial}>

                  <img src={product.details.mainImage.secure_url} alt={product.details.name} />
                  <h2>{product.details.name}</h2>

                  <div className={styles.vline} onClick={() => RemoveItems(product.details._id)} disabled={isLoading ? 'disabled' : null}  ><span>Remove Item</span></div>


                </div>

                <div className={styles.productsInDeQU}>

                  <div className={styles.LabelCont} >
                    <label>price</label>
                    <span className={styles.Price}>${product.details.price * product.quantity}</span>
                  </div>



                  <div className={styles.LabelCont}>
                    <label>increase</label>
                    <a className={styles.cartproductbutton} onClick={() => increase(product.details._id)} disabled={isLoading ? 'disabled' : null}>+</a>

                  </div>



                  <div className={styles.LabelCont}>
                    <label>quantity</label>
                    <span className={styles.cartproductbutton}  > {product.quantity}</span>  </div>



                  <div className={styles.LabelCont}>
                    <label>decrease</label>
                    <a className={styles.cartproductbutton} onClick={(e) => {
                      if (product.quantity === 0 || isLoading) {
                        e.preventDefault();
                      } else {
                        decrease(product.productId);
                      }
                    }}>-</a>

                  </div>


                </div>

                <div className={styles.vl}>   <hr /></div>


              </div>


            ))

          )}







        </div>

        <form onSubmit={handelSubmit}>
          <div className={styles.Form}>


            <div className={styles.row} >


              <div className={styles.midForm}>
                <div className={styles.Financial}>
                  <div className={styles.total}>
                    <label>Total Price : </label>
                    <span >  ${calculateTotalPrice()}</span>

                  </div>




                </div>
                
                <div className={styles.formRow}>
                  <label >  couponName  </label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="couponName" value={user.couponName} name='couponName' onChange={handelChange} />
                </div>

                <div className={styles.formRow}>
                  <label >  address  </label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Address is required & 4 characters at least    " value={user.address} name='address' onChange={handelChange} />
                </div>

                <div className={styles.formRow}>
                  <label >  phone  </label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Phone is required & must be 10 Numbers  " value={user.phone} name='phone' onChange={handelChange} />
                </div>
              </div>


              <button type="submit" className="btn btn-primary"> ORDER </button>
            </div>

          </div>

        </form>






      </div>

    </>


  )
}

export default Cart