import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItems';
import { toggleStatusTab } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { products } from '../../assets/Products';

const CartTab = () => {
  const carts = useSelector(store => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = () => {
    navigate(carts.length === 0 ? "/Error" : "/Success");
  };

  const totalAmount = carts.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    const price = product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <div
      className={`
        fixed top-30 right-0 z-50
        h-[80vh]  lg:25
        bg-white/30 backdrop-blur-md border-l border-white/20 rounded-l-lg shadow-2xl
        grid grid-rows-[60px_1fr_60px_60px]
        transition-transform duration-500 transform
        ${statusTab ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Header */}
      <h2 className="p-5 text-white text-xl font-bold border-b border-white/20">Shopping Cart</h2>

      {/* Items List */}
      <div className="p-4 overflow-y-auto space-y-4">
        {carts.length > 0 ? (
          carts.map((item, index) => (
            <CartItem key={index} data={item} />
          ))
        ) : (
          <p className="text-white">Your cart is empty.</p>
        )}
      </div>

      {/* Total */}
      <div className="px-5 py-3 font-semibold flex justify-between text-white bg-black/20 border-t border-white/20">
        <span>Total:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-5 m-2 ">
        <button
          className="bg-gray-800 text-white h-12 hover:bg-gray-900 transition rounded-xl"
          onClick={handleCloseTabCart}
        >
          Close
        </button>
        <button
          className="bg-amber-600 text-white h-12 hover:bg-amber-700 transition rounded-xl"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTab;
