import React, { useContext } from 'react';
import styles from './Products.module.css';
import { Helmet } from 'react-helmet';



const Products = () => {
    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Products</title>
                </Helmet>

            </div>
            <h2> Products :  </h2>
        </>
    );
}

export default Products;
