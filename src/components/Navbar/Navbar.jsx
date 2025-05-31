import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../redux/cartSlice";

export default function Navbar({ isHomePage = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = carts.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, [carts]);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const navItems = [
    { label: "Home", to: "Home", isScroll: true },
    { label: "Tech Stack", to: "Tech Stack", isScroll: true },
    { label: "Projects", to: "Projects", isScroll: true },
    { label: "Products", to: "Products", isScroll: true },
    { label: "Contact", to: "Contact", isScroll: true },
    { label: "Data", to: "/data", isScroll: false },
  ];

const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login'); // redirect to login
  };

  return (
    <nav
      className={`sticky ${
        isHomePage ? "top-10 mt-10 z-40" : "top-0 z-50"
      } bg-white dark:bg-gray-900 shadow px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 transition-all duration-300`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center space-x-3 animate-fadeIn cursor-pointer">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 animate-pulse hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap dark:text-white animate-slideIn">
            Jayesh Sharma
          </span>
        </RouterLink>

        {/* Desktop Nav links */}
        <div className="hidden md:flex md:order-1 space-x-8 font-medium">
          {navItems.map(({ label, to, isScroll }) =>
            isScroll ? (
              <ScrollLink
                key={label}
                to={to}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer py-2 px-3 text-gray-900 rounded hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition"
                activeClass="underline"
              >
                {label}
              </ScrollLink>
            ) : (
              <RouterLink
                key={label}
                to={to}
                className="py-2 px-3 text-gray-900 rounded hover:text-blue-700 dark:text-white dark:hover:text-blue-500 transition"
              >
                {label}
              </RouterLink>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex md:order-2 items-center space-x-3 sm:space-x-5">
          {/* Cart */}
          <button
            onClick={handleOpenTabCart}
            aria-label="Open cart"
            className="relative w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <img
              src="https://img.icons8.com/?size=60&id=BBhHIwJINbBl&format=png&color=000000"
              alt="Cart"
              className="w-6"
              aria-hidden="true"
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Hire Me + Login (only visible on md+ screens) */}
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/14pljzMz_9-j4jmeqpnPOIdS1oi9qNTmP/view?usp=drive_link",
                "_blank"
              )
            }
            className="hidden sm:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Hire Me
          </button>
          {/* <button
            onClick={() => navigate("/Login")}
            className="hidden sm:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button> */}
           {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
        >
          Login
        </button>
      )}

          {/* Mobile Menu Toggle (only visible on small screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="z-50 inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600 transition"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="w-full md:hidden mt-4" id="mobile-menu">
            <ul className="grid grid-cols-1 gap-4 font-medium border border-gray-100 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 p-4">
              {navItems.map(({ label, to, isScroll }) => (
                <li key={label}>
                  {isScroll ? (
                    <ScrollLink
                      to={to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-center"
                    >
                      {label}
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={to}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-center"
                    >
                      {label}
                    </RouterLink>
                  )}
                </li>
              ))}

              {/* Hire Me & Login inside mobile menu */}
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/14pljzMz_9-j4jmeqpnPOIdS1oi9qNTmP/view?usp=sharing",
                      "_blank"
                    )
                  }
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Hire Me
                </button>
              </li>
              <li>
                {/* <button
                  onClick={() => {
                    navigate("/Login");
                    setIsOpen(false);
                  }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button> */}
                 {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
        >
          Login
        </button>
      )}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Animations */}
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
