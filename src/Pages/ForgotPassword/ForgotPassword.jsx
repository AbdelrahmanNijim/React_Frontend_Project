import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import styles from './Forgot.module.css'

function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({

    email: '',
    password: '',
    code: ''


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
    const ForgotPasswordSchema = object({
      email: string().email().required(),
      password: string().min(8).max(25).required(),
      code: string().required()

    });
    try {
      await ForgotPasswordSchema.validate(user, { abortEarly: false });
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
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, {
          email: user.email,
          password: user.password,
          code: user.code

        });

        setUser({
          email: '',
          password: '',
          code: ''

        });


        localStorage.setItem('userToken', data.token);
        if (data.message == 'success') {
          toast.success('Wolcome Back يا اسطورة', {
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
        <h2>Reset The Password</h2>
        <br />

        {errors.length > 0 ? errors.map(error =>
          <div> {error}</div>
        ) : ''}


        <form onSubmit={handelSubmit}>
          <div className={styles.Form}>
            <div className={styles.row} >


              <div className={styles.midForm}>
                <div className="form-group">
                  <div className={styles.formRow}>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} name='email' onChange={handelChange} />
                    <br />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={user.password} name='password' onChange={handelChange} />
                    <br />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="formGroupExampleInput">Code</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter The code" value={user.code} name='code' onChange={handelChange} />
                  </div>
                  <br />


                </div>
              </div>
              <br />




              <button type="submit" className="btn btn-primary"
                disabled={loader ? 'disabled' : null}
              >{!loader ? 'Reset' : <Puff
                visible={true}
                height="40"
                width="40"
                color="#eee"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />}</button>

            </div>
          </div>
        </form>
      </div>

    </>





  )
}

export default ForgotPassword