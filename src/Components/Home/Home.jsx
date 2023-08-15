import React from 'react';
import styles from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Home</title>
                </Helmet>
            </div>
            <CategorySlider />
            <FeaturedProducts />
        </>

    );
}

export default Home;
