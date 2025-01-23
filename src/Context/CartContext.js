import axios from "axios";
import { createContext } from "react";

export let cartContexct = createContext();

let headers = {
    token: localStorage.getItem('userToken')
};

function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers })
        .then(response => response)
        .catch(error => error);
}

function getLoggedUserCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
        .then(response => response)
        .catch(error => error);
}

function removeItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
        .then(response => response)
        .catch(error => error);
}

function updateProductCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
        .then(response => response)
        .catch(error => error);
}

function clearUserCart() {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
        .then(response => response)
        .catch(error => error);
}

function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, { shippingAddress }, { headers })
        .then(response => response)
        .catch(error => error);
}

export function CartContextProvider({ children }) {
    return (
        <cartContexct.Provider value={{ addToCart, getLoggedUserCart, removeItem, updateProductCount, clearUserCart, onlinePayment }}>
            {children}
        </cartContexct.Provider>
    );
}
