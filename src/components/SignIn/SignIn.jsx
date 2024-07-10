import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User'; // Adjust the import path accordingly
import { toast, Bounce } from 'react-toastify';
import { object, string } from 'yup'; // Import Yup for validation
import 'react-toastify/dist/ReactToastify.css';
import '../SignIn/SignIn.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser, setUserToken, setUserName } = useContext(UserContext); // Get context functions
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!await validateData()) {
      setLoader(false);
      return false;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, userInput, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      setUserName(data.name); // Update the context with the username
      setUser(data.name); // Update the context with the username

      toast.success("Login successful --> Redirecting to Home page", {
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

      navigate('/Home');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Login failed", {
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
    } finally {
      setLoader(false);
    }
  };

  const schema = object({
    email: string().email('Invalid email format').required('Email is a required field'),
    password: string().min(3, 'Password must be at least 3 characters').max(20, 'Password must be at most 20 characters').required('Password is a required field')
  });

  const validateData = async () => {
    try {
      await schema.validate(userInput, { abortEarly: false });
      return true;
    } catch (error) {
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
      <div className='container d-flex contentDiv justify-align-content-around'>
        <div className='div1 imgSignIn'>
          <img className="" src="src/assets/Sign in-rafiki.svg" alt="" />
        </div>
        <div className='div2'>
          <div className='container mt-4 justify-content-center'>
            <div className='row justify-content-center p-4 mt-5'>
              <div className='col-md-6 p-4 mt-3'>
                <h2 className='title text-center mt-3'>Sign In</h2>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" className='form-control' id='email' value={userInput.email} name='email' onChange={handleChange} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" className='form-control' id='password' value={userInput.password} name='password' onChange={handleChange} />
                    <button type="button" className='ForgetPass' onClick={() => navigate('/ForgetPass')}>Forgot Password</button>
                  </div>
                  <button type="submit" disabled={loader} className='btn btn-primary btn-block m-4'>
                    {!loader ? 'Sign In' : 'Please wait...'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
