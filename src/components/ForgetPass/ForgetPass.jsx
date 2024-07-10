import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

      // Handle the response as needed, e.g., show a success message
      console.log("Email sent successfully:", response.data);
      
      // Navigate to another page if needed
      navigate('/Sendcode');
    } catch (error) {
      // Handle the error as needed, e.g., show an error message
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className='container d-flex justify-content-center mt-5'>
      <form onSubmit={handleSubmit}>
        <h3>Enter Email</h3>
        <input type="text" name="UserEmail" value={email} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
