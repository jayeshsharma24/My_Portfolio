import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const ProductCards = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const { id, name, price, image, slug } = props.data;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
    toast.success('Item added to cart!');
  };

  return (
    <div
      className="
        bg-white rounded-lg shadow border border-gray-200
        w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px]
        flex flex-col
        overflow-hidden
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg
        mx-auto
      "
    >
      <Link to={slug} className="block relative w-full" style={{ paddingTop: '75%' }}>
        {/* 4:3 Aspect Ratio (height = 75% of width) */}
        <img
          src={image}
          alt={name}
          className="
            absolute top-0 left-0 w-full h-full
            object-contain rounded-t-lg
            transition-transform duration-500 ease-in-out
            hover:scale-110
          "
          loading="lazy"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md sm:text-lg font-semibold mb-2 text-center md:text-left text-gray-900 line-clamp-2">
          {name}
        </h3>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-auto gap-3 sm:gap-0">
          <p className="text-xl font-bold text-amber-600">₹{price}</p>

          <button
            onClick={handleAddToCart}
            className="
              bg-amber-500 text-white
              px-4 py-2 rounded-md
              text-xs sm:text-sm font-semibold
              hover:bg-amber-600
              focus:outline-none focus:ring-2 focus:ring-amber-400
              flex items-center gap-2
              transition-colors duration-200
              w-full sm:w-auto
            "
            aria-label={`Add ${name} to cart`}
          >
            <img
              src="https://img.icons8.com/?size=30&id=BBhHIwJINbBl&format=png&color=ffffff"
              alt=""
              className="w-4"
              aria-hidden="true"
            />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
