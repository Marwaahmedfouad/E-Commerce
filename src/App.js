import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { CartContextProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import { Offline } from "react-detect-offline";
import { UserContextProvider } from './Context/userContext';


function App() {
  const [userData, setuserData] = useState(null)
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem('userToken'))
      saveUserData()
  }, [])


  let routes = createHashRouter([
    {
      path: '/', element: <Layout userData={userData} setuserData={setuserData} />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute> <Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'checkout/:id', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])


  return (
    <>
      <Offline> <div className='network'>  You are currently offline ... </div></Offline>
      <CartContextProvider>
        <UserContextProvider>
          <Toaster />
          <RouterProvider router={routes} />
        </UserContextProvider>
      </CartContextProvider>

    </>
  );
}

export default App;
