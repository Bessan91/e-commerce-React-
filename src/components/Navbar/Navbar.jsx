import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import '../Navbar/Navbar.css';

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext); // Ensure all context functions are destructured
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setUserName]);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    setUserName(null);
    setUserToken(null); 
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light Nav">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to='/Home'>Filp Mart</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to='/Home'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to='/products'>Products</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userName ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {userName}</span>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/categories">Categories</NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to='/signin'>SignIn</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/signup'>SignUp</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
