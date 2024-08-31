// import { useState } from 'react'
// import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './Layout';
import Blogs from './Blogs';
import NavBar from './app/components/nav/NavBar';
import Home from './app/Home';
import Product_id from './app/product/productId/Product_id';
import CartProvider from './providers/CartProvider';
import Profile from './app/profile/Profile';
import Cart from './app/cart/Cart';
import Dashboard from './app/dashboard/Dashboard';
import Product_edit from './app/product_edit/Product_edit';
import Product_edit_form from './app/product_edit/product_edit_form/Product_edit_form';
import Product_upload from './app/dashboard/product-upload/Product_upload';
import Product_delete from './app/product_delete/Product_delete';
import Product_comments from './app/comments/Product_comments';
import Product_customers from './app/customers/Product_customers';
import Admins from './app/admins/Admins';
import Add_admin from './app/admins/add_admin/Add_admin';
import Orders from './app/orders/Orders';
import Order_placement from './app/orders/order_placement/Order_placement';
import Banner_upload from './app/banner_upload/Banner_upload';
import Register from './app/register/Register';
import Github_login from './app/github-login/laravel_id/Github_login';
import Profile_picture from './app/profile_picture/Profile_picture';
import Login from './app/login/Login';
import Footer from './app/components/Footer/Footer';
import  { Toaster } from 'react-hot-toast';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>


<CartProvider>

     <BrowserRouter>

     <NavBar />

      <Routes>

          <Route path="/" element={<Home/>}>

            <Route index element={<Home/>} />
            <Route path="blogs" element={<Blogs />} />

          </Route>

          <Route path="product/productId" element={<Product_id />} />

          <Route path="profile" element={<Profile />} />

          <Route path="cart" element={<Cart />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="dashboard/product-upload" element={<Product_upload />} />

          <Route path="product_edit" element={<Product_edit />} />

          <Route path="product_edit/product_edit_form" element={<Product_edit_form />} />

          <Route path="product_delete" element={<Product_delete />} />

          <Route path="comments" element={<Product_comments />} />

          <Route path="customers" element={<Product_customers />} />

          <Route path="admins" element={<Admins />} />

          <Route path="admins/add_admin" element={<Add_admin />} />

          <Route path="orders" element={<Orders />} />

          <Route path="orders/order_placement" element={<Order_placement />} />

          <Route path="banner_upload" element={<Banner_upload />} />

          <Route path="register" element={<Register />} />

          <Route path="github-login/laravel_id" element={<Github_login />} />

          <Route path="profile_picture" element={<Profile_picture />} />

          <Route path="login" element={<Login />} />

          

          

      </Routes>

    </BrowserRouter>

    <Footer/>


    <Toaster
    position="top-center"
    reverseOrder={false}
    />
    </CartProvider>




      
    </>
  )
}

export default App
