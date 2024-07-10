import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SignIn from '../SignIn/SignIn'; // Assuming SignIn component exists in '../SignIn/SignIn'

export default function CatogriesProduct() {
  const { id } = useParams();
  const [Products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
        console.log(data);
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
    
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [id]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/cart`, {
        productId
      }, {
        headers: {
          Authorization: `${import.meta.env.PRIMARY_KEY}${token}`
        }
      });
      console.log('Product added to cart:', data);
      setCartMessage('Product added to cart successfully.');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.response && error.response.status === 409) {
        setCartMessage('Product is already in the cart.');
      } else {
        setCartMessage('An error occurred while adding the product to the cart.');
      }
    }
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product-list d-flex justify-content-center">
          <div className="row mt-4">
            {Products.length > 0 ? (
              Products.map((product, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <img src={product.mainImage.secure_url} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      {!isLoggedIn ? (
                        <button className='btn btn-outline-danger' onClick={openSignInModal}>Sign In to Add Cart</button>
                      ) : (
                        <button className='btn btn-outline-danger' onClick={() => addToCart(product._id)}>Add to Cart</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
        {cartMessage && <div className="alert alert-info mt-3">{cartMessage}</div>}
      </div>
      {showSignInModal && <SignIn onClose={closeSignInModal} />} {/* Render SignIn modal if showSignInModal is true */}
    </>
  );
}
