import axios from "axios";
import { createContext } from "react";

export let cartContexct = createContext()


let headers = {
    token: localStorage.getItem('userToken')
}

function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId
    }, {

        headers: headers
    }).then(((response) => response))
        .catch((error) => error)
}


function getLoggedUserCart(productId) {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers: headers
        }).then(((response) => response))
        .catch((error) => error)
}


function removeItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers: headers
        }).then(((response) => response))
        .catch((error) => error)
}

function updateProductCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count: count
        },

        {
            headers: headers
        }).then(((response) => response))
        .catch((error) => error)
}

function clearUserCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers: headers
        }).then(((response) => response))
        .catch((error) => error)
}

function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress
        },
        {
            headers: headers
        }).then(((response) => response))
        .catch((error) => error)
}

export function CartContextProvider(props) {
    return <cartContexct.Provider value={{ addToCart, getLoggedUserCart, removeItem, updateProductCount, clearUserCart, onlinePayment }}>
        {props.children}
    </cartContexct.Provider>
}
