import React from 'react';
import styles from './Brands.module.css';
import { Helmet } from 'react-helmet';
const Brands = () => {
    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Brands</title>
                </Helmet>
            </div>
        <h2> Brands </h2>
        </>
    );
}

export default Brands;
