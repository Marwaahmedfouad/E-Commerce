import React from 'react';
import styles from './About.module.css';
import { Helmet } from 'react-helmet';
const About = () => {
    return (

        <>
            <div className="application">
                <Helmet>
                    <title>About</title>
                </Helmet>
            </div>
            <h2>About</h2>
        </>

    );
}

export default About;
