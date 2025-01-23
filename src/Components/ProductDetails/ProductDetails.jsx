import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    let { id } = useParams();
    const [productDetails, setproductDetails] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    async function getProductDetails() {
        setisLoading(true);
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setproductDetails(data.data);
        setisLoading(false);
    }

    useEffect(() => {
        getProductDetails();
    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        lazyLoad: true,
        pauseOnHover: false,
        arrows: false,
    };

    return (
        <>
            <Helmet>
                <title>Product Details</title>
            </Helmet>
            {!isLoading && productDetails ? (
                <div className='row m-0 container mx-auto'>
                    <div className='col-md-4'>
                        <Slider {...settings} className='my-4'>
                            {productDetails?.images.map((img) => (
                                <img src={img} alt='img' key={img} />
                            ))}
                        </Slider>
                    </div>
                    <div className='col-md-8 d-flex justify-content-center flex-column'>
                        <h3>{productDetails.title}</h3>
                        <p>{productDetails.description}</p>
                        <p>{`Price: ${productDetails.price} EGP`}</p>
                        <p>Rating: {productDetails.ratingsAverage} <i className='fas fa-star rating-color mx-2'></i></p>
                        <button className='btn bg-main text-white w-50 mx-auto'>+ Add</button>
                    </div>
                </div>
            ) : (
                <div className='position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center'>
                    <i className='fas fa-spinner text-main fa-spin h1'></i>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
