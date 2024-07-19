import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/Signup/SignUp';
import Catogries from './components/Catogries/Catogries';
import Admin from './components/Admin/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { UserContextProvider } from './Context/User.jsx'; // Updated import
import CatogriesProduct from './components/CatogriesProduct/CatogriesProduct.jsx'
import ForgetPass from './components/ForgetPass/ForgetPass.jsx';
import Sendcode from './components/Sendcode/Sendcode.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/products",
    element:
    <ProtectedRoutes>
     <Products />
     </ProtectedRoutes>
  },
  {
     path: '/categories/:id',
     element:<CatogriesProduct/>
  },
  {
    path: "/categories",
    element: <Catogries />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/Admin",
    element: <Admin />
  }
  ,{
    path: "/ForgetPass",
    element: <ForgetPass/>
  }
  ,{
    path :"/Sendcode",
     element:<Sendcode /> 
  }

]);

export default function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}
