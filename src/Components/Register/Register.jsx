import React, { useState } from 'react';
import styles from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';




const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setmessageError] = useState(null)



    let navigate = useNavigate()

    function handleRegister(values) {
        setIsLoading(true);
        axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values)
            .then((res) => {
                navigate('/login');
                console.log(res);
            })
            .catch((err) => {
                setmessageError(err.response.data.message);
                setIsLoading(false)
                console.log(messageError);
            })
    }


    let validationSchema = Yup.object({
        name: Yup.string().required('name is required').min(3, "Name min length is 3 ").max(20, "Name max length is 20 "),
        email: Yup.string().required('email is required').email("Email is invalid "),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase - then from 5 to 10 numbers or letters "),
        rePassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], "Password and repassword doesn't match"),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, "Phone must be EGY number")
    })


    let formik = useFormik({

        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema
        ,
        onSubmit: handleRegister
    })


    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Register</title>
                </Helmet>
            </div>
            <div className='w-50 mx-auto py-4'>
                <h3>Register Now : </h3>

                <form className=' mx-auto' id='registerForm' onSubmit={formik.handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input className={`form-control mb-2 ${styles.formControl}   ${formik.errors.name && formik.touched.name ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name'></input>
                    {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p> : ''}



                    <label htmlFor='phone'>Phone</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.phone && formik.touched.phone ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type='tel' name='phone' id='phone'></input>
                    {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ''}



                    <label htmlFor='email'>Email</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.email && formik.touched.email ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'></input>
                    {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}



                    <label htmlFor='password'>Password</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.password && formik.touched.password ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'></input>
                    {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}



                    <label htmlFor='rePassword'>Confirm Password</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.rePassword && formik.touched.rePassword ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type='password' name='rePassword' id='rePassword'></input>
                    {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p> : ''}


                    {messageError ? <p className='text-danger'>{messageError}</p> : null}
                    {/* {console.log(isLoading)} */}
                    {isLoading ? <button className='btn bg-main text-white' disabled> <i className='fas fa-spinner fa-spin'> </i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}


                </form>
            </div>
        </>

    );
}

export default Register;
