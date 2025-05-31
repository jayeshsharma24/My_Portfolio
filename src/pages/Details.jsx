import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/Products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Navbar from '../components/Navbar/Navbar';
import CartTab from '../components/Shopping/CartTab';
import Footer from '../components/Footer/Footer';

const Detail = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const found = products.find(product => product.slug === slug);
    if (found) {
      setDetail(found);
    } else {
      window.location.href = '/';
    }
  }, [slug]);

  const handleMinusQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handlePlusQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: detail.id,
      quantity: quantity,
    }));
  };

  if (!detail) return null;

  return (
    <div className="bg-gray-400 min-h-screen">
      <Navbar />
      <CartTab />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">Product Detail</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={detail.image}
              alt={detail.name}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{detail.name}</h1>
            <p className="text-2xl text-green-700 font-semibold">₹{detail.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl font-bold"
                  onClick={handleMinusQuantity}
                >
                  -
                </button>
                <span className="w-10 h-10 flex items-center justify-center bg-gray-100 text-xl font-medium">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl font-bold"
                  onClick={handlePlusQuantity}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-md leading-relaxed">{detail.description}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Detail;
