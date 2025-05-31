import React from 'react'
import { Outlet } from 'react-router-dom' 
import Navbar from '../Navbar/Navbar';
import CartTab from './CartTab';
import { useSelector } from 'react-redux'
import Product from './Product';

const Layout = () => {
    const statusTabCart = useSelector(store => store.cart.statusTab);
  return (
    <div>
        <main className={` max-w-full m-auto p-5 transform transition-transform duration-500 rounded-lg dark:bg-gray-900 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]
        ${statusTabCart === false ? "" : "" }`}>
            <Product/>
            
        </main>
        <CartTab />
    </div>
  )
}

export default Layout