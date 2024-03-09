import axios from 'axios';
import React, { useState } from 'react'
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',

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

  const handelimageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0]

    });
  };

  const validateData = async () => {
    const SignupSchema = object({
      userName: string().min(4).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(25).required(),
      image: string().required(),

    });
    try {
      await SignupSchema.validate(user, { abortEarly: false });
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
      const formdata = new FormData();
      formdata.append('userName', user.userName);
      formdata.append('email', user.email);
      formdata.append('password', user.password);
      formdata.append('image', user.image);
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formdata);
        setUser({

          userName: '',
          email: '',
          password: '',
          image: '',

        });
        if (data.message == 'success') {
          toast.success('Your account has been created!', {
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

          navigate('/login');
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 409) {
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
        }

      } finally {
        setLoder(false);
      }

    }

  }


  return (
    <>
      <h2>SignUp</h2>
      <br />

      {errors.length > 0 ? errors.map(error =>
        <div> {error}</div>
      ) : ''}


      <form onSubmit={handelSubmit}>


        <input type="text" className="form-control" placeholder="User Name" value={user.userName} name='userName' onChange={handelChange} />

        <br />

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} name='email' onChange={handelChange} />
          <br />

          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={user.password} name='password' onChange={handelChange} />
          <br />

          <label htmlFor="exampleFormControlFile1">Enter your Image</label>
          <br />

          <input type="file" className="form-control-file" id="exampleFormControlFile1" name='image' onChange={handelimageChange} />
        </div>
        <br />

        <button type="submit" className="btn btn-primary"
          disabled={loader ? 'disabled' : null}
        >{!loader ? 'Sign Up' : <Puff
          visible={true}
          height="40"
          width="40"
          color="#eee"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />}</button>
      </form>


    </>





  )
}

export default Signup