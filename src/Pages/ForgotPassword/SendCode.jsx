import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

function SendCode() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
  
      email: '',
      
  
  
    });
  
    const [errors, setErrors] = useState([]);
    const [loader, setLoder] = useState(false);
  
    const handelChange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value
      });
    };
  
  
    const validateData = async () => {
      const sendcodeSchema = object({
        email: string().email().required(),
  
      });
      try {
        await sendcodeSchema.validate(user, { abortEarly: false });
        return true;
      } catch (error) {
        console.log("validation error", error.errors);
        setErrors(error.errors);
        setLoder(false);
        return false;
      }
  
    };
  
    const handelSubmit = async (e) => {
      e.preventDefault();
      setLoder(true);
      const validate = await validateData(user);
  
      if (await validateData(user)) {
        try {
          const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, {
            email: user.email,
          });
  
          setUser({
            email: '',
          });
  
      
  
          if (data.message == 'success') {
            toast.success('Check Your Email', {
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
  
            navigate('/ForgotPassword');
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
          setLoder(false);
        }
  
      }
  
    }
  
  
  
  
  
  
    return (
      <>
        <div className='container'>
          <br />
          <br />
          <h2>Forgot the Password ?</h2>
          <br />
  
          {errors.length > 0 ? errors.map(error =>
            <div> {error}</div>
          ) : ''}
  
  
          <form onSubmit={handelSubmit}>
  
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Put Your Email Address To Get The Authentication Code</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} name='email' onChange={handelChange} />
              <br />
  
            </div>
            <br />
  
            
  
            <button type="submit" className="btn btn-primary"
              disabled={loader ? 'disabled' : null}
            >{!loader ? 'Send Code' : <Puff
              visible={true}
              height="40"
              width="40"
              color="#eee"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />}</button>
          </form>
        </div>
  
      </>
  
  
  
  
  
    )
  }

export default SendCode