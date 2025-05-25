import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItems';
import { toggleStatusTab } from '../../redux/cartSlice';
import { useNavigate } from "react-router-dom";
import { products } from '../../assets/Products'; // ✅ Import product list

const CartTab = () => {
  const carts = useSelector(store => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = () => {
    if (carts.length === 0) {
      navigate("/Error");
    } else {
      navigate("/Success");
    }
  };

  // ✅ Calculate total by matching productId to product.price
  const totalAmount = carts.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    const price = product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className={`fixed top-20 right-0 bg-gray-700 shadow-2xl w-96 h-[89%] grid grid-rows-[60px_1fr_60px] 
      transform transition-transform duration-500 ${statusTab === false ? "translate-x-full" : ""}`}>
      <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
      <div className='p-5'>
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className='px-5 py-2 text-white font-semibold flex justify-between'>
        <span>Total Amount:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <div className='grid grid-cols-2'>
        <button className='bg-black text-white h-12' onClick={handleCloseTabCart}>CLOSE</button>
        <button className='bg-amber-600 text-white h-12' onClick={handleCheckout}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartTab;
