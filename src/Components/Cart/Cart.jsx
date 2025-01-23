import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { cartContexct } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Cart = () => {
    let { getLoggedUserCart, removeItem, updateProductCount, clearUserCart } = useContext(cartContexct)
    const [cartDetails, setcartDetails] = useState(null)
    console.log(cartDetails);

    async function getCart() {
        let response = await getLoggedUserCart()
        if (response?.data?.status === 'success') {
            setcartDetails(response.data.data)
            console.log(response);
        } else {
            console.log(response);
        }
    }



    async function deleteItem(productId) {
        let response = await removeItem(productId)
        setcartDetails(response.data.data)
        toast("product removed")
        console.log(response);
    }


    async function updateProductQuantity(productId, count) {
        let response = await updateProductCount(productId, count)
        setcartDetails(response.data.data)
        toast("Product Count updated", { duration: 2000 })
        console.log(response);
    }

    async function deleteCart() {
        let response = await clearUserCart()
        setcartDetails(response.data.data)
        toast("product removed")
        console.log(response);
    }



    useEffect(() => {
        getCart()
    }, [])

    return (
        <>

            {/* Helmet */}

            <div className="application">
                <Helmet>
                    <title>Cart</title>
                </Helmet>

            </div>
            {cartDetails ? <div className='bg-main-light p-4 my-4'>

                <h3>Shop Cart</h3>
                <h6 className='text-main'>Total Cart Price :  {cartDetails.totalCartPrice} EGP</h6>
                <button onClick={deleteCart} className='btn btn-outline-danger'> Clear Cart</button>
                {cartDetails.products.map((product) =>
                    <div className='row border-bottom py-2 align-items-center' key={product._id}>
                        <div className='col-md-1'>
                            <img src={product.product.imageCover} className='w-100' alt='img'></img>
                        </div>
                        <div className='col-md-11 d-flex justify-content-between align-items-center'>

                            <div>
                                <h6>{product.product.title} </h6>
                                <h6>Price: {product.price} </h6>
                                <button className='btn m-0 p-0 text-danger' onClick={(() => deleteItem(product.product._id))}><i className='fa-regular  fa-trash-can'></i> Remove</button>
                            </div>
                            <div>
                                <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)} className='btn border-main btn-small'>+</button>
                                <span className='mx-2'>{product.count}</span>
                                <button onClick={() => updateProductQuantity(product.product._id, product.count - 1)} className='btn border-main btn-small'>-</button>
                            </div>


                        </div>
                    </div>
                )}
                <Link className='btn bg-main text-white' to={`/checkout/${cartDetails._id}`}>Checkout</Link>
            </div> : <div className=' d-flex align-items-center justify-content-center'>
                <i className="fa-solid fa-spinner fa-spin text-success py-5 fs-2"></i>
            </div>}
        </>
    );
}

export default Cart;
