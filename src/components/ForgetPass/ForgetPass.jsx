import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ForgetPass/ForgetPass.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function ForgetPass() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, { email });
      console.log("Email sent successfully:", response.data);
      navigate('/sendcode'); 
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='content d-flex flex-column flex-md-row align-items-center justify-content-center '>
      <img className="img-fluid mb-4 mb-md-0" src="src/assets/Emails.gif" alt="Reset password illustration" />
      <form className="enterEmail " onSubmit={handleSubmit}>
        <h3>Enter Email</h3>
        <input type="text" name="UserEmail" value={email} onChange={handleChange} className="form-control " />
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
