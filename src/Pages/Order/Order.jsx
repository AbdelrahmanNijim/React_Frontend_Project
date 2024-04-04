import React, { useEffect, useState } from 'react'
import { Navigate, useParams, NavLink } from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Puff } from 'react-loader-spinner'
import { TailSpin } from "react-loader-spinner";
import styles from "./Order.module.css"
import { Bounce, Slide, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
function Order() {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);





    const getOrder = async () => {
        const token = localStorage.getItem("userToken");
        try {



            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            setLoading(true);
            setProducts(data.orders);




            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }


    };


    const CancelOrder = async (productId) => {
        const token = localStorage.getItem("userToken");
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/order/cancel/${productId}`,
            {
                
            
             },

                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.message == 'success') {
                toast('Order Canceled!', {
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
        

       
        } catch (error) {
            toast.error({error}, {
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
            console.log(error);

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        getOrder();


    }, []);




    return (
        <>

            <div className='container'>
                <div className='Row'>
                
                    {isLoading ? (
                        <div className='center'>
                            <TailSpin color="red" radius={"20px"} />
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product._id} className='container' >
                                {product.products.map((productItem) => (

                                    <div className={styles.OrdersDetails} key={productItem._id}>
                                        <div className={styles.DetailsStart}>
                                            <img src={productItem.productId.mainImage.secure_url} />
                                            <h2>{productItem.productId.name}</h2>

                                            <div className={styles.Cancel}>


                                                <a onClick={() => CancelOrder(product._id)} disabled={isLoading ? 'disabled' : null}    >    <FontAwesomeIcon icon={faXmark} />   </a>

                                            </div>
                                        </div>
                                        <div className={styles.vl}>   <hr /></div>
                                    </div>




























                                ))}




                            </div>
                        ))


                    )}
                </div>
            </div>




        </>
    )
}

export default Order