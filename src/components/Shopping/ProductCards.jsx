import React from 'react' 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
const ProductCards = (props) => {
    
      const carts = useSelector(store => store.cart.items);
    const {id, name, price, image, slug} = props.data;
    const dispatch = useDispatch();
    
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }));
        toast.success('Item added to cart!');
    }
    return (
    <div className='bg-white p-5 rounded-xl shadow-sm w-[70%] flex justify-between flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]'>
        <Link to={slug}>
        {/* className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]' */}
            <img src={image} alt=''  className=" h-auto max-h-[200px] sm:max-h-[220px] md:max-h-[240px] lg:max-h-[260px] object-cover rounded-t-lg"/>
        </Link>
        <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
        <div className='flex justify-between items-center'>
            <p>
                <span className='text-2xl font-medium'>₹{price}</span>
            </p>
            <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2' onClick={handleAddToCart}>
                <img src="https://img.icons8.com/?size=60&id=BBhHIwJINbBl&format=png&color=000000" alt="" className='w-5'/>
                Add To Cart
            </button>
        </div>
    </div>
  )
}

export default ProductCards