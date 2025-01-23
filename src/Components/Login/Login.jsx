import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = ({ saveUserData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
            const token = res.data.token;
            localStorage.setItem("userToken", token); // Save token in localStorage
            console.log("Token saved successfully:", token);
            saveUserData();
            navigate('/');
        } catch (err) {
            setMessageError(err.response?.data?.message || "Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^[A-Z][a-z0-9]{5,10}$/,
                'Password must start with an uppercase letter and be 5-10 characters long'
            ),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <>
            <div className="application">
                <Helmet>
                    <title>Login</title>
                </Helmet>
            </div>
            <div className="w-50 mx-auto py-4">
                <h3>Login</h3>
                <form className="mx-auto" id="registerForm" onSubmit={formik.handleSubmit}>
                    {/* Email Field */}
                    <label htmlFor="email">Email</label>
                    <input
                        className={`form-control mb-2 ${styles.formControl} ${
                            formik.errors.email && formik.touched.email ? 'border-danger' : ''
                        }`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        name="email"
                        id="email"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                    )}

                    {/* Password Field */}
                    <label htmlFor="password">Password</label>
                    <input
                        className={`form-control mb-2 ${styles.formControl} ${
                            formik.errors.password && formik.touched.password ? 'border-danger' : ''
                        }`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        name="password"
                        id="password"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                    )}

                    {/* Error Message */}
                    {messageError && <p className="text-danger">{messageError}</p>}

                    {/* Submit Button */}
                    {isLoading ? (
                        <button className="btn bg-main text-white" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                        </button>
                    ) : (
                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            type="submit"
                            className="btn bg-main text-white"
                        >
                            Login
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default Login;
