import React from 'react';
import styles from './NotFound.module.css';
import { Helmet } from 'react-helmet';
import errorImage from '../../assets/images/notFound.jpg'

const NotFound = () => {
    return (
        <div className="container ">
            <Helmet>
                <title>NotFound</title>
            </Helmet>
            <img src={errorImage} width={'100%'} alt='' />
        </div>
    );
}

export default NotFound;
