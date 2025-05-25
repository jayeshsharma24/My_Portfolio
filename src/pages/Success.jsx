import React from 'react'
const Success = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col flex-wrap overflow-hidden justify-center text-center border rounded-4xl h-[30vh] w-[50vw]  bg-gray-300 '>
           
            <video src="./src/assets/success.webm" autoPlay loop muted playsInline className='h-[150px]'></video>
            <div className='text-md lg:text-2xl font-bold text-gray-700 '>Your Order Recieved Scuccessfully</div>
       </div>
    </div>
  )
}

export default Success;
