import React from 'react'

const SocialMediaLinks = () => {
  return (
    <div
    name="leftsidebar"
    className="
      fixed
      top-1/2 -translate-y-1/2
      left-4
      flex flex-col gap-6
      p-2 sm:p-3 md:p-4 lg:p-6
      justify-center items-center
      text-center
      dark:bg-gray-900
      rounded-xl
      shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]
      z-50
      w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px]
    "
  >
    <div>
      <a
        className="text-sm text-amber-50 text-center"
        href="https://github.com/jayeshsharma24"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="invert hover:scale-110 duration-200"
          src="https://img.icons8.com/?size=50&id=12599&format=png&color=000000"
          alt="GitHub"
        />
        Github
      </a>
    </div>
    <div>
      <a
        className="text-sm text-amber-50 text-center"
        href="https://www.linkedin.com/in/jayesh-ruplal-sharma-48a1b3208/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="hover:scale-110 duration-200"
          src="https://img.icons8.com/?size=50&id=13930&format=png&color=000000"
          alt="LinkedIn"
        />
        LinkedIn
      </a>
    </div>
    <div>
      <a
        className="text-sm text-amber-50 text-center"
        href="mailto:jayeshsharma884@gmail.com"
      >
        <img
          className="hover:scale-110 duration-200"
          src="https://img.icons8.com/?size=50&id=YbPqIO0gOrT3&format=png&color=000000"
          alt="Email"
        />
        Email
      </a>
    </div>
  </div>

  )
}

export default SocialMediaLinks
