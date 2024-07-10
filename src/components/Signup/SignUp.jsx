import axios from 'axios';
import React, { useState } from 'react';
import { object, string, mixed } from 'yup';
import '../Signup/SignUp.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: null 
  });
  const [loader, setLoader] = useState(false); // Corrected the variable name to loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0] // Correctly set the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true); // Corrected the variable name to loader

    if (!await validateData()){
      console.log("Validation error");
      setLoader(false);
      return false;
    }

    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
      setUser({
        userName: '',
        email: '',
        password: '',
        image: null // Reset image to null
      });
      if (data.message === 'success') {
        toast.success("Complete SignUp --> your account has been created successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
        localStorage.setItem('userName', user.userName);
        navigate('/Home'); 

      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.status === 409) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
      } else {
        toast.error('An unexpected error occurred. Please try again later.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
      }
    } finally {
      setLoader(false); // Corrected the variable name to loader
    }
  };


  // Validation schema using Yup
  const schema = object({
    userName: string().min(5, 'User name must be at least 5 characters').max(20, 'User name must be at most 20 characters').required('User name is a required field'),
    email: string().email('Invalid email format').required('Email is a required field'),
    password: string().min(3, 'Password must be at least 3 characters').max(20, 'Password must be at most 20 characters').required('Password is a required field'),
    image: mixed().required('Image is a required field')
  });

  const validateData = async () => {
    try {
      await schema.validate({
        ...user,
        image: user.image ? user.image : null // Validate image presence
      }, { abortEarly: false });
      return true;
    } catch (error) {
      console.error('Validation error:', error.errors);
      error.errors.forEach(err => toast.error(err, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      }));
      return false;
    }
  };

  return (
    <>
      <Navbar/>
      <div className='container mt-4 justify-content-center'>
        <div className='row justify-content-center p-4 mt-3'>
          <div className='col-md-6 p-4 mt-3 '>
            <h2 className='title text-center mt-3'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='userName'>User Name</label>
                <input type="text" className='form-control' id='userName' value={user.userName} name='userName' onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" className='form-control' id='email' value={user.email} name='email' onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" className='form-control' id='password' value={user.password} name='password' onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='image'>Image</label>
                <input type="file" className='form-control-file m-3' id='image' name='image' onChange={handleImageChange} />
              </div>
              <button type="submit" disabled={loader} className='btn btn-primary btn-block m-4 '>
                {!loader ? 'Register' : 'Wait to Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

