import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sendcode() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'code') {
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/auth/forgotPassword`, { email, password, code });
      console.log("Response:", response.data);
      navigate('/signin');
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className='container d-flex contentDiv justify-content-around'>
      <div className='div2'>
        <div className='container mt-4 justify-content-center'>
          <div className='row justify-content-center p-4 mt-5'>
            <div className='col-md-6 p-4 mt-3'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type="email" className='form-control' id='email' name='email' value={email} onChange={handleChange} />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>New Password</label>
                  <input type="password" className='form-control' id='password' name='password' value={password} onChange={handleChange} />
                </div>
                <div className='form-group'>
                  <label htmlFor='code'>Code</label>
                  <input type="text" className='form-control' id='code' name='code' value={code} onChange={handleChange} />
                </div>
                <button type="submit" className='btn btn-primary'>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
