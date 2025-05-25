import React from 'react'
const Error = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='flex  sm:flex-wrap overflow-hidden justify-center text-center flex-col border rounded-4xl h-[30vh] w-[50vw] lg:py-20 bg-gray-300 '>
            
            <video src="./src/assets/error.webm" autoPlay loop muted playsInline className='h-[150px]'></video>
            <div className='text-md lg:text-2xl font-bold text-grey-500 text-red-700'>Error... Warning ! warning! warning!</div>
       </div>
    </div>
  )
}

export default Error;
