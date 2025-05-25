import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useSelector, useDispatch } from 'react-redux' 
import { toggleStatusTab } from '../../redux/cartSlice'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts])
    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow px-6 py-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.3)]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3 animate-fadeIn">
          <img
            src="./src/assets/logo.png"
            className="h-10 animate-pulse hover:scale-110 transition-transform duration-300"
            alt="Logo"
          />
          <span className=" self-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap dark:text-white animate-slideIn">
            Jayesh Sharma
          </span>
        </div>

        {/* Buttons & Hamburger */}
        <div className="flex md:order-2 space-x-3 md:space-x-5">
          {/* shopping cart icon  */}
          <div className='w-10 h-10 bg-gray-200 rounded-full
        flex justify-center items-center relative' onClick={handleOpenTabCart}>
            <img src="https://img.icons8.com/?size=60&id=BBhHIwJINbBl&format=png&color=000000" alt="" className='w-6'/>
            <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
            w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
        </div>
          
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Hire Me
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1 transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 border-gray-100 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 rounded-lg">
            {["Home", "Tech Stack", "Projects","Products", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  activeClass="active"
                  className="block py-2 px-3 text-gray-900 rounded md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 cursor-pointer"
                >
                  {item}
                </Link>

              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </nav>
  );
}
