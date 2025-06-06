import React from 'react'
import { Link } from 'react-scroll'
const Footer = () => {
  return (
    <div>
    <footer className=" rounded-lg shadow-sm  dark:bg-gray-800  m-3">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex text-center sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="\logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Sharma Jayesh
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 text-white">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
             About 
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white text-center sm:text-center  text-white">
          © 2025 Jayesh All Rights Reserved.
        </span>
      </div>
    </footer>
  </div>
  
  )
}

export default Footer
