import React from 'react'
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
const ContactPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000); 
      return () => clearTimeout(timer);
    }
  }, [successMessage]);



  const onSubmit = async (data) => {
    try {
      let r = await fetch("http://localhost:3000/data", {
        method: "post", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(data)
      })
      // let res = await r.text()
      // console.log(data, res)
      const res = await r.json();
      console.log("Response Status:",r.status);
      console.log("Response Data:",res);

      if (r.ok) {
        setSuccessMessage("Form data submitted successfully ✅");
        reset();
      } else {
        setSuccessMessage("Submission failed ❌");
      }

    } catch (error) {
      setSuccessMessage("Something went wrong ❌");
      console.error(error);
    }
  }


  return (
    <div name="Contact" className="relative flex items-start justify-center m-3 p-4 sm:p-6 lg:p-8 rounded-lg dark:bg-gray-900 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info Section */}
            <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-800  rounded-lg">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl text-gray-800 animate-gradient-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent font-extrabold">
                Get in touch
              </h1>
              <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium">
                Fill in the form to start a conversation
              </p>
              {/* Location */}
              <div className="flex items-center mt-6 text-gray-600 dark:text-gray-400">
                <img src="https://img.icons8.com/?size=20&id=13800&format=png&color=000000" alt="" />
                <div className="ml-4 text-sm sm:text-base font-semibold">
                  Vadodara, Gujarat, India
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                <img className='invert' src="https://img.icons8.com/?size=20&id=60688&format=png&color=000000" alt="" />
                <div className="ml-4 text-sm sm:text-base font-semibold break-all">
                  jayeshsharma5895@gmail.com
                </div>
              </div>
            </div>

            {successMessage && (
  <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-5 py-3 rounded shadow-lg toast">
    {successMessage}
  </div>
)}

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 flex flex-col justify-center" method='POST' name='google-sheet'>
              <div className="flex flex-col">
                <label name="Name" className="hidden">Full Name</label>
                <input {...register("name", { required: true })} id="name" name='name' type="text" placeholder="Full Name..." className="w-full mt-2 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-grey-800 dark:text-white font-medium focus:border-indigo-500 focus:outline-none" />
                {errors.name && <span className='text-red-600 '>This field is required</span>}
              </div>
              <div className="flex flex-col mt-4">
                <label name="Email" className="hidden">Email</label>
                <input  {...register("email", { required: true })} id="email" name='email' type="email" placeholder="Email..." className="w-full mt-2 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white font-medium focus:border-indigo-500 focus:outline-none" />
                {errors.email && <span className='text-red-600 '>This field is required</span>}
              </div>
              <div className="flex flex-col mt-4">
                <label name="Contact" className="hidden">Phone Number</label>
                <input  {...register("number", { required: true })} id="tel" name='number' type="tel" placeholder="Phone Number..." className="w-full mt-2 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-white font-medium focus:border-indigo-500 focus:outline-none" />
                {errors.number && <span className='text-red-600 '>This field is required</span>}
              </div>
              <button type="submit" className="w-full md:w-1/2 lg:w-1/3 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-indigo-500 transition ease-in-out duration-300" name='submit'>
                Submit
              </button>
              {/* javascript for form data to store in google sheet/ */}


            </form>
          </div>
        </div>
      </div>
    </div>


  )
}

export default ContactPage;
