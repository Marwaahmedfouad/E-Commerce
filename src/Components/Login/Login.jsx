import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';




const Login = ({ saveUserData }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setmessageError] = useState(null)



    let navigate = useNavigate()

    function handleLogin(values) {
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then((res) => {
                localStorage.setItem("userToken", res.data.token)
                saveUserData()
                        console.log("Token saved successfully:", token);
                navigate('/');

            })
            .catch((err) => {
                setmessageError(err.response.data.message);
                console.log(err);
                setIsLoading(false)
            })
    }


    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email("Email is invalid "),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase - then from 5 to 10 numbers or letters "),
    })


    let formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },
        validationSchema
        ,
        onSubmit: handleLogin
    })


    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Login</title>
                </Helmet>
            </div>
            <div className='w-50 mx-auto py-4'>
                <h3>Login : </h3>

                <form className=' mx-auto' id='registerForm' onSubmit={formik.handleSubmit}>


                    <label htmlFor='email'>Email</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.email && formik.touched.email ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'></input>
                    {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}



                    <label htmlFor='password'>Password</label>
                    <input className={`form-control mb-2 ${styles.formControl}  ${formik.errors.password && formik.touched.password ? 'border-danger' : ''} `} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'></input>
                    {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}




                    {messageError ? <p className='text-danger'>{messageError}</p> : null}
                    {isLoading ? <button className='btn bg-main text-white' disabled> <i className='fas fa-spinner fa-spin'> </i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}

                </form>
            </div>
        </>

    );
}

export default Login;
