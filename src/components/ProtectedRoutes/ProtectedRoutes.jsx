import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem('userToken');
  console.log("Token from localStorage:", token); // Debugging line
  if (!token) {
    return <Navigate to='/signin' replace/>;
  }
  return children;
}
