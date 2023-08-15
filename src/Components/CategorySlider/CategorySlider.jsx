import React, { useEffect, useState } from 'react';
import styles from './CategorySlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';

const CategorySlider = () => {


    const [categories, setCategories] = useState([])
    async function getCategories() {
        let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
        setCategories(data.data)
    }
    useEffect(() => {
        getCategories()
    }, []);



    const settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        lazyLoad: true,
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    lazyLoad: true,
                    pauseOnHover: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    lazyLoad: true,
                    pauseOnHover: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    lazyLoad: true,
                    pauseOnHover: false,
                }
            }
        ]
    };


    return (
        <>
            <div className='w-100 p-0 m-0'>

                <Slider {...settings} className='my-4 m-0 w-100 p-0'>

                    {categories.map((category) => <div key={category._id}>
                        <img className='w-100' height={200} src={category.image} alt='img'></img>
                        <h2 className='h6 pt-2 text-center'>{category.name}</h2>
                    </div>)}

                    {categories ? console.log(categories) : ''}
                </Slider>
            </div>
        </>
    );
}

export default CategorySlider;
