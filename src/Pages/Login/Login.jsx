import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner'
import { Link, useNavigate ,NavLink} from 'react-router-dom';
import styles from './Login.module.css'
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({

    email: '',
    password: '',


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
    const LoginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(25).required(),


    });
    try {
      await LoginSchema.validate(user, { abortEarly: false });
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
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
          email: user.email,
          password: user.password,

        });

        setUser({
          email: '',
          password: '',

        });


        if (data.message == 'success') {
          toast.success('Wolcome', {
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
           
        localStorage.setItem('userToken', data.token);
          navigate('/');
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
        <h2>LOGIN</h2>
        <br />

        {errors.length > 0 ? errors.map(error =>
          <div> {error}</div>
        ) : ''}


        <form onSubmit={handelSubmit}>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} name='email' onChange={handelChange} />
            <br />

            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={user.password} name='password' onChange={handelChange} />
            <br />

          </div>
          <br />

          <NavLink className={styles.p}  to='/SendCode' >Forgot the Password ?</NavLink>
          <br />
          <br />
          <button type="submit" className="btn btn-primary"
            disabled={loader ? 'disabled' : null}
          >{!loader ? 'Login' : <Puff
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

export default Login