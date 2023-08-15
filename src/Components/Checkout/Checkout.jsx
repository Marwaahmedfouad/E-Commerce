import React, { useContext } from 'react';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { cartContexct } from '../../Context/CartContext';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
const Checkout = (props) => {


    let params = useParams()
    let { onlinePayment } = useContext(cartContexct)



    async function handleSubmit(values) {
        let response = await onlinePayment(params.id, values);
        if (response?.data?.status === 'success') {
            window.location.href = response.data.session.url
        }
    }
    let formik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: ''
        },
        onSubmit: handleSubmit
    })




    return (

        <>

            {/* Helmet */}
            <div className="application">
                <Helmet>
                    <title>Checkout</title>
                </Helmet>
            </div>



            <div className='w-50 py-5 mx-auto'>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor='details'>Details : </label>
                    <input type='text' className='form-control' value={formik.values.details} onChange={formik.handleChange} name='details' id='details'></input>


                    <label htmlFor='phone'>Phone : </label>
                    <input type='tel' className='form-control' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'></input>


                    <label htmlFor='city'>City : </label>
                    <input type='text' className='form-control' value={formik.values.city} onChange={formik.handleChange} name='city' id='city'></input>

                    <button type='submit' className='btn bg-main w-100 text-white'>Pay </button>
                </form>
            </div>
        </>

    );
}

export default Checkout;
