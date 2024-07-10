import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Catogries.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {

      const response = await fetch(`${import.meta.env.VITE_API}/categories`);
      const data = await response.json();
      if (data.message === 'success' && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    variableWidth: true,
  };

  return (
    
  
<>

<div className='container d-flex contentDiv justify-align-content-around mt-4 '>
  <div className='div1 me-4 p-5'>
<h2 className='titleShop '>
  Filp<span> Mart</span>
</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti optio esse magnam ipsum alias iusto ut blanditiis repellat consectetur
   temporibus nulla debitis adipisci nobis, numquam, similique animi possimus, quas quae?</p>
  </div>
  <div className='div2'>
<h3 className='ms-4 mt-4 NewCatogries'><span>New </span> Catogries </h3>
   <div className="testimonial-slider mt-2">
      {categories.length === 0 ? (
        
           <div className="d-flex justify-content-center align-items-center loading-container">
      
         <img className=" container d-flex justify-content-center w-25 h-25" src="src\assets\Loading.gif" alt="Loading..." />
         </div>
      ) : (
      
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="card ">
              <div className="img-card">
                <img src={category.image.secure_url} alt={category.name} />
                <Link to={`/categories/${category._id}`} className='btn btn-outline-success ProductDetailsbtn '>Product Details</Link>
              </div>
            
            </div>
          ))}
        </Slider>
      )}
    </div>

  </div>
</div>
</>
  );
};

export default Categories;

