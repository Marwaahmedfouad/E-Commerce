import React from 'react';
import styles from './Categories.module.css';
import { Helmet } from 'react-helmet';
const Categories = () => {
    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Categories</title>
                </Helmet>
            </div>
            <h2> Categories </h2>
        </>
    );
}

export default Categories;
