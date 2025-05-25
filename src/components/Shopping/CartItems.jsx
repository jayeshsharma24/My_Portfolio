import React, {useState, useEffect} from 'react' 
import { products } from '../../assets/Products';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../redux/cartSlice';

const CartItem = (props) => {
    
    const [showLimitMessage, setShowLimitMessage] = useState(false);
    const {productId, quantity} = props.data;
    const [detail, setDetail] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const findDetail = products.filter(product => product.id === productId)[0];
        setDetail(findDetail);
    }, [productId])
    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    }

    // this will add more items into your cart we have to sell courses se we dont need to add item more than one hence we create another function below for THAT
    // const handlePlusQuantity = () => {
    //     dispatch(changeQuantity({
    //         productId: productId,
    //         quantity: quantity + 1
    //     }));
    // }
    const handlePlusQuantity = () => {
        if (quantity >= 1) {
          setShowLimitMessage(true);
          setTimeout(() => {
            setShowLimitMessage(false);
          }, 2000); // message disappears after 2 seconds
          return;
        }
        setQuantity(quantity);
      };

  return (
  <div className="flex flex-col gap-1">

    <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
        <img src={detail.image} alt="" className='w-12'/>
        <h3>{detail.name}</h3>
        <p>₹{detail.price * quantity}</p>
        <div className='w-20 flex justify-between gap-2'>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
            <span>{quantity}</span>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
   
        </div>
      
    </div>
    {showLimitMessage && (
      <p className="text-red-600 text-sm font-semibold ml-2">
        You cannot add more than one item
      </p>
    )}
    </div>
  )
}

export default CartItem